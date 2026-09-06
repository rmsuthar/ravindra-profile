# Agent Instructions & Operating Rules

> **Note**: For full workspace guidelines, see [AGENTS.md](file:///Users/ravindrasuthar/Documents/workspace/ravindra/AGENTS.md).

## Mandatory Rule: Synchronize All Resumes on Profile Changes

Whenever any change is made to the HTML profile ([`index.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/index.html) or [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html)), you **MUST** update all corresponding resume documents:

1. **HTML Resume**: [`resume.html`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/resume.html)
2. **Word DOCX**: [`Ravindrakumar_Suthar_Resume.docx`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.docx)
3. **PDF Resume**: [`Ravindrakumar_Suthar_Resume.pdf`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/Ravindrakumar_Suthar_Resume.pdf)
4. **AI Context**: [`llms.txt`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/llms.txt) & [`worker.js`](file:///Users/ravindrasuthar/Documents/workspace/ravindra/worker.js)

### How to Synchronize:
Run the automated synchronization tool:
```bash
python3 scripts/sync_resume.py
```

### Inviolable Standards:
- **Strict Light Mode Only** (`data-theme="light"`).
- **AEM Migration Agent & VS Code Extension** is an enterprise project under **Citicorp Services India**.
- **Mobile Copilot Box**: Native iOS bottom sheet modal with frosted glass styling on `< 768px`.
- **Deploy & Git**: Run `npx wrangler deploy` and push to `git` on every significant update.
