# Tracker / Consent Options Matrix — DOCSAI025

**For Leonardo decision-making.**

## Options Comparison

### 1. No Analytics
- **Advantages**: Zero tracking, zero consent needed, simplest compliance, no subprocessor impact
- **Disadvantages**: No visibility into site traffic, user behavior, conversion funnels
- **Data collected**: None
- **Cookie/local storage impact**: None
- **Subprocessor impact**: None
- **Consent impact**: No consent banner needed
- **Implementation effort**: Zero
- **Growth/marketing value**: None
- **Legal risk**: None
- **V1 recommendation**: Good starting point

### 2. Privacy-Light Analytics (e.g., Plausible, Umami, GoatCounter)
- **Advantages**: Privacy-first, no cookies needed, aggregated data, GDPR-friendly, self-hostable
- **Disadvantages**: Less detailed data, fewer integrations, self-host requires infrastructure
- **Data collected**: Page views, referrer, browser (no PII)
- **Cookie/local storage impact**: Optional fingerprint or none
- **Subprocessor impact**: Minimal — often self-hosted
- **Consent impact**: May not need consent if truly anonymous
- **Implementation effort**: Low-medium
- **Growth/marketing value**: Medium — traffic insights without privacy cost
- **Legal risk**: Low
- **V1 recommendation**: RECOMMENDED — good balance of insight and privacy

### 3. Vercel Analytics
- **Advantages**: Built into Astro/Vercel, no cookies, aggregated, privacy-friendly
- **Disadvantages**: Tied to Vercel, limited features
- **Data collected**: Anonymized page views, device info
- **Cookie/local storage impact**: None
- **Subprocessor impact**: Vercel (already hosting)
- **Consent impact**: No consent needed if truly anonymized
- **Implementation effort**: Very low
- **Growth/marketing value**: Low-medium
- **Legal risk**: Very low
- **V1 recommendation**: ACCEPTABLE — easy to enable, minimal risk

### 4. Vercel Speed Insights
- **Advantages**: Core Web Vitals, no cookies, purely performance
- **Disadvantages**: Limited to performance data
- **Data collected**: Performance metrics only
- **Cookie/local storage impact**: None
- **Subprocessor impact**: Vercel (already hosting)
- **Consent impact**: No consent needed
- **Implementation effort**: Very low
- **Growth/marketing value**: Low (technical only)
- **Legal risk**: None
- **V1 recommendation**: ACCEPTABLE — no downside

### 5. Google Analytics
- **Advantages**: Industry standard, deep analytics, free, extensive reporting
- **Disadvantages**: Heavy tracking, requires consent in EU/CA, Google subprocessor, privacy concerns
- **Data collected**: Page views, user behavior, device, location, sessions
- **Cookie/local storage impact**: Multiple cookies (_ga, _gid, etc.)
- **Subprocessor impact**: Google (adds subprocessor)
- **Consent impact**: Consent banner REQUIRED
- **Implementation effort**: Medium
- **Growth/marketing value**: High
- **Legal risk**: Medium-high
- **V1 recommendation**: NOT RECOMMENDED for V1 — heavy, requires consent, adds subprocessor

### 6. HubSpot
- **Advantages**: Full marketing/sales suite, CRM, forms, chat
- **Disadvantages**: Very heavy tracking, multiple cookies, requires consent, expensive
- **Data collected**: Contact info, behavior, sessions, device, IP
- **Cookie/local storage impact**: Extensive (tracking cookies, functional cookies)
- **Subprocessor impact**: HubSpot (adds subprocessor)
- **Consent impact**: Full consent banner REQUIRED
- **Implementation effort**: High
- **Growth/marketing value**: High (but overkill for V1)
- **Legal risk**: High
- **V1 recommendation**: NOT RECOMMENDED for V1 — defer until growth stage

### 7. Google Fonts (External)
- **Advantages**: Rich font library, fast CDN
- **Disadvantages**: IP leak on font requests, Google subprocessor
- **Data collected**: IP address on font file requests
- **Cookie/local storage impact**: None
- **Subprocessor impact**: Google (adds subprocessor)
- **Consent impact**: None required, but IP collection exists
- **Implementation effort**: Very low (already in use?)
- **Legal risk**: Low-medium
- **V1 recommendation**: REPLACE with self-hosted fonts

### 8. Self-Hosted Fonts
- **Advantages**: Zero external requests, no IP leak, no subprocessor
- **Disadvantages**: Slightly more setup, font files in repo
- **Data collected**: None
- **Cookie/local storage impact**: None
- **Subprocessor impact**: None
- **Consent impact**: None
- **Implementation effort**: Low
- **Growth/marketing value**: None
- **Legal risk**: None
- **V1 recommendation**: RECOMMENDED if external fonts currently used

### 9. Cookie Banner
- **Advantages**: Legal compliance for EU/CA, transparency
- **Disadvantages**: UX friction, requires maintenance, legal copy needs review
- **Data collected**: Consent preference
- **Cookie/local storage impact**: Stores consent preference
- **Subprocessor impact**: None (unless using CMP SaaS)
- **Consent impact**: Required if non-essential cookies/trackers present
- **Implementation effort**: Medium
- **Legal risk**: Low if copy is reviewed
- **V1 recommendation**: Implement ONLY if non-essential trackers active

### 10. Consent Management Platform (e.g., Cookiebot, OneTrust)
- **Advantages**: Automated compliance, geolocation, detailed consent management
- **Disadvantages**: Adds subprocessor, cost, complexity, overkill for V1
- **Data collected**: Consent records
- **Cookie/local storage impact**: Consent cookies
- **Subprocessor impact**: CMP vendor
- **Consent impact**: Provides consent UI
- **Implementation effort**: Medium-high
- **Growth/marketing value**: None (compliance only)
- **Legal risk**: Low
- **V1 recommendation**: NOT RECOMMENDED for V1 — simple banner sufficient if needed

### 11. Server-Side Analytics (e.g., self-hosted Plausible)
- **Advantages**: No client-side scripts, no cookies, no consent needed, full control
- **Disadvantages**: Requires server infrastructure, more setup
- **Data collected**: Server-side request logs (anonymized)
- **Cookie/local storage impact**: None
- **Subprocessor impact**: None if self-hosted
- **Consent impact**: None needed
- **Implementation effort**: Medium-high
- **Growth/marketing value**: Medium
- **Legal risk**: Very low
- **V1 recommendation**: Good option if privacy-light analytics desired and self-hosting

## Summary Recommendation for V1

1. **Start with no analytics or Vercel Analytics + Speed Insights** — both are cookie-free, anonymized, and don't add subprocessors beyond Vercel (already hosting).
2. **Self-host fonts** to avoid Google Fonts IP leak.
3. **No cookie banner needed** if only cookie-free options used.
4. **Defer Google Analytics and HubSpot** to V2 or later.
5. **If any non-essential tracker is added later, implement cookie banner before going live.**

This approach gives basic traffic/performance insights with zero consent friction and zero additional subprocessors.
