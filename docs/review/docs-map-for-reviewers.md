---
sidebar_label: Docs Map for Reviewers
---

# Docs Map for Reviewers

> Navigation guide for anyone reviewing the Zen Mesh docs and site before launch.
> Pages are categorized by audience and readiness state.

## Public Site Pages (zen-mesh.io)

| Page | URL | Status | Reviewer Notes |
|------|-----|--------|----------------|
| Homepage | `/` | LIVE | Hero copy clean, no forbidden claims |
| Why | `/why` | LIVE | Clear problem statement |
| How It Works | `/how-it-works` | LIVE | Technical overview, links to docs |
| Security | `/security` | LIVE | Non-claims, capability evidence, claim maturity |
| Pricing | `/pricing` | LIVE | Preview/Team/Enterprise (naming may need alignment with docs) |
| Get Started | `/get-started` | LIVE | Links to docs quick-start |
| Evidence | `/evidence` | LIVE | Links to AI evidence artifacts |
| Commitments | `/commitments` | LIVE | Fixed data residency language |
| Non-Claims | `/non-claims` | LIVE | Clear non-claims catalog |
| AI Context | `/ai` | LIVE | Links to AI evidence JSON |
| Try | `/try` | LIVE | Agent status + early access CTA |
| Legal | `/terms`, `/privacy`, `/aup`, `/dpa`, `/cookies` | DRAFT | All marked non-effective; legal review required |
| Blog | `/blog` | LIVE | 3 posts; may need expansion |

## Docs Start-Here Pages

| Page | Sidebar | Status | Reviewer Notes |
|------|---------|--------|----------------|
| What is Zen Mesh | Start Here → top | LIVE | Clear product description |
| Who Should Use | Start Here | LIVE | Audience targeting |
| Current Status | Start Here | LIVE | Early access status, evidence summary |
| Launch Status | Start Here | LIVE | Phase overview, evidence links (newly added to sidebar) |
| Concepts | Start Here | LIVE | Core concepts and terminology |
| Limits | Start Here | LIVE | Rate limits, volume limits |
| Support | Start Here | LIVE | Email primary; Slack/Discord not confirmed |
| Geography | Start Here | LIVE | Entry point provider/region unresolved |
| Data Handling | Start Here | LIVE | How data is processed, retention |

## Contracts / Status Pages

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| Contracts Index | INTERNAL-REVIEW | Hub page linking all contracts |
| Multi-Target Delivery | CONTRACT | Core delivery contract |
| Object-Store Fan-Out | CONTRACT | Runtime status: not proven |
| Payload Encryption / Replay / DLQ | CONTRACT | Crypto and replay design |
| Tenant Key Management | CONTRACT | Key lifecycle design |
| Support Payload Access | CONTRACT | Metadata-first, no raw payload by default |
| Data-Plane Selection | CONTRACT | Provider/region decision matrix |
| Evidence Export | CONTRACT | Export design |
| Open Launch Decisions | CONTRACT | Decisions made and pending |
| Legal Launch Checklist | CONTRACT | Legal items before launch |
| Entry Point Decision | CONTRACT | Provider/region unresolved |
| Support Channels Decision | CONTRACT | Email canonical; Slack/Discord unconfirmed |
| Object-Store Runtime Status | CONTRACT | Not runtime-proven |
| Launch Readiness Gap to Action | INTERNAL-REVIEW | Gap analysis |
| Customer Onboarding Pack | INTERNAL-REVIEW | Onboarding flows |
| Support Center D1 Spec | INTERNAL-REVIEW | Depends on Helper2 |
| Billing Overage Launch | INTERNAL-REVIEW | Depends on Helper2 |
| Runtime Proof Checklist | INTERNAL-REVIEW | Proof gates |
| First Customer Rehearsal | INTERNAL-REVIEW | Rehearsal plan |
| Draft Branch Merge Checklist | INTERNAL-REVIEW | Merge safety |
| PR Merge Readiness | INTERNAL-REVIEW | PR review checklist |
| Internal/Public Distinction | INTERNAL-REVIEW | What stays internal vs public |
| Support Templates | INTERNAL-REVIEW | Response templates |
| Support Safe Payload Handling | INTERNAL-REVIEW | Payload access safety |
| Onboarding Paths | INTERNAL-REVIEW | Customer onboarding flows |
| Launch Rehearsal Scorecard | INTERNAL-REVIEW | Rehearsal scoring |
| Public Trust FAQ | PUBLIC-REVIEWABLE | FAQ for public readers |
| Permission Channels | CONTRACT | Channel-aware RBAC, design-only |

