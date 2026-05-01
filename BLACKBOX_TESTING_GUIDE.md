# Black-Box Testing Guide - Jobly Resume Editor

**Purpose**: Comprehensive testing without knowing internal implementation. Test all user-visible features, endpoints, and workflows.

**Test Environment**: `http://localhost:3000` (development) or production deployment

---

## 1. LANDING PAGE TESTING

### Endpoint: `GET /` (or `GET /en`)

#### 1.1 Page Load & Display
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Features section loads
- [ ] FAQ section is visible
- [ ] CTA (Call-to-Action) section appears
- [ ] Footer displays properly
- [ ] No console errors

#### 1.2 Navigation Elements
- [ ] Logo clicking returns to home
- [ ] "Get Started" button visible and clickable
- [ ] All internal links work
- [ ] External links (GitHub, etc.) open correctly

#### 1.3 Responsive Design
- [ ] Desktop view renders correctly (1920px+)
- [ ] Tablet view (768px) works
- [ ] Mobile view (375px) works
- [ ] No horizontal scrolling on mobile

#### 1.4 Theme/Dark Mode (if applicable)
- [ ] Light mode displays correctly
- [ ] Dark mode toggle works
- [ ] Theme preference persists on reload

---

## 2. DASHBOARD TESTING

### Endpoint Base: `GET /app/dashboard/`

#### 2.1 Dashboard Home Redirect
- [ ] Visiting `/app/dashboard` redirects to `/app/dashboard/resumes`
- [ ] Redirect happens without visible delay
- [ ] No error messages appear

---

## 2.2 RESUMES SECTION

### Endpoint: `GET /app/dashboard/resumes`

#### Page Load
- [ ] Page loads successfully
- [ ] Sidebar shows "Resumes" as active
- [ ] Resume list displays (or empty state if first time)

#### Create Resume Button
- [ ] "Create Resume" button visible and clickable
- [ ] Clicking opens modal/dialog
- [ ] Can enter resume name
- [ ] Can select initial template (if available)
- [ ] Submit button creates new resume
- [ ] New resume appears in list after creation
- [ ] Cancel button closes modal without creating

#### Resume List Display
- [ ] Resume cards show:
  - [ ] Resume name/title
  - [ ] Last modified date
  - [ ] Template thumbnail
  - [ ] Action buttons (edit, delete, etc.)
- [ ] Resumes are sorted correctly (newest first)
- [ ] Search/filter works (if implemented)

#### Resume Actions
- [ ] "Edit" button opens editor
- [ ] "Delete" button:
  - [ ] Shows confirmation dialog
  - [ ] Deletes resume when confirmed
  - [ ] Canceling keeps resume
- [ ] Preview button (if exists) shows resume
- [ ] Duplicate button (if exists) creates copy

#### Import Resume (if available)
- [ ] "Import" button visible
- [ ] Can select file to import
- [ ] Successfully imports resume data
- [ ] Imported resume appears in list

---

## 2.3 TEMPLATES SECTION

### Endpoint: `GET /app/dashboard/templates`

#### Page Load
- [ ] Page loads successfully
- [ ] Sidebar shows "Templates" as active
- [ ] Template gallery displays all templates

#### Template Display
- [ ] All template cards visible:
  - [ ] Classic template shows
  - [ ] Creative template shows
  - [ ] Editorial template shows
  - [ ] Elegant template shows
  - [ ] Left-Right template shows
- [ ] Each template shows:
  - [ ] Thumbnail/preview image
  - [ ] Template name
  - [ ] Description/details
  - [ ] "Use Template" or "Preview" button

#### Template Preview
- [ ] Clicking template opens preview (modal or full view)
- [ ] Preview shows complete template layout
- [ ] Can close preview
- [ ] "Use This Template" button works

#### Template Selection Flow
- [ ] Selecting template navigates to editor
- [ ] Selected template is applied to resume
- [ ] Previous resume data is preserved (if switching templates)

---

## 2.4 AI SETTINGS SECTION

### Endpoint: `GET /app/dashboard/ai`

#### Page Load
- [ ] Page loads successfully
- [ ] Sidebar shows "AI" as active
- [ ] AI configuration form displays

#### OpenRouter Configuration
- [ ] "OpenRouter API Key" label visible
- [ ] Input field for API key appears
- [ ] "Get API Key from OpenRouter" link works
- [ ] Link opens OpenRouter website in new tab
- [ ] API key input accepts text
- [ ] API key input masks password (shows dots/asterisks)

