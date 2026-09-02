#!/usr/bin/env node
/**
 * Post-build step: copy Swagger UI assets, Redoc bundle, and OpenAPI specs into the
 * Docusaurus build output so they are served at the correct URLs.
 *
 * Docusaurus build output is in build/
 * After composition in zen-mesh.io, files land at /docs/swagger-ui.html
 * and /docs/api/openapi.yaml etc.
 *
 * Run after `docusaurus build`.
 */
const { existsSync, mkdirSync, cpSync, readdirSync } = require('fs');
const { join } = require('path');

const BUILD_DIR = join(__dirname, '..', 'build');
const STATIC_DIR = join(__dirname, '..', 'static');
const BUILD_API = join(BUILD_DIR, 'api');

// ── 1. Copy Swagger UI bundle ─────────────────────────────────────────────────
const SWAGGER_FILES = [
  'swagger-ui.html',
  'api/swagger-ui.css',
  'api/swagger-ui-bundle.js',
  'api/swagger-initializer.js',
];

for (const file of SWAGGER_FILES) {
  const src = join(STATIC_DIR, file);
  const dest = join(BUILD_DIR, file);
  if (existsSync(src)) {
    mkdirSync(join(dest, '..'), { recursive: true });
    cpSync(src, dest);
    console.log(`Copied: ${file}`);
  } else {
    console.warn(`WARNING: swagger-ui asset not found: ${src}`);
  }
}

// ── 2. Copy Redoc standalone bundle ───────────────────────────────────────────
const REDOC_FILES = [
  'api/redoc.html',
  'api/redoc.standalone.js',
];

for (const file of REDOC_FILES) {
  const src = join(STATIC_DIR, file);
  const dest = join(BUILD_DIR, file);
  if (existsSync(src)) {
    mkdirSync(join(dest, '..'), { recursive: true });
    cpSync(src, dest);
    console.log(`Copied: ${file}`);
  } else {
    console.warn(`WARNING: redoc asset not found: ${src}`);
  }
}

// ── 3. Copy public OpenAPI YAML + JSON ────────────────────────────────────────
const OPENAPI_FILES = ['api/openapi.yaml', 'api/openapi.json'];
for (const file of OPENAPI_FILES) {
  const src = join(STATIC_DIR, file);
  const dest = join(BUILD_DIR, file);
  if (existsSync(src)) {
    mkdirSync(join(dest, '..'), { recursive: true });
    cpSync(src, dest);
    console.log(`Copied: ${file}`);
  } else {
    console.warn(`WARNING: OpenAPI file not found: ${src}`);
  }
}

console.log('✅ Swagger UI + Redoc + OpenAPI post-build copy complete');
