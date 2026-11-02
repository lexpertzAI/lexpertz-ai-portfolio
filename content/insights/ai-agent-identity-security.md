---
title: "AI Agent Identity Security: Three Identities, One Token"
summary: "Most agent incidents are authorization failures, not model failures. How delegation, audience binding, and short-lived credentials constrain agents."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-11-02"
category: "Architecture"
coverImage: "/insights/ai-agent-identity-security.png"
tags: ["security", "identity", "agents", "oauth", "mcp"]
---

A support agent reads a customer ticket, decides the refund is legitimate, and calls the
payments API. The call succeeds. The token is valid, the scope is correct, and the agent
did exactly what it was built to do.

The problem is in the ticket. Somewhere in the body, an attacker wrote an instruction
that the model treated as part of its job: refund this account, then look up the saved
card on the other account and include the last four digits in the reply. The agent had
permission to do both, because the token it was issued carried the permissions of the
human who set it up, and that human could do both.

Nothing in that story is a model failure. It is an identity failure: one bearer token,
issued once, standing in for a workload, an agent, and a person at the same time. Your
IAM stack was built to answer "which service is this?" It has no clean way to answer
"which agent, acting for whom, for what purpose, right now?"

That question is the whole discipline of agent identity security, and most teams answer
it by accident.

## Key Takeaways

- Every agent call carries **three identities** — the workload, the agent, and the
  subject it acts for. A token that names one of them destroys attribution for the other
  two.
- **Delegation is not impersonation.** Use OAuth token exchange (RFC 8693) with an actor
  token and an `act` claim so downstream systems see both the agent and the user.
- **Audience binding** (RFC 8707) is the cheapest control available. One token per tool,
  validated on the server, makes a stolen credential useless everywhere else.
- **Issue credentials, don't store them.** Workload attestation, short lifetimes, and
  proof of possession beat a static secret in an environment variable.
- **Prompt injection is an identity attack.** The durable fix is a token that cannot do
  the thing, not a system prompt that says not to.
- Log **subject and actor on every call**, plus the agent version and the token ID. If
  you cannot answer "which agent did this for whom," you do not have an audit trail.

## The service account was built for a different question

A service account models a workload: a process that runs the same code, with the same
purpose, for a long time. The identity is a proxy for the deployment. That assumption
holds for a billing cron job. It breaks for an agent in three places.

**Behavior changes without a deploy.** A service account's permissions are reviewed
against code you can read. An agent's effective behavior is a function of its prompt,
its retrieved context, its tools, and the model version. Three of those can change
without a new principal, a new review, or a new approval.

**One identity fans out across tools.** A single agent commonly holds a CRM token, a
ticketing token, a warehouse credential, and an MCP connection. If those are all the
same principal with a union of scopes, the least-privileged tool in the set now sets the
blast radius for all of them.

**The credential outlives the task.** Static API keys and long-lived refresh tokens are
still the default integration pattern. They are also the easiest thing to exfiltrate,
because they sit in environment variables, config maps, and logs, and they keep working
after the agent that used them is retired.

The practical consequence: you cannot secure an agent by narrowing a service account.
You need a principal whose authority can be derived per task, per call, and per
delegation.

## Three identities in every call

Break an agent request into the parties that actually matter, and the design questions
get specific.

| Identity | Answers | Typical failure when it is missing |
|---|---|---|
| **Workload** | What code and infrastructure is running? | A compromised pod reuses a stolen credential from anywhere |
| **Agent** | Which agent, which version, which configuration? | You cannot attribute a bad action to a model or prompt revision |
| **Subject** | On whose authority is it acting? | The audit log shows a service account and no human |

Most production tokens collapse all three into one `sub` claim, usually the service
account. The result is a log line like `svc-agent-prod performed refund`. That sentence
is true and useless. It cannot tell you whether the refund was requested by a customer,
triggered by a support workflow, or invented by a model reading a malicious ticket.

The fix is a composite credential. The workload proves what it is; the authorization
server issues a token that names the agent as the actor and the user (or system) as the
subject; the downstream API validates both, plus the audience. Each party keeps its own
identity instead of borrowing one.

This is the same distinction that shows up in the [Vertex AI agent platform's per-agent
SPIFFE
principals](/insights/vertex-ai-agent-builder-security), except the vendor-specific
version is a special case of a general model. You do not need a specific cloud to get the
shape right.

![Three source identities feed an authorization server that issues one token carrying subject, actor chain, audience, scope, and proof-of-possession. The resource server validates all five before the call runs.](/diagrams/agent-identity-three-principals.svg "Figure 1 — The workload and the agent prove who they are; the token records whose authority was borrowed and which resource it is for.")

## Delegation is not impersonation

OAuth 2.0 Token Exchange (RFC 8693) gives you two modes, and the difference is the one
that matters for agents.

