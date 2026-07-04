---
sidebar_label: Zen Mesh Concepts
---

# Zen Mesh Concepts

> Status: PUBLIC_CONTRACT_DRAFT. Definitions below carry individual status per component. Not a production-live claim.

## Planes

Zen Mesh is organized into three planes plus a lightweight variant. A **Kubernetes cluster** is a deployment substrate for an edge plane, not the product root. See the full [Planes page](./planes) for details.

### Control Plane
The SaaS runtime that provides configuration surfaces (UI, API, MCP, Git). Manages edge-plane registration, endpoints, targets, flows, and evidence. Never sees event payloads.

### Data Plane
The delivery runtime that ingests events from sources and delivers them to targets. Handles retry, replay, DLQ, and evidence generation. Operates independently of the control plane.

### Edge Plane
Runs in the customer environment and connects outbound only. Requires zen-agent; optionally includes zen-ingester and zen-egress. Available as [Kubernetes Edge Plane](../install/kubernetes-edge-plane) or [Edge Lite](../install/edge-lite).

### Edge Lite
A lightweight non-Kubernetes runtime path for evaluation and low-traffic use cases. See [Edge Lite](../install/edge-lite).

**See:** [Planes](./planes), [Choose a Runtime Path](../install/choose-runtime-path)

## Template

A reusable source configuration. Templates define how Zen Mesh receives events from a provider (Stripe, GitHub, Twilio, Shopify) or from a custom HTTP source. Templates exist as reference starting points — you select one when creating an endpoint.

**Status:** WIRED_SANDBOX

**See:** [Endpoints API](../api/endpoints), [Endpoints guide](../guides/endpoints)

## Blueprint

A validated template instantiation with pre-configured defaults. Blueprints reduce endpoint setup to filling in provider-specific fields (e.g., Stripe signing secret, GitHub webhook secret). Not every template has a corresponding blueprint in all environments.

**Status:** WIRED_SANDBOX

## Flow

A declarative delivery contract that connects an endpoint to a target. Flows define:
- Which events are routed (filter rules)
- How payloads are transformed (JSONPath transforms)
- Where events are delivered (target)
- Retry policy and backoff configuration

A flow is the unit of routing in Zen Mesh.

**Status:** WIRED_SANDBOX

**See:** [Flows API](../api/flows)

## Endpoint

A webhook source receiver. An endpoint is where events arrive. Each endpoint has an ingestion URL and is associated with a source type (Stripe, GitHub, Custom). Endpoints receive events from external providers.

**Alias (internal):** Ingester

**Status:** WIRED_SANDBOX

**See:** [Endpoints API](../api/endpoints)

## Target

A delivery destination. A target is where events are sent after being received and processed by a flow. Targets are typically HTTP(S) URLs that you control.

**Alias (internal):** Destination

**Status:** WIRED_SANDBOX

**See:** [Targets API](../api/targets)

## Attempt

One execution of delivery to a target. An attempt represents the system's effort to deliver a single event to a single target. Attempts have a status (delivered, failed, pending) and carry timing and response data.

**Status:** WIRED_SANDBOX

**See:** [Delivery Attempts API](../api/delivery-attempts)

## Dead Letter Queue (DLQ)

A view of failed delivery attempts. The DLQ is not a separate queue — it is the set of deliveries whose status is `failed`. Failed deliveries can be inspected and retried.

**Status:** WIRED_SANDBOX

**See:** [DLQ API](../api/dlq)

## Retry

Re-attempting delivery of a failed event to its original target. Retry is idempotent — retrying an already-retried delivery does not create duplicates. Single and batch retry are supported.

**Status:** WIRED_SANDBOX

**See:** [Retry API](../api/retry)

## Replay

Recreating delivery of an event from retained payload or context. Replay differs from retry: retry re-attempts delivery to the original target, while replay can deliver to the same or a different target using the retained payload.

**Important:** Replay requires retained payload/context. If the payload has exceeded the retention window or was never retained, replay is not available.

**Status:** WIRED_SANDBOX (gated)

**See:** [Replay API](../api/replay)

## Trace

A delivery and evidence spine. A trace follows an event from ingestion through each delivery attempt to its evidence receipt. Traces are NOT full distributed tracing — there is no OpenTelemetry integration, no span propagation, and no cross-service trace context in V1.

**Status:** WIRED_SANDBOX

**See:** [Traces API](../api/traces)

## Saved Payload

A reusable test or template payload stored for development and testing. Saved payloads are manually saved and user-managed. They are NOT production retained webhook payloads.

**Status:** WIRED_SANDBOX

**See:** [Saved Payloads API](../api/saved-payloads)

## Retained Payload

A production event payload retained as part of delivery history. Retention is plan-based (7–30+ days). Retained payloads are required for replay. They are stored on the delivery record, not as a saved payload.

**Status:** WIRED_SANDBOX (plan-gated)

## Evidence

Cryptographic proof of delivery and trace integrity. Evidence includes Merkle receipts that can be independently verified. Evidence is created by the platform during delivery, not by users.

**Status:** WIRED_SANDBOX

**See:** [Evidence API](../api/evidence)

## Zen Configuration Contract (ZCC)

The declarative representation of every Zen Mesh operation. The ZCC is the source of truth — UI, CLI, API, MCP, and Git surfaces all produce and consume ZCC artifacts. The contract validates, audits, and enforces operations regardless of which surface initiated them.

**Status:** PUBLIC_CONTRACT_DRAFT

**See:** [ZCC overview](../product/zen-configuration-contract)

## Control Surface

A path to interact with Zen Mesh. Each control surface — UI, Customer API, MCP, CLI, Git — reads and writes the same ZCC. Surfaces differ in audience, auth model, and write permissions, but they do not differ in contract validation or audit.

**See:** [Control Surfaces](../concepts/control-surfaces)
