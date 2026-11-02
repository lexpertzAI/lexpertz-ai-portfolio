---
title: "Enterprise RAG Solutions for Knowledge Management, Compared"
summary: "A 2026 shortlist grouped by what you're actually buying, plus the permission, freshness, and evaluation tests that decide the choice."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-11-02"
category: "Architecture"
coverImage: "/insights/enterprise-rag-solutions.png"
tags: ["rag", "enterprise-search", "knowledge-management", "procurement", "architecture"]
---

Every RAG pilot passes the same demo. An employee asks a policy question, the system
retrieves the right paragraph, cites it, and the room nods. Then a contractor asks a
question whose answer lives in a document they were never given access to, and the system
answers that one too.

The retrieval was good. The permission model was missing. The index had been built with a
service account that could read everything, and the query path never asked who was asking.

That is the decision in front of most buyers in 2026, and it is not primarily a model
decision. This guide separates the market into the layers buyers keep conflating, names
the platforms worth a pilot, and gives you the tests that separate a demo from a system.

## Key Takeaways

- **"RAG platform" describes at least three products**: a finished knowledge assistant, a
  retrieval service you build on, and a framework you operate. Compare within a layer.
- **The names changed under you.** Amazon Q Business closed to new customers on July 31,
  2026. Vertex AI Search became Agent Search in April 2026. LlamaCloud is now LlamaParse.
  Microsoft 365 Copilot is now Microsoft Copilot. A 2025 comparison is a liability.
- **Permission fidelity is the gating criterion**, not answer quality. Test with four
  personas, including one who has left the company.
- **Connector count is marketing; permission-sync coverage is the product.** Ask which
  connectors enforce source ACLs and how often those ACLs refresh.
- **Deletion and revocation propagation define your real risk window.** A document can be
  gone from SharePoint and still answer questions from the index for weeks.
- **Measure abstention and citation support**, not just how good the answers sound. A
  system that answers everything is not ready for knowledge management.

## The layer question comes before the vendor question

Most "best enterprise RAG" lists are unusable because they rank a chat assistant against
an indexing API against a Python framework. Those products do different jobs and are not
substitutes.

| Layer | What you are buying | Examples |
|---|---|---|
| **Knowledge assistant** | A finished product for employees: connectors, index, answers, UI, permissions | Microsoft Copilot, Gemini Enterprise, Amazon Quick Suite, Glean, Cohere North, Writer |
| **Retrieval platform** | Index, ranking, grounding APIs. You build the product and the UX | Azure AI Search (Foundry IQ), Agent Search, Bedrock Knowledge Bases, Vectara, LlamaParse |
| **Framework or self-hosted** | Code and operational control. You own the whole system | Onyx, RAGFlow, Haystack, LlamaIndex, Elasticsearch |

A vector database is not on that list. Pinecone, Weaviate, Qdrant, and pgvector are
storage and similarity engines. They do not ingest SharePoint, mirror ACLs, or decide when
to abstain. They are components inside the second and third layers, and buying one is not
buying a knowledge-management solution.

![Three layers of the RAG market: knowledge assistants, retrieval platforms, and frameworks, each with the work the buyer still owns](/diagrams/rag-market-layers.svg "Figure 1 — The higher the layer, the more you buy and the less you operate. The mistake is comparing across layers.")

The practical consequence: decide whether you are buying an outcome (employees get
answers), a capability (your application gets grounded retrieval), or a foundation (your
team owns the pipeline). Then shortlist only within that layer.

## The shortlist, grouped by fit

Ten platforms are worth a serious pilot in late 2026. This is not a ranking. A product
that wins for a Microsoft-heavy insurer is wrong for an air-gapped defense contractor, and
both are wrong for a startup with 4,000 documents and one engineer.

| Platform | Layer | Best fit | Deployment |
|---|---|---|---|
| **Microsoft Copilot** | Assistant | Knowledge already concentrated in Microsoft 365 | Microsoft 365 cloud |
| **Gemini Enterprise** | Assistant | Google Workspace and Google Cloud estates | Google Cloud |
| **Amazon Quick Suite** | Assistant | AWS-standardized organizations | AWS |
| **Glean** | Assistant / search | Fragmented SaaS stack, cross-app search is the goal | Cloud; Dell-managed private option |
| **Cohere North** | Assistant | Regulated or air-gapped deployments | SaaS, VPC, on-prem, air-gapped |
| **Writer** | Assistant / knowledge graph | Governed content workflows and agentic writing | Cloud |
| **Sinequa** | Search / RAG platform | Large regulated estates with hybrid or on-prem needs | Cloud, hybrid, on-prem |
| **Azure AI Search (Foundry IQ)** | Retrieval | Teams building on Azure and Microsoft Foundry | Azure |
| **Vectara** | Retrieval / RAG-as-a-service | Faithfulness-first applications, including air-gapped | SaaS, VPC, on-prem, air-gapped |
| **Onyx** | Open-source assistant | Self-hosted or air-gapped search with control | Self-hosted, cloud |

