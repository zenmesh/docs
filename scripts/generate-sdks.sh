#!/usr/bin/env bash
# Generate Python and TypeScript SDKs from the canonical public OpenAPI spec.
# Requires: Java 17+, OpenAPI Generator CLI jar (pinned v7.7.0)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SPEC="$DOCS_DIR/api-specifications/zen-mesh-api.v1.public.yaml"
GEN_DIR="$DOCS_DIR/generated"
JAR="${OPENAPI_GENERATOR_JAR:-/tmp/openapi-generator-cli.jar}"

CODEGEN_VERSION="7.7.0"
CODEGEN_URL="https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${CODEGEN_VERSION}/openapi-generator-cli-${CODEGEN_VERSION}.jar"

# Pin openapi-generator-cli.jar if not present
if [[ ! -f "$JAR" ]]; then
    echo "Downloading pinned OpenAPI Generator CLI ${CODEGEN_VERSION}..."
    curl -sLo "$JAR" "$CODEGEN_URL"
fi

JAR_VERSION=$(java -jar "$JAR" version 2>/dev/null | head -1 || echo "unknown")
echo "Using: $JAR_VERSION"

echo "=== Python SDK ==="
rm -rf "$GEN_DIR/python"
java -jar "$JAR" generate \
    -i "$SPEC" \
    -g python \
    -o "$GEN_DIR/python" \
    --additional-properties=packageName=zen_mesh_api,projectName=zen-mesh-api \
    2>&1 | tail -3

# Fix tsconfig deprecation for TypeScript 6+
TSCONFIG="$GEN_DIR/typescript/tsconfig.json"
if [[ -f "$TSCONFIG" ]]; then
    sed -i 's/"target": "es5"/"target": "es2017"/' "$TSCONFIG"
    if ! grep -q 'ignoreDeprecations' "$TSCONFIG"; then
        sed -i 's/"moduleResolution": "node"/"moduleResolution": "node",\n    "ignoreDeprecations": "6.0"/' "$TSCONFIG"
    fi
fi

echo "=== TypeScript SDK ==="
rm -rf "$GEN_DIR/typescript"
java -jar "$JAR" generate \
    -i "$SPEC" \
    -g typescript \
    -o "$GEN_DIR/typescript" \
    --additional-properties=npmName=@zen-mesh/api-client,npmVersion=0.0.1,typescriptVersion=5.0 \
    2>&1 | tail -3

# Fix tsconfig in TypeScript output too
TSCONFIG="$GEN_DIR/typescript/tsconfig.json"
if [[ -f "$TSCONFIG" ]]; then
    sed -i 's/"target": "es5"/"target": "es2017"/' "$TSCONFIG"
fi

echo "=== Done ==="
echo "Python: $GEN_DIR/python"
echo "TypeScript: $GEN_DIR/typescript"
