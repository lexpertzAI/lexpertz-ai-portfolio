---
type: campaign
status: draft
channels: [linkedin, x]
start: 2026-11-02
end: 2026-11-13
owner: Owadokun Tosin Tobi
goal: qualified conversations
---

# Authority, not autonomy — first campaign

Two weeks of founder-led posts built from the three published insights. The through-line: the gate on an AI system is authority and verification, not model quality.

## Brief

**Audience:** CTOs, Heads of AI/Data, and security leads at document-heavy companies. People who have a pilot that works in demos and has to survive a review.

**Goal:** three qualified conversations (contact form or DM) and a measured baseline for social. Not follower growth.

**Voice:** founder's, first person, technical. Evidence over adjectives. The posts should read like an engineer's notes, not a company account.

**Channels:** LinkedIn primary (founder profile, company page reshares), X secondary (same claims, compressed). No Instagram, TikTok, or Facebook: the buying audience is not there and there is no video capacity this cycle.

**Capacity assumed:** 2 hours per week for writing and scheduling, 30 minutes per weekday for engagement.

## Assumptions to confirm

- Posting from the founder profile (`@TosinOwadokun`), with the company page resharing. If it is company-page-first, the hooks need less first person.
- Manual posting this cycle. TryPost is deferred until the campaign has results (`docs/decisions/0001-trypost-as-scheduler.md`); no scheduler is connected.
- The offer in the final post is the two-week AI Proof Audit, fixed price, ranked gap list. Confirm that is what you want to sell.
- No audience baseline exists yet, so week one is a baseline, not a test.

## Pillars

| Pillar | Share | What it looks like |
|---|---|---|
| The proof gap | 40% | Auditability, evidence, governance as a performance system |
| Authority and agent identity | 25% | What an agent may observe, recommend, change; tool surface; principals |
| Regulatory reality | 15% | What the EU AI Act actually requires now, after the Omnibus |
| Build notes | 15% | Sentinel, Spectre, Axiom: numbers and what did not work |
| Offer | 5% | One CTA: the two-week proof audit |

## Calendar

| Date | LinkedIn | X | Notes |
|---|---|---|---|
| Mon Nov 2 | L1 authority boundary | X1 single | Link to the security post in the first comment |
| Tue Nov 3 | none | X2 single | 20 min engagement only |
| Wed Nov 4 | L2 tool surface | X3 single | |
| Thu Nov 5 | none | X4 single | |
| Fri Nov 6 | L3 Vertex principals | X5 thread (5 posts) | Highest-value technical post of week one |
| Mon Nov 9 | L4 the proof gap | X6 single | 78% stat, links to the audit |
| Tue Nov 10 | none | engagement | |
| Wed Nov 11 | L5 regulatory reality | X7 Sentinel | Correct the August 2026 deadline story |
| Thu Nov 12 | none | engagement | |
| Fri Nov 13 | L6 proof audit offer | X8 single | CTA to `/contact` with UTMs |

## Publishing (manual)

Post from the founder profile. The company page reshares 30–60 minutes later, without edits.

- **Time:** 13:30 UTC on posting days. That is mid-afternoon in the UK and EU, morning in the US east coast. Do not post after 18:00 UTC; the US is asleep and the EU is offline.
- **Links:** body copy stays clean. Paste the matching link from the table below as the first comment within a minute of publishing.
- **X:** links can stay inline; each post is written for the 280-character limit.
- **Record it:** after publishing, add the date and URL to the checklist so the review has something to compare.

| Post | Date | Published | URL |
|---|---|---|---|
| L1 | Mon Nov 2 | [ ] | |
| L2 | Wed Nov 4 | [ ] | |
| L3 | Fri Nov 6 | [ ] | |
| L4 | Mon Nov 9 | [ ] | |
| L5 | Wed Nov 11 | [ ] | |
| L6 | Fri Nov 13 | [ ] | |

If a post is edited at publish time, edit this file too. The next cycle should not inherit a version that never ran.

## LinkedIn drafts

### L1 — Monday Nov 2

The first time an AI agent closes a ticket on its own, you find out how much of your incident process lived in people's heads.

An alert arrives. The agent correlates it against asset inventory and recent deploys, writes an assessment, resolves it as a false positive. Nothing breaks. Two weeks later it resolves a real one the same way.

The model was never the problem. The authority model was.

Four decisions we make before writing a prompt:

- What the agent may observe.
- What it may recommend.
- What it may change.
- What must page a human, every time.