## Provider Pages

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| Stripe Guide | LAUNCH-FACING | Stripe FLOW-03 validated on GKE cloud |
| GitHub Guide | LAUNCH-FACING | GitHub webhooks |
| Custom Webhooks Guide | LAUNCH-FACING | Custom webhook sources |
| Shopify Guide | LAUNCH-TARGET | Not runtime-proven at launch |
| Twilio Guide | LAUNCH-TARGET | Not runtime-proven at launch |
| Destinations Guide | LAUNCH-FACING | Target configuration |
| Sources Guide | LAUNCH-FACING | Source configuration |

## Pricing / Limits Pages

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| Start Here: Limits | PUBLIC | Rate limits and volume |
| Billing Overage Launch | INTERNAL | Depends on Helper2 implementation |
| Upgrade Free to Pro | PUBLIC | Upgrade path |

## Trust / Security / Data Handling

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| Security Index | PUBLIC | Security overview |
| Trust Controls | PUBLIC | Control framework |
| Security Capability Validation | PUBLIC | Capability validation |
| Agent SaaS mTLS | PUBLIC | mTLS architecture |
| ZenLock Credential Lifecycle | PUBLIC | Credential management |
| IP Allowlisting | PUBLIC | IP allowlist config |
| Header Validation | PUBLIC | Header validation |
| Cryptographic Enrollment | PUBLIC | Enrollment flow |
| Secure Webhook Delivery | PUBLIC | Delivery security |
| Webhook Access Control | PUBLIC | Access control |
| Tenant Isolation | PUBLIC | Isolation model |
| Data Handling (Start Here) | PUBLIC | How data is handled |

## MCP / API / Permission Pages

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| MCP Overview | PUBLIC | MCP introduction |
| MCP Read-Only V1 Policy | PUBLIC | Current MCP is read/scoped only |
| MCP Tools | PUBLIC | Tool reference |
| MCP Examples | PUBLIC | Usage examples |
| MCP Authentication | PUBLIC | Auth design |
| MCP Safety and Boundaries | PUBLIC | Safety guardrails |
| MCP Draft System | PUBLIC | Design only — proposed vs applied lifecycle |
| API Overview | PUBLIC | API introduction |
| API Reference | PUBLIC | Full API docs |

## Evidence Pages

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| Evidence Overview | PUBLIC | Evidence framework |
| Runtime Convergence | PUBLIC | 10/10 proofs, local/mock/cloud-demo |
| Trust Lifecycle | PUBLIC | 10/10 trust proofs |
| Validation Map | PUBLIC | Validation mapping |
| Merkle Integrity | PUBLIC | Merkle evidence integrity |
| Completion Evidence | PUBLIC | Completion criteria |
| Non-Claims | PUBLIC | What is NOT claimed |
| Capability Evidence (AI) | PUBLIC | AI evidence artifacts |
| Compliance Evidence (AI) | PUBLIC | Compliance mapping |

## Legal Pages

| Page | Status | Reviewer Notes |
|------|--------|----------------|
| Terms of Service | DRAFT/NON-EFFECTIVE | Requires legal review |
| Privacy Policy | DRAFT/NON-EFFECTIVE | Requires legal review |
| Acceptable Use Policy | DRAFT/NON-EFFECTIVE | Requires legal review |
| Data Processing Agreement | DRAFT/NON-EFFECTIVE | Requires legal review |
| Cookie Policy | DRAFT/NON-EFFECTIVE | Requires legal review |

## Page Status Legend

- **LIVE** — Public-facing, reviewed, ready for visitors
- **LAUNCH-FACING** — Public-facing for launch providers
- **LAUNCH-TARGET** — Public-facing but provider not runtime-proven
- **CONTRACT** — Design contract, correctly marked as design/contract
- **INTERNAL-REVIEW** — For internal review, may contain implementation details
- **PUBLIC-REVIEWABLE** — Public content needing final editorial review
- **DRAFT/NON-EFFECTIVE** — Legal draft, not effective until legal review complete
