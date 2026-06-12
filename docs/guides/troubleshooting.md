# Troubleshooting

Common issues and fixes for Zen Mesh webhook delivery.

## Delivery Failures

- Check destination endpoint health and response codes
- Review retry configuration in [Dead Letter Queue](../delivery/dead-letter-queue)
- Use [Replay](../delivery/replay) to re-send failed events

## Routing Issues

- Verify [Event Routing](../delivery/event-routing) rules match your event schema
- Check [JSONPath Routing](../delivery/jsonpath-routing) expressions

## Authentication

- Verify webhook signing keys match between provider and Zen Mesh
- Check [Header Validation](../security/header-validation) configuration

## Monitoring

- Use the [API Logs](../api/logs) endpoint to inspect delivery history
- Set up monitoring per the [Monitoring Guide](monitoring)

## Related

- [Operations: Troubleshooting](../operations/troubleshooting) — Operational runbook
- [Delivery Status](../reference/delivery-status) — Status codes reference