### Suite-native assistants

**Microsoft Copilot** is the default when most institutional memory sits in Outlook, Teams,
SharePoint, and OneDrive. It grounds answers in Microsoft Graph and reaches third-party
content through more than 100 prebuilt Copilot connectors. Microsoft renamed the paid
product from Microsoft 365 Copilot to Microsoft Copilot in August 2026, and in October
began labelling the subscription as an add-on to a qualifying Microsoft 365 plan. The
product is strongest where the graph is strongest; if half your knowledge lives in Notion,
Confluence, and Slack, you are extending it rather than getting it for free.

**Gemini Enterprise** is Google's equivalent play, with Agent Search (formerly Vertex AI
Search) providing the retrieval and grounding layer. It fits organizations already on
Workspace and Google Cloud, and the Agent Search component is available separately if you
are building your own application. Google no longer publishes a public starting price for
Gemini Enterprise, so budget from a quote rather than a list price.

**Amazon Quick Suite** is the successor to Amazon Q Business. That detail matters:
Amazon's documentation says Q Business stopped accepting new customers on July 31, 2026,
and points new work to Quick Suite. Existing Q Business customers can keep the service or
reuse their Q index in Quick Suite. If a vendor briefing or a listicle still recommends
starting on Q Business, the recommendation is out of date.

### Cross-application assistants and search

**Glean** defined the connector-first category and remains the reference implementation
for cross-app search. Glean claims 275+ connectors and builds a knowledge graph over the
index, which is why it handles fragmented stacks better than suite-native tools. It is
custom-priced, cloud-first, and offers a Dell-managed private deployment rather than a
self-serve on-prem install. The trade-off is cost and implementation time, not capability.

**Cohere North** is the strongest fit when the deployment model is the deciding
constraint. North 2, released in October 2026, runs SaaS, in a VPC, on-prem, or fully
air-gapped, with connectors to Google Drive, SharePoint, Slack, Salesforce, and MCP
servers, plus per-agent guardrails. It is an assistant and agent platform, not a
general-purpose search engine, so evaluate it against your top 20 questions rather than a
connector checklist.

**Writer** pairs a Knowledge Graph with AI Studio, its control plane for models,
guardrails, observability, and spend. It is a better fit for governed content work
(policy, proposals, regulated drafting) than for "find anything anyone ever wrote." If
your primary use case is document Q&A across a messy estate, a search-first product will
usually beat it; if it is producing compliant deliverables, the graph and governance are
the point.

**Sinequa, now part of ChapsVision,** is the enterprise-search veteran in the group. It
claims 200+ connectors, more than 20 languages, and hybrid retrieval across vector,
keyword, graph, and structured data, with cloud, hybrid, and on-prem deployments. It is
built for large, regulated information estates and priced and implemented accordingly.
This is a platform you buy when connector depth and deployment control outweigh time to
value.

### Retrieval platforms

**Azure AI Search** is the retrieval engine underneath Microsoft Foundry. The branding
changed in 2026: Foundry IQ is the product name for the agentic knowledge experience, but
it is the same service, same resource provider, same API. It supports keyword, vector, and
hybrid search, a semantic ranker, and agentic retrieval through knowledge bases. It is the
right choice when you want Microsoft's identity and governance envelope but need to build
your own product on top.

**Vectara** is RAG-as-a-service with an unusual emphasis on verification. Its platform
includes hybrid retrieval, reranking, grounded generation, and HHEM, a factual-consistency
model that scores whether an answer is supported by the retrieved passages. It deploys as
SaaS, VPC, on-prem, or air-gapped, and holds SOC 2 Type II and HIPAA. If your buyers care
more about "prove it didn't make that up" than about connector breadth, it belongs on the
shortlist.

### Open source and self-hosted

**Onyx** is the open-source option that most often survives a security review. It indexes
40+ sources, enforces permissions at query time, and self-hosts down to air-gapped
installations. The catch is in the documentation: permission syncing is an Enterprise
Edition feature and is only available for a named subset of connectors (Confluence, Jira,
Google Drive, Gmail, Slack, Salesforce, GitHub, Box, SharePoint, Teams, Outlook, Zoom, and
YouTrack, at the time of writing). Everything else gets connector-level access, not
document-level enforcement. Read that list before you assume coverage.