#### Model Display
- [ ] Shows "OpenRouter (DeepSeek)" as selected
- [ ] Displays model description
- [ ] Status badge shows:
  - [ ] "Configuration required..." when no API key
  - [ ] "Ready to use AI features" when API key entered

#### API Key Persistence
- [ ] Entering API key saves to localStorage
- [ ] Closing browser and returning shows saved key
- [ ] Key is stored locally (not sent to backend)
- [ ] Message confirms: "Your API key is stored locally in your browser"

#### Information Display
- [ ] Shows "Automatic Model Selection" info box
- [ ] States: "locked to deepseek/deepseek-chat for maximum performance"
- [ ] Displays warning/info styling clearly

---

## 2.5 SETTINGS SECTION

### Endpoint: `GET /app/dashboard/settings`

#### Page Load
- [ ] Page loads successfully
- [ ] Sidebar shows "Settings" as active
- [ ] Settings content displays

#### Directory Sync Feature (if implemented)
- [ ] "Select Directory" button visible
- [ ] Clicking opens file browser
- [ ] Can select a local directory
- [ ] Selected directory path displays
- [ ] "Remove Directory" button appears after selection
- [ ] Removing directory clears the path
- [ ] Directory selection persists on reload

#### Other Settings (if available)
- [ ] Theme settings work
- [ ] Language settings display
- [ ] Any other settings load correctly

---

## 3. RESUME EDITOR (WORKBENCH) TESTING

### Endpoint: `GET /app/workbench/` (or `/app/workbench/[resumeId]`)

#### 3.1 Editor Page Load
- [ ] Editor loads successfully
- [ ] Resume data displays in preview
- [ ] Edit panel appears
- [ ] Template preview renders

#### 3.2 Left Sidebar Navigation (if exists)
- [ ] Sections list shows:
  - [ ] Basic Info
  - [ ] Experience
  - [ ] Education
  - [ ] Projects
  - [ ] Skills
  - [ ] Certificates
  - [ ] Custom Sections
- [ ] Clicking sections scrolls to that section editor
- [ ] Active section is highlighted

#### 3.3 Basic Info Section
**Location**: Edit Panel > Basic Info tab

- [ ] Name field:
  - [ ] Can input/edit text
  - [ ] Changes appear in preview in real-time
  - [ ] Data saves to localStorage
- [ ] Title field works same as name
- [ ] Email field:
  - [ ] Accepts valid email format
  - [ ] Updates preview
- [ ] Phone field:
  - [ ] Accepts phone number format
  - [ ] Updates preview
- [ ] Location field works
- [ ] Photo upload:
  - [ ] Can select image
  - [ ] Image displays in preview
  - [ ] Image persists on reload

#### Photo Configuration
- [ ] Photo config button/icon appears
- [ ] Opens photo settings drawer/modal
- [ ] Width adjustment works (0-300px)
- [ ] Height adjustment works
- [ ] Aspect ratio options:
  - [ ] 1:1 works
  - [ ] 4:3 works
  - [ ] 3:4 works
  - [ ] 16:9 works
- [ ] Border radius options:
  - [ ] None works
  - [ ] Medium works
  - [ ] Full (circle) works
  - [ ] Custom value works
- [ ] Photo visibility toggle works
- [ ] Preview updates with changes
- [ ] Settings save

#### Custom Fields
- [ ] Add custom field button works
- [ ] Can add field with label and value
- [ ] Can select icon for field
- [ ] Custom field appears in preview
- [ ] Can edit custom field
- [ ] Can delete custom field
- [ ] Changes appear in preview

#### GitHub Integration (if available)
- [ ] GitHub username field appears
- [ ] Can enter GitHub username
- [ ] GitHub contributions visibility toggle works
- [ ] Contributions display in preview (if public)

---

## 3.4 Experience Section

**Location**: Edit Panel > Experience tab

- [ ] "Add Experience" button works
- [ ] Experience form appears with fields:
  - [ ] Company name
  - [ ] Position/Job title
  - [ ] Start date
  - [ ] End date
  - [ ] Currently working checkbox
  - [ ] Description (rich text editor)

