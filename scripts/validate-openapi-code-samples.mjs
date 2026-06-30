#!/usr/bin/env node3
/**
 * OpenAPI Example Semantic Validator
 * Validates all x-codeSamples in the OpenAPI spec
 */

import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OPENAPI_YAML = join(__dirname, '../static/openapi/zen-mesh-user-api.v1.yaml');

function validateSample(sample, lang) {
  const errors = [];
  const warnings = [];

  // Check for required fields
  if (!sample.lang) {
    errors.push('Missing lang field');
  }
  if (!sample.label) {
    errors.push('Missing label field');
  }
  if (!sample.source) {
    errors.push('Missing source field');
  }

  const source = sample.source || '';

  // Check for forbidden patterns
  if (source.includes('support@zen-platform.com')) {
    errors.push('Contains support@zen-platform.com email');
  }
  if (source.includes('@latest')) {
    errors.push('Uses @latest CDN');
  }
  if (source.match(/tenant_[a-f0-9]{36}/i) || source.match(/plane_[a-f0-9]{36}/i)) {
    errors.push('Contains real-looking tenant/plane IDs');
  }
  if (source.includes('Bearer sk_live') || source.includes('Bearer sk_test') || source.includes('Bearer sk-')) {
    errors.push('Contains API key patterns');
  }
  if (source.match(/https:\/\/api\.stripe\.com\//)) {
    errors.push('Contains Stripe API URLs');
  }

  // Check for common env var patterns
  const requiredEnvs = ['ZEN_API_BASE', 'ZEN_API_TOKEN', 'ZEN_TENANT_ID'];
  for (const env of requiredEnvs) {
    if (source.includes(`\\${env}`) || source.includes(`{${env}}`)) {
      warnings.push(`Uses ${env} (expected)`);
    }
  }

  // Check for forbidden paths
  if (source.includes('/api/admin') || source.includes('/admin') || source.includes('/internal')) {
    errors.push('Contains internal/admin paths');
  }

  // Check for fake /planes paths
  if (source.includes('/planes') || source.includes('/planes/')) {
    errors.push('Contains fake /planes paths');
  }

  return { errors, warnings };
}

async function validateOpenAPIExamples() {
  console.log('📖 Validating OpenAPI examples...\n');

  try {
    const yamlContent = fs.readFileSync(OPENAPI_YAML, 'utf-8');
    const spec = yaml.load(yamlContent);

    let totalOperations = 0;
    let operationsWithSamples = 0;
    let operationsWithCurl = 0;
    let operationsWithPython = 0;
    let operationsWithJavaScript = 0;
    const errors = [];
    const warnings = [];

    if (!spec.paths) {
      console.log('❌ No paths found in OpenAPI spec');
      return;
    }

    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        if (!['get', 'post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
          continue;
        }

        totalOperations++;

        const operationId = operation.operationId || operation.summary || path;

        // Check for x-codeSamples
        const codeSamples = operation['x-codeSamples'] || [];
        if (codeSamples.length === 0) {
          errors.push(`No x-codeSamples for ${method.toUpperCase()} ${path} (${operationId})`);
          continue;
        }

        operationsWithSamples++;

        for (const sample of codeSamples) {
          const lang = sample.lang || '';
          const validation = validateSample(sample, lang);

          if (validation.errors.length > 0) {
            errors.push(`\n  ❌ ${method.toUpperCase()} ${path} (${operationId}) [${lang}]`);
            errors.push('     ' + validation.errors.join('\n     '));
          }

          if (validation.warnings.length > 0) {
            warnings.push(`\n  ⚠️  ${method.toUpperCase()} ${path} (${operationId}) [${lang}]`);
            warnings.push('     ' + validation.warnings.join('\n     '));
          }

          if (lang === 'bash' || lang === 'curl') {
            operationsWithCurl++;
          } else if (lang === 'Python') {
            operationsWithPython++;
          } else if (lang === 'JavaScript') {
            operationsWithJavaScript++;
          }
        }
      }
    }

    // Report results
    console.log(`\n📊 Results:`);
    console.log(`   Total operations: ${totalOperations}`);
    console.log(`   Operations with examples: ${operationsWithSamples}/${totalOperations}`);
    console.log(`   Curl coverage: ${operationsWithCurl}/${operationsWithSamples}`);
    console.log(`   Python coverage: ${operationsWithPython}/${operationsWithSamples}`);
    console.log(`   JavaScript coverage: ${operationsWithJavaScript}/${operationsWithSamples}`);

    if (errors.length > 0) {
      console.log(`\n❌ Found ${errors.length} error(s):`);
      for (const error of errors) {
        console.log(error);
      }
      process.exit(1);
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  Found ${warnings.length} warning(s):`);
      for (const warning of warnings) {
        console.log(warning);
      }
    }

    console.log(`\n✅ All examples validated successfully!`);

  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

validateOpenAPIExamples();
