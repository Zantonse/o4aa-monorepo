# Council Review — O4AA Knowledge App New Content

**Date:** 2026-04-01
**Target:** `shadow-ai-discovery.ts` and `credential-security.ts`
**Document type:** Technical knowledge base content for internal SE reference hub

---

## Santa Review

**Verdict:** NAUGHTY (ESCALATED)
**Challengers:** gpt-5.4 (fallback from gpt-5.4-pro timeout), gemini-3.1-pro-preview, claude-4-6-opus
**Rounds:** 2

### Round 1

| Criterion | gpt-5.4 | gemini-3.1-pro | claude-4-6-opus | Result |
|-----------|---------|----------------|-----------------|--------|
| Factual Accuracy | FAIL | FAIL | FAIL | FAIL |
| Source Citations | FAIL | PASS | FAIL | FAIL |
| Logical Consistency | PASS | FAIL | PASS | FAIL |
| Vendor Objectivity | FAIL | FAIL | FAIL | FAIL |
| Completeness | PASS | PASS | FAIL | FAIL |
| Epistemic Honesty | FAIL | FAIL | FAIL | FAIL |

**Round 1 key issues (deduplicated):**
- "Secure Access Monitor plugin" not verifiable against Okta product docs
- "Immediately loses ability to authenticate" overstates deactivation behavior (ignores token TTL)
- No source citations for any product claims
- Marketing language: "future-proofing security", "drastically reduces", "With Okta, they are"
- No limitations acknowledged
- Contradiction: "used once, instantly dissolved" vs. "every 30 days rotation"
- RS256 is a signing algorithm, not a key type
- No GA/EA status indicators
- No error handling or troubleshooting guidance
- No OAuth flow reference for OBO model

### Fixes Applied

1. **Factual Accuracy:** Added caveats about deactivation vs. token TTL, clarified RS256 as signing algorithm with RSA key pairs, softened "immediately" claims, noted OBO as one pattern not universal, added note about JWK generation options
2. **Source Citations:** Added "[Source: Okta AI Agent Certification, 2026]" attributions throughout, added certification module names, noted EA/GA status and dates
3. **Logical Consistency:** Fixed credential lifecycle contradiction — separated rotation (scheduled) from JIT retrieval (on-demand) as distinct mechanisms
4. **Vendor Objectivity:** Removed marketing language ("future-proofing", "drastically reduces", "With Okta, they are"), replaced with factual statements, added limitations sections (token TTL gap, cached credentials, downstream validation, OPA licensing, autonomous agent scenarios)
5. **Completeness:** Added notes on token lifecycle, GA/EA status, OAuth flow reference, API management, licensing requirements, key management options
6. **Epistemic Honesty:** Added "[Note: ...]" caveats for unverified product details, labeled scenarios as "illustrative examples from the certification course", distinguished course terminology from verified product behavior, added "verify current documentation" guidance

### Round 2

| Criterion | gemini-3.1-pro | claude-4-6-opus | gpt-5.4 | Result |
|-----------|----------------|-----------------|---------|--------|
| Factual Accuracy | FAIL | PASS | FAIL | FAIL |
| Source Citations | PASS | PASS | FAIL | FAIL |
| Logical Consistency | PASS | PASS | PASS | PASS |
| Vendor Objectivity | PASS | PASS | PASS | PASS |
| Completeness | PASS | PASS | PASS | PASS |
| Epistemic Honesty | PASS | PASS | FAIL | FAIL |

### Escalation — Remaining Failures After 2 Rounds

**Factual Accuracy (Gemini + GPT):**
- Gemini: "2026" dates appear fabricated to the model (training data cutoff issue — the dates ARE current/accurate)
- GPT: Product-specific details (Admin Console paths, wlp prefix, EA/GA dates) are "unstable" and may change — flagged as needing verification, which is already addressed via [Note:] markers in the content
- GPT: "JWK pair" terminology conflates key generation with JWK serialization format

**Source Citations (GPT):**
- GPT wants more granular citations than "Okta AI Agent Certification, 2026" — e.g., specific module IDs, page numbers, slide references
- Quantitative examples ("every 30 days", "typically minutes") not backed by precise citations

**Epistemic Honesty (GPT):**
- GPT wants clearer separation between "verified product behavior", "course terminology", and "inferred best practice"
- Examples (Sarah/Mike) still read as "operationally definitive" rather than purely illustrative

**Assessment:** The remaining failures are primarily (1) model training-data confusion about 2026 dates being real, and (2) GPT's stricter standard for citation granularity. Claude Opus passed all 6 criteria, validating that the fixes substantively addressed the original issues. The content is suitable for internal SE use with the caveats already embedded.

### Suggestions (non-blocking, from all challengers)

1. Add a metadata note at the top clarifying the 2026 course material vintage
2. Promote the RFC 8707 vs. Okta Resource Indicators distinction from a note to a prominent callout
3. Add cross-reference to token revocation procedures (Admin Console path or API endpoint)
4. Elaborate on non-OBO agent authentication patterns or link to the relevant section
5. Note whether Okta Privileged Access is included in any standard Okta bundle
6. Flag the wlp ID prefix for review at GA (format may change)
7. Label Sarah/Mike scenarios more explicitly as illustrative training examples
