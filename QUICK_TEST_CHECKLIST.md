# Quick Test Checklist - Jobly Resume Editor

**Last Updated**: 2026-05-01  
**Test Environment**: http://localhost:3000  
**Status**: Ready for Testing

---

## 🚀 QUICK START - Test These First

### 1. Landing Page (1 min)
```
URL: http://localhost:3000/
✓ Page loads
✓ Click "Get Started" button
✓ Redirects to /app/dashboard/resumes
```

### 2. Create First Resume (2 min)
```
URL: http://localhost:3000/app/dashboard/resumes
✓ Click "Create Resume" button
✓ Enter name (e.g., "My First Resume")
✓ Select a template
✓ Submit
✓ Confirm resume appears in list
```

### 3. Edit Resume (5 min)
```
✓ Click "Edit" on resume card
✓ Fill in Name
✓ Fill in Email
✓ Add one Experience entry
✓ Watch preview update in real-time
✓ Close browser and reopen
✓ Confirm data still there (auto-save)
```

### 4. Export PDF (2 min)
```
✓ Click "Export" or "Download PDF" button
✓ PDF downloads
✓ Open PDF
✓ Verify layout and content matches preview
✓ Check text is readable
```

### 5. Test Dashboard Navigation (1 min)
```
✓ Click "Resumes" in sidebar → /app/dashboard/resumes
✓ Click "Templates" in sidebar → /app/dashboard/templates
✓ Click "AI" in sidebar → /app/dashboard/ai
✓ Click "Settings" in sidebar → /app/dashboard/settings
✓ Sidebar highlights active section
```

---

## 🧠 AI FEATURES TESTING (Requires API Key)

### Setup AI First
```
URL: http://localhost:3000/app/dashboard/ai
1. Get API key from https://openrouter.ai/keys
2. Paste key in "OpenRouter API Key" field
3. Save (auto-saves to localStorage)
4. Check status shows "Ready to use AI features"
```

### Test Grammar Check
```
In Resume Editor → Description field:
1. Type text with error: "I am a manger with 5 yeers experience"
2. Look for Grammar Check button (icon or menu)
3. Click Grammar Check
4. API request sent to: POST /api/grammar
5. Should show errors detected
6. Verify suggestions are correct
7. Apply corrections
```

### Test Text Polish
```
In Resume Editor → Any description field:
1. Type simple text: "I did stuff at work and was good at it"
2. Look for Polish/Improve button
3. Click Polish
4. API request sent to: POST /api/polish
5. Should show improved version
6. Click "Apply" to use polished text
```

---

## 📋 CORE FEATURE CHECKLIST

### ✅ Dashboard Sections
- [ ] Dashboard/Resumes page loads
- [ ] Dashboard/Templates page loads
- [ ] Dashboard/AI page loads
- [ ] Dashboard/Settings page loads
- [ ] All sidebar links work
- [ ] Active nav item is highlighted

### ✅ Resume Management
- [ ] Create new resume
- [ ] Resume appears in list
- [ ] Edit resume (click Edit button)
- [ ] Delete resume (shows confirmation)
- [ ] Template preview shows
- [ ] Can switch templates (if browse templates from editor)

### ✅ Editor - Basic Info
- [ ] Name field updates preview in real-time
- [ ] Email field updates preview
- [ ] Phone field updates preview
- [ ] Location field updates preview
- [ ] Upload photo
- [ ] Photo appears in preview
- [ ] Photo config button works
- [ ] Add/remove custom fields

### ✅ Editor - Experience
- [ ] Add Experience button works
- [ ] Can enter Company, Position, Dates
- [ ] Description field uses rich text editor
- [ ] **Bold** works in description
- [ ] *Italic* works in description
- [ ] Links work in description
- [ ] Add multiple experiences
- [ ] Edit existing experience
- [ ] Delete experience
- [ ] All data shows in preview

### ✅ Editor - Education
- [ ] Add Education button works
- [ ] Can enter School, Degree, Major, Date
- [ ] Add multiple educations
- [ ] Edit/Delete works
- [ ] Shows in preview

### ✅ Editor - Projects & Skills
- [ ] Add projects with name, description, link
- [ ] Add skills with category (if available)
- [ ] Edit/Delete works
- [ ] Shows in preview