### Also worth a pilot, depending on the constraint

- **Agent Search** if you are on Google Cloud and want the retrieval layer without the
  Gemini Enterprise seat.
- **Bedrock Knowledge Bases** if you are AWS-native and want managed ingestion and
  retrieval with IAM-native controls.
- **LlamaParse** (formerly LlamaCloud) if your corpus is PDF-heavy, scanned, or
  table-heavy. Its parsing and extraction are often the difference between a working index
  and a pile of bad chunks.
- **Elasticsearch** if you already run it. Note that Elastic deprecated the standalone
  Enterprise Search, App Search, and Workplace Search products in 9.0; the path forward is
  Elasticsearch itself, not the old turnkey layer.
- **RAGFlow** if you want deep document parsing and a self-hosted pipeline with visible
  chunks and citations.
- **Haystack** if you want a framework with an enterprise platform behind it.
- **Atlassian Rovo** if Jira and Confluence are where the work actually happens.

## The names changed; check the date on your comparison

Naming churn is not trivia. It changes what is for sale, what is supported, and whether a
migration is already underway. These are the renames that most often appear wrong in
current buyer guides.

| Old name | Current name | Date and consequence |
|---|---|---|
| Microsoft 365 Copilot | **Microsoft Copilot** | Renamed August 2026; subscription labels gained "(add-on)" in October 2026 |
| Azure AI Foundry | **Microsoft Foundry** | Renamed December 2025; Azure AI Search kept its name |
| Azure AI Search (agentic knowledge) | **Foundry IQ** | Product brand for the same Azure AI Search service and API |
| Vertex AI | **Gemini Enterprise Agent Platform** | 2026; resources kept working, branding did not |
| Vertex AI Search | **Agent Search** | Renamed April 22, 2026 |
| Agentspace | **Gemini Enterprise** | Renamed October 2025 |
| Amazon Q Business | **Amazon Quick Suite** | Q Business closed to new customers July 31, 2026 |
| LlamaCloud | **LlamaParse** | Hosted platform renamed; docs moved to LlamaParse |
| Elastic Enterprise Search | **Elasticsearch** | Enterprise Search, App Search, and Workplace Search deprecated in 9.0 |

Two practical rules. First, ask every vendor for the current product name and the SKU you
would actually buy. Second, when a comparison cites a product that no longer exists, treat
the rest of its facts as unverified.

## Permission fidelity is the gating test

Every platform in this guide claims permission-aware retrieval. The claims differ in three
places: how permissions get into the index, how fresh they are, and which connectors are
covered.

There are two enforcement models. **Mirrored ACLs** copy document permissions and group
memberships into the index, then filter at query time. It is fast and works offline, but
it drifts. **Query-time checks** call the source system to verify access before returning
a passage. It is more accurate and slower, and it fails when the source is unavailable.
Most enterprise products use a mirror with periodic refresh; the good ones expose the
refresh interval and a manual re-sync.

The failures are predictable:

- **Nested groups.** A user is in a group that is in a group that has access to a folder.
  The connector flattened one level.
- **External and guest shares.** A document was shared with a contractor for two weeks in
  2024. The ACL mirror still says yes.
- **"Anyone with the link."** The source system considers it public; the index considers
  it internal.
- **Deprovisioned users.** The identity provider removed the account, but a cached session
  or a stale group mapping still resolves.
- **Service-account indexing.** The crawler reads everything and the query path never
  substitutes the end user's identity. This is the failure from the opening paragraph.

![A four-by-five permission test matrix. Executives see the handbook, runbook, and executive memo; engineers see the handbook and runbook; contractors see only the contractor folder; departed employees see nothing. A revoked document is invisible to all four.](/diagrams/rag-permission-matrix.svg "Figure 2 — One admin account proves nothing. Any unexpected checkmark in the contractor or departed-employee rows is a failed pilot.")

Test it with people, not with an admin account. Build a small corpus with known ACLs:

| Persona | Should see | Should never see |
|---|---|---|
| Executive | Executive memo, team runbook, handbook | Nothing in the test set |
| Engineer | Team runbook, handbook | Executive memo |
| Contractor | One shared folder | Runbook, memo, handbook if not shared |
| Departed employee | Nothing | Everything |

Ask each persona a question whose answer exists in each document. Any answer from a
document they cannot open is a failed pilot, regardless of how good the rest of the demo
was.

## Freshness, deletion, and the index that will not forget

Permission drift is half the problem. The other half is time.