Then the agent's actions go into the same SIEM pipeline as a human analyst's, with the same retention and audit requirements. If it cannot be audited like a person, it should not act like one.

One more: a read-only agent that can call a ticketing API is not read-only. The tool registry is the attack surface.

Full architecture writeup in the comments.

**Media:** `marketing/assets/linkedin/renders/l1.gif` — animated authority model (1080×1350).

---

### L2 — Wednesday Nov 4

"A read-only agent" is a label, not a permission.

If it can call your ticketing API, it can close tickets. If it can query your asset inventory, it can enumerate your estate. Both happen through tools you granted, under a name you chose.

Three checks before the next agent ships:

1. List every tool and the worst action each one allows.
2. Give the agent a principal that can do only those actions, not the service account it inherited.
3. Log the call and the result the same way you log an analyst's action.

The prompt is the last thing to tune. The tool surface is the first.

**Media:** `marketing/assets/linkedin/renders/l2.gif` — animated tool-surface card (1080×1350).

---

### L3 — Friday Nov 6

Redeploying a Vertex AI agent creates a new SPIFFE principal. Your IAM bindings are not inherited.

That sentence is buried in the docs and it breaks rollouts quietly. Blue-green deploy, new principal, no access, and the error looks like a permissions bug rather than a design property.

Three things I would put in an assessment of a Vertex agent estate:

- Every agent has its own principal, bound through the default Context-Aware Access policy.
- The deploy pipeline re-binds identity after every rollout, not just the first.
- Preview models are excluded from the security controls. That single line can invalidate a compliant design.

Default deny is the architecture. Identity is the control everything else keys off.

Full writeup in the comments.

---

### L4 — Monday Nov 9

78% of executives are not confident they could pass an AI governance audit in 90 days.

That is from Grant Thornton's 2026 survey of 950 leaders. The same survey found 46% name governance failures as a leading cause of underperformance, and only 20% have a practiced response plan for an AI failure.

The missing piece is evidence. Most teams can show a demo. Few can show what the system did, under whose identity, against which test.

Three questions an audit will ask:

- Which system made this decision, and whose credentials did it use?
- What did it retrieve, and does the citation actually support the claim?
- Which test would fail if the model got worse tomorrow?

If any of those take a week to answer, that is the work.

We run a two-week proof audit that ends with a ranked gap list. No retainer required.

---

### L5 — Wednesday Nov 11

If your compliance calendar still says August 2026 for high-risk AI, it is out of date.

The EU's Digital Omnibus on AI was approved by the Council on 29 June 2026 and entered into force on 27 July. Standalone high-risk obligations now apply from 2 December 2027. Systems embedded in regulated products move to 2 August 2028.

What did not move: general application and transparency duties still begin 2 August 2026.

The practical effect for a mid-market firm:

- The deadline moved; the evidence requirement did not.
- You have 13 more months to build audit-grade records. Spend them on the trail, not on postponement.
- A vendor quoting the old date tells you how closely they read the file.

Sources are in the comments.

---

### L6 — Friday Nov 13

Three AI pilots, same failure. The demo worked.

What broke each one was upstream of the model:

- Write access the agent never needed.
- No answer set it had to reproduce.
- No evidence trail when someone asked how a decision was made.

We run a two-week AI Proof Audit for teams in that position. It produces a system inventory with an authority model for each agent, eval coverage mapped to the decisions that matter, and a ranked gap list you can hand to a board or an auditor.

Fixed scope, fixed price, no retainer. If the gaps are small, you will know in two weeks.

Details in the comments.

## X drafts

### X1 — Monday Nov 2

The first time an AI agent closes a ticket on its own, you learn how much of your incident process lived in people's heads.

Decide what it may observe, recommend, and change before you write a prompt.

### X2 — Tuesday Nov 3

"A read-only agent" is a label, not a permission.

If it can call your ticketing API, it can close tickets. Check the tool registry before the prompt.

### X3 — Wednesday Nov 4

Rank agent plugins by tokens removed, not features added.

Context7 replaces pasted docs. Serena replaces type guessing. Everything else is a permission decision and a context cost.

### X4 — Thursday Nov 5

A wrong agent fails at tickets per minute, not tickets per day.

Design for that rate before you expand autonomy.

### X5 — Friday Nov 6 (thread)

1/ Redeploying a Vertex AI agent creates a new SPIFFE principal. IAM bindings are not inherited. That one property breaks blue-green rollouts quietly.