#### Rich Text Editor (Description field)
- [ ] Can type text
- [ ] **Bold** button works
- [ ] *Italic* button works
- [ ] ~~Strikethrough~~ works (if available)
- [ ] Underline works
- [ ] Color picker works
- [ ] Text alignment (left, center, right) works
- [ ] Lists (bullet, numbered) work
- [ ] Link insertion works
- [ ] Text appears in preview correctly

#### Experience Item Management
- [ ] Multiple experiences can be added
- [ ] Edit button opens edit form
- [ ] Delete button removes experience
- [ ] Drag to reorder (if implemented)
- [ ] All data appears in preview immediately
- [ ] Changes persist on reload

#### Date Handling
- [ ] Start date picker works
- [ ] End date picker works
- [ ] "Currently working" checkbox disables end date
- [ ] Dates format correctly in preview

---

## 3.5 Education Section

**Location**: Edit Panel > Education tab

- [ ] "Add Education" button works
- [ ] Education form appears with fields:
  - [ ] School/University name
  - [ ] Degree type
  - [ ] Major/Field of study
  - [ ] Graduation date
- [ ] Multiple educations can be added
- [ ] Edit/Delete buttons work
- [ ] All data appears in preview
- [ ] Date picker works correctly
- [ ] Changes persist

---

## 3.6 Projects Section

**Location**: Edit Panel > Projects tab

- [ ] "Add Project" button works
- [ ] Project form appears with fields:
  - [ ] Project name
  - [ ] Description (rich text)
  - [ ] Project link/URL
  - [ ] Technologies used
- [ ] Rich text editor works (same as Experience)
- [ ] URL validation (if any)
- [ ] Multiple projects can be added
- [ ] Edit/Delete buttons work
- [ ] Changes appear in preview

---

## 3.7 Skills Section

**Location**: Edit Panel > Skills tab

- [ ] "Add Skill" button works
- [ ] Skill input field appears
- [ ] Can type skill name
- [ ] Proficiency level selector (if exists)
- [ ] Skill category selector (if exists)
- [ ] Add button creates skill
- [ ] Skills list shows all added skills
- [ ] Edit/Delete buttons work
- [ ] Skills display in preview in correct format
- [ ] Changes persist

---

## 3.8 Certificates Section

**Location**: Edit Panel > Certificates tab

- [ ] "Add Certificate" button works
- [ ] Certificate form appears with fields:
  - [ ] Certificate name
  - [ ] Issuer
  - [ ] Issue date
  - [ ] Expiration date (if applicable)
- [ ] Multiple certificates can be added
- [ ] Edit/Delete buttons work
- [ ] All data appears in preview
- [ ] Date pickers work

---

## 3.9 Custom Sections

**Location**: Edit Panel > Custom tab (if available)

- [ ] "Add Section" button works
- [ ] Can create custom section with:
  - [ ] Section title
  - [ ] Section content (rich text)
- [ ] Multiple custom sections can be added
- [ ] Edit/Delete buttons work
- [ ] Content appears in preview
- [ ] Can reorder sections (if drag-drop available)

---

## 3.10 Template Preview/Switching

#### Preview Display
- [ ] Right side shows live resume preview
- [ ] Preview updates when any field changes
- [ ] Preview shows correct template styling
- [ ] Layout matches selected template
- [ ] All sections visible in preview
- [ ] Text formatting preserved in preview

#### Template Switcher (if available)
- [ ] Template selection button/menu visible
- [ ] Can select different template
- [ ] Template changes immediately in preview
- [ ] Resume data is preserved when switching
- [ ] All template styles apply correctly

#### Template Customization (if available)
- [ ] Template color picker works
- [ ] Font selection works (if available)
- [ ] Spacing/layout adjustments work
- [ ] Custom changes persist

---

## 3.11 Auto-Save Testing

- [ ] Edits automatically save to localStorage
- [ ] Close browser without saving
- [ ] Reopen app
- [ ] All data is still there
- [ ] Resume state is preserved
- [ ] No "unsaved changes" warning (if auto-save works)

---

## 4. AI FEATURES TESTING

### 4.1 Grammar Check Feature

#### Setup
- [ ] Ensure OpenRouter API key is configured in Settings > AI
- [ ] Status shows "Ready to use AI features"

#### Accessing Grammar Check
- [ ] Find "Grammar Check" button/icon in editor
  - [ ] May be in description field context menu
  - [ ] May be in editor toolbar
  - [ ] May be in section header