An index is a copy, and copies go stale. A document deleted in the source can remain
retrievable until the next prune cycle. A revoked share can keep working until the ACL
sync runs. A renamed page can produce a citation that no longer resolves. The vendor's
defaults tell you how big that window is. Onyx, for example, documents a 30-minute refresh
and a 30-day prune by default; other platforms are less explicit, which is itself a
finding.

Test the lifecycle, not just the query:

1. Upload a document, wait for indexing, confirm it answers.
2. Revoke one user's access at the source, then ask again as that user.
3. Delete the document, then ask again.
4. Move it to a different folder with different permissions, then ask again.
5. Rename it and check whether the citation still resolves.

Record the time between each change and the behavior change. That number belongs in your
risk register, not the vendor's feature matrix.

## What to measure in a two-week pilot

A pilot that only measures "did it answer?" will pass every product. Use a fixed corpus, a
fixed question set, and a scorecard agreed before the first demo.

**Corpus.** Five sources, around 10,000 documents, including scanned PDFs, a stale
policy, a contradictory pair of documents, and at least one document with a deliberately
restricted ACL.

**Questions.** Sixty total: twenty straightforward, twenty requiring synthesis across two
or three documents, ten whose answers are not in the corpus at all, and ten permission
traps where the correct answer differs by persona.

**Scorecard.**

| Metric | How to measure | Gate |
|---|---|---|
| Permission leaks | Persona tests against known ACLs | Zero |
| Revoked-document exclusion | Ask immediately after revocation, then after the stated sync SLA | 100% by the SLA |
| Abstention | Unanswerable questions | Agree a threshold; 100% is the right target for regulated work |
| Citation support | Sample 30 answers, check the cited passage actually supports the claim | ≥90%, or your own bar |
| Answer correctness | Golden set, human-scored | Agree in advance; 80% acceptable is a common starting point |
| Latency | p95 end-to-end, including retrieval | Set per use case |
| Cost per answered question | Seats + platform + tokens + ops, divided by answered questions | Compare like for like |
| Connector health | Failed syncs per week during the pilot | Trending to zero |

Two rules make the numbers honest. Do not let the vendor build the question set from the
documents the system already indexes; that tests retrieval against its own context. And
score the unanswerable questions first, because abstention is where most products reveal
whether they are a search engine with a chat wrapper or a grounded system.

If you want the harness we use for this, it is the same one behind [Evidence-Gated
RAG](/services/evidence-gated-rag): hybrid retrieval, line-level citations, and a
faithfulness gate that blocks answers below threshold.

## Pricing models, not price tags

List prices move, and enterprise contracts move more. Compare the shape of the cost, then
ask for a quote against your actual seat count and query volume.

| Platform | Pricing shape | What to watch |
|---|---|---|
| Microsoft Copilot | $30/user/month add-on on top of a qualifying Microsoft 365 plan; new no-base offers announced for December 1, 2026 | Seat cost dominates; included Copilot Chat and the paid Copilot experience differ in app integration and usage limits |
| Gemini Enterprise | Seat plus consumption; public starting price no longer published | Agent runs and query overages |
| Amazon Quick Suite | AWS usage-based and seat plans | Indexing, queries, and model tokens are separate lines |
| Glean, Sinequa, Writer, Cohere North | Custom quote, usually seats plus usage | Pilot scope, connector count, and deployment |
| Azure AI Search, Agent Search, Bedrock KB | Consumption: storage, queries, and model tokens | Reranking and generation can exceed retrieval cost |
| Vectara | Usage and enterprise contract | Ingestion, queries, and generation |
| Onyx | Free open-source core; paid Business and Enterprise | Engineering and operations are the real cost |

The number that matters is cost per answered question, not cost per seat. A $30 seat that
answers 40 questions a month is expensive; a consumption bill that answers 400,000 is not.
Model it before the pilot, then replace the estimate with measured usage.

## Failure modes worth designing against

- **Indexing as a superuser.** The crawler can read everything, so the index can answer
  everything. Fix the query path, not the crawler.
- **Permission sync at the connector level.** "The connector is private" is not
  document-level security. Confirm the source ACL is mirrored per document.
- **Buying the assistant before fixing the corpus.** RAG does not clean up contradictory
  policies. It retrieves them faster.
- **Evaluating with the answer in the prompt.** If the test question was written from the
  indexed document, you are measuring lookup, not reasoning.
- **Confusing search with answers.** A results page with snippets is a different product
  from a grounded answer with citations and abstention.
- **Ignoring connector maintenance.** Every connector is an integration with rate limits,
  schema changes, and an owner. Count the owners before you count the connectors.
- **Skipping deletion and retention.** An index that never forgets is a compliance
  problem, not a feature.

## A decision path

