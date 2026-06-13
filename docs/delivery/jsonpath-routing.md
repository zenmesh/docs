---
sidebar_label: JSONPath Routing
description: Route webhooks with safe JSONPath rules — filter and select delivery targets based on event content with no code execution.
---

# JSONPath Routing

Route and reshape webhooks with safe JSONPath rules — no code execution required.

## What It Is

JSONPath routing allows operators to define how incoming webhook events are delivered by evaluating rules against the event body. Instead of forwarding every event to every destination, JSONPath expressions match or transform event content for targeted routing.

## Filter Conditions

Filters control whether an event matches a routing rule. Each condition evaluates a JSONPath expression against the event body:

| Condition | Behavior |
|-----------|----------|
| **`exact`** | Matches events where the extracted value equals the specified string |
| **`regexp`** | Matches events where the extracted value matches a regular expression |
| **`all`** | All sub-conditions must match (logical AND) |
| **`any`** | At least one sub-condition must match (logical OR) |
| **`not`** | Inverts the match result of a sub-condition |

## Filter Examples

```json
{
  "match": {
    "jsonpath": "$.event_type",
    "exact": "charge.completed"
  }
}
```

Route only `charge.completed` events to the payment processing destination:

```json
{
  "match": {
    "jsonpath": "$.account.country",
    "regexp": "^(US|CA|MX)$"
  }
}
```

Match events from North American accounts using regex:

```json
{
  "match": {
    "any": [
      { "jsonpath": "$.type", "exact": "push" },
      { "jsonpath": "$.type", "exact": "pull_request" }
    ]
  }
}
```

Forward both push and pull_request events to a CI/CD destination:

```json
{
  "match": {
    "not": {
      "jsonpath": "$.source",
      "exact": "sandbox"
    }
  }
}
```

Deliver all events except those from a sandbox source.

## Route Selection

Routes are evaluated in priority order. The first matching route determines the delivery destination. If no route matches, the event is handled according to the default routing policy.

```json
{
  "routes": [
    {
      "name": "payment-events",
      "match": { "jsonpath": "$.type", "exact": "charge.completed" },
      "destination": "payment-processor"
    },
    {
      "name": "analytics-events",
      "match": { "jsonpath": "$.source", "regexp": "^analytics_" },
      "destination": "analytics-pipeline"
    }
  ]
}
```

## Error Behavior

| Policy | Behavior |
|--------|----------|
| **`fail_closed`** | If JSONPath evaluation encounters an error (missing field, invalid path), the event is not delivered to this destination |
| **`fail_open`** | If JSONPath evaluation encounters an error, the event is delivered anyway |

## Safety

- JSONPath expressions operate on event body content only
- No JavaScript, Lua, WASM, or user-supplied code execution
- Evaluation is bounded — timeouts and resource limits prevent runaway expressions
- The safe engine enforces a 50ms timeout and 10MB memory limit per expression

## What V1 Supports

| Feature | Status |
|---------|--------|
| `$` root selector | Supported |
| `.` child navigation | Supported |
| `['key']` bracket notation | Supported |
| `[*]` wildcard array access | Supported |
| `[N]` numeric array index | Supported |
| `..` deep scan (limited) | Supported |
| `@.field` current context | Supported |
| String equality matching | Supported |
| `exact` / `regexp` / `all` / `any` / `not` conditions | Supported |
| `fail_closed` / `fail_open` error policies | Supported |
| Event type indexing (exact, prefix, regex) | Supported |

## What V1 Does Not Support

| Feature | Status |
|---------|--------|
| `[start:end:step]` slice notation | V1.1+ |
| `[-N]` negative index | V1.1+ |
| `[?(expression)]` filter expressions | V1.1+ |
| `length()`, `min()`, `max()`, `avg()` aggregate functions | V1.1+ |
| User-defined or custom functions | V1.1+ |
| JavaScript, Lua, WASM, Python, CEL, Rego, or any plugin execution | Not supported |
| Prompt-based local LLM routing | Not available in V1 |

## Related Capabilities

- [JSONPath Transforms](./jsonpath-transforms) — map and reshape webhook payloads
- [Webhook Filtering](./filtering) — condition-based event suppression
- [Webhook Routing and Fan-Out](./routing-and-fan-out) — delivery orchestration
