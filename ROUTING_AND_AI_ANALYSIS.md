# Routing & AI Model Analysis Report

Generated: 2026-05-01

## Issues Found & Solutions

### 1. Dashboard Routing Issues

#### Problems Identified:

**Issue 1.1: Incorrect Redirect Path**
- **Location**: `src/app/dashboard/page.tsx`
- **Problem**: Redirects to `/dashboard/resumes` instead of `/app/dashboard/resumes`
- **Impact**: Creates 404 error when accessing dashboard root
- **Current Code**:
  ```typescript
  redirect("/dashboard/resumes");  // ❌ Wrong
  ```
- **Fix**: Use correct path
  ```typescript
  redirect("/app/dashboard/resumes");  // ✓ Correct
  ```

**Issue 1.2: Navigation Path Mismatch**
- **Location**: `src/app/dashboard/client.tsx` (lines 38-60)
- **Problem**: Sidebar items reference `/app/dashboard/*` but these need to align with actual route structure
- **Current Paths**:
  - `/app/dashboard/resumes` ✓ (exists)
  - `/app/dashboard/templates` ✓ (exists)
  - `/app/dashboard/ai` ✓ (exists)
  - `/app/dashboard/settings` ✓ (exists)
- **Status**: All pages exist but redirect issue prevents access

**Issue 1.3: Potential Pathname Comparison Issue**
- **Location**: `src/app/dashboard/client.tsx` (lines 78-83)
- **Problem**: Active link detection may fail if pathname includes locale prefix
- **Code**:
  ```typescript
  const isItemActive = (item: MenuItem) => {
    if (item.items) {
      return item.items.some((subItem) => pathname === subItem.href);
    }
    return item.url === pathname || item.href === pathname;  // May not match
  };
  ```
- **Current Status**: Locales are configured as `["en"]` with defaultLocale `"en"`, so pathname likely won't have prefix
- **Recommendation**: Consider more robust path matching that handles future locale expansion

#### Root Cause Analysis:
The redirect path in `dashboard/page.tsx` is missing the `/app/` segment, causing navigation to fail. This breaks the entry point to the dashboard.

---

### 2. OpenRouter & DeepSeek-V3 Model Coverage Analysis

#### Model Configuration:
- **Provider**: OpenRouter
- **Model**: DeepSeek-V3 (via `deepseek/deepseek-chat`)
- **API Configuration**: Located in `src/config/ai.ts`
- **Status**: Hardcoded as the only available option (lines 23-32 in `src/app/dashboard/ai/page.tsx`)

#### Features Requiring AI:

| Feature | Endpoint | Prompt Type | DeepSeek-V3 Capable? | Notes |
|---------|----------|------------|----------------------|-------|
| **Grammar Check** | `/api/grammar` | JSON extraction task | ✓ YES | Requires JSON mode, error identification |
| **Text Polishing** | `/api/polish` | Content rewriting | ✓ YES | Requires style improvement, creative ability |
| **Resume Optimization** | (implied) | Content generation | ✓ YES | Professional writing, structure improvement |

#### DeepSeek-V3 Assessment:

**Strengths** ✓:
- General-purpose LLM with strong instruction following
- Supports JSON response format (`response_format: { type: "json_object" }`)
- Good at code/technical content understanding
- Supports streaming output (used in `/api/polish` route)
- Cost-effective via OpenRouter
- Low latency - suitable for real-time editing

**Limitations** ⚠:
- Not specialized for grammar/proofreading (optimized for general tasks)
- May miss subtle grammatical nuances that domain-specific models catch
- Text polishing may be generic compared to dedicated writing models
- No fine-tuning for resume-specific language patterns

**Capability Verdict**:
✓ **DeepSeek-V3 CAN cover all current features**, but may not be optimal for grammar checking where specialized models (like Claude, GPT-4) would be superior.

---

#### Current Architecture Issues:

**Issue 2.1: Over-Simplified Model Strategy**
- **Location**: `src/app/dashboard/ai/page.tsx` (lines 23-32)
- **Problem**: Forces single model choice with hardcoded DeepSeek-V3
- **Impact**:
  - Users cannot choose different models for different tasks
  - No fallback if OpenRouter has issues
  - Cannot leverage specialized models (e.g., better grammar checkers)

**Issue 2.2: All Models Configured But Hidden**
- **Location**: `src/config/ai.ts` and `src/store/useAIConfigStore.ts`
- **Problem**: System supports Doubao, DeepSeek, OpenAI, Gemini, OpenRouter but UI only shows OpenRouter
- **Current Code** (lines 23-32 in ai/page.tsx):
  ```typescript
  // Force OpenRouter as the only choice
  useEffect(() => {
    if (selectedModel !== "openrouter") {
      setSelectedModel("openrouter");
    }
    if (!openrouterModelId || openrouterModelId === "") {
      setOpenrouterModelId("deepseek/deepseek-chat");
    }
  }, [selectedModel, openrouterModelId, setSelectedModel, setOpenrouterModelId]);
  ```
- **Recommendation**: Allow model selection or at least document the choice

**Issue 2.3: No Task-Specific Model Routing**
- **Location**: API routes (`/api/grammar`, `/api/polish`)
- **Problem**: All tasks use the same model type
- **Potential Improvement**: 
  - Use specialized grammar model (Claude/GPT-4 better at this)
  - Use general model for polishing (cost-effective)

---

## Recommended Fixes

### Priority 1: Fix Dashboard Routing (Critical)
```typescript
// File: src/app/dashboard/page.tsx
// Change line 4:
- redirect("/dashboard/resumes");
+ redirect("/app/dashboard/resumes");
```

### Priority 2: Improve Active Navigation Detection
```typescript
// File: src/app/dashboard/client.tsx
// More robust path matching
const isItemActive = (item: MenuItem) => {
  if (item.items) {
    return item.items.some((subItem) => pathname.endsWith(subItem.href));
  }
  return pathname.endsWith(item.url || item.href || "");
};
```

### Priority 3: Document DeepSeek-V3 Limitations
- Create user documentation about model capabilities
- Note that grammar checking may miss some errors
- Recommend users test with their resume content

### Priority 4: Optional - Enable Model Selection
If users should be able to switch models:
```typescript
// Uncomment other model options in ai/page.tsx
// Allow user selection instead of forcing DeepSeek-V3
// This requires keeping the full model UI
```

---

## Summary

### Routing Status: 🔴 BROKEN
- **Issue**: Dashboard cannot be accessed due to redirect path mismatch
- **Severity**: CRITICAL
- **Fix Time**: < 5 minutes
- **Root Cause**: Typo in redirect path (missing `/app/` segment)

### AI Model Coverage: 🟢 ACCEPTABLE
- **Status**: DeepSeek-V3 can handle all required features
- **Limitation**: Not optimal for grammar checking (general-purpose model)
- **Recommendation**: Current choice is pragmatic for cost/speed tradeoff
- **Risk**: Low - will work, but may miss some grammatical issues

### Overall Assessment: 
**Routing must be fixed immediately.** AI model choice is acceptable but consider:
1. Documenting grammar checking limitations to users
2. Planning optional model switching for power users
3. Testing grammar detection quality with real resume content
