# Agent Operating Rules & Quick Reference

> **Full Guidelines & Runbook**: See [AGENTS.md](file:///Users/ravindrasuthar/Documents/workspace/ravindra/AGENTS.md).

## Mandatory Step-by-Step Deployment & Sync Runbook

Whenever making any code, UI, or content changes:

1. **Synchronize Files**:
   - Edit [`index.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/index.html) and [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html).
   - If career/skills/projects changed, update [`llms.txt`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/llms.txt) and [`worker.js`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/worker.js).

2. **Cache Busting**:
   - Increment CSS/JS version query strings in both `index.html` and `resume.html` (e.g. `style.css?v=YYYYMMDD-x`).

3. **Compile Resumes**:
   ```bash
   python3 scripts/sync_resume.py
   ```
   Ensures 100% Workday ATS score for `Ravindrakumar_Suthar_Resume.docx` and `Ravindrakumar_Suthar_Resume.pdf`.

4. **Deploy to Cloudflare Edge**:
   ```bash
   npx wrangler deploy
   ```

5. **Verify Live Deployment**:
   ```bash
   curl -s https://ravindra.lets.gen.in/ | grep "your-change"
   curl -s https://ravindra.lets.gen.in/resume | grep "your-change"
   ```

6. **Git Commit & Push**:
   ```bash
   git add -A && git commit -m "..." && git push origin main
   ```

## Key Invariants
- **No AVP**: Do not use "Assistant Vice President" or "AVP". Official title: **Senior Frontend Architect & Engineering Leader**.
- **Citicorp Grouped Experience**: Grouped company card (May 2013 – Present · 12+ yrs) with 3 sub-roles (2022–Present, 2018–2022, 2013–2018) connected via timeline rail.
- **Light Mode Only** (`data-theme="light"`).
- **Enterprise Project**: Non-AEM to AEM Migration AI Agent is under **Citicorp Services India**.