**Impersonation** is what you get when you exchange a user's token for an agent token
without an actor token. The new token says "this is the user." Every downstream service
sees the user, and the agent vanishes from the record. It works, it is easy, and it makes
incident response guess.

**Delegation** is what you get when the exchange includes an `actor_token`. The issued
token keeps the user as the subject and adds an `act` claim naming the agent. The `act`
claim is structured, so a chain of agents produces nested claims rather than a flat
string:

```json
{
  "sub": "user:8412",
  "act": {
    "sub": "agent:support-triage",
    "act": { "sub": "agent:orchestrator" }
  },
  "aud": "https://payments.internal/api",
  "scope": "refunds:create",
  "exp": 1762089600
}
```

Two details in that payload are worth building around.

The **`may_act` claim** (RFC 8693, section 4.4) lets the authorization server state which
actors are allowed to act for a subject. That turns "the agent can do anything the user
can" into a policy decision you can review, test, and revoke.

The **narrowing rule** is what keeps a chain from becoming a privilege escalator. Each
exchange should reduce authority: fewer scopes, one audience, a shorter lifetime, a lower
transaction limit, or a stronger approval requirement. If a hop widens any of those,
you have built a confused deputy with extra steps.

One anti-pattern appears in nearly every MCP integration I review: token passthrough.
The client sends its token to the MCP server, and the server forwards the same token to
the upstream API. The MCP specification now forbids this explicitly. The server must
obtain its own token for the upstream resource, because the token it received was issued
for the MCP server and nothing else.

![A delegation chain on the left shows authority narrowing at each hop with a new audience and scope. A passthrough chain on the right shows one broad token copied through every hop, with no actor claim and a thirty-day expiry.](/diagrams/agent-delegation-chain.svg "Figure 2 — Delegation keeps a record and shrinks the blast radius. Passthrough makes every hop indistinguishable and every tool reachable from one leak.")

## Audience binding is the cheapest control you are not using

If you only do one thing after reading this, do audience binding.

Resource Indicators for OAuth 2.0 (RFC 8707) let the client tell the authorization server
which resource the token is for, and the server puts that resource in the audience. The
resource server then rejects any token that was not issued for it. RFC 9068 puts the same
requirement in the JWT access token profile: validate `aud`, not just the signature.

The current MCP authorization spec (2026-07-28) makes this mandatory in both directions.
Clients must send the `resource` parameter on authorization and token requests. Servers
must validate that the token was issued specifically for them, and must reject tokens
issued for other resources. The spec is blunt about the reason: a server that accepts
foreign tokens lets an attacker use a token from a low-value integration against a
high-value one.

That failure is common because generic audiences are convenient. A token with
`aud: "api"` or `aud: "internal"` will validate against half your estate. The test is
simple and worth running this week:

1. Take a token minted for tool A.
2. Replay it against tool B.
3. If tool B returns anything other than `401`, your audience check is decorative.

Per-tool audiences also change what a leak costs. A token stolen from a log line is
useless outside the one service it was minted for, and it expires in minutes. That is a
much better failure mode than a credential that works everywhere until someone rotates
it.

## Credentials should be issued, not stored

The strongest identity control is the one that never sits on disk. For workloads, that
means attestation: the platform proves what is running, and an identity provider issues a
short-lived credential in response.

SPIFFE is the clearest expression of the pattern. A workload gets a SPIFFE ID, a URI-shaped
name that is stable across restarts, and an SVID that is short-lived and rotated
automatically. The workload does not hold a password; it proves its identity through the
platform and receives a credential. The IETF WIMSE working group is standardizing the
same primitives for multi-system environments, and the current AIMS draft composes WIMSE,
SPIFFE, and OAuth rather than inventing a fourth protocol.

For the agent layer, three properties matter more than the specific technology:

- **Proof of possession.** Sender-constrained tokens (mTLS or DPoP, RFC 9449) mean a
  stolen token is not enough on its own. Bearer tokens are bearer tokens.
- **Short lifetimes.** Minutes, not days, for access tokens. Refresh material stays in a
  vault outside the agent's execution context, so a prompt that convinces the model to
  print its environment cannot print a long-lived secret.
- **Zero standing privilege.** Access is granted for a task and expires with it. The agent
  starts with no authority and earns it per call.

There is a lifecycle trap here that the [Vertex
post](/insights/vertex-ai-agent-builder-security) covers in detail: when identity is
bound to the deployment, a redeploy creates a new principal, and IAM bindings do not
follow automatically. Blue-green rollouts and Terraform applies can silently strip an
agent's access, or worse, leave the old principal alive. Treat "new principal" as a deploy
event with an owner, a purpose, and a revocation date.

## Prompt injection is an identity attack

