# Subprocessor Candidate Evaluation Roadmap — DOCSAI025

## Active (Day-1 Confirmed)
1. GCP — control plane hosting
2. AWS — data plane delivery
3. Stripe — payment processing
4. GitHub — code hosting

## Candidates (Require Evaluation + Approval)

### Google Analytics
- Purpose: website analytics
- Data: anonymized pageviews
- DPA/SCC: available
- Risk: medium — requires cookie consent in EU/CA
- Recommendation: defer to V2; use privacy-light alternative if analytics needed

### HubSpot
- Purpose: CRM, marketing
- Data: contact info, form submissions
- DPA/SCC: available
- Risk: medium-high — heavy tracking, requires consent
- Recommendation: defer until legal review and growth stage

### Vercel Analytics
- Purpose: site performance
- Data: anonymized metrics
- Risk: low
- Recommendation: privacy-light option if analytics needed

### Vercel Speed Insights
- Purpose: Core Web Vitals
- Data: performance metrics
- Risk: low — no cookies
- Recommendation: can enable without consent banner

### Google Fonts (external)
- Purpose: typography
- Risk: low-medium — IP leak on font requests
- Recommendation: self-host fonts to avoid subprocessor entirely

### Email/Support Provider
- Purpose: support ticket handling
- Risk: medium
- Recommendation: evaluate with subprocessor approval process

### Monitoring/Observability SaaS
- Purpose: infrastructure monitoring
- Risk: low for system metrics
- Recommendation: evaluate later

## Evaluation Criteria
1. Data minimization — what data is collected?
2. Purpose limitation — is data used only for stated purpose?
3. DPA availability — can we get a DPA?
4. SCC adequacy — does SCC cover the transfer?
5. Cookie impact — does it require consent?
6. Alternative availability — is there a privacy-lighter option?
