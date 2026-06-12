# Public Reader Journey — DOCSAI027

## founder/operator evaluating Zen Mesh
- **Entry**: site homepage (index.astro)
- **Path**: index.astro → why.astro → how-it-works.astro → pricing.astro → security.astro → commitments.astro
- **Questions**: What is Zen Mesh?, Why use it?, How does it work?, What does it cost?, Is it secure?
- **Blockers**: signup not yet enabled, Business/Enterprise coming soon
- **Caveats**: Pro pricing is early-bird, no SLA claims, Shopify/Twilio V1 blockers
- **Legal note**: Legal pages are draft/non-effective

## developer integrating webhooks
- **Entry**: docs/start-here/what-is-zen-mesh.md
- **Path**: what-is-zen-mesh.md → quick-start.md → first-webhook.md → api/overview.md → api/webhooks.md → api/authentication.md → guides/stripe.md
- **Questions**: How do I send my first webhook?, What auth do I need?, How do I configure Stripe?
- **Blockers**: signup not yet enabled, runtime entitlement proof pending
- **Caveats**: MCP is read-scoped only, no apply-live
- **Legal note**: Terms/Privacy/AUP draft/non-effective

## buyer/security reviewer
- **Entry**: site security.astro
- **Path**: security.astro → commitments.astro → evidence.astro → docs/security/index.md → docs/legal/responsible-disclosure.md
- **Questions**: How is data protected?, What evidence exists?, What is the security posture?
- **Blockers**: no SOC2/ISO certification claims, residency guarantee not claimed
- **Caveats**: no SLA, no uptime guarantee, mTLS/crypto enrollment documented
- **Legal note**: Responsible disclosure is draft/non-effective

## legal/privacy reviewer
- **Entry**: docs/legal/terms.md
- **Path**: legal/terms.md → legal/privacy.md → legal/dpa.md → legal/aup.md → legal/subprocessors.md → legal/scc-transfer.md → legal/cookie-disclosure.md → legal/breach-notice.md
- **Questions**: What are the terms?, How is data handled?, Who are subprocessors?, What about international transfer?
- **Blockers**: ALL legal pages are draft/non-effective
- **Caveats**: jurisdiction Ontario/Canada pending legal review, no DPA is effective, SCC wording pending
- **Legal note**: All legal pages require formal legal review before becoming effective

## design partner prospect
- **Entry**: site pricing.astro
- **Path**: pricing.astro → docs/legal/design-partner-terms.md → docs/start-here/support.md
- **Questions**: How does the design partner program work?, What are the terms?, How long does it last?
- **Blockers**: no guaranteed acceptance, survey required monthly
- **Caveats**: 6 months Pro free max, no SLA/support promise, terms are draft
- **Legal note**: Design partner terms are draft/non-effective

## support/contact user
- **Entry**: docs/start-here/support.md
- **Path**: support.md → docs/operations/troubleshooting.md
- **Questions**: How do I get help?, What is the support email?
- **Blockers**: support@zen-mesh.io is canonical but no SLA/responder commitment
- **Caveats**: Slack unconfirmed, Discord not created
- **Legal note**: N/A

## billing/pricing evaluator
- **Entry**: site pricing.astro
- **Path**: pricing.astro → docs/legal/billing-terms.md → docs/legal/retention-lifecycle.md
- **Questions**: What are the plans?, How much does Pro cost?, What are the refund terms?, How long is data retained?
- **Blockers**: checkout/portal not live, Stripe runtime pending
- **Caveats**: early-bird pricing, no billing-live claim
- **Legal note**: Billing terms are draft/non-effective

## incident/security reporter
- **Entry**: docs/legal/responsible-disclosure.md
- **Path**: legal/responsible-disclosure.md → docs/start-here/support.md
- **Questions**: How do I report a vulnerability?, What is the security contact?
- **Blockers**: no bounty program, no SLA on response
- **Caveats**: security@zen-mesh.io canonical, security.txt pending publication
- **Legal note**: Responsible disclosure is draft/non-effective

## API/MCP reader
- **Entry**: docs/mcp/overview.md
- **Path**: mcp/overview.md → mcp/read-only-v1-policy.md → mcp/tools.md → mcp/safety-and-boundaries.md → api/overview.md
- **Questions**: What MCP tools exist?, Is MCP read-only?, What are the safety boundaries?
- **Blockers**: no MCP apply-live, no permission-axis runtime-live
- **Caveats**: current posture is read-scoped/read-only
- **Legal note**: N/A

## pre-signup user
- **Entry**: site try.astro or pricing.astro
- **Path**: try.astro → pricing.astro → why.astro → how-it-works.astro → security.astro → docs/start-here/what-is-zen-mesh.md
- **Questions**: Can I sign up?, What happens after signup?, What is Free vs Pro?
- **Blockers**: public signup not enabled, legal signoff required first
- **Caveats**: Free + Pro V1 direction, Business/Enterprise coming soon
- **Legal note**: All legal pages must be effective before public signup

