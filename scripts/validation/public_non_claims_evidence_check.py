#!/usr/bin/env python3
"""
Public Non-Claims Evidence Check

Validates that all public non-claim objects have evidence-backed status.

Usage:
    python3 scripts/validation/public_non_claims_evidence_check.py
"""

import sys
import json
from pathlib import Path

NON_CLAIMS_PATH = Path.home() / 'zenmesh' / 'docs' / 'static' / 'ai' / 'evidence' / 'v1' / 'non-claims.json'

REQUIRED_EVIDENCE_KEYWORDS = [
    'source', 'evidence_required', 'evidence_reference', 'evidence_source',
    'evidence_collected', 'scan_date', 'verification_date',
    'runtime_inventory', 'manifest_scan', 'source_scan', 'public_surface_scan'
]

def load_non_claims():
    with open(NON_CLAIMS_PATH, 'r') as f:
        return json.load(f)

def check_evidence_backed(item):
    evidence_status = item.get('evidence_status', 'unknown')
    
    if evidence_status == 'explicitly_false':
        return True, []
    
    if evidence_status in ['evidence_incomplete', 'needs_revalidation']:
        return True, [f"  ⚠ {item['id']}: status '{evidence_status}' - review required"]
    
    if evidence_status == 'not_claimed':
        has_evidence = False
        for key in REQUIRED_EVIDENCE_KEYWORDS:
            value = item.get(key, '')
            if value and str(value) not in ['N/A', 'None', '', 'not claimed']:
                has_evidence = True
                break
        
        if not has_evidence:
            return False, [
                f"  ✗ {item['id']}: 'not_claimed' without evidence reference",
                f"    Claim: {item.get('claim', 'N/A')[:60]}..."
            ]
        return True, []
    
    return False, [f"  ✗ {item['id']}: unknown status '{evidence_status}'"]

def main():
    print("="*80)
    print("PUBLIC NON-CLAIMS EVIDENCE VALIDATION")
    print("="*80)
    print()
    
    non_claims = load_non_claims()
    print(f"Loaded {len(non_claims)} non-claims")
    print()
    
    failed = []
    passed = []
    warnings = []
    
    for item in non_claims:
        is_evidence_backed, issues = check_evidence_backed(item)
        
        if not is_evidence_backed:
            failed.extend(issues)
        elif 'evidence_incomplete' in str(item.get('evidence_status', '')):
            warnings.extend(issues)
        else:
            passed.extend(issues)
    
    print(f"✓ Passed: {len(passed)}")
    for issue in passed[:5]:
        print(issue)
    
    if warnings:
        print(f"⚠ Warnings: {len(warnings)}")
        for issue in warnings[:5]:
            print(issue)
    
    if failed:
        print(f"✗ Failed: {len(failed)}")
        for issue in failed:
            print(issue)
        print()
        print("GATE RESULT: FAIL")
        return 1
    else:
        print()
        print("GATE RESULT: PASS")
        return 0

if __name__ == '__main__':
    sys.exit(main())
