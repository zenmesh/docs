---
sidebar_label: JSONPath Transforms
description: Map and reshape webhook event payloads using safe JSONPath mappings and transform functions — normalize provider payloads to consistent internal fields.
---

# JSONPath Transforms

Map and reshape webhook event payloads using safe JSONPath expressions — no code execution required.

## What It Is

JSONPath transforms normalize incoming webhook payloads from different providers into consistent internal fields. Instead of writing custom integration code for each webhook source, operators define mapping rules that extract, transform, and reshape event data.

## Mapping Sources

Each mapping field specifies a source of data:

| Source Type | Description |
|-------------|-------------|
| **`direct`** | Maps a literal value directly to the output field |
| **`jsonpath`** | Extracts a value from the event body using a JSONPath expression |
| **`static`** | Sets a constant value on the output field (e.g., provider name) |

### Example: Normalize a Stripe charge.completed event

Incoming Stripe payload:

```json
{
  "id": "evt_1F2aBc3DeFg4HiJ",
  "type": "charge.completed",
  "data": {
    "object": {
      "id": "ch_3K7xYz9AbCdEfGhI",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "metadata": { "order_id": "ORD-12345" }
    }
  }
}
```

Mapping configuration:

```json
[
  { "target": "event_id",     "source": "jsonpath", "expression": "$.data.object.id" },
  { "target": "amount_cents", "source": "jsonpath", "expression": "$.data.object.amount" },
  { "target": "currency",     "source": "jsonpath", "expression": "$.data.object.currency" },
  { "target": "status",       "source": "jsonpath", "expression": "$.data.object.status" },
  { "target": "order_ref",    "source": "jsonpath", "expression": "$.data.object.metadata.order_id" },
  { "target": "provider",     "source": "static",   "value": "stripe" }
]
```

Result:

```json
{
  "event_id": "ch_3K7xYz9AbCdEfGhI",
  "amount_cents": 2000,
  "currency": "usd",
  "status": "succeeded",
  "order_ref": "ORD-12345",
  "provider": "stripe"
}
```

### Example: Normalize a GitHub push event

Incoming GitHub payload:

```json
{
  "ref": "refs/heads/main",
  "repository": { "full_name": "myorg/myrepo" },
  "head_commit": { "id": "abc123def456" },
  "pusher": { "name": "alice" }
}
```

Mapping configuration:

```json
[
  { "target": "source_event", "source": "direct", "value": "github_push" },
  { "target": "repository",   "source": "jsonpath", "expression": "$.repository.full_name" },
  { "target": "branch",       "source": "jsonpath", "expression": "$.ref" },
  { "target": "commit_sha",   "source": "jsonpath", "expression": "$.head_commit.id" },
  { "target": "author",       "source": "jsonpath", "expression": "$.pusher.name" },
  { "target": "provider",     "source": "static",   "value": "github" }
]
```

Result:

```json
{
  "source_event": "github_push",
  "repository": "myorg/myrepo",
  "branch": "refs/heads/main",
  "commit_sha": "abc123def456",
  "author": "alice",
  "provider": "github"
}
```

## Transform Functions

The safe transform engine supports a registry of pure functions that can be applied to extracted values:

| Function | Description |
|----------|-------------|
| `lowercase` | Convert string to lowercase |
| `uppercase` | Convert string to uppercase |
| `trim` | Remove leading and trailing whitespace |
| `split` | Split string by delimiter into array |
| `join` | Join array elements with separator |
| `toString` | Convert value to string |
| `toNumber` | Convert string to number |
| `formatDate` | Reformat date string between formats |
| `replace` | Replace substring using regex pattern |
| `extract` | Extract substring by pattern |

All transform functions are bounded by a 50ms timeout and 10MB memory limit per expression.

## Output Modes

| Mode | Description |
|------|-------------|
| **`separate` (V1)** | Original payload and transformed output are both available downstream. The original event is preserved alongside the normalized fields. |
| **`replace` (future)** | Transformed output replaces the original payload. Not supported in V1. |

## What V1 Supports

| Feature | Status |
|---------|--------|
| `direct`, `jsonpath`, `static` source types | Supported |
| Safe transform function registry (10 functions) | Supported |
| `separate` output mode | Supported |
| Timeout (50ms) and resource limits (10MB) | Supported |
| Provider packages: Stripe, GitHub, Generic | Supported |
| Error policies: `fail_open`, `fail_closed` | Supported |

## What V1 Does Not Support

| Feature | Status |
|---------|--------|
| `replace` output mode | Not in V1 |
| JavaScript or user-supplied code transforms | Not supported |
| WASM, Lua, Python, CEL, Rego, or plugin execution | Not supported |
| Nested transform composition | V1.1+ |
| Conditional transforms (if/then) | V1.1+ |

## Related Capabilities

- [JSONPath Routing](./jsonpath-routing) — filter and route events with JSONPath
- [Webhook Filtering](./filtering) — condition-based event suppression
- [Provider Packages](../guides/adapters) — pre-built normalization for common providers