- **More than 70% of knowledge in Microsoft 365** → pilot Microsoft Copilot, then measure
  the third-party connectors you actually need.
- **Google Workspace and Google Cloud** → Gemini Enterprise, with Agent Search if you are
  building your own application.
- **AWS-native with engineering capacity** → Amazon Quick Suite for a packaged assistant,
  Bedrock Knowledge Bases for a retrieval layer you control.
- **Fragmented SaaS, non-technical users** → Glean if budget allows; Onyx if self-hosting
  and control matter more than polish.
- **Regulated, sovereign, or air-gapped** → Cohere North, Vectara, Sinequa, or Onyx.
- **Contracts, scans, and complex PDFs** → LlamaParse in front of your retrieval layer.
- **You want to own the pipeline** → Azure AI Search, Agent Search, or Elasticsearch, plus
  an evaluation harness and an owner for connector operations.
- **Atlassian-centric** → Rovo, before you buy a horizontal assistant.

## Where to start on Monday

1. Pick the layer. Write down whether you are buying an outcome, a capability, or a
   foundation.
2. List the five sources that hold the knowledge, and the identity provider that governs
   them.
3. Build the 60-question set, including ten unanswerable and ten permission-trap
   questions.
4. Recruit four test personas, including a contractor and a departed employee.
5. Run the permission matrix before you run the quality demo.
6. Only then compare answers, citations, latency, and cost on the same corpus.

The vendor that fails the permission matrix is out, no matter how good the demo felt. The
vendor that passes it but cannot abstain is a search engine with a chat interface. The one
that passes both is worth a contract.

## Further reading

- [Microsoft Copilot connectors overview](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/overview-copilot-connector)
- [Agent Search documentation](https://cloud.google.com/generative-ai-app-builder/docs)
- [Amazon Quick Suite](https://aws.amazon.com/quick/)
- [Azure AI Search and Foundry IQ](https://learn.microsoft.com/en-us/azure/search/whats-new)
- [Glean connectors](https://www.glean.com/connectors)
- [Onyx connector permissions](https://docs.onyx.app/admins/connectors/overview)
- [Vectara platform documentation](https://docs.vectara.com/docs/platform-architecture)
- [Cohere North](https://cohere.com/north)
- [Sinequa platform](https://www.sinequa.com/product/)
- [LlamaParse documentation](https://developers.llamaindex.ai/llamaparse/)

## Frequently Asked Questions

### What is the best enterprise RAG platform for knowledge management?

There is no single best. The right answer depends on the layer you are buying, where your
knowledge lives, and whether you need cloud, private, or air-gapped deployment. A
Microsoft-heavy organization should start with Copilot; a fragmented SaaS estate should
test Glean or Onyx; a regulated estate should test Cohere North, Vectara, or Sinequa.

### Is Microsoft Copilot a RAG platform?

It is a knowledge assistant that uses retrieval over Microsoft Graph and connected
content. You do not buy a separate retrieval layer, and you have limited control over
chunking, ranking, and evaluation compared with a retrieval platform. That is the trade:
less control, less integration work.

### Is Amazon Q Business still available?

Not for new customers. AWS documentation says Q Business stopped accepting new customers
on July 31, 2026, and directs new work to Amazon Quick Suite. Existing customers can
continue using Q Business or reuse their Q index with Quick Suite.

### Do these platforms really respect source permissions?

Most claim to, but the implementation differs by connector and by product tier. Ask three
questions: which connectors sync document-level ACLs, how often the sync runs, and what
happens to a user who has been deprovisioned. Then test it with the four-persona matrix
above. A vendor that cannot answer those questions in writing has not earned the pilot.

### Should we build or buy?

Buy when your sources are standard, your team is small, and time to value matters. Build
on a retrieval platform when your corpus or UX is unusual but you still want managed
infrastructure. Go fully self-hosted when data residency or air-gap requirements rule out
the managed options, and budget for the operations that come with it.

### How long should a pilot take?

Two weeks is enough if the corpus, questions, and personas are ready before the first
demo. Most pilots that run for months are really procurement processes or corpus-cleanup
projects wearing a pilot costume.

## The short version

The enterprise RAG market is three markets: assistants, retrieval platforms, and
frameworks. Pick the layer, then pick the vendor. Check the date on every product name,
because half the 2025 shortlist has been renamed or closed to new customers.

Then run the boring tests. Four personas against known ACLs. A deleted document. A
revoked share. Ten questions with no answer in the corpus. If the system passes those, the
answer quality conversation is worth having. If it fails them, the demo was never the
product.

If you are working through this on a document-heavy system and want a second opinion on
the architecture before you sign, [the engagement model](/services) is where we usually
start.
