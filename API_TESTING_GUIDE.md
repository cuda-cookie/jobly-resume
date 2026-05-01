# API Testing Guide - Jobly Resume Editor

**Purpose**: Direct endpoint testing without UI  
**Tools**: Postman, curl, or Thunder Client  
**Base URL**: `http://localhost:3000`

---

## Prerequisites

### 1. Get OpenRouter API Key
1. Visit: https://openrouter.ai/keys
2. Copy your API key (starts with `sk-or-v1-`)
3. Keep it safe - you'll need it for all AI feature tests

### 2. Start Development Server
```bash
pnpm dev
# Server runs on http://localhost:3000
```

### 3. Verify Server is Running
```bash
curl http://localhost:3000
# Should return HTML landing page
```

---

## API ENDPOINTS

### 1. Grammar Check API

**Endpoint**: `POST /api/grammar`

**Purpose**: Check text for spelling and punctuation errors

#### Using curl:

```bash
curl -X POST http://localhost:3000/api/grammar \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "sk-or-v1-YOUR_KEY_HERE",
    "model": "deepseek/deepseek-chat",
    "modelType": "openrouter",
    "content": "I am a manger with 5 yeers experience in tecnology."
  }'
```

#### Using Postman:

**Step 1: Create new Request**
- Method: `POST`
- URL: `http://localhost:3000/api/grammar`

**Step 2: Headers**
```
Content-Type: application/json
```

**Step 3: Body (raw JSON)**
```json
{
  "apiKey": "sk-or-v1-YOUR_OPENROUTER_KEY",
  "model": "deepseek/deepseek-chat",
  "modelType": "openrouter",
  "content": "I am a manger with 5 yeers experience in tecnology."
}
```

**Step 4: Send**
- Click "Send" button
- View response in "Response" tab

#### Request Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | string | Yes | OpenRouter API key (sk-or-v1-...) |
| `model` | string | Yes | Model ID: "deepseek/deepseek-chat" |
| `modelType` | string | Yes | Provider: "openrouter" |
| `content` | string | Yes | Text to check for errors |
| `apiEndpoint` | string | No | Custom API endpoint (defaults to OpenRouter) |

#### Expected Response (200 OK):

```json
{
  "errors": [
    {
      "context": "I am a manger with 5 yeers experience in tecnology.",
      "text": "manger",
      "suggestion": "manager",
      "reason": "Spelling error",
      "type": "spelling"
    },
    {
      "context": "I am a manger with 5 yeers experience in tecnology.",
      "text": "yeers",
      "suggestion": "years",
      "reason": "Spelling error",
      "type": "spelling"
    },
    {
      "context": "I am a manger with 5 yeers experience in tecnology.",
      "text": "tecnology",
      "suggestion": "technology",
      "reason": "Spelling error",
      "type": "spelling"
    }
  ]
}
```

#### Response Fields:

| Field | Type | Description |
|-------|------|-------------|
| `errors` | array | Array of found errors (empty if no errors) |
| `errors[].context` | string | Full sentence containing the error |
| `errors[].text` | string | The specific error text |
| `errors[].suggestion` | string | Proposed correction |
| `errors[].reason` | string | Why it's an error |
| `errors[].type` | string | "spelling" or "punctuation" |

#### Test Cases:

**Test 1: Spelling Errors**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "I am a manger with 5 yeers experience."
}
```
**Expected**: Should find "manger" → "manager", "yeers" → "years"

**Test 2: Punctuation Errors**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "Hello,, world. I am here."
}
```
**Expected**: Should find ",," (double comma)

**Test 3: No Errors**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "I am a manager with 5 years of experience."
}
```
**Expected**: `"errors": []` (empty array)

**Test 4: Complex Text**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "Led a team of 10 engineers in desiging and implementting a new microservises architecture. The sistem improved performance by 40%. I also mentored 5 junior developers."
}
```
**Expected**: Find "desiging"→"designing", "implementting"→"implementing", "microservises"→"microservices", "sistem"→"system"

