# AI Agent Operating Guidelines & Workspace Rules

This repository hosts the executive digital portfolio, ATS-optimized resumes, and Cloudflare Workers AI edge copilot for **Ravindrakumar M. Suthar** (Senior Frontend Architect & Engineering Leader at Citicorp Services India Pvt. Ltd.).

---

## 🚨 MANDATORY RULE: Profile & Resume Synchronization

**Whenever ANY change is made to the HTML profile ([`index.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/index.html) or [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html)), all corresponding resume documents and AI context files MUST be updated in the same task:**

```
   ┌─────────────────────────────────────────────────────────┐
   │         Source of Truth: index.html & resume.html        │
   └────────────────────────────┬────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│  Resume PDF   │       │  Resume DOCX  │       │   llms.txt    │
│  (.pdf)       │       │  (.docx)      │       │   worker.js   │
└───────────────┘       └───────────────┘       └───────────────┘
```

### Required Synchronization Targets:
1. **[`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html)**: Workday and ATS-optimized HTML resume.
2. **[`Ravindrakumar_Suthar_Resume.pdf`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.pdf)**: Print-ready A4 PDF generated via headless Chrome.
3. **[`Ravindrakumar_Suthar_Resume.docx`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.docx)**: Native Word document formatted for Workday and ATS field extraction.
4. **[`llms.txt`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/llms.txt)**: Plain text profile for AI search engines and crawler agents.
5. **[`worker.js`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/worker.js)**: Cloudflare Workers AI system prompt and fallback knowledge base.

---

## 🚀 Cloudflare Deployment & Cache-Busting Runbook

Follow these exact steps whenever making any changes to ensure updates appear immediately on [ravindra.lets.gen.in](https://ravindra.lets.gen.in/) without stale cache issues:

### Step 1: Make Code / Content Changes
- Edit [`index.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/index.html), [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html), [`style.css`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/style.css), etc.
- If career details, skills, or projects changed, also update [`llms.txt`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/llms.txt) and [`worker.js`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/worker.js) (knowledge fallback).

### Step 2: Cache-Busting Version Query Strings
To force client browsers to download updated CSS and JS files immediately, increment the version query string in **both** [`index.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/index.html) and [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html):
```html
<!-- Example: bump version query to current timestamp or version tag -->
<link rel="stylesheet" href="style.css?v=20260926-v4">
<script src="app.js?v=20260926-v4" defer></script>
```

### Step 3: Run the Automated Resume Sync Script
This compiles the 100% Workday-compatible `.docx` and print-ready vector `.pdf`:
```bash
python3 scripts/sync_resume.py
```
> **Audit Check**: Ensure both DOCX and PDF pass the Workday ATS Compatibility score at **100%**.

### Step 4: Deploy to Cloudflare Edge
Deploy the Worker and static assets to Cloudflare:
```bash
npx wrangler deploy
```
> **Note**: Cloudflare Workers with `env.ASSETS` will upload all modified files and publish a new Version ID.

### Step 5: Verify Live Edge Deployment
Run a curl check against the live domain to verify the new version and headers:
```bash
# Check headers (ensure no-cache headers are present):
curl -s -i https://ravindra.lets.gen.in/ | head -n 25

# Verify specific new content is live:
curl -s https://ravindra.lets.gen.in/ | grep "your-updated-term"
curl -s https://ravindra.lets.gen.in/resume | grep "your-updated-term"
```

### Step 6: Git Commit & Push
Commit all synchronized assets (including newly compiled PDF and DOCX) to GitHub:
```bash
git add -A
git commit -m "feat/fix: description of changes"
git push origin main
```

---

## ⚡ How Edge & Browser Caching is Governed

To prevent Cloudflare or browsers from holding onto stale HTML, the repository utilizes a three-tier cache invalidation mechanism:

1. **`worker.js` Static Asset Interceptor**:
   In `worker.js`, all requests returning `text/html` (or targeting `/`, `/resume`, `/tools`, `.pdf`, `.docx`) have edge revalidation headers injected automatically:
   - `Cache-Control: public, max-age=0, must-revalidate, no-cache`
   - `CDN-Cache-Control: no-cache, must-revalidate`
   - `Cloudflare-CDN-Cache-Control: no-cache, must-revalidate`
   - `Pragma: no-cache`
   - `Expires: 0`
   This tells Cloudflare edge nodes **never** to serve a cached HTML hit without checking origin assets.

2. **`_headers` Configuration**:
   The [`_headers`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/_headers) file explicitly instructs Cloudflare Pages/Workers routing rules:
   ```
   /*.html
     Cache-Control: public, max-age=0, must-revalidate, no-cache
     CDN-Cache-Control: no-cache, must-revalidate
     Cloudflare-CDN-Cache-Control: no-cache, must-revalidate
   ```

3. **Client Cache Busting**:
   Assets (`style.css` and `app.js`) use query string hashing (`?v=...`). Whenever CSS/JS is modified, incrementing the version string forces instant browser downloading.

---

## 🛠️ Troubleshooting Stale Content

If you or a visitor still see old HTML content:

1. **Browser Local Cache**:
   - Perform a hard refresh:
     - **Mac**: `Cmd + Shift + R`
     - **Windows/Linux**: `Ctrl + Shift + R` or `Ctrl + F5`
   - Or test in an Incognito / Private browsing window.

2. **Verify URL Normalization**:
   - Cloudflare serves the resume at `https://ravindra.lets.gen.in/resume` (without `.html`). If testing via curl, check `/resume` directly.

3. **Cloudflare Dashboard Full Purge (Optional)**:
   If an edge node retains an old cache snapshot, purge it globally:
   - Go to Cloudflare Dashboard -> `ravindra.lets.gen.in` zone -> **Caching** -> **Configuration**.
   - Click **Purge Everything**.

---

## 🔒 Inviolable Project Invariants

1. **Light Mode Only**: The portfolio is strictly light mode (`data-theme="light"`). Never re-enable dark mode toggles or dark color scheme overrides.
2. **Title Invariant**: Do NOT use "Assistant Vice President" or "AVP". The official functional title is **Senior Frontend Architect & Engineering Leader**.
3. **Citicorp Grouped Experience Layout (LinkedIn Style)**:
   Citicorp Services India Pvt. Ltd. (May 2013 – Present · 12+ yrs) must remain **ONE single grouped company section** with 3 internal sub-roles connected by a vertical timeline rail:
   - **Role 1 (2022 – Present)**: Senior Frontend Architect & AI Platform Lead
   - **Role 2 (2018 – 2022)**: Senior Lead Engineer — Frontend Architecture
   - **Role 3 (2013 – 2018)**: Senior Engineer / Technical Lead — UI Architecture
4. **Enterprise Initiative Attribution**: The **Autonomous Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension** is an enterprise initiative under **Citicorp Services India Pvt. Ltd.** (2013–Present). It is **not** a personal side project.
5. **CSS Cascade Precedence**: In [`style.css`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/style.css), all base component classes must be declared **before** the `@media` blocks. Responsive overrides must stay at the bottom of the file directly above `@media print`.
6. **Mobile Bottom Sheet UX**: On mobile viewports (`< 768px`), the Copilot AI drawer (`.ai-copilot-drawer`) must render as a native iOS-style full-width bottom sheet (`bottom: 0; width: 100%; border-radius: 26px 26px 0 0;`) with high-blur frosted glass (`backdrop-filter: blur(36px) saturate(200%)`), top grabber bar, and background scroll lock (`body.ai-drawer-open`).
7. **ATS Compatibility**: [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html) and [`Ravindrakumar_Suthar_Resume.docx`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.docx) must maintain single-column semantic layouts, standard headings (H1, H2), and clean bulleted lists for flawless parsing by Workday, Taleo, and Greenhouse ATS algorithms.