2/ The control plane is four components: Agent Identity, Agent Registry, Policies, Agent Gateway. The default is deny.

3/ Each agent gets its own principal, bound to mTLS and DPoP through Context-Aware Access. Everything else keys off that identity.

4/ Two gaps the docs keep on separate pages: RAG Engine supports VPC-SC but not CMEK or residency. Vector Search supports residency but not CMEK.

5/ And preview models are excluded from the security controls entirely. If your design depends on one, the rest of the posture does not apply.

6/ Full assessment: https://www.lexpertzai.cc/insights/vertex-ai-agent-builder-security?utm_source=x&utm_medium=social&utm_campaign=authority-not-autonomy&utm_content=x5-thread

### X6 — Monday Nov 9

78% of executives are not confident they could pass an AI governance audit in 90 days.

The missing piece is evidence: what the system did, under whose identity, against which test.

### X7 — Wednesday Nov 11

Sentinel flags drift above 2.5 sigma, then writes its own root-cause report in under 500ms.

The metric that matters: how long a human spends reconstructing the incident. Afternoon to minutes.

https://www.lexpertzai.cc/case-studies/sentinel-mlops

### X8 — Friday Nov 13

A pilot that demos well and fails review usually has write access it never needed and no answer set it must reproduce.

We audit exactly that in two weeks, fixed scope. https://www.lexpertzai.cc/contact?utm_source=x&utm_medium=social&utm_campaign=authority-not-autonomy&utm_content=x8-offer

## Comment links (UTM-tagged)

Post these as the first comment on the matching LinkedIn post, not in the body. LinkedIn discounts reach on posts with external links.

| Post | Link |
|---|---|
| L1 | `https://www.lexpertzai.cc/insights/ai-powered-security-agents?utm_source=linkedin&utm_medium=social&utm_campaign=authority-not-autonomy&utm_content=l1-authority` |
| L3 | `https://www.lexpertzai.cc/insights/vertex-ai-agent-builder-security?utm_source=linkedin&utm_medium=social&utm_campaign=authority-not-autonomy&utm_content=l3-vertex` |
| L4 | `https://www.lexpertzai.cc/contact?utm_source=linkedin&utm_medium=social&utm_campaign=authority-not-autonomy&utm_content=l4-proof-gap` |
| L5 | External primary sources: Council press release (29 Jun 2026) and European Commission "AI Omnibus enters into force" (27 Jul 2026). No UTM. |
| L6 | `https://www.lexpertzai.cc/contact?utm_source=linkedin&utm_medium=social&utm_campaign=authority-not-autonomy&utm_content=l6-offer` |

## Engagement

30 minutes per weekday, in this order:

1. Reply to every comment on the day's post.
2. Comment on 5 posts from target accounts. Add a specific technical point, not agreement.
3. Reshare one post with a sentence of added context.
4. Send 2 connection requests to people who engaged with a technical post.

Target account categories, not a fixed list: AI evaluation vendors (Arize, Galileo, Promptfoo, LangSmith), agent infrastructure (LangChain, Vellum), security vendors shipping AI features (Snyk, Wiz), and platform engineering accounts at companies with public AI programs.

## Measurement

**Before day one:** the analytics dispatcher has no sink. `track()` runs and returns. Add Vercel Analytics (`@vercel/analytics` plus `<Analytics />` in `src/app/layout.tsx`) or a GTM container, otherwise there is no click data beyond LinkedIn and X native stats.

**UTM convention:** `utm_source=linkedin|x`, `utm_medium=social`, `utm_campaign=authority-not-autonomy`, `utm_content=<post-id>`.

**Weekly review, same day each week:**

| Metric | Source | Target by Nov 13 |
|---|---|---|
| Impressions per post | native | baseline only |
| Engagement rate | native | baseline only |
| Profile visits | native | baseline only |
| Link clicks | Vercel or GA4 | 25 total |
| DMs or form submissions | manual | 3 conversations |

**Decision rule:** if two posts land under 2% engagement, change the hook format before changing the topic. If clicks are low but impressions are fine, the link placement is the problem.

## After the run

Write results into this file under a `## Results` heading, set `status: reviewed`, and note which hook style to repeat. A campaign with no written result cannot be improved.

## What I need from you

1. Confirm founder profile vs company page as the primary account.
2. Confirm the CTA: two-week AI Proof Audit, fixed price, or a different offer.
3. Confirm the manual schedule (13:30 UTC, Mon/Wed/Fri) or move it.
4. Approve week one before anything goes out.