### ✅ Rich Text Editor (Universal)
- [ ] Type text
- [ ] **Bold** button
- [ ] *Italic* button
- [ ] Text alignment (left/center/right)
- [ ] Bullet lists
- [ ] Numbered lists
- [ ] Add links
- [ ] Color text (if color picker available)

### ✅ PDF Export
- [ ] Export button visible
- [ ] Click export
- [ ] PDF downloads
- [ ] PDF opens in reader
- [ ] Content matches preview
- [ ] Formatting preserved
- [ ] Photo included (if selected)
- [ ] No text cutoff
- [ ] Page breaks reasonable

### ✅ Template System
- [ ] Template gallery shows all templates
- [ ] Each template has preview
- [ ] Select template changes editor
- [ ] Data preserved when switching templates
- [ ] All templates display correctly
- [ ] Template styling applies

### ✅ Data Persistence
- [ ] Edit resume
- [ ] Close browser completely
- [ ] Reopen browser
- [ ] Data still there
- [ ] No need to save manually (auto-save works)

---

## 🔌 API ENDPOINT TESTING (Using Postman/curl)

### Test Grammar API
```
Endpoint: POST http://localhost:3000/api/grammar

Request Body:
{
  "apiKey": "sk-or-v1-YOUR_OPENROUTER_KEY",
  "model": "deepseek/deepseek-chat",
  "modelType": "openrouter",
  "content": "I am a manger with 5 yeers experience."
}

Expected Response:
{
  "errors": [
    {
      "context": "I am a manger with 5 yeers experience.",
      "text": "manger",
      "suggestion": "manager",
      "type": "spelling"
    }
  ]
}

✓ Status 200
✓ JSON response
✓ Errors detected
✓ Suggestions valid
```

### Test Polish API
```
Endpoint: POST http://localhost:3000/api/polish

Request Body:
{
  "apiKey": "sk-or-v1-YOUR_OPENROUTER_KEY",
  "model": "deepseek/deepseek-chat",
  "modelType": "openrouter",
  "content": "I did stuff at work and was good at it."
}

Expected Response:
(Streaming or complete polished text)
"I successfully contributed to team initiatives, consistently demonstrating strong work quality and reliability."

✓ Status 200
✓ Text improved
✓ Maintains meaning
✓ More professional
```

### Test Image Proxy (if used)
```
Endpoint: GET http://localhost:3000/api/proxy/image?url=https://example.com/image.jpg

✓ Status 200
✓ Returns image
✓ Correct Content-Type
✓ Image renders
```

---

## 🎯 CRITICAL PATH TESTS (Do These First)

| # | Test | Expected Result | Status |
|---|------|-----------------|--------|
| 1 | Load landing page | Page displays | ⬜ |
| 2 | Click "Get Started" | Navigate to dashboard | ⬜ |
| 3 | Dashboard redirects properly | Shows resumes list | ⬜ |
| 4 | Create new resume | Resume in list | ⬜ |
| 5 | Click Edit | Editor opens with resume | ⬜ |
| 6 | Fill Name field | Updates preview instantly | ⬜ |
| 7 | Add Experience | Shows in preview | ⬜ |
| 8 | Click Export PDF | PDF downloads | ⬜ |
| 9 | Open PDF | Content matches, readable | ⬜ |
| 10 | Close & reopen browser | Data persists (auto-save) | ⬜ |

---

## 🚨 COMMON ISSUES TO CHECK

### Issue: Dashboard doesn't load
```
✓ Check URL is: http://localhost:3000/app/dashboard/resumes
✓ NOT: http://localhost:3000/dashboard/resumes
(Fixed: redirect path was updated)
```

### Issue: Navigation not highlighting correctly
```
✓ Check browser DevTools > Console for errors
✓ Verify sidebar active state logic
(Fixed: improved path matching with .endsWith())
```

### Issue: AI features not working
```
✓ Check API key is entered in Settings > AI
✓ Check status shows "Ready to use AI features"
✓ Verify API key is valid OpenRouter key
✓ Check OpenRouter account has credits
✓ Look at browser Network tab to see API response
```

