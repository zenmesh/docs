# Go-Live Checklist

> **Status:** Draft — structure complete, content pending full review.

Checklist for moving from testing to production with Zen Mesh.

## Pre-Production

- [ ] Account on production plan
- [ ] API key generated and stored securely
- [ ] Provider webhook signing keys configured
- [ ] Destination endpoints verified reachable
- [ ] Retry rules configured appropriately
- [ ] Rate limits reviewed per plan

## Security

- [ ] Webhook signing validation enabled
- [ ] IP allowlisting configured if needed
- [ ] API key rotation policy planned

## Monitoring

- [ ] Delivery monitoring set up
- [ ] Alert thresholds configured
- [ ] Dead letter queue reviewed

## Verification

- [ ] End-to-end test with real provider events
- [ ] Delivery evidence confirmed
- [ ] Failover/retry behavior verified

## Related

- [Current Status](current-status) — What's available today
- [First 30 Minutes](first-30-minutes) — New user guide
- [Support](support) — Getting help
