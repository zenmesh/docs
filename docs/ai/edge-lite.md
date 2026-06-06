# Edge Lite - Pre-Launch Design-Partner Evaluation

**This page describes Edge Lite in design-partner/eval mode only. Not production-ready. Not customer-ready.**

---

## What Is Edge Lite

Edge Lite is a single-container evaluation mode of ZenMesh Edge that requires **no Kubernetes**. It uses a Docker installation path with the same enrollment bundle as the Helm-based ZenMesh Edge for Kubernetes customers.

**Install options:**
- **Helm path**: `helm install zen-edge ./deploy/edge-lite/helm` - for serious Kubernetes customers
- **Docker Edge Lite path**: `curl -fsSL https://get.zenmesh.io/edge-lite | bash` - for design partners and eval customers

Both install options produce the same enrollment intent document structure and use the same trust anchors.

---

## Quick Install (No Bundle Required)

**New:** Get started without an enrollment bundle. No Kubernetes required.

```bash
curl -fsSL https://get.zen-mesh.io | bash
```

The script will:
1. Create a short-lived install session
2. Open your browser for signup/login (Google SSO, or email)
3. Automatically select a Webhook Entry Point (AWS us-east-1, shared, free)
4. Create a personal EDGE plane for you
5. Prompt for endpoint name (default: my-first-endpoint) and target URL (default: http://localhost:8080)
6. Run a local reachability check (warning only, not blocking)
7. Print your final webhook URL, management URL, and test curl command

> **Note:** Other providers and regions coming soon.

**Non-claims:**
- launch_ready = false
- customer_ready = false
- prod_live = false
- free_tier_ready = false
- zero_trust_complete = false

---

## Current Status: Design-Partner Evaluation Only

### What Can Be Evaluated Today

- **Same-bundle model**: Helm and Docker Edge Lite use the same enrollment bundle contract (H498)
- **Installer dry-run**: The installer supports dry-run mode to validate enrollment intent without contacting the SaaS backend (H499)
- **Dual-install UI**: The SaaS UI shows both Helm and Docker Edge Lite install options (H502)
- **Operator visibility structure**: The UI contract defines 14 status fields for operators (H506)
- **Operator visibility fixture**: The UI shows what operators will see with demo/fixture data (H506B)

### What Is Fixture/Demo Only

- **Enrollment**: Real enrollment is pending S171 runtime implementation
- **Heartbeat**: Real heartbeat is pending S171 runtime implementation
- **Delivery**: Real SaaS delivery is pending S172 runtime implementation
- **Operator visibility data**: The UI shows fixture data only; real API data is not wired (H506B clearly marks this)

### Launch Blockers

- **Signing/provenance**: Blocked by missing keyless identity (H505)
- **Real enrollment**: Blocked on S171 runtime implementation
- **Real delivery**: Blocked on S172 runtime implementation
- **Real operator visibility**: Blocked on S171/S172 API data wiring

---

## Non-Claims

- launch_ready = false
- customer_ready = false
- prod_live = false
- free_tier_ready = false
- zero_trust_complete = false
- real_enrollment_implementation = false (pending S171)
- real_saas_delivery = false (pending S172)
- real_operator_visibility = false (pending S171/S172 data wiring)
- signing_executed = false (pending keyless identity)
- provenance_generated = false (pending keyless identity)
- release_gates_complete = false

---

## What Design Partners Can Evaluate Today

1. **Same-bundle model**: Review the contract showing Helm and Docker use the same enrollment bundle
2. **Installer dry-run**: Run the installer in dry-run mode to validate intent structure
3. **Dual-install UI**: Review screenshots showing both install options in the SaaS UI
4. **Operator visibility structure**: Review the contract defining 14 status fields
5. **Operator visibility fixture**: Review screenshots showing the UI with fixture data

---

## What Design Partners Cannot Evaluate Yet

- Real enrollment (blocked on S171)
- Real heartbeat (blocked on S171)
- Real delivery (blocked on S172)
- Real operator visibility data (blocked on S171/S172)
- Signing execution (blocked on missing keyless identity)
- Provenance generation (blocked on missing keyless identity)

---

## Language: What You Can and Cannot Say

### Safe To Say

- "We have contract-level support for both Helm and Docker Edge Lite install options using the same enrollment bundle"
- "The installer supports dry-run mode to validate enrollment intent"
- "We have an operator visibility UI contract and fixture showing what operators will see"
- "Real enrollment and delivery are pending runtime implementation (S171/S172)"
- "Signing/provenance tooling exists but execution is blocked by missing keyless identity"
- "This is fixture/demo data only. Not production-ready."
- "Design-partner evaluation only."

### Do Not Say

- "Edge Lite is production-ready"
- "Edge Lite is customer-ready"
- "Customers can deploy Edge Lite today"
- "Docker Edge Lite is publicly available"
- "Enrollment works end-to-end"
- "Operator visibility is functional"
- "Events are delivered"
- "Images are signed"
- "Provenance is generated"
- "Secure"
- "Guaranteed"
- "Compliance certified"
- "Free-tier ready"

---

## Related Evidence

- H498: Install UX contract and config
- H499: Installer dry-run proof
- H502: Dual-install UI rendered proof
- H505: Signing/provenance preflight blocker
- H506: Operator visibility contract
- H506B: Operator visibility self-contained rendered proof
- H507: Design-partner onboarding runbook

---

## Next Gates

1. **S171**: Real enrollment runtime and local control-plane smoke
2. **S172**: Real SaaS delivery implementation
3. **Keyless identity**: Configure sigstore/cosign for signing/provenance execution
4. **Real operator visibility**: Wire enrollment API + heartbeat API + delivery API data to UI
5. **H504 launch gate**: Self-serve/free-tier/private-beta readiness (depends on S171/S172 + keyless identity)