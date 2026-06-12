# Tracker / Consent Options Explainer — DOCSAI024

> **FOR LEONARDO REVIEW**
> Pros and cons of each tracker/analytics option. No recommendation is legal advice.

## Options Evaluated

### 1. Google Analytics
- **Advantages**: Industry standard, deep insights, free tier, integration with Google Ads
- **Disadvantages**: Heavy tracking, cookie consent required (GDPR/PIPEDA), data sent to Google/US, privacy concerns from technical users, adds subprocessor
- **User data involved**: Page views, referrer, device info, location (city-level), session data
- **Cookie/local storage impact**: Sets multiple cookies (_ga, _gid, _gat, AMP tokens)
- **Subprocessor impact**: Google becomes a subprocessor
- **Legal review needed**: Yes
- **V1 recommendation**: Do not activate. Keep as evaluated candidate.

### 2. Vercel Analytics
- **Advantages**: Built into hosting (if on Vercel), minimal setup, privacy-aware options
- **Disadvantages**: Still external data, limited free tier, Vercel subprocessor
- **User data involved**: Page views, country, device type, referrer
- **Cookie/local storage impact**: Minimal (can be cookieless)
- **Subprocessor impact**: Vercel already hosting (if applicable)
- **Legal review needed**: Low
- **V1 recommendation**: Acceptable if Vercel is already hosting; use cookieless mode.

### 3. Vercel Speed Insights
- **Advantages**: Performance monitoring, no personal data, minimal footprint
- **Disadvantages**: Only performance data, limited insights
- **User data involved**: Performance metrics only (no personal data)
- **Cookie/local storage impact**: None
- **Subprocessor impact**: Vercel already hosting (if applicable)
- **Legal review needed**: Minimal
- **V1 recommendation**: Acceptable. Low privacy impact.

### 4. Google Fonts
- **Advantages**: Rich font library, fast CDN, consistent rendering
- **Disadvantages**: Google tracks font requests (IP address), external dependency
- **User data involved**: IP address, page URL, user agent on each font request
- **Cookie/local storage impact**: No cookies, but browser caches fonts
- **Subprocessor impact**: Google becomes data recipient
- **Legal review needed**: Yes
- **V1 recommendation**: Self-host fonts where feasible. Avoid Google Fonts CDN pre-legal.

### 5. HubSpot
- **Advantages**: CRM, marketing, lead capture, customer success, live chat potential
- **Disadvantages**: Heavy tracking, cookie consent required, adds subprocessor, cost
- **User data involved**: Contact info, page views, form submissions, email interactions
- **Cookie/local storage impact**: Sets tracking cookies
- **Subprocessor impact**: HubSpot becomes subprocessor
- **Legal review needed**: Yes
- **V1 recommendation**: Do not activate. Keep as evaluated candidate for post-launch.

### 6. Self-hosted Analytics (Plausible, Umami)
- **Advantages**: Full control, privacy-focused, no external subprocessor, cookieless options, open source
- **Disadvantages**: Requires hosting/maintenance, less feature-rich than GA, no built-in integrations
- **User data involved**: Page views, referrer, device type (configurable)
- **Cookie/local storage impact**: Can be cookieless
- **Subprocessor impact**: None additional (runs on own infrastructure)
- **Legal review needed**: Minimal
- **V1 recommendation**: Good option if analytics needed before legal sign-off.

### 7. No Analytics
- **Advantages**: Zero privacy risk, zero subprocessors, zero legal review, simplest
- **Disadvantages**: No visibility into user behavior, no conversion tracking
- **User data involved**: None
- **Cookie/local storage impact**: None
- **Subprocessor impact**: None
- **Legal review needed**: None
- **V1 recommendation**: Acceptable for V1 launch.

### 8. Cookie Banner / Consent Option
- **Advantages**: Legal compliance, user transparency, required in many jurisdictions
- **Disadvantages**: UX friction, requires legal review of consent text, implementation effort
- **User data involved**: Consent preferences
- **Cookie/local storage impact**: Stores consent preference
- **Subprocessor impact**: Depends on consent management tool used
- **Legal review needed**: Yes
- **V1 recommendation**: If any trackers are used, a cookie banner is required. If no trackers, banner is optional but recommended for transparency.

### 9. Server-side Analytics
- **Advantages**: No cookies, no client-side tracking, privacy-friendly
- **Disadvantages**: Less accurate (bot traffic, ad blockers don't affect), no individual user tracking
- **User data involved**: Aggregated server logs (IP, user agent, request path)
- **Cookie/local storage impact**: None
- **Subprocessor impact**: Depends on log processing tool
- **Legal review needed**: Low
- **V1 recommendation**: Acceptable. Low privacy impact.

## Summary Matrix

| Option | Privacy Impact | UX Impact | Growth Impact | Legal Review | V1 Recommendation |
|--------|---------------|-----------|---------------|-------------|-------------------|
| Google Analytics | High | Neutral | High | Yes | Do not activate |
| Vercel Analytics | Low | Neutral | Medium | Low | Acceptable if hosting |
| Vercel Speed Insights | None | Neutral | Low | Minimal | Acceptable |
| Google Fonts | Medium | Positive | None | Yes | Self-host |
| HubSpot | High | Positive | High | Yes | Do not activate |
| Self-hosted analytics | Low | Neutral | Medium | Minimal | Good option |
| No analytics | None | Neutral | None | None | Acceptable |
| Cookie banner | None | Negative | None | Yes | Required if trackers |
| Server-side analytics | Low | Neutral | Low | Low | Acceptable |

## Recommended Default for V1
1. Avoid heavy trackers (GA, HubSpot) before legal sign-off
2. Use privacy-light analytics (Vercel Speed Insights, server-side) or none
3. Self-host fonts where feasible
4. Keep GA and HubSpot as evaluated candidates, not active defaults
5. If any tracker is added, deploy a cookie consent banner
6. Revisit analytics stack after legal review