- [ ] Button is clickable and visible

#### Grammar Check Request
- [ ] Click Grammar Check button
- [ ] System shows loading indicator
- [ ] Request sends to `/api/grammar` endpoint

#### Grammar Check Response (Endpoint Testing)
**Request should include:**
- [ ] API Key (from localStorage)
- [ ] Model type: "openrouter"
- [ ] Model: "deepseek/deepseek-chat"
- [ ] Content: text from the field
- [ ] Response format requirement (JSON)

**Expected Response:**
- [ ] Returns JSON with `errors` array
- [ ] Each error contains:
  - [ ] `context`: Full sentence with error
  - [ ] `text`: The error text
  - [ ] `suggestion`: Correction
  - [ ] `reason`: Error type
  - [ ] `type`: "spelling" or "punctuation"
- [ ] Example:
```json
{
  "errors": [
    {
      "context": "I am a manger at company X",
      "text": "manger",
      "suggestion": "manager",
      "reason": "Spelling error",
      "type": "spelling"
    }
  ]
}
```

#### Grammar Check UI Display
- [ ] Errors display in dialog/drawer
- [ ] Each error shows context
- [ ] Suggestion is highlighted
- [ ] "Apply" button fixes the error
- [ ] "Ignore" button dismisses error
- [ ] All errors can be reviewed
- [ ] Closing dialog returns to editor

#### Error Handling
- [ ] No API key → Shows error message
- [ ] Network error → Shows error message
- [ ] Invalid response → Graceful handling
- [ ] Empty text → Handles properly

---

### 4.2 Text Polish Feature

#### Setup (same as Grammar Check)
- [ ] OpenRouter API key configured
- [ ] Status shows ready

#### Accessing Text Polish
- [ ] Find "Polish" or "Improve" button
  - [ ] May be in toolbar
  - [ ] May be in context menu
  - [ ] May be in section header
- [ ] Button is clickable

#### Text Polish Request
**Endpoint**: `/api/polish` (POST)

**Request should include:**
- [ ] API Key
- [ ] Model type: "openrouter"
- [ ] Model: "deepseek/deepseek-chat"
- [ ] Content: text to polish
- [ ] stream: true (for streaming response)

#### Polish Response Handling
- [ ] Shows loading state with animation
- [ ] Streams polished content (if streaming implemented)
- [ ] Returns improved version of text
- [ ] Content is more professional and compelling
- [ ] Maintains original meaning
- [ ] Preserves formatting

#### Polish UI Behavior
- [ ] Polished text displays in modal/drawer
- [ ] Original text shown for comparison
- [ ] "Apply" button replaces original
- [ ] "Cancel" button discards polish
- [ ] Can copy polished text manually (if option exists)

#### Examples to Test
Test with these types of text:
- [ ] Job description
- [ ] Achievement statement
- [ ] Professional summary
- [ ] Short snippet
- [ ] Long paragraph

---

## 5. PDF EXPORT TESTING

### Endpoint: `/api/` or client-side export

#### Accessing Export
- [ ] "Export" or "Download PDF" button visible
  - [ ] May be in header
  - [ ] May be in preview panel
  - [ ] May be in settings
- [ ] Button is clickable

#### Export Options (if available)
- [ ] Can select PDF size (A4, Letter)
- [ ] Can select color/grayscale
- [ ] Can select quality (high/standard)
- [ ] Can choose whether to include photo
- [ ] Filename can be customized

#### Export Process
- [ ] Clicking Export shows loading indicator
- [ ] System captures resume as image
- [ ] System converts to PDF
- [ ] PDF downloads automatically

#### PDF Quality Validation
Open downloaded PDF:
- [ ] PDF opens in reader
- [ ] Layout matches preview
- [ ] All text is visible and readable
- [ ] Formatting preserved (bold, italics, colors)
- [ ] Images included if selected
- [ ] Page breaks are appropriate
- [ ] Text is not cut off
- [ ] Font sizes are readable

#### Edge Cases
- [ ] Export with long text (should handle overflow)
- [ ] Export with images (should embed correctly)
- [ ] Export with colors (colors should appear)
- [ ] Export empty sections (should handle cleanly)

---

## 6. IMAGE HANDLING TESTING

