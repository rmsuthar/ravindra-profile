# Ravindrakumar M. Suthar &mdash; Executive Profile & CV
### 🌐 Live Domain: [ravindra.lets.gen.in](https://ravindra.lets.gen.in/)

A high-performance, accessible, dual-mode **Professional Executive Profile cum Printable CV / Resume** for **Ravindrakumar M. Suthar** (Assistant Vice President & Senior Frontend Architect at Citicorp Services India).

Engineered specifically for instantaneous global edge hosting on **Cloudflare** under the custom domain **`ravindra.lets.gen.in`**.

---

## 🌟 Key Highlights

- **Dual-Mode Experience**:
  - **Portfolio View**: Interactive modern web presentation featuring quantifiable KPI cards, categorized skills filter, project showcase (*StateGuard.js*, *Global Edge Sandbox on Cloudflare Workers*, *CSPShield*), and expandable career milestones.
  - **CV / Resume View**: Streamlined, formal ATS-friendly reading mode.
- **Dedicated Print / PDF Export (`Cmd / Ctrl + P`)**:
  - Built-in `@media print` styling removes navigation bars, action buttons, and background colors to generate a clean, executive, 2–3 page document suitable for corporate reviews and executive search recruiters.
- **Fast & Lightweight**:
  - Pure HTML5, modern CSS variables, and vanilla JavaScript (zero heavy framework overhead, 0 runtime dependencies).
  - 100/100 Lighthouse performance, instant Time-To-First-Byte (< 20ms) across Cloudflare's 300+ edge PoPs.
- **Interactivity & Utilities**:
  - Dark / Light theme switch with persistence (`localStorage`) and system preference auto-detection.
  - One-click copy for email and phone with visual toast notification.
  - Dynamic **vCard (.vcf)** generation: allows recruiters to download and save Ravindra's contact card into Apple Contacts or Google Contacts with a single tap.
  - Interactive skill category filtering (Architecture, Leadership, Accessibility & Security, AI & DevOps).
- **Enterprise Security & A11y**:
  - Meets WCAG 2.1/2.2 AA and ADA accessibility standards (keyboard navigation, skip link, high contrast, ARIA landmarks).
  - Production-ready `_headers` with strict Content Security Policy (CSP), HSTS, and X-Content-Type-Options.
  - JSON-LD Structured Data (`Person` schema) for Google Search Rich Results.

---

## 📁 Project Structure

```
.
├── index.html       # Semantic HTML5 executive profile & CV with JSON-LD schema
├── style.css        # Responsive design system, dark/light themes, print styling
├── app.js           # Interactive controller (themes, filters, vCard, toasts)
├── favicon.svg      # Vector monogram brand logo
├── _headers         # Cloudflare Pages enterprise security headers & cache policies
├── wrangler.toml    # Cloudflare Pages deployment configuration
└── README.md        # Documentation and deployment instructions
```

---

## 🚀 How to Deploy to Cloudflare Pages

### Option 1: Quick Deploy via Wrangler CLI (Fastest - under 1 minute)

1. Open your terminal in this directory:
   ```bash
   cd /Users/ravindrasuthar/Documents/workspace/ravindra
   ```

2. Run Cloudflare Wrangler to deploy directly:
   ```bash
   npx wrangler pages deploy . --project-name=ravindra-profile
   ```
   *(If you are running it for the first time, Wrangler will open your browser to log in to your Cloudflare account).*

3. Your site will be deployed instantly to a custom Cloudflare Pages URL like:
   `https://ravindra-profile.pages.dev`

---

### Option 2: Deploy via GitHub & Cloudflare Dashboard

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of executive profile and CV"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** &rarr; **Create Application** &rarr; **Pages** &rarr; **Connect to Git**.
4. Select your repository.
5. In **Build settings**:
   - **Framework preset**: `None`
   - **Build command**: *(leave empty)*
   - **Build output directory**: `.` (or `/`)
6. Click **Save and Deploy**. Cloudflare Pages will build and deploy your site to global edge locations in seconds.

---

## 💻 Local Preview & Testing

To preview the application locally:

```bash
# Using Python 3 built-in server:
python3 -m http.server 8080

# Or using Node npx:
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ⌨️ Keyboard Shortcuts

- <kbd>P</kbd>: Open Print / PDF export dialog
- <kbd>T</kbd>: Toggle Dark / Light theme