The comfortable framing is that prompt injection is a model robustness problem, and that
a better system prompt or a classifier will fix it. The uncomfortable framing is that the
model cannot reliably distinguish instructions from data, and no amount of instruction
hierarchy changes that.

So design as if the model will eventually follow attacker text. Ask what the token
allows at that moment. If the answer is "issue a refund to any account," the injection
succeeds regardless of the wording. If the answer is "issue a refund up to the amount on
this specific order, to the original payment method, for this authenticated customer,"
the injection has nowhere to go.

That is the confused deputy problem, named in 1988 and still the right lens. The agent is
a deputy with authority; the attacker cannot use that authority directly, so it tricks
the deputy into using it. The defense is not better judgment. It is narrower authority.

Three controls do most of the work:

- **Fine-grained authorization.** Rich Authorization Requests (RFC 9396) let the
  delegation carry structured detail: amount, merchant, account, resource. The
  authorization server can then enforce "refund up to $50 for order 8821" instead of a
  scope string that means "refunds."
- **Step-up approval.** For high-risk actions, require a backchannel approval (CIBA) from
  the human before the call executes. The agent can propose; the person authorizes. This
  is the identity-layer version of human-in-the-loop, and it produces an audit record of
  the approval itself.
- **Egress constraints.** An agent that can only reach registered tools cannot be talked
  into calling an attacker's endpoint. Allowlist destinations at the network or gateway
  layer, not in the prompt.

None of these make injection impossible. They make the successful version boring: the
agent tries something it was never authorized to do, the call fails, and the attempt is
in the log.

## Agents calling agents

Multi-agent systems add a hop where authority quietly widens. An orchestrator with broad
access spawns a specialist agent, and the specialist inherits the orchestrator's token
because passing it through is the shortest path to working code.

The rule is the same as delegation between services: authority narrows at every hop. A
sub-agent should get its own principal, its own audience, its own scope, and a lifetime
bounded by the task. The orchestrator's identity belongs in the nested `act` chain, not in
the sub-agent's permission set.

Two operational details are easy to miss:

- **Depth limits.** Cap the delegation chain and reject tokens with more than a few
  nested `act` claims. Unbounded chains are how a low-privilege entry point reaches a
  high-privilege tool.
- **Per-hop audiences.** The token the orchestrator uses to call the sub-agent is not the
  token the sub-agent uses to call the database. Each hop gets a token for its own
  destination.

If your framework passes one token through the whole graph, you have built a single
principal with the union of everyone's permissions and the attribution of nobody.

## What to log, and what to alert on

Identity controls are only as good as the record they leave. For every agent action,
capture:

| Field | Why it matters |
|---|---|
| `sub` (subject) | The human or system whose authority was used |
| `act` (actor chain) | Which agent, and which orchestrator above it |
| Agent version and prompt version | Attribution when behavior changes |
| `aud` | Which resource the token was actually for |
| `jti` and issue time | Replay detection and token lifetime analysis |
| Delegation event | Who approved this authority, and when |
| Policy decision | Allow, deny, or step-up, with the rule that fired |

Then alert on the patterns that indicate identity abuse rather than model weirdness:

- A token presented to a resource other than its audience.
- The same `jti` used by two different workloads.
- A subject/actor pair that has never appeared before for a high-risk action.
- Scope or audience widening at any hop in a chain.
- A new principal minted without a corresponding deploy record.
- A spike in denied calls from one agent, which is often injection probing.

Your existing SIEM will ingest these if you emit them as structured events. The [SOC
integration
guide](/insights/ai-powered-security-agents) covers the pipeline side: agent actions
should be first-class security events with the same retention and review as human
actions.

## A control set, in the order I would build it

| Order | Control | Standard or mechanism | Failure it prevents | Test |
|---|---|---|---|---|
| 1 | Inventory every agent and its owner | Registry with owner, purpose, risk tier | Unknown agents with standing access | Can you list every principal that can call your payment API? |
| 2 | Workload identity with attestation | SPIFFE/SPIRE, WIMSE | Stolen static secret used from anywhere | Does a credential work outside its workload? |
| 3 | Delegation with an actor chain | RFC 8693, `act`/`may_act` | Actions attributed to the user only | Does the log show both user and agent? |
| 4 | Audience binding per tool | RFC 8707, RFC 9068, RFC 9728 | Token replay across services | Does tool B reject tool A's token? |
| 5 | Short-lived, sender-constrained tokens | DPoP (RFC 9449), mTLS, vault | Long-lived credential exfiltration | Can a leaked token be replayed after expiry? |
| 6 | Per-action authorization | RAR (RFC 9396), policy engine | Prompt injection spending real money | Can the agent exceed the order amount? |
| 7 | Step-up for high-risk actions | CIBA, approval workflow | Irreversible action without a human | Is there an approval record? |
| 8 | Destination allowlist | Gateway, egress policy, MCP registry | Calls to unregistered tools | Does an unknown URL fail closed? |
| 9 | Structured audit and alerts | SIEM events, token telemetry | Undetected authority abuse | Can you reconstruct one action end to end? |

