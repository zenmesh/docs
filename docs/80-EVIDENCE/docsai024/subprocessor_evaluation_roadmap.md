# Subprocessor Evaluation Roadmap — DOCSAI024

> Candidate subprocessors require evaluation before activation. No candidate may be added to the active subprocessor list without legal review.

## Evaluation Criteria (per candidate)
1. Data processed — what user/customer data does the tool receive?
2. Purpose — why is this tool needed?
3. Privacy impact — what is the risk to user privacy?
4. Cookie/tracker impact — what cookies/local storage does it set?
5. Legal basis — what is the lawful basis for data processing?
6. DPA availability — does the vendor offer a DPA?
7. SCC/transfer impact — does the tool involve international data transfers?
8. Removal/self-host alternative — can we remove or self-host instead?
9. User consent requirement — does the user need to consent?
10. Cost/benefit — is the value worth the privacy/legal cost?

## Candidate Queue

| Candidate | Priority | Evaluation Status | Recommendation |
|-----------|----------|-------------------|----------------|
| Google Analytics | Medium | Evaluating | Do not activate pre-legal |
| HubSpot | Medium | Evaluating | Do not activate pre-legal |
| Other analytics/growth tools | Low | Not started | Evaluate individually |

## Confirmed Day-1 Subprocessors (No evaluation needed)
- GCP — SaaS control plane
- AWS — Data plane
- Stripe — Payments
- GitHub — Source code
- Docusaurus/docs hosting — Public docs

## Process
1. DocsAI creates evaluation per candidate
2. Leonardo reviews
3. Legal reviews if data processing involved
4. Approved candidates added to active list
5. Unapproved candidates remain as evaluated-only
