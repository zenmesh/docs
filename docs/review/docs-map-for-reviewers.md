# Docs Map for Reviewers

> **Last Updated:** 2026-06-12 | **Task:** DOCSAI023
> Use this page to navigate the launch documentation surface.

## Legend

| Visibility | Meaning |
|-----------|---------|
| **PUBLIC** | Visible to all visitors — no auth required |
| **INTERNAL-REVIEW** | Reviewers can see, not linked from public nav |
| **DRAFT** | Content exists but needs review before public |
| **CONTRACT/STATUS** | Technical specification or current system state |

## Public Site Pages (zen-mesh.io)

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| Homepage (/) | PUBLIC | Live | Hero + feature cards + pricing links |
| /pricing | PUBLIC | Live | Free/Pro/Business/Enterprise tiers |
| /security | PUBLIC | Live | Security overview + data handling |
| /commitments | PUBLIC | Live | Trust commitments |
| /docs (redirect) | PUBLIC | Live | Redirects to docs.zen-mesh.io |

## Docs Start-Here Pages

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| [Start Here](../start-here) | PUBLIC | Live | Entry point for all docs |
| [Current Status](../start-here/current-status) | PUBLIC | Live | What's available today |
| [Launch Status](../start-here/launch-status) | PUBLIC | Live | Launch readiness overview |
| [Support](../start-here/support) | PUBLIC | Live | Support channels (email only) |
| [Quickstart](../guides/quickstart) | PUBLIC | Live | First webhook in 5 minutes |
| [First 30 Minutes Guide](../start-here/first-30-minutes) | PUBLIC | Live | New user onboarding |
| [Go-Live Checklist](../start-here/go-live-checklist) | PUBLIC | Live | Pre-production checklist |

## Contracts & Status Pages

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| [Non-Claims](../ai/non-claims) | PUBLIC | Live | What Zen Mesh does NOT claim |
| [Capability Evidence](../ai/capability-evidence) | CONTRACT/STATUS | Live | Evidence-backed capability matrix |
| [Edge Lite](../ai/edge-lite) | INTERNAL-REVIEW | Live | Design partner docs |
| [Evidence Overview](../evidence/overview) | CONTRACT/STATUS | Live | Merkle receipts, proof of delivery |
| [Merkle Integrity](../evidence/merkle-integrity) | CONTRACT/STATUS | Live | Hash chain details |
| [Runtime Convergence](../evidence/runtime-convergence) | CONTRACT/STATUS | Live | Runtime vs docs alignment |

## Provider Pages

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| [Stripe](../providers/stripe) | PUBLIC | Live | Supported at launch |
| [GitHub](../providers/github) | PUBLIC | Live | Supported at launch |
| [Custom](../providers/custom) | PUBLIC | Live | Supported at launch |
| [Shopify](../providers/shopify) | INTERNAL-REVIEW | DRAFT | Launch target, not proven |
| [Twilio](../providers/twilio) | INTERNAL-REVIEW | DRAFT | Launch target, not proven |

## Pricing & Limits

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| [Pricing](https://zen-mesh.io/pricing) (site) | PUBLIC | Live | Free/Pro/Business/Enterprise |
| [Rate Limits](../api/rate-limits) | PUBLIC | Live | API rate limits |
| Plan limits | PUBLIC | DRAFT | Exact limits TBD (LD-006) |

## Trust, Security & Data Handling

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| [Security Overview](../security/security-capability-validation) | PUBLIC | Live | Controls and validation |
| [Cryptographic Enrollment](../security/cryptographic-enrollment) | PUBLIC | Live | Key management |
| [Data Handling](../security/data-handling) | PUBLIC | Live | How data flows through the system |

## Legal (Draft — Not Effective)

| Page | Visibility | Status | Legal Review |
|------|-----------|--------|-------------|
| [Terms of Service](../legal/terms-of-service) | DRAFT | draft/non-effective | REQUIRED |
| [Privacy Policy](../legal/privacy-policy) | DRAFT | draft/non-effective | REQUIRED |
| [Data Processing Addendum](../legal/dpa) | DRAFT | draft/non-effective | REQUIRED |
| [Acceptable Use Policy](../legal/acceptable-use) | DRAFT | draft/non-effective | REQUIRED |
| [Cookie Policy](../legal/cookie-policy) | DRAFT | draft/non-effective | REQUIRED |

## Implementation Handoff

| Page | Visibility | Status | Notes |
|------|-----------|--------|-------|
| [MCP Overview](../mcp/overview) | PUBLIC | Live | Current: read/scoped only |
| [MCP Draft System](../mcp/draft-system) | PUBLIC | Live | Proposal-only, human apply |
| [Permissions Overview](../permissions/overview) | CONTRACT/STATUS | Live | Design/contract, not runtime-proven |
| [API Overview](../api/overview) | PUBLIC | Live | V1 API reference |
| [API Reference](../api/overview) | PUBLIC | Live | Endpoints and schemas |

## Review Files (For Reviewers Only)

All files in `review/` directory are internal review artifacts, not public documentation.
