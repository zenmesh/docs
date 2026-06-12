# Subprocessor Baseline and Candidate Decision Pack

## Confirmed (Active)
| Subprocessor | Purpose | Data Categories | Transfer | DPA |
|---|---|---|---|---|
| GCP | SaaS control plane hosting | infra metadata, logs | Canada | Google Cloud DPA |
| AWS | First data plane hosting | payloads, delivery logs | US | AWS DPA |
| Stripe | Payment processing | billing, payment tokens | US | Stripe DPA |
| GitHub | Source code/CI | code (non-customer) | US | GitHub DPA |
| Docusaurus/docs | Docs hosting | public docs only | US | N/A |

## Candidates (Not Active — Leonardo Approval Required)
| Subprocessor | Pros | Cons | Recommendation |
|---|---|---|---|
| Google Analytics | Rich insights, industry standard | Heavy tracking, US transfer, consent needed | Do not activate before approval |
| HubSpot | Marketing automation, CRM | Heavy tracking, cost, consent needed | Do not activate before approval |
| Vercel Analytics | Privacy-light, no IP, built-in | US transfer, limited | Acceptable if disclosed; Leonardo decides |
| Vercel Speed Insights | Privacy-focused, Core Web Vitals only | US transfer, Vercel-specific | Acceptable if disclosed; Leonardo decides |
| Google Fonts (external) | Fast CDN, large library | US transfer, IP logging | Self-host fonts; Leonardo decides |
| Support/CRM/chat tools | Improved support UX | Varies widely, third-party data | Evaluate specific tool when selected |

## Recommendation
- No heavy trackers (GA, HubSpot) before legal signoff
- Self-host fonts where feasible
- Vercel Analytics/Speed Insights acceptable if disclosed and approved
- All candidates require Leonardo approval + legal review before activation