#### Error Responses:

**400 Bad Request - Missing API Key**
```json
{
  "error": "API Key is required. Please configure it in Settings > AI."
}
```

**400 Bad Request - Invalid Model Type**
```json
{
  "error": "Invalid model type"
}
```

**401 Unauthorized - Invalid API Key**
```json
{
  "error": {
    "message": "Invalid authentication credentials",
    "code": "invalid_request_error"
  }
}
```

**429 Too Many Requests - Rate Limited**
```json
{
  "error": {
    "message": "Rate limited",
    "code": "rate_limited_error"
  }
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to check grammar"
}
```

#### How to Debug:

If you get an error:

1. **Check API Key**
   ```bash
   # Verify key exists and is valid
   # Should start with: sk-or-v1-
   ```

2. **Check Content**
   ```bash
   # Make sure "content" field is not empty
   # Use valid JSON syntax
   ```

3. **Check OpenRouter**
   ```bash
   # Visit: https://openrouter.ai/activity
   # Verify API calls are being made
   # Check you have credits/balance
   ```

4. **Check Network**
   ```bash
   # Make sure server is running: pnpm dev
   # Verify localhost:3000 is accessible
   # Check no firewall blocking
   ```

---

### 2. Text Polish API

**Endpoint**: `POST /api/polish`

**Purpose**: Improve and polish resume text

#### Using curl:

```bash
curl -X POST http://localhost:3000/api/polish \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "sk-or-v1-YOUR_KEY_HERE",
    "model": "deepseek/deepseek-chat",
    "modelType": "openrouter",
    "content": "I did stuff at work and was good at it. I helped people."
  }'
```

#### Using Postman:

**Step 1: Create new Request**
- Method: `POST`
- URL: `http://localhost:3000/api/polish`

**Step 2: Headers**
```
Content-Type: application/json
```

**Step 3: Body (raw JSON)**
```json
{
  "apiKey": "sk-or-v1-YOUR_OPENROUTER_KEY",
  "model": "deepseek/deepseek-chat",
  "modelType": "openrouter",
  "content": "I did stuff at work and was good at it. I helped people."
}
```

**Step 4: Send**
- Click "Send"
- Response will stream or appear as complete text

#### Request Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | string | Yes | OpenRouter API key |
| `model` | string | Yes | "deepseek/deepseek-chat" |
| `modelType` | string | Yes | "openrouter" |
| `content` | string | Yes | Text to polish/improve |
| `apiEndpoint` | string | No | Custom endpoint (optional) |

#### Expected Response (200 OK):

```
In my professional role, I consistently delivered impactful contributions to team objectives while demonstrating strong technical proficiency and a commitment to supporting colleagues across all initiatives.
```

OR (if streaming):
```
In my professional role, I consistently delivered impactful contributions to team objectives while demonstrating strong technical proficiency and a commitment to supporting colleagues across all initiatives.
```

#### Response Characteristics:

- ✅ More professional tone
- ✅ Better vocabulary
- ✅ Maintains original meaning
- ✅ Longer, more detailed version
- ✅ No preamble or explanation
- ✅ No code blocks or markdown formatting

#### Test Cases:

**Test 1: Simple Job Description**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "I worked as a software engineer and wrote code."
}
```
**Expected**: Polished version like:
```
"As a Software Engineer, I developed scalable applications, writing clean, maintainable code that met business requirements while adhering to industry best practices."
```

**Test 2: Achievement Statement**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "I helped the team and we did good work and finished on time."
}
```
**Expected**: Something like:
```
"Collaborated effectively with team members to deliver high-quality results, ensuring timely project completion and exceeding stakeholder expectations."
```

**Test 3: Skill Description**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "I know Java and Python and can make apps."
}
```
**Expected**: Something like:
```
"Proficient in Java and Python, with demonstrated expertise in designing and developing robust, scalable applications using industry-leading practices and methodologies."
```

**Test 4: Long Paragraph**
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "I was the lead for a big project that lasted 6 months. I managed 5 people and we used agile. We delivered on time and the client was happy with what we did. We also saved the company 20% on costs."
}
```
**Expected**: Polished version highlighting key achievements