### Issue: PDF not downloading
```
✓ Check browser allows downloads
✓ Check browser console for errors
✓ Try different browsers (Chrome, Firefox)
✓ Ensure resume has some content
```

### Issue: Data not saving
```
✓ Check browser localStorage is enabled
✓ DevTools > Application > Storage > Local Storage
✓ Should see entries like "resume-storage"
✓ Try clearing cache and retrying
✓ Check browser private/incognito mode (may not persist)
```

---

## 📱 RESPONSIVE DESIGN QUICK CHECK

### Mobile (375px)
```
In Browser DevTools > Responsive Design Mode:
✓ Set width to 375px
✓ Sidebar collapses to menu
✓ Editor still usable
✓ Preview visible or toggleable
✓ All buttons touchable
```

### Tablet (768px)
```
✓ Set width to 768px
✓ Layout adapts properly
✓ Both panels visible
✓ Can scroll if needed
```

### Desktop (1920px)
```
✓ Full layout visible
✓ Editor and preview side-by-side
✓ No wasted space
✓ All features accessible
```

---

## 🔍 BROWSER DEVTOOLS CHECKS

### Console Tab
```
✓ No red error messages
✓ No warnings about missing data
✓ No network errors
```

### Network Tab
```
While testing AI features:
✓ See POST request to /api/grammar
✓ Response status 200
✓ Response body is JSON
✓ Response time < 5 seconds
```

### Application > Storage > Local Storage
```
✓ See entries for resume data
✓ Entries are valid JSON
✓ Can read without errors
✓ Data updates when you edit
```

### Performance Tab
```
✓ Page load time < 3 seconds
✓ Editor responds to typing instantly
✓ No layout shifts (CLS)
✓ Smooth animations
```

---

## 📊 TEST RESULT SUMMARY

Fill this out as you test:

```
LANDING PAGE:           [ ] PASS  [ ] FAIL
DASHBOARD NAVIGATION:   [ ] PASS  [ ] FAIL
CREATE RESUME:          [ ] PASS  [ ] FAIL
EDIT BASIC INFO:        [ ] PASS  [ ] FAIL
EDIT EXPERIENCE:        [ ] PASS  [ ] FAIL
EDIT EDUCATION:         [ ] PASS  [ ] FAIL
EDIT PROJECTS/SKILLS:   [ ] PASS  [ ] FAIL
TEMPLATE SWITCHING:     [ ] PASS  [ ] FAIL
GRAMMAR CHECK:          [ ] PASS  [ ] FAIL
TEXT POLISH:            [ ] PASS  [ ] FAIL
PDF EXPORT:             [ ] PASS  [ ] FAIL
AUTO-SAVE:              [ ] PASS  [ ] FAIL
RESPONSIVE DESIGN:      [ ] PASS  [ ] FAIL
NAVIGATION:             [ ] PASS  [ ] FAIL

OVERALL: [ ] ALL PASS  [ ] SOME FAILURES
```

---

## 🎬 How to Report Issues

When you find a bug:

1. **Note the exact URL**
   ```
   Example: http://localhost:3000/app/dashboard/resumes
   ```

2. **Steps to reproduce**
   ```
   1. Click on X
   2. Type "Y"
   3. Expected Z but got W
   ```

3. **What you expected**
   ```
   Resume should save automatically
   ```

4. **What actually happened**
   ```
   Resume data disappeared when page reloaded
   ```

5. **Browser & environment**
   ```
   Chrome 120, Windows 11, localhost:3000
   ```

6. **Screenshots/Console errors**
   ```
   Attach screenshot or console error message
   ```

---

## ✅ SIGN-OFF

When all tests pass:

- [x] Critical path tests pass
- [x] Core features work
- [x] AI features work (with API key)
- [x] PDF export works
- [x] Data persists
- [x] Navigation works
- [x] No critical console errors
- [x] Responsive design works

**Tested By**: _______________  
**Date**: _______________  
**Status**: ✅ READY FOR DEPLOYMENT

---

## 📚 Additional Resources

For detailed testing guide: See `BLACKBOX_TESTING_GUIDE.md`  
For routing fixes: See `ROUTING_AND_AI_ANALYSIS.md`  
For architecture: See `CLAUDE.md`