The order is deliberate. Each control depends on the ones above it. Audience binding is
useless if you cannot tell which agent is calling, and per-action authorization is
useless if the token has already been replayed somewhere else.

## Failure modes worth designing against

- **The shared super-agent.** One principal with tokens for every system, used by every
  workflow. Convenient for a demo, impossible to review, and the first thing an attacker
  looks for.
- **The immortal refresh token.** Access tokens expire in minutes; the refresh token in a
  config map lasts until someone remembers it exists. Revocation has to be a real
  operation, not a quarterly cleanup.
- **The impersonation shortcut.** Exchanging the user's token for the agent without an
  actor claim. Everything works, and every audit query returns the wrong answer.
- **The pass-through MCP server.** Validating the inbound token but forwarding it
  upstream. The spec forbids it, and it converts one compromised integration into
  several.
- **The rebinding gap.** Identity tied to a deployment, with IAM bindings that do not
  survive the next rollout. Access disappears silently, or the old principal lingers.
- **The approval that never fires.** Step-up configured for a threshold the workflow
  never reaches. Test it with a real transaction, not a unit test.

## Where to start on Monday

1. Pick one agent that can move money, change data, or contact customers.
2. Write down its three identities: workload, agent, subject. If you cannot fill in the
   subject column, that is the first project.
3. Mint a token for one tool only, and make the tool reject everything else. Replay test
   it.
4. Cut the access token lifetime to minutes and move refresh material into a vault.
5. Add subject and actor to your structured logs, then run one real action and read the
   record end to end.
6. Only then add per-action limits and step-up approval.

You do not need a new identity provider to start. Most teams already own the pieces:
OAuth, a policy engine, a secrets vault, and a SIEM. What is missing is the decision that
an agent is a principal with its own lifecycle, not a feature attached to a human account.

The security industry has a name for this now: non-human identity. The OWASP Non-Human
Identity Top 10 and the Agentic Applications Top 10 both cover the failure patterns, and
the CoSAI Agentic IAM paper lays out an enterprise model that maps closely to the control
set above. Read them before you buy a product that claims to solve it.

## Further reading

- [RFC 8693 — OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693)
- [RFC 8707 — Resource Indicators for OAuth 2.0](https://www.rfc-editor.org/rfc/rfc8707)
- [RFC 9728 — OAuth 2.0 Protected Resource Metadata](https://www.rfc-editor.org/rfc/rfc9728)
- [MCP Authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)
- [SPIFFE concepts](https://spiffe.io/docs/latest/spiffe-about/spiffe-concepts/)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)

## Frequently Asked Questions

### Is an AI agent just a service account?

No. A service account models a workload whose behavior is fixed by its deployment. An
agent's behavior changes with prompts, retrieved context, tools, and model versions, often
without a deploy. The identity has to carry the agent and the delegated subject, not only
the workload.

### Should an agent ever impersonate a user?

Rarely, and never by default. Impersonation makes the agent invisible in downstream
logs, so you lose the ability to answer which agent did what. Delegation with an `act`
claim gives you the same functional access while keeping both parties in the record.

### Do I need SPIFFE to secure agent identity?

No. SPIFFE is one implementation of workload identity and attestation. The requirements
are the properties: a verifiable workload identity, short-lived credentials, proof of
possession, and audience binding. You can meet them with cloud workload identity, mTLS,
and a standards-based authorization server.

### What is the single biggest agent identity risk?

Shared, long-lived authority. An agent running as a service account with broad scopes, a
static secret, and no audience restriction is the compound failure behind most of the
scenarios in this post. Fixing that one pattern removes several others at once.

### How do I audit an agent's action?

Log the subject, the actor chain, the token audience and ID, the agent version, and the
policy decision that allowed the call. One action should produce a record that names the
human, the agent, the resource, and the approval, and that record should live as long as
the equivalent human action would.

## The short version

Agent identity security is the discipline of making authority explicit: who the workload
is, which agent is acting, whose authority it borrowed, which resource the token is for,
and when all of that expires. The model is the part everyone evaluates. The token is the
part that decides what happens when the model is wrong.

Start with audience binding and delegation, because they are cheap, standards-based, and
they turn a single stolen credential into a failed request instead of an incident. Then
shorten lifetimes, add per-action limits, and put the whole thing in the audit pipeline.

If you are designing this for a regulated deployment and want a second opinion on the
authority model before you build, [the engagement model](/services) is where we usually
start.
