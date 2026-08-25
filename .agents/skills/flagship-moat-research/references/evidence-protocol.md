# Evidence Protocol

Use this protocol for every claim that could change a product decision. A persuasive sentence is not evidence; record the source and the claim it supports.

## Claim Labels

| Label | Use only when | Example wording |
|---|---|---|
| **Verified** | A current primary source, live test, user-provided internal record, or reproducible dataset directly supports the claim. | “The official pricing page lists a five-project free-tier limit.” |
| **Derived** | The conclusion is calculated or normalized from cited source data with a transparent method. | “The table groups 18 cited competitor pages into three workflow types.” |
| **Inference** | The conclusion reasonably interprets evidence but is not directly stated by the source. | “This suggests the review step may be a friction point.” |
| **Hypothesis** | The idea is plausible but the material evidence is missing. | “This could serve independent creators; user interviews are needed.” |
| **Unknown** | The research could not establish the status. | “The public documentation does not establish whether this action is available on the free tier.” |

Never convert **Inference**, **Hypothesis**, or **Unknown** into a verified feature gap or recommendation rationale.

## Source Hierarchy

Use the strongest practical source for the claim.

| Evidence need | Preferred source | Acceptable fallback | Do not treat as proof |
|---|---|---|---|
| Live capability, workflow, or UX | Product test with steps and date; official documentation | Product page, release notes, or demo video | Search-result snippets or an untested marketing claim |
| Price, free boundary, watermark, plan limit | Official pricing, terms, billing, or help page | Archived official page with date | Third-party roundup or stale comparison table |
| Search demand or traffic | User-authorized first-party analytics; reproducible platform export/API | Clearly dated tool export/snapshot, labelled directional | An uncited “high-volume” assertion |
| Complaints or pain | Multiple attributable reviews, support threads, forum posts, or interviews | One attributed post, clearly labelled anecdotal | Invented “users complain” summary |
| Technical feasibility | Repository/source, vendor documentation, benchmark with method, or prototype test | Expert inference with stated assumptions | Assumed browser/model/API capability |
| Market or competitive landscape | Official company/product sources plus independent corroboration where material | Reputable cited coverage | Unattributed lists or model memory |

## Minimum Research Ledger

Create or update a ledger before synthesizing. Use one row per material claim.

| Claim ID | Claim | Evidence label | Source URL or file | Retrieval date | What it proves | Limits/conflicts |
|---|---|---|---|---|---|---|
| C-01 | [Exact claim] | Verified | [URL/path] | YYYY-MM-DD | [Narrow supported fact] | [What it does not prove] |

Retain source text or a research note for web findings. When data is unavailable, record the failed retrieval or data limitation rather than silently omitting it.

## Product-Baseline Protocol

Separate these states in a product inventory:

1. **Live verified:** observed in the production product through a dated workflow test.
2. **Repository verified:** supported by current source code/tests, but not confirmed in deployment.
3. **Documented only:** described in a PRD, architecture file, changelog, or marketing page; not independently verified.
4. **Planned:** proposed, backlog, mock-up, or statement of intent.
5. **Absent/unknown:** not established as present. Do not call it absent unless the test scope supports that conclusion.

When the live product, repository, and documentation conflict, describe all relevant states and do not advertise the strongest claim without verification.

## Competitor-Boundary Protocol

For each competitor and candidate workflow, distinguish the following outcomes:

| Status | Meaning |
|---|---|
| **Verified available** | A source or test shows the capability and boundary. |
| **Verified limited/paid** | A source or test shows the capability has a payment, cap, watermark, access, or quality boundary. |
| **Verified absent after tested workflow** | A defined, dated test reasonably establishes the workflow is unavailable within the tested plan/product surface. State the test boundary. |
| **Not advertised** | Public materials reviewed did not show the capability. This is not absence. |
| **Unknown** | Evidence is insufficient, conflicting, inaccessible, or stale. |

Do not use negative claims such as “no competitor offers,” “unique,” “first,” “only,” or “everyone fails” unless the evidence universe, date, and test coverage justify that unusually strong wording.

## Demand and Complaint Protocol

Demand may be evidenced by different signals that should never be conflated:

| Signal | What it can support | What it cannot support alone |
|---|---|---|
| Query volume/keyword trend | Search interest for a query/intent in a specified market and date | Willingness to pay, unmet need, conversion, or product-market fit |
| Product pricing/use limits | A commercial boundary or possible willingness-to-pay signal | Actual revenue, customer satisfaction, or feature demand |
| Reviews/forums/interviews | Attributed user pain, language, or workflow friction | Market size or broad prevalence from one source |
| Product usage/analytics | Internal behavior for a measured cohort/time range | A general external market conclusion |
| Competitor traffic | Directional visibility for a measured dataset/date | Profitability, retention, or feature-level demand |

State market, geography, date, tool, and whether a metric is exact or bucketed. If no demand data is available, rate confidence down rather than invent a number.

## Research-Quality Checks

Before recommending a feature or workflow, confirm:

- The candidate is not already present in the product baseline under another name.
- Competitor comparison uses current first-party evidence where a paid/limited/absent claim is material.
- The proposed workflow has a named user, trigger, input, decision/review point, output, and recovery path.
- The differentiation is not only a price claim.
- Every quality, privacy, cost, performance, compatibility, and “free/unlimited” claim has appropriate proof or is labelled an assumption.
- Every cited source has a retrieval date and an explicit limit.

## Handling Missing or Conflicting Evidence

Do not stall an entire analysis over a non-material unknown. Instead:

1. Preserve the unknown in the ledger.
2. Downgrade confidence and do not use the unknown as a scoring advantage.
3. State the minimum next validation step: a product test, official pricing check, dataset export, prototype, interview, or benchmark.
4. If the missing fact determines the recommendation, return **research candidate** or **no flagship now** instead of guessing.

Use calibrated language: **“the available evidence shows,” “the available evidence does not establish,” “this suggests,” “requires validation,”** and **“unknown.”**