### Image Upload
- [ ] Can click to upload photo
- [ ] File picker opens
- [ ] Can select PNG, JPG, WebP
- [ ] Image displays in preview after upload
- [ ] Image persists on reload

### Image Proxy Testing

**Endpoint**: `/api/proxy/image` (if external images used)

#### External Image Display
- [ ] If resume includes external image URL
- [ ] Image loads through proxy
- [ ] Image displays correctly in preview
- [ ] Image is included in PDF export
- [ ] No mixed content warnings

#### Proxy Error Handling
- [ ] Invalid URL → Shows error
- [ ] Unreachable server → Graceful failure
- [ ] Unsupported format → Shows error message

---

## 7. NAVIGATION & ROUTING TESTING

### Dashboard Navigation
- [ ] Home icon/logo → Returns to landing page or dashboard
- [ ] Clicking "Resumes" in sidebar → `/app/dashboard/resumes`
- [ ] Clicking "Templates" in sidebar → `/app/dashboard/templates`
- [ ] Clicking "AI" in sidebar → `/app/dashboard/ai`
- [ ] Clicking "Settings" in sidebar → `/app/dashboard/settings`
- [ ] Active link is highlighted in sidebar
- [ ] Can navigate back and forth without errors

### Editor Navigation
- [ ] From resumes list → Edit button → Editor loads
- [ ] Resume ID in URL matches selected resume
- [ ] Editing different resumes loads correct data
- [ ] Back button returns to resume list

### Cross-Browser Navigation
- [ ] All navigation works in Chrome/Firefox/Safari
- [ ] No console errors during navigation
- [ ] Page state doesn't break on browser back/forward

---

## 8. DATA PERSISTENCE TESTING

### LocalStorage Validation
- [ ] Open DevTools > Application > LocalStorage
- [ ] Resume data stored with key format: `resume-storage` or similar
- [ ] Data is valid JSON
- [ ] AI config stored separately
- [ ] Settings stored separately

### Cross-Tab Synchronization (if implemented)
- [ ] Open app in two tabs
- [ ] Edit resume in tab 1
- [ ] Switch to tab 2
- [ ] Changes visible in tab 2 (if sync implemented)

### Session Recovery
- [ ] In middle of editing
- [ ] Browser crashes or force close
- [ ] Reopen app
- [ ] Resume data recovered
- [ ] Resume opens to where you were editing

---

## 9. ERROR HANDLING TESTING

### API Errors
- [ ] Missing API key → Shows helpful message
- [ ] Invalid API key → Returns 401/403 error message
- [ ] Network timeout → Shows error message
- [ ] Server error (500) → Shows error message

### Input Validation
- [ ] Very long text (10,000+ characters) → Handles correctly
- [ ] Special characters in input → Displays correctly
- [ ] Emoji in text → Renders correctly
- [ ] URL with special chars → Handles in PDF

### Storage Limits
- [ ] Create many resumes → Verify no localStorage quota exceeded
- [ ] Add thousands of entries → Check performance
- [ ] Large images → Verify storage capacity

---

## 10. PERFORMANCE TESTING

### Page Load Times
- [ ] Landing page loads in < 3 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] Editor loads in < 2 seconds
- [ ] Template switching < 1 second

### Responsiveness
- [ ] Typing in fields is responsive (no lag)
- [ ] Preview updates in real-time
- [ ] Scrolling is smooth
- [ ] Animations are smooth (no jank)

### Memory
- [ ] Open editor and edit for 10 minutes
- [ ] Check DevTools > Memory
- [ ] No obvious memory leaks
- [ ] App remains responsive

---

## 11. RESPONSIVE DESIGN TESTING

### Mobile (375px width)
- [ ] Dashboard fits on screen
- [ ] Editor is usable on mobile
- [ ] Sidebar collapses to hamburger menu
- [ ] All buttons are touch-friendly (min 44x44px)
- [ ] PDF export works on mobile

### Tablet (768px width)
- [ ] Layout adapts appropriately
- [ ] Editor is functional
- [ ] Preview and edit panels visible (or can toggle)

### Desktop (1920px+)
- [ ] Full layout displays
- [ ] Both panels visible side-by-side
- [ ] No wasted space
- [ ] All features accessible

---

## 12. ACCESSIBILITY TESTING

### Keyboard Navigation
- [ ] Tab through all form inputs
- [ ] Enter/Space activates buttons
- [ ] Esc closes modals
- [ ] Can navigate entire app with keyboard

