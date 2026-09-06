# AI Agent Operating Guidelines & Workspace Rules

This repository hosts the executive digital portfolio, ATS-optimized resumes, and Cloudflare Workers AI edge copilot for **Ravindrakumar M. Suthar** (Assistant Vice President & Senior Frontend Architect at Citicorp Services India Pvt. Ltd.).

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

## 🛠️ Automated Synchronization Workflow

An automated script is provided in [`scripts/sync_resume.py`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/scripts/sync_resume.py).

### Execution Command:
```bash
python3 scripts/sync_resume.py
```

### What `sync_resume.py` Does:
1. **Updates DOCX**: Reads [`Ravindrakumar_Suthar_Resume.docx`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.docx), synchronizes bullet points, competencies, and achievements into the OpenXML structure, and saves the file.
2. **Generates PDF**: Uses Google Chrome headless (`--headless --disable-gpu --no-pdf-header-footer --print-to-pdf`) to compile [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html) into [`Ravindrakumar_Suthar_Resume.pdf`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.pdf).
3. **Verifies Consistency**: Checks that key initiatives (e.g., Non-AEM to AEM migration agent) match across `index.html`, `resume.html`, and `llms.txt`.

---

## 📋 End-to-End Profile Update Checklist

When making any content or UI change to the portfolio, follow these sequential steps:

- [ ] **1. Update Web Profile**: Edit [`index.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/index.html) and [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html).
- [ ] **2. Update AI Context**: If experience, skills, or projects changed, update [`llms.txt`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/llms.txt) and [`worker.js`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/worker.js) fallback knowledge.
- [ ] **3. Run Sync Script**: Run `python3 scripts/sync_resume.py` to regenerate the PDF and DOCX files.
- [ ] **4. Cache Busting**: If CSS or JS was modified, increment version query strings in HTML links (e.g. `style.css?v=YYYYMMDD-x`).
- [ ] **5. Deploy Edge Worker**: Run `npx wrangler deploy` to push changes to [ravindra.lets.gen.in](https://ravindra.lets.gen.in/).
- [ ] **6. Git Commit & Push**: Commit and push all changed files to GitHub (`https://github.com/rmsuthar/ravindra-profile`).

---

## 🔒 Inviolable Project Invariants

1. **Light Mode Only**: The portfolio is strictly light mode (`data-theme="light"`). Never re-enable dark mode toggles or dark color scheme overrides.
2. **Enterprise Initiative Attribution**: The **Autonomous Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension** is an enterprise initiative under **Citicorp Services India Pvt. Ltd.** (2013–Present). It is **not** a personal side project.
3. **CSS Cascade Precedence**: In [`style.css`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/style.css), all base component classes must be declared **before** the `@media` blocks. Responsive overrides must stay at the bottom of the file directly above `@media print`.
4. **Mobile Bottom Sheet UX**: On mobile viewports (`< 768px`), the Copilot AI drawer (`.ai-copilot-drawer`) must render as a native iOS-style full-width bottom sheet (`bottom: 0; width: 100%; border-radius: 26px 26px 0 0;`) with high-blur frosted glass (`backdrop-filter: blur(36px) saturate(200%)`), top grabber bar, and background scroll lock (`body.ai-drawer-open`).
5. **ATS Compatibility**: [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html) and [`Ravindrakumar_Suthar_Resume.docx`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.docx) must maintain single-column semantic layouts, standard headings (H1, H2), and clean bulleted lists for flawless parsing by Workday, Taleo, and Greenhouse ATS algorithms.
