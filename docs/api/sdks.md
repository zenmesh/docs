---
sidebar_label: SDKs
title: Generated SDKs
description: Generated Python and TypeScript clients from the Zen Mesh public OpenAPI spec.
---

# Generated SDKs

SDKs are generated from the [public OpenAPI spec](/docs/api/openapi.yaml) using [OpenAPI Generator](https://openapi-generator.tech/). They are derived artifacts — the canonical source of truth is always the [OpenAPI spec](/docs/api/openapi.yaml) and the [Interactive API Reference](./swagger/).

:::warning GENERATED_PREVIEW
SDKs are generated from the public OpenAPI spec. They have not been independently tested. They are provided as a starting point; verify behavior against the live API before production use.
:::

## Python SDK

```bash
# Generate the client
openapi-generator-cli generate \
  -i https://www.zen-mesh.io/docs/api/openapi.yaml \
  -g python \
  -o zen_mesh_api

# Or use the pre-built generated output
# See: generated/python/ in the docs repository
```

```python
from zen_mesh_api import ZenMeshApi

client = ZenMeshApi(api_key="your_api_key")

# List planes
planes = client.planes.list_planes(tenant_id="tid_xxx")
print(planes)
```

## TypeScript SDK

```bash
# Generate the client
openapi-generator-cli generate \
  -i https://www.zen-mesh.io/docs/api/openapi.yaml \
  -g typescript \
  -o zen-mesh-api-client
```

```typescript
import { ZenMeshApiClient } from '@zen-mesh/api-client';

const client = new ZenMeshApiClient({ apiKey: 'your_api_key' });

// List planes
const planes = await client.planes.listPlanes({ tenantId: 'tid_xxx' });
console.log(planes);
```

## Source

Generated output lives in `generated/` in the docs repository:

- `generated/python/` — Python package
- `generated/typescript/` — TypeScript package

The generation is driven by `scripts/generate-sdks.sh` from `api-specifications/zen-mesh-api.v1.public.yaml`.

## Regenerating

```bash
cd docs
./scripts/generate-sdks.sh
```

Requires: Java 17+, [OpenAPI Generator CLI](https://openapi-generator.tech/) v7.7.0.

## Relationship to OpenAPI

```
zen-mesh-api.v1.public.yaml (PUBLIC_CUSTOMER filter)
  └── OpenAPI Generator v7.7.0
        ├── Python SDK  → generated/python/
        └── TypeScript SDK  → generated/typescript/
```

The same spec that drives the [API Reference](./swagger/) drives the SDKs. Any change to the public OpenAPI spec is reflected in both.

## Not Published Yet

These SDKs are generated on-demand. They are not yet published to PyPI or npm. Generate them yourself using the commands above, or fork the `generated/` directory in the docs repository.