### Screen Reader
- [ ] Test with NVDA or JAWS (Windows) or VoiceOver (Mac)
- [ ] Form labels are announced
- [ ] Button purposes are clear
- [ ] Errors are announced

### Color Contrast
- [ ] Text is readable on background
- [ ] Use WebAIM contrast checker
- [ ] Meets WCAG AA standards

---

## 13. SECURITY TESTING (BASIC)

### API Key Security
- [ ] API key stored in localStorage (not sessionStorage)
- [ ] API key not logged to console
- [ ] API key not sent in URLs
- [ ] No key visible in network requests to your server
- [ ] Key only sent to OpenRouter API endpoint

### XSS Prevention
- [ ] Rich text content doesn't execute scripts
- [ ] Pasted HTML is sanitized
- [ ] Template injection not possible
- [ ] User input escaped properly

### CSRF Protection (if backend involved)
- [ ] Form submissions include CSRF token (if applicable)
- [ ] No unexpected cross-origin requests

---

## 14. TESTING CHECKLIST BY USER JOURNEY

### Journey 1: First Time User
1. [ ] Land on homepage
2. [ ] Click "Get Started"
3. [ ] Redirects to dashboard/resumes
4. [ ] Click "Create Resume"
5. [ ] Enter resume name
6. [ ] Select template
7. [ ] Editor opens
8. [ ] Fill in basic info
9. [ ] Add experience
10. [ ] Export PDF
11. [ ] PDF downloads and opens correctly

### Journey 2: AI Features User
1. [ ] Dashboard > AI Settings
2. [ ] Enter OpenRouter API key
3. [ ] Open resume in editor
4. [ ] Write job description
5. [ ] Click Grammar Check
6. [ ] Review and apply fixes
7. [ ] Click Polish
8. [ ] Review improved text
9. [ ] Apply changes
10. [ ] Verify text is better

### Journey 3: Template Switcher
1. [ ] Create resume with Template A
2. [ ] Fill in data
3. [ ] Switch to Template B
4. [ ] Verify data preserved
5. [ ] Switch to Template C
6. [ ] Data still intact
7. [ ] Export PDF from different templates

### Journey 4: Settings & Persistence
1. [ ] Configure API key
2. [ ] Create and edit resume
3. [ ] Close browser
4. [ ] Reopen app
5. [ ] Resume data present
6. [ ] API key still configured
7. [ ] Settings preserved

---

## 15. TEST DATA REQUIREMENTS

### Sample Data for Testing

**Valid Resume Data**:
```
Name: John Smith
Title: Senior Software Engineer
Email: john@example.com
Phone: +1-234-567-8900
Location: San Francisco, CA

Experience:
- Company: Tech Corp
- Position: Senior Engineer
- Dates: Jan 2020 - Present
- Description: Led team of 5 engineers...

Education:
- School: MIT
- Degree: BS
- Major: Computer Science
- Date: May 2018

Skills: JavaScript, Python, React, Node.js
```

**Grammar Check Test Text**:
```
"I am a experianced manager with 5 yeers in tecnology industrie."
```
(Should detect: experianced→experienced, yeers→years, tecnology→technology, industrie→industry)

---

## 16. TOOLS & SETUP FOR TESTING

### Browser DevTools
- [ ] Console - Check for errors
- [ ] Network tab - Monitor API calls
- [ ] Application tab - Inspect localStorage
- [ ] Performance tab - Check load times
- [ ] Responsive Design mode - Test mobile

### Testing Tools
- **Postman** or **curl** - Test API endpoints directly
- **WAVE** - Accessibility testing
- **GTmetrix** - Performance metrics
- **BrowserStack** - Cross-browser testing

---

## 17. DIRECT ENDPOINT TESTING (Using Postman/curl)

### Test Grammar API

**Endpoint**: `POST /api/grammar`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY_HERE",
  "model": "deepseek/deepseek-chat",
  "modelType": "openrouter",
  "content": "I am a manger with 5 yeers experience in technologi."
}
```

**Expected Response**:
```json
{
  "errors": [
    {
      "context": "I am a manger with 5 yeers experience...",
      "text": "manger",
      "suggestion": "manager",
      "reason": "Spelling error",
      "type": "spelling"
    }
  ]
}
```

**Validate**:
- [ ] Status code 200
- [ ] Response is valid JSON
- [ ] Errors detected correctly
- [ ] Suggestions are valid

---

### Test Polish API

**Endpoint**: `POST /api/polish`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY_HERE",
  "model": "deepseek/deepseek-chat",
  "modelType": "openrouter",
  "content": "I did stuff at my job. I was good at it. I helped people."
}
```