#### Error Responses:

Same as Grammar API (400, 401, 429, 500)

#### How to Test Streaming (if enabled):

```bash
# Using curl with streaming:
curl -X POST http://localhost:3000/api/polish \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "sk-or-v1-YOUR_KEY",
    "modelType": "openrouter",
    "content": "I did good work.",
    "stream": true
  }'

# Response will stream as chunks:
# "In" -> " my" -> " professional" -> ...
```

---

### 3. Image Proxy API (Optional)

**Endpoint**: `GET /api/proxy/image?url=<image_url>`

**Purpose**: Proxy external images for use in PDF export

#### Using curl:

```bash
# Test with a valid image URL
curl -X GET "http://localhost:3000/api/proxy/image?url=https://example.com/photo.jpg"
```

#### Using Postman:

**Step 1: Create new Request**
- Method: `GET`
- URL: `http://localhost:3000/api/proxy/image?url=https://example.com/photo.jpg`

**Step 2: Send**

#### Query Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | URL to image to proxy |

#### Expected Response (200 OK):

- Content-Type: `image/jpeg` (or appropriate type)
- Body: Raw image bytes
- Image displays correctly

#### Test Cases:

**Test 1: Valid Image**
```
URL: http://localhost:3000/api/proxy/image?url=https://via.placeholder.com/150
Expected: Returns image, status 200
```

**Test 2: Invalid URL**
```
URL: http://localhost:3000/api/proxy/image?url=https://invalid-url-example.com/notfound.jpg
Expected: Error message
```

#### Error Responses:

**404 Not Found**
```json
{
  "error": "Image not found"
}
```

**400 Bad Request**
```json
{
  "error": "Invalid URL"
}
```

---

## TESTING WORKFLOW

### Complete Test Sequence (15 minutes)

#### Step 1: Verify Server (1 min)
```bash
curl http://localhost:3000/
# Should return HTML
```

#### Step 2: Get OpenRouter API Key (2 min)
- Visit: https://openrouter.ai/keys
- Copy key

#### Step 3: Test Grammar API (3 min)
```bash
curl -X POST http://localhost:3000/api/grammar \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "sk-or-v1-YOUR_KEY",
    "modelType": "openrouter",
    "content": "I am a manger with experience."
  }'
```
**Verify**: 
- [ ] Status 200
- [ ] Response contains errors array
- [ ] Detected "manger" error

#### Step 4: Test Polish API (3 min)
```bash
curl -X POST http://localhost:3000/api/polish \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "sk-or-v1-YOUR_KEY",
    "modelType": "openrouter",
    "content": "I did good work at my job."
  }'
```
**Verify**:
- [ ] Status 200
- [ ] Response is polished text
- [ ] Text is more professional
- [ ] No preamble

#### Step 5: Test through UI (6 min)
1. Open http://localhost:3000
2. Create resume
3. Go to AI Settings
4. Enter API key
5. Edit resume and use Grammar Check
6. Use Polish feature
7. Verify results match curl tests

---

## PERFORMANCE TESTING

### Response Time Expectations

| Endpoint | Expected Time | Max Acceptable |
|----------|---------------|----------------|
| Grammar Check | 3-5 sec | 10 sec |
| Text Polish | 5-10 sec | 15 sec |
| Image Proxy | < 2 sec | 5 sec |

### Testing Response Time

Using curl with time measurement:
```bash
time curl -X POST http://localhost:3000/api/grammar \
  -H "Content-Type: application/json" \
  -d '{...}'
```

Or in Postman:
- Click "Send"
- View response time in bottom bar
- Should show "Time: XXX ms"

---

## LOAD TESTING (Advanced)

### Using Apache Bench (ab):

