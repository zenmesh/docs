---
sidebar_label: Replay
---

# Replay

The Replay API allows re-processing previously delivered events. This is useful for recovering from downstream failures, testing integration changes, or backfilling data.

## Trigger a Replay

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  -H "Content-Type: application/json" \
  -d '{"source_id": "src_456", "time_range": {"since": "2026-06-01T00:00:00Z", "until": "2026-06-01T23:59:59Z"}}' \
  https://api.zen-mesh.io/v1/replays
```

Response:

```json
{
  "replay_id": "rpl_abc123",
  "status": "queued",
  "estimated_events": 500,
  "created_at": "2026-06-02T00:00:00Z"
}
```

## Check Replay Status

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/replays/rpl_abc123
```

## List Replays

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  "https://api.zen-mesh.io/v1/replays?limit=10"
```

## Limitations

- Replays are processed asynchronously
- Only events within the retention window can be replayed
- Replay is available by default for all tenant plans

## Deduplication During Replay

Events replayed to destinations use idempotency based on the original event ID. If a downstream destination already received the event, the replay delivery is idempotent — the destination sees only one copy per unique event.
