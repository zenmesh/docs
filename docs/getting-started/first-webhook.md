---
sidebar_label: First Webhook
---

# Your First Webhook

> **Note:** This guide reflects the legacy Kubernetes-based workflow and uses older terminology (Destination). For the current UI-first evaluator path, see [First 15 Minutes](../getting-started/first-15-minutes) or [Quick Start](../getting-started/quick-start).
>
> Status: PUBLIC_CONTRACT_DRAFT. Uses legacy internal terms. See [Current Status](../reference/current-status) for capability maturity.

## Target Service (Kubernetes)

Create a simple webhook receiver in your cluster:

```bash
kubectl create deployment webhook-echo \
  --image=hashicorp/http-echo \
  --namespace zen-mesh \
  -- --listen=:8080 --text="webhook received!"

kubectl expose deployment webhook-echo \
  --port=8080 \
  --namespace zen-mesh
```

## Create a Target

1. Go to **Connect → Targets** in the dashboard
2. Click **Create Target**
3. Fill in:
   - **Name:** `my-first-target`
   - **URL:** `http://webhook-echo:8080/webhooks`
   - **Cluster:** Select your connected cluster
4. Click **Save**

## Configure Your Webhook Source

### Stripe (example)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **Add endpoint**
3. Paste the ingestion URL from your endpoint
4. Select events: `payment_intent.succeeded`, `invoice.paid`
5. Click **Create endpoint**

### GitHub (example)

1. Go to your repository → Settings → Webhooks → Add webhook
2. Paste the ingestion URL from your endpoint
3. Content type: `application/json`
4. Select events: `push`, `pull_request`
5. Click **Add webhook**

### Generic cURL Test

```bash
curl -X POST "<your-ingestion-url>" \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": "hello from zen-mesh"}'
```

## Verify Delivery

1. Go to **Traffic → Deliveries** in the dashboard
2. You should see the event with a **200** or **Delivered** status
3. Check the pod logs:
   ```bash
   kubectl logs -n zen-mesh -l app=webhook-echo --tail=20
   ```

## Non-Claims

- This guide uses example provider setup — not production-live provider validation
- Ingestion URL shown is an example — actual URL assigned on endpoint creation
- Kubernetes cluster must have zen-agent connected for private network delivery
- Delivery guarantees are scenario-specific (local/sandbox), not production-level
- See [Current Status](../reference/current-status) for capability maturity