```bash
# Test grammar endpoint with 100 requests
ab -n 100 -c 10 \
  -H "Content-Type: application/json" \
  -p grammar-test.json \
  http://localhost:3000/api/grammar
```

### Test Data File (grammar-test.json):
```json
{
  "apiKey": "sk-or-v1-YOUR_KEY",
  "modelType": "openrouter",
  "content": "Test content with error."
}
```

### Using hey (modern alternative):
```bash
hey -n 100 -c 10 \
  -H "Content-Type: application/json" \
  -D grammar-test.json \
  http://localhost:3000/api/grammar
```

---

## TROUBLESHOOTING API CALLS

### Issue: 400 Bad Request

**Cause 1: Missing API Key**
- Check `apiKey` field is present
- Check it starts with `sk-or-v1-`
- Verify it's not empty string

**Cause 2: Invalid JSON**
- Use JSON validator: https://jsonlint.com/
- Ensure all quotes are double quotes
- Remove trailing commas

**Cause 3: Missing Required Fields**
- Verify all required parameters present
- Don't skip `modelType` or `model`

### Issue: 401/403 Unauthorized

**Cause**: API key is invalid or expired
- [ ] Visit https://openrouter.ai/keys
- [ ] Generate new key
- [ ] Copy entire key (including prefix)
- [ ] Try again

### Issue: 429 Rate Limited

**Cause**: Too many requests to OpenRouter
- [ ] Wait 60 seconds
- [ ] Try again with longer delay
- [ ] Check OpenRouter account limits

### Issue: 500 Internal Server Error

**Cause 1**: Server not running
- [ ] Run: `pnpm dev`
- [ ] Verify: `curl http://localhost:3000`

**Cause 2**: API endpoint unreachable
- [ ] Check internet connection
- [ ] Check OpenRouter is accessible: `curl https://openrouter.ai`
- [ ] Try VPN if blocked

**Cause 3**: Content too long
- [ ] Try shorter text
- [ ] Reduce content from 10,000 chars to 1,000 chars

### Issue: No Response / Timeout

**Cause**: Request hanging
- [ ] Press Ctrl+C to cancel
- [ ] Verify API key has credits
- [ ] Check OpenRouter status page
- [ ] Try with shorter content

---

## API INTEGRATION CHECKLIST

- [ ] Grammar API returns correct errors
- [ ] Grammar API response time < 10 sec
- [ ] Polish API improves text quality
- [ ] Polish API response time < 15 sec
- [ ] API errors handled gracefully
- [ ] No API key leaked in responses
- [ ] No API key in logs
- [ ] Error messages are helpful
- [ ] Works with various text lengths
- [ ] Works with special characters
- [ ] Handles rate limiting
- [ ] Handles network timeouts

---

## POSTMAN COLLECTION SETUP

### Quick Setup:

1. Open Postman
2. Create new Collection: "Jobly API Tests"
3. Add three requests:

**Request 1: Grammar Check**
```
Name: Check Grammar
Method: POST
URL: {{baseUrl}}/api/grammar
Body: (see above)
```

**Request 2: Polish Text**
```
Name: Polish Text
Method: POST
URL: {{baseUrl}}/api/polish
Body: (see above)
```

**Request 3: Proxy Image**
```
Name: Proxy Image
Method: GET
URL: {{baseUrl}}/api/proxy/image?url={{imageUrl}}
```

### Set Variables:

In Collection > Variables:
```
baseUrl = http://localhost:3000
apiKey = sk-or-v1-YOUR_KEY
imageUrl = https://via.placeholder.com/150
```

Then use in requests:
```
URL: {{baseUrl}}/api/grammar
```

---

## FINAL VALIDATION CHECKLIST

- [ ] All endpoints respond
- [ ] Status codes correct
- [ ] Response formats valid JSON
- [ ] Error messages helpful
- [ ] Performance acceptable
- [ ] Works with real resume data
- [ ] Works with long text
- [ ] Works with special characters
- [ ] Graceful error handling
- [ ] API key security verified

✅ Ready for production testing!