**Expected Response**:
```
(Streaming response or complete text)
"In my role, I demonstrated exceptional proficiency across multiple responsibilities, consistently delivering value to team members and stakeholders through strategic initiatives and collaborative problem-solving."
```

**Validate**:
- [ ] Status code 200
- [ ] Response is improved/polished
- [ ] Maintains original meaning
- [ ] More professional tone
- [ ] No preamble/explanation

---

### Test Image Proxy (if applicable)

**Endpoint**: `GET /api/proxy/image`

**Query Parameters**:
```
?url=https://example.com/image.jpg
```

**Expected Response**:
- [ ] Status 200
- [ ] Returns image data
- [ ] Correct Content-Type header
- [ ] Image renders correctly

---

## 18. FAILURE SCENARIOS TO TEST

### When Things Go Wrong

1. **No Internet**
   - [ ] App still loads (offline capability)
   - [ ] Can edit existing resume
   - [ ] AI features show "offline" message
   - [ ] Can work in offline mode

2. **Bad API Key**
   - [ ] Grammar check shows error
   - [ ] Polish shows error
   - [ ] Error message is helpful
   - [ ] Can update key and retry

3. **Rate Limited** (if OpenRouter has limits)
   - [ ] Shows rate limit error
   - [ ] Can retry later
   - [ ] Suggests alternative action

4. **Browser Storage Full**
   - [ ] Shows quota exceeded error
   - [ ] Suggests clearing data
   - [ ] Graceful degradation

---

## 19. QUICK TEST SUMMARY TABLE

| Area | Test | Status |
|------|------|--------|
| **Landing Page** | Load, click buttons | ⬜ |
| **Dashboard Home** | Redirect works | ⬜ |
| **Resumes** | List, create, edit, delete | ⬜ |
| **Templates** | Display, select, preview | ⬜ |
| **AI Settings** | API key config, persistence | ⬜ |
| **General Settings** | Directory sync, other settings | ⬜ |
| **Editor Basic Info** | All fields editable, persist | ⬜ |
| **Editor Photo** | Upload, config, preview | ⬜ |
| **Editor Experience** | Add, edit, delete, rich text | ⬜ |
| **Editor Education** | Add, edit, delete | ⬜ |
| **Editor Projects** | Add, edit, delete, links | ⬜ |
| **Editor Skills** | Add, edit, delete | ⬜ |
| **Editor Certificates** | Add, edit, delete, dates | ⬜ |
| **Template Switching** | Change template, preserve data | ⬜ |
| **Auto-Save** | Close/reopen, data persists | ⬜ |
| **Grammar Check API** | `/api/grammar` returns errors | ⬜ |
| **Polish API** | `/api/polish` improves text | ⬜ |
| **PDF Export** | Downloads, opens correctly | ⬜ |
| **Responsive Design** | Mobile, tablet, desktop | ⬜ |
| **Error Handling** | Missing key, network error | ⬜ |
| **Navigation** | All routes work | ⬜ |

---

## 20. EXECUTING THE TEST PLAN

### Phase 1: Critical Path (First)
1. Landing page → Dashboard redirect
2. Create resume
3. Edit basic info
4. Export PDF
5. Verify PDF downloads

### Phase 2: Core Features
1. All editor sections (Experience, Education, etc.)
2. Template switching
3. Auto-save persistence
4. Navigation between sections

### Phase 3: AI Features (Requires API Key)
1. Grammar check API
2. Polish API
3. UI error handling

### Phase 4: Edge Cases & Polish
1. Long text handling
2. Special characters
3. Mobile responsiveness
4. Keyboard navigation
5. Accessibility

---

## Notes

- **Start with Phase 1** to ensure basic functionality works
- **Use Postman** to test APIs directly before relying on UI
- **Check console** for errors throughout testing
- **Test on multiple browsers** (Chrome, Firefox, Safari, Edge)
- **Document any bugs** with screenshots and steps to reproduce
- **Record all pass/fail results** in the summary table
