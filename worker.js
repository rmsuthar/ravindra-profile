/**
 * Ravindrakumar M. Suthar - Executive Profile & Cloudflare Workers AI Service
 * Deployed on Cloudflare Workers with Static Assets & Workers AI Binding (env.AI)
 */

const RAVINDRA_SYSTEM_PROMPT = `You are the executive AI copilot for Ravindrakumar M. Suthar, Senior Frontend Architect & Engineering Leader at Citicorp Services India Pvt. Ltd.
You represent Ravindra with executive clarity, architectural authority, and precise factual accuracy.

Verified Profile & Career Background:
- Current Role: Senior Frontend Architect & Engineering Leader at Citicorp Services India Pvt. Ltd. (Pune, India; May 2013 – Present, 12+ years at Citi, 17+ years total experience).
- Citicorp AI Innovation: Unified Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension: At Citicorp, Ravindra architected a single, unified developer productivity platform where an autonomous AI migration agent operates in tandem with a custom Visual Studio Code extension. The VS Code extension standardizes prompt templates and IDE context injection, while the migration agent uses Retrieval-Augmented Generation (RAG) and custom AST transformation scripts to convert non-AEM components into Adobe Experience Manager (AEM) Core Components and Sling models, slashing migration cycle times by over 60%.
- Personal / Open-Source Projects: FoodScan AI (Mobile AI dietary scanner & foreign food label analyzer on Google Play at https://play.google.com/store/apps/details?id=in.gen.lets.foodscan and https://foodscan.lets.gen.in/packaging-marks), EdgeNonce (Zero-Latency CSP Nonce Streaming Engine on Cloudflare Workers at https://www.edge-nonce.com), Digital Table Clock & Calendar PWA (hardware upcycling & battery-friendly desk companion at https://clock.lets.gen.in/), Gujarat Panchang & Automated Broadcast System (precision astronomical calculation & WhatsApp broadcasting at https://tithi.lets.gen.in/), StateGuard.js (DOM tamper protection for transactional state integrity), Global Edge Sandbox & LB Inspector on Cloudflare Workers across 12 global PoP locations, and Developer Tools & Dynamic AI Cover Letter Generator (https://ravindra.lets.gen.in/tools & https://ravindra.lets.gen.in/cover-letter).
- Performance: Delivered up to 50% load-time improvements across enterprise web applications using React, Next.js, TypeScript, route-based code splitting, and automated Core Web Vitals telemetry.
- Accessibility & Security: Spearheaded WCAG 2.1 & 2.2 (Level AA/AAA), Section 508, and ADA compliance programme operationalizing axe-core and Lighthouse CI regression gates with NVDA audits, reducing post-deployment remediation costs by 60%. Focus Appearance, Focus Not Obscured, and Target Size compliance.
- GenAI Leadership: Pioneered Devin AI autonomous coding agents (~35% effort saved) and standardized GitHub Copilot (40% faster PR reviews).
- Platform & HRIS: Executed Workday platform integrations, candidate upload optimizations, and governed End-of-Vendor-Support (EOVS/EOL) technology transitions.
- People Leadership: Led multi-pod engineering teams maintaining team attrition below 8% through structured 1-on-1s and technical skill ladders.
- Education & Credentials: PG Diploma in IT (Sikkim Manipal University), HDSE (Aptech), B.Sc. Chemistry & Mathematics (Gujarat University). Certified ScrumMaster (CSM), AWS Cloud Practitioner, Google Analytics, IBM Design Thinking Practitioner.

Answer questions directly, professionally, and concisely in 2 to 4 paragraphs. Use markdown bullet points when appropriate.`;

const AI_MODELS = [
  '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  '@cf/meta/llama-3.2-3b-instruct',
  '@cf/meta/llama-3.2-1b-instruct'
];

const KNOWLEDGE_FALLBACKS = [
  {
    triggers: ['why hire', 'fit', 'vp', 'architect', 'principal', 'hire', 'leadership', 'why choose'],
    answer: `**Why Ravindra is an exceptional fit for an Executive Frontend Architect / VP of Engineering role:**

1. **17+ Years of Proven BFSI & Enterprise Delivery**: Over 12 years of executive engineering leadership at **Citicorp**, governing enterprise Banking, Financial Services, and Insurance (BFSI) architecture across multi-team squads with zero downtime and strict risk governance.
2. **Citibank AI & Agentic Innovation**: Architected Citibank's unified **Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension** — pairing an autonomous migration agent with a custom VS Code prompt generator (accelerating replatforming by 60%+ using RAG and AST scripts).
3. **Enterprise Web Performance & Security**: Delivered **50% Core Web Vitals load-time improvements** via React/Next.js architectures, created **StateGuard.js** for DOM tamper resistance, and deployed edge platforms on **Cloudflare Workers**.
4. **World-Class Accessibility & Culture**: Established enterprise **WCAG 2.1/2.2 AA and Section 508** automated CI pipelines with axe-core and NVDA audits, while sustaining exceptional team retention (**<8% attrition**).`
  },
  {
    triggers: ['aem', 'migration', 'rag', 'non-aem', 'agent', 'scripts', 'vscode', 'prompt', 'extension', 'prompts'],
    answer: `**Citibank AI Innovation — Unified Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension:**

- **Enterprise Origin**: Developed at **Citicorp Services India / Citibank** as a single, unified developer platform.
- **Integrated Agent + IDE Extension**: The autonomous AI migration agent works directly in tandem with a custom **Visual Studio Code extension**, integrating AI migration capabilities seamlessly into developer workflows.
- **VS Code Extension Role**: Generates structured, context-rich prompt templates, injects file trees and AST snippets into prompts, and enforces enterprise system directives to eliminate prompt drift.
- **RAG & Agentic Execution**: The agent uses Retrieval-Augmented Generation (RAG) to cross-reference legacy non-AEM component markups and behaviors with modern Adobe Experience Manager (AEM) Core Component schemas.
- **AST Transformation Scripts**: Custom Abstract Syntax Tree (AST) scripts parse and synthesize production-grade **AEM HTL templates, Sling Models, and Touch UI dialog XMLs** with automated validation.
- **Business Impact**: Slashed enterprise CMS replatforming timelines by **over 60%** while ensuring 100% template fidelity and adherence to AEM best practices.`
  },
  {
    triggers: ['clock', 'table clock', 'desk clock', 'calendar widget', 'widget', 'upcycling', 'battery', 'wake lock', 'oled'],
    answer: `**Digital Table Clock & Calendar Widget / PWA (Personal / Open Source):**

- **Overview**: An ultra-crisp, battery-friendly digital table clock & calendar PWA designed to upcycle older devices (iPads, iPhones, Android tablets) into dedicated desk docks and bedside companions ([Live at clock.lets.gen.in](https://clock.lets.gen.in/) | PWA installer at [widget.lets.gen.in](https://widget.lets.gen.in/)).
- **Dual-Pane Adaptive UI**: Crisp digital clock paired with a live interactive calendar (toggle between full-month view and "Today" day tile).
- **Instrument Metrics**: Live Day Progress percentage, remaining countdown, ISO week number, and dynamic lunar moon phase geometry.
- **Hardware & Battery Optimization**:
  - **Zero-Framework (Vanilla JS/CSS)**: Sub-millisecond boot, near-zero CPU footprint, running at 60 FPS even on vintage devices (iPhone 5s, early iPads).
  - **True OLED Black (#000000)**: Completely powers down OLED pixels to minimize battery drain and avoid burn-in.
  - **Screen Wake Lock API**: Gracefully keeps the screen awake without changing system-wide timeouts.
  - **Offline PWA Service Worker**: Full caching eliminates background polling and radio power consumption.
  - **Built-in Dimmer & Night Amber**: Touch-based brightness control for bedside night use.`
  },
  {
    triggers: ['foodscan', 'food', 'dietary', 'jain', 'vegan', 'celiac', 'allergen', 'e-number', 'google play', 'label', 'supermarket', 'traveler'],
    answer: `**FoodScan AI — AI Dietary Scanner & Multilingual Food Label Decoder (Google Play):**

- **Overview**: Mobile AI application officially live on Google Play, engineered for conscious travelers abroad (Vegetarian, Jain, Vegan, Celiac gluten-free, and severe allergen sufferers) who face anxiety in foreign supermarkets and airports.
- **The Core Problem**: In India, food is marked with mandatory Green Dots. Abroad (UK, Europe, US, Japan), statutory dietary dots do not exist, and recycling symbols like Germany's "Der Grüne Punkt" (a green circular arrow mark) deceive travelers into purchasing meat or pork snacks. Microscopic foreign ingredients hide animal gelatins, rennet, carmine (E120), or hidden wheat.
- **Key Capabilities**:
  - **Dual Barcode & Multilingual OCR**: Instant camera scanning of foreign food labels (French, German, Japanese, Italian, etc.) and barcodes in <1 second.
  - **Jain Ahimsa Safeguards**: Flags underground root vegetables (onions, garlic, potatoes, carrots, beets), honey, and animal gelatins.
  - **100% Pure Veg & Vegan**: Detects hidden animal rennet, beef tallow, carmine (E120), shellac, and animal-derived E471 emulsifiers.
  - **Celiac Gluten-Free (<20 ppm)**: Rigorously cross-checks wheat, barley, rye, malt, and cross-contamination alerts.
  - **Major Allergen Shield**: Real-time alerts for peanuts, tree nuts, dairy, soy, eggs, and sesame.
  - **Chemical E-Number Decoder**: Translates confusing additive numbers into plain English with deterministic plant vs. animal origin determination.
  - **Traveler Edge Architecture**: Ultra-fast edge processing built to work reliably even in spotty supermarket reception.
- **Official Resources**:
  - [Download on Google Play Store](https://play.google.com/store/apps/details?id=in.gen.lets.foodscan)
  - [Global Packaging Marks Guide](https://foodscan.lets.gen.in/packaging-marks)`
  },
  {
    triggers: ['edgenonce', 'nonce', 'csp', 'htmlrewriter', 'streaming', 'pci-dss', 'pci'],
    answer: `**EdgeNonce — Zero-Latency CSP Nonce Streaming Engine (Personal / Open Source):**

- **Overview**: An enterprise Content Security Policy (CSP) streaming engine at the network edge deployed on Cloudflare Workers ([https://www.edge-nonce.com](https://www.edge-nonce.com)).
- **The Challenge**: Modern strict CSP Level 3 requires per-request dynamic cryptographic nonces, which traditionally destroys static CDN/Dispatcher caching or forces insecure \`'unsafe-inline'\` allowances.
- **The Solution**: EdgeNonce leverages Cloudflare V8 Isolates and streaming \`HTMLRewriter\` to inject unique 128-bit nonces on the fly (<1.5ms) into cached HTML streams while origin CDNs/AEM Dispatchers retain 100% cache hit rates.
- **Core Technology Stack**: TypeScript, Cloudflare V8 Isolates, streaming HTMLRewriter, Workers AI threat classifier, and \`csp-compat.js\` runtime bridge.
- **Regulatory Compliance**: Built to satisfy PCI-DSS v4.0 (Requirements 6.4.3 & 11.6.1 for script authorization and tamper detection), HIPAA, and GDPR.
- **Documentation & Architecture Guides**:
  - [EdgeNonce Official Site](https://www.edge-nonce.com)
  - [AEM Architecture Guide](https://www.edge-nonce.com/aem-services.html)
  - [IHS Apache Integration Guide](https://www.edge-nonce.com/apache-ihs-integration-guide.html)`
  },
  {
    triggers: ['stateguard', 'security', 'dom', 'freeze', 'tamper'],
    answer: `**StateGuard.js — DOM Tamper Protection for BFSI Workflows (Personal / Open Source):**

- **Problem Solved**: In mission-critical financial applications, malicious actors or compromised browser extensions can alter read-only form attributes, disabled states, or hidden verification IDs via browser Developer Tools before form submission.
- **Mechanism**: StateGuard.js is a lightweight client-side runtime utility that intercepts DOM mutation events, locks critical attributes using \`Object.freeze\` and property descriptor sealing, and instantly reverts or flags unauthorized client modifications.
- **Live Demo**: Explore the implementation at [rmsuthar.github.io/StateGuard](https://rmsuthar.github.io/StateGuard/).`
  },
  {
    triggers: ['panchang', 'gujarat', 'tithi', 'choghadiya', 'astronomical', 'ephem', 'lahiri', 'broadcast', 'vedic', 'muhurat'],
    answer: `**Gujarat Panchang & Automated Broadcast System (Personal / Open Platform):**

- **Overview**: Automated, precision astronomical calculation, edge-published web application, and messaging system delivering accurate daily Gujarati Panchang, live Choghadiyas, Vedic muhurats, and inauspicious affliction tracking (Vaar Vela, Kaal Vela, Kaal Ratri, Rahu Kaal).
- **Astronomical Calculation Engine**: Python & PyEphem computing high-precision planetary ephemerides, sunrise/sunset, and Chitrapaksha (Lahiri) Ayanamsha for Gujarat coordinates (23.0225° N, 72.5714° E). Evaluates classical Vedic afflictions, flagging contaminated (*દોષિત*) slots with actionable warnings.
- **Edge Delivery**: Zero-framework architecture in semantic HTML5, Vanilla CSS, and modular ES6 deployed atomically to Cloudflare Pages edge network with SHA-256 asset manifest hashing.
- **Clientside Real-Time Engine**: IST clock ticker locked to \`Asia/Kolkata\`, dynamic Choghadiya countdown scanner finding the next truly unblemished (*શુદ્ધ*) auspicious slot, and mathematically rendered dynamic SVG lunar crescent geometry.
- **Automated WhatsApp Distribution**: Automated daily morning broadcast to WhatsApp Channel subscribers using headless Playwright with isolated session persistence.
- **Metrics**: 0px horizontal scroll across iOS Safari & Android (down to 320px) and WCAG AA high-contrast design (>13:1).
- **Live Platform**: [tithi.lets.gen.in](https://tithi.lets.gen.in/).`
  },
  {
    triggers: ['workday', 'ats', 'resume', 'upload', 'docx', 'cv', 'download'],
    answer: `**Workday ATS Integration & Resume Compatibility:**

- **Workday Platform Integrations**: At Citicorp, Ravindra facilitated Workday platform uploads and HRIS data configuration workflows, maintaining data integrity at enterprise scale.
- **100% Workday ATS Compatibility**: This profile provides candidate upload assets optimized specifically for Workday's Sovren parsing engine:
  - **Native Word (.docx)**: Clean XML structure for zero-error field extraction ([Download DOCX](https://ravindra.lets.gen.in/Ravindrakumar_Suthar_Resume.docx)).
  - **Single-Column PDF**: Machine-readable text generated via Chrome headless print engine ([Download PDF](https://ravindra.lets.gen.in/Ravindrakumar_Suthar_Resume.pdf)).
  - **Semantic ATS Web View**: Dedicated single-column web resume at [ravindra.lets.gen.in/resume](https://ravindra.lets.gen.in/resume).`
  },
  {
    triggers: ['education', 'degree', 'university', 'qualification', 'study', 'college', 'school', 'chemistry', 'mathematics', 'smu', 'diploma'],
    answer: `**Educational Background & Academic Credentials:**

- **Post Graduate Diploma in Information Technology (PGDIT)** — Sikkim Manipal University. Comprehensive focus on software architecture, enterprise systems, and database engineering.
- **Higher Diploma in Software Engineering (HDSE)** — Aptech Computer Education. Rigorous practical training in object-oriented programming, systems design, and full-stack software development.
- **Bachelor of Science (B.Sc.) in Chemistry & Mathematics** — Gujarat University. Solid analytical and quantitative foundation driving algorithmic rigor and computational problem-solving.`
  },
  {
    triggers: ['cert', 'csm', 'scrum', 'aws', 'agile', 'google analytics', 'ibm', 'qualification'],
    answer: `**Professional Certifications & Accreditations:**

- **Certified ScrumMaster (CSM®)** — Scrum Alliance (Lic. 000481231). Expert in agile sprint governance, cross-functional squad velocity, and iterative product delivery.
- **AWS Certified Cloud Practitioner** — Amazon Web Services (Validation: 9R7L7F1221B11W9K). Solid grounding in cloud architectures, serverless computing, and edge infrastructure.
- **Google Analytics Individual Qualification (GAIQ)** — Advanced digital analytics, custom event instrumentation, and Core Web Vitals telemetry.
- **IBM Design Thinking Practitioner** — Human-centric enterprise UX architecture, design system co-creation, and rapid prototyping.`
  },
  {
    triggers: ['experience', 'citi', 'citicorp', 'career', 'background', 'tenure', 'timeline', 'current role', 'history', 'impetus', 'gatesix', 'pinnacle', 'cognizant'],
    answer: `**Professional Experience & Career Milestones:**

- **Senior Frontend Architect & AI Platform Lead** — Citicorp Services India Pvt. Ltd. (2022 – Present):
  - Leads enterprise CMS modernisation, orchestrating full migration of Citi's OpenText TeamSite to Adobe Experience Manager (AEM).
  - Architected Citibank's unified Non-AEM to AEM Migration AI Agent and VS Code Extension (60%+ faster delivery).
  - Pioneered enterprise GenAI adoption (Devin AI, GitHub Copilot), saving ~35% developer effort.
  - Leads cross-functional frontend engineering squads (~12 engineers) maintaining <8% attrition.
- **Senior Lead Engineer — Frontend Architecture** — Citicorp Services India Pvt. Ltd. (2018 – 2022):
  - Led InView core framework development and platform performance (team of 6, up to 50% load-time gains).
  - Owned end-to-end project delivery from kickoff to production with business stakeholders.
  - Engineered CI/CD pipelines with TeamCity and IBM UrbanDeploy; contributed full-stack Java solutions.
  - Established company-wide Section 508 and ADA compliance programme with axe-core and Lighthouse CI.
- **Senior Engineer / Technical Lead — UI Architecture** — Citicorp Services India Pvt. Ltd. (2013 – 2018):
  - Built and delivered Citi InView application modules including Alerts & Notifications and InView UI Framework.
  - Architected enterprise UI, API, and iframe integrations with postMessage protocol governance across 6+ squads.
  - Built and mentored a team of 4–5 frontend engineers.
- **Senior Consultant — CRM UI Architecture** — Cognizant Technology Solutions (Dec 2010 – Feb 2013):
  - Architected mobile CRM frontends with Siebel CRM and Oracle CRM SOAP integrations; directed usability and heuristic testing.
- **Module Lead & Usability Analyst** — Impetus Infotech India Pvt. Ltd. (Jun 2007 – Dec 2010):
  - Led UI engineering pods for enterprise web clients, translating concept visualizations into robust implementations and governing client-side architecture.
  - Executed usability studies, competitive benchmarking, and heuristic evaluations to optimize web client interfaces.
  - Partnered with organizational leadership to drive architecture decisions, UI design standards, and industry best practices.
- **Lead Web Specialist** — Gatesix Technologies India Pvt. Ltd. (Aug 2004 – Jun 2007):
  - Formulated frontend strategy across UI/UX design, development standards, SEO architecture, and W3C compliance.
  - Directed concept visualization, application user flows, and client-side R&D on emerging web technologies.
- **Senior Web Designer** — Pinnacle Technosys (May 2003 – Jul 2004):
  - Designed, developed, and maintained client portals and digital marketing platforms with bespoke software integrations.
  - Engineered W3C-compliant websites, interactive Flash applications, and digital/print media collateral.
- Total Career: **17+ years of continuous software engineering and architectural leadership**.`
  },
  {
    triggers: ['skills', 'tech', 'stack', 'technologies', 'react', 'next', 'typescript', 'frontend', 'microfrontend', 'javascript', 'css', 'devops', 'openshift', 'jira', 'governance'],
    answer: `**Core Technical Competencies & Technology Stack:**

- **Architecture & Frameworks**: React, Next.js, TypeScript, Micro-Frontends (Module Federation), Single Page Applications (SPA), Server-Side Rendering (SSR), Progressive Web Apps (PWA).
- **Delivery & Project Governance**: Agile / Scrum / Kanban (CSM), SDLC, Release & Change Management, Risk & Issue Management, Budget & Resource Planning, Financial Management, Executive Reporting & Governance, Vendor Management.
- **Enterprise Tools & PM Platforms**: Jira, OpenShift DevOps, ServiceNow, Clarity, MS Project, GitHub Projects, Workday Platform Uploads, Workday HRIS.
- **Leadership & Key Competencies**: Strategic Thinking, Leadership & Influence, Stakeholder Management, Decision Making, Conflict Resolution, Team Coaching & Mentorship.
- **AI & Automation**: Autonomous AI Agents (RAG pipelines), Abstract Syntax Tree (AST) scripts, VS Code Extension Development, GitHub Copilot, Devin AI, Google Antigravity SDK.
- **Cloud & Edge**: Cloudflare Workers, Edge Computing, AWS (Cloud Practitioner), CI/CD pipelines (GitHub Actions, Jenkins).
- **Design & Accessibility**: WCAG 2.1 & 2.2 (Level AA/AAA), Section 508, axe-core, Lighthouse CI, NVDA screen reader audits, Vanilla CSS, Design Systems.`
  },
  {
    triggers: ['accessibility', 'wcag', '508', 'ada', 'axe', 'lighthouse', 'aria', 'screen reader'],
    answer: `**Enterprise Web Accessibility (a11y) Governance:**

- **Standards Compliance**: Spearheaded institutional WCAG 2.1 and 2.2 (Level AA & AAA), Section 508, and ADA compliance programs across Citicorp enterprise web platforms.
- **Automated Gates**: Integrated **axe-core** and **Lighthouse CI** into automated regression pipelines, catching accessibility regressions pre-commit.
- **Screen Reader Auditing**: Conducted rigorous assistive technology evaluations using NVDA and VoiceOver, achieving zero critical audit findings.
- **ROI & Impact**: Slashed post-deployment accessibility remediation overhead by **60%**, ensuring inclusive banking experiences for millions of global users.`
  },
  {
    triggers: ['genai', 'copilot', 'devin', 'llm', 'artificial intelligence', 'agentic'],
    answer: `**Generative AI & Agentic Engineering Leadership:**

- **Citicorp Migration AI Agent**: Architected autonomous RAG migration agent paired with a custom VS Code extension, slashing Non-AEM to AEM migration times by 60%+.
- **Devin AI Coding Agents**: Pioneered autonomous coding workflows with Devin AI at enterprise scale, yielding ~35% effort savings across repetitive migrations.
- **GitHub Copilot Integration**: Standardized GitHub Copilot across global squads, driving 40% faster pull request reviews and standardizing clean code patterns.`
  },
  {
    triggers: ['team', 'leadership', 'attrition', 'mentor', 'culture', 'management', 'squad', 'pod'],
    answer: `**Engineering Leadership, People Management & Culture:**

- **Squad Leadership**: Guides multi-pod cross-functional teams comprising senior developers, QA engineers, and UX architects.
- **Industry-Leading Retention**: Maintained team attrition below **8%** over multi-year enterprise delivery cycles.
- **Talent Development**: Conducts structured bi-weekly 1-on-1s, technical skill ladders, and internal architecture workshops on micro-frontends, edge computing, and AI tools.`
  },
  {
    triggers: ['contact', 'email', 'phone', 'location', 'linkedin', 'reach', 'connect', 'pune', 'city', 'address', 'qr', 'qrcode', 'pass', 'vcard'],
    answer: `**Contact & Professional Channels:**

- **Email**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com)
- **Phone**: [+91 83800 99988](tel:+918380099988)
- **Location**: Pune, Maharashtra, India
- **LinkedIn**: [linkedin.com/in/ravindrasuthar](https://www.linkedin.com/in/ravindrasuthar/)
- **Live Portfolio & Tools**: [ravindra.lets.gen.in](https://ravindra.lets.gen.in/) | [Tools Suite](https://ravindra.lets.gen.in/tools)
- **Digital Passes & QR Codes**: [Profile QR Code](https://ravindra.lets.gen.in/qrcode.svg) | [Contact Card vCard QR](https://ravindra.lets.gen.in/contact-qr.svg)`
  },
  {
    triggers: ['project', 'tools', 'sandbox', 'edge', 'portfolio', 'inspector'],
    answer: `**Featured Innovations & Open-Source Projects:**

1. **Citibank Non-AEM to AEM Migration AI Agent**: Enterprise RAG + AST toolchain slashing component replatforming time by 60%+.
2. **FoodScan AI**: Mobile AI dietary scanner and foreign food label analyzer on Google Play with multilingual OCR, dual barcode engine, and deterministic safeguards for Jain, Vegan, and Celiac travelers ([Google Play](https://play.google.com/store/apps/details?id=in.gen.lets.foodscan) | [Guide](https://foodscan.lets.gen.in/packaging-marks)).
3. **EdgeNonce**: Zero-latency CSP nonce streaming engine running on Cloudflare Workers & HTMLRewriter (<1.5ms latency, 100% origin cache retention, PCI-DSS v4.0 compliant) ([Live Engine](https://www.edge-nonce.com)).
4. **Gujarat Panchang & Automated Broadcast System**: Precision astronomical calculation (Python/PyEphem), zero-framework edge web app, live Choghadiya/lunar engine, and automated WhatsApp broadcasts ([Live Platform](https://tithi.lets.gen.in/)).
5. **StateGuard.js**: Runtime DOM tamper protection preventing client-side attribute tampering in financial forms ([Live Demo](https://rmsuthar.github.io/StateGuard/)).
6. **Global Edge Sandbox & LB Inspector**: Cloudflare Workers multi-PoP routing and telemetry sandbox across 12 global regions ([Launch](https://gateway.lets.gen.in/)).
7. **Enterprise Developer Tools Suite**: Suite of client-side dev utilities at [ravindra.lets.gen.in/tools](https://ravindra.lets.gen.in/tools).`
  }
];

function findFallbackAnswer(query) {
  const q = (query || '').toLowerCase().trim();
  for (const item of KNOWLEDGE_FALLBACKS) {
    if (item.triggers.some(t => q.includes(t))) {
      return item.answer;
    }
  }
  return `**Ravindrakumar M. Suthar — Executive Overview:**

- **Role**: Senior Frontend Architect & Engineering Leader at Citicorp Services India Pvt. Ltd. (17+ years total experience, 12+ years at Citi).
- **Core Specializations**: Micro-frontends, React/Next.js, TypeScript, Autonomous AI Migration Agents (Non-AEM to AEM using RAG), VS Code Extensions, FoodScan AI mobile scanner, StateGuard.js, Cloudflare Workers, and WCAG 2.1/2.2 AA Accessibility.
- **Credentials**: Certified ScrumMaster (CSM®), AWS Cloud Practitioner, PGDIT, HDSE, B.Sc.
- **Contact**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com) | +91 83800 99988 | [LinkedIn](https://www.linkedin.com/in/ravindrasuthar/).

You can ask me about his **FoodScan AI app**, **AEM AI migration agents**, **EdgeNonce**, **StateGuard.js**, **Workday integrations**, **education**, **certifications**, or **architectural leadership**!`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ── API: AI Status Check ────────────────────────────────────────────────
    if (url.pathname === '/api/ai-status') {
      const hasAI = Boolean(env.AI);
      return new Response(JSON.stringify({
        status: 'online',
        hasAI,
        model: AI_MODELS[0],
        fallbackModels: AI_MODELS.slice(1),
        edgeColo: request.cf?.colo || 'EDGE',
        engine: 'Cloudflare Workers AI'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ── API: AI Architecture Pulse & Dynamic Soundbite (Refreshed on Load) ──
    if (url.pathname === '/api/ai-soundbite' && (request.method === 'GET' || request.method === 'POST')) {
      const isFresh = url.searchParams.get('fresh') === 'true';

      const SOUNDBITES_POOL = [
        {
          quote: "Autonomous AI migration agents achieve peak reliability when integrated directly inside the IDE — injecting AST snippets and prompt schemas to eliminate drift before code hits git.",
          theme: "Agentic Engineering Directive",
          category: "AI & Modernization"
        },
        {
          quote: "Monolith-to-microfrontend migrations in BFSI succeed only when decoupled at the edge. Zero downtime requires route-level federation, isolated blast radiuses, and automated contract tests.",
          theme: "Resilient BFSI Architecture",
          category: "Micro-Frontends"
        },
        {
          quote: "Never trust the client runtime blindly. In transactional financial systems, client-side state must be protected against malicious DevTools tampering via runtime DOM descriptor sealing.",
          theme: "StateGuard.js Security Principle",
          category: "Web Security"
        },
        {
          quote: "Sub-second LCP and zero cumulative layout shift aren't post-launch patches — they are engineered by default through aggressive route-based code splitting and edge CDN hydration.",
          theme: "Core Web Vitals Blueprint",
          category: "Performance"
        },
        {
          quote: "Enterprise WCAG 2.2 AA and Section 508 compliance cannot be treated as an audit afterthought; it must run as an automated pre-commit regression gate in CI/CD pipelines.",
          theme: "Inclusive Engineering Standard",
          category: "Accessibility"
        },
        {
          quote: "Sustaining under 8% team attrition across 12 years of enterprise delivery comes from radical architectural transparency, technical skill ladders, and genuine psychological safety.",
          theme: "Engineering Leadership Culture",
          category: "People Leadership"
        },
        {
          quote: "Replatforming legacy CMS components using RAG context retrieval and custom AST transformation scripts slashed Citicorp component migration cycle times by over 60%.",
          theme: "Citicorp AI Migration Benchmark",
          category: "Enterprise Delivery"
        },
        {
          quote: "Precision astronomical calculation and Vedic limb mathematics demand exactitude — coupling Python PyEphem ephemerides with zero-framework Cloudflare edge delivery delivers sub-second Gujarati Panchang.",
          theme: "Astronomical Computing Architecture",
          category: "Edge & Astronomy"
        },
        {
          quote: "Standardizing AI coding agents like Devin and GitHub Copilot drives real ROI when measured by cycle time compression, freeing senior architects for security and governance.",
          theme: "GenAI Team Productivity",
          category: "AI Automation"
        },
        {
          quote: "Pushing compute to Cloudflare global edge PoPs transforms regional latency from hundreds of milliseconds to single-digit response times worldwide.",
          theme: "Edge-First Systems Design",
          category: "Edge Computing"
        },
        {
          quote: "A design system without strict accessibility tokens and cross-framework components is just a style guide; true systems bind design tokens to production DOM semantics.",
          theme: "Design System Architecture",
          category: "Design Systems"
        },
        {
          quote: "Enterprise Workday integrations require strict semantic schemas and clean XML structures so candidate data flows across HRIS systems with zero data loss.",
          theme: "Workday ATS Integrity",
          category: "HRIS & Platform"
        },
        {
          quote: "Clean reactive state models isolate mutations to deterministic pipelines, ensuring complex financial transaction dashboards never suffer cascading re-renders.",
          theme: "Predictable Frontend State",
          category: "Architecture"
        }
      ];

      // If dynamic fresh generation requested and AI binding is available, attempt real-time LLM generation
      if (isFresh && env.AI && typeof env.AI.run === 'function') {
        try {
          const aiResult = await env.AI.run(AI_MODELS[1] || AI_MODELS[0], {
            messages: [
              {
                role: 'system',
                content: `You are the executive AI copilot for Ravindrakumar M. Suthar (Senior Frontend Architect & Engineering Leader at Citicorp, 17+ yrs experience).
Generate exactly one crisp, inspiring, authoritative architectural quote or engineering metric (1 to 2 sentences max) reflecting his expertise in micro-frontends, AEM AI migration agents, StateGuard.js DOM security, 50% CWV gains, <8% attrition, or WCAG 2.2 AA.
Output valid JSON with keys: "quote", "theme", "category". No extra markdown.`
              },
              { role: 'user', content: 'Generate a fresh high-impact architectural soundbite for a visiting engineering leader.' }
            ],
            max_tokens: 180,
            temperature: 0.7
          });

          if (aiResult && (aiResult.response || aiResult.text)) {
            const cleaned = (aiResult.response || aiResult.text).replace(/```json/gi, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            if (parsed.quote) {
              return new Response(JSON.stringify({
                ...parsed,
                source: 'Cloudflare Workers AI (Real-Time Generation @ Edge)',
                edgeColo: request.cf?.colo || 'EDGE',
                timestamp: new Date().toISOString()
              }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              });
            }
          }
        } catch (e) {
          console.error('AI soundbite generation note:', e.message);
        }
      }

      // Fast randomized selection from verified soundbites pool
      const index = Math.floor(Math.random() * SOUNDBITES_POOL.length);
      const selected = SOUNDBITES_POOL[index];

      return new Response(JSON.stringify({
        ...selected,
        source: 'Verified Architecture Knowledge Base (Edge Cache)',
        edgeColo: request.cf?.colo || 'EDGE',
        timestamp: new Date().toISOString()
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // ── API: AI Chat Copilot (Powered by Cloudflare Workers AI) ─────────────
    if (url.pathname === '/api/ai-chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const userMessage = (body.message || '').trim();

        if (!userMessage) {
          return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        let aiResponseText = null;
        let source = null;

        // Attempt Cloudflare Workers AI execution across supported models
        if (env.AI && typeof env.AI.run === 'function') {
          const messages = [
            { role: 'system', content: RAVINDRA_SYSTEM_PROMPT }
          ];

          if (Array.isArray(body.history)) {
            for (const h of body.history.slice(-4)) {
              if (h.role && h.content) {
                messages.push({ role: h.role === 'user' ? 'user' : 'assistant', content: String(h.content) });
              }
            }
          }

          messages.push({ role: 'user', content: userMessage });

          for (const model of AI_MODELS) {
            try {
              const aiResult = await env.AI.run(model, {
                messages,
                max_tokens: 512,
                temperature: 0.3
              });

              if (aiResult && (aiResult.response || aiResult.text)) {
                aiResponseText = aiResult.response || aiResult.text;
                source = `Cloudflare Workers AI (${model} @ Edge)`;
                break;
              }
            } catch (aiErr) {
              console.error(`Workers AI execution note for ${model}:`, aiErr.message);
            }
          }
        }

        // Graceful intelligent fallback if Workers AI is rate limited or cold starting
        if (!aiResponseText) {
          aiResponseText = findFallbackAnswer(userMessage);
          source = 'Verified Executive Architecture Knowledge Base (Edge)';
        }

        return new Response(JSON.stringify({
          answer: aiResponseText,
          source,
          edgeColo: request.cf?.colo || 'EDGE',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (err) {
        return new Response(JSON.stringify({
          error: 'Failed to process AI request',
          details: err.message
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ── API: AI Role Fit & Job Description Matcher ──────────────────────────
    if (url.pathname === '/api/ai-match' && request.method === 'POST') {
      try {
        const body = await request.json();
        const jd = (body.jobDescription || '').trim();
        const roleTitle = (body.roleTitle || 'Executive Engineering / Architecture Role').trim();

        if (!jd) {
          return new Response(JSON.stringify({ error: 'Job description text is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        let matchResult = null;
        let source = null;

        if (env.AI && typeof env.AI.run === 'function') {
          const prompt = `Analyze this Job Description against Ravindrakumar M. Suthar's verified background:
Target Role: ${roleTitle}
Job Description:
"""
${jd.slice(0, 2000)}
"""

Provide a structured evaluation in valid JSON with these exact keys:
{
  "score": (integer percentage between 85 and 99 based on match),
  "verdict": (1 sentence summary of fit),
  "topAlignments": (array of 4 specific matching strengths),
  "relevantInnovations": (array of 2 to 3 relevant projects e.g. AEM Migration Agents, StateGuard, Micro-frontends, Workday),
  "interviewTopics": (array of 3 high-value architectural questions to ask him)
}`;

          const matchMessages = [
            { role: 'system', content: RAVINDRA_SYSTEM_PROMPT + '\nYou output valid JSON only. Never include markdown code fences or explanatory text outside the JSON object.' },
            { role: 'user', content: prompt }
          ];

          for (const model of AI_MODELS) {
            try {
              const aiResult = await env.AI.run(model, {
                messages: matchMessages,
                max_tokens: 512,
                temperature: 0.2
              });

              if (aiResult && (aiResult.response || aiResult.text)) {
                const text = aiResult.response || aiResult.text;
                const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
                matchResult = JSON.parse(cleaned);
                source = `Cloudflare Workers AI (${model} @ Edge)`;
                break;
              }
            } catch (e) {
              console.error(`AI match parse error for ${model}:`, e.message);
            }
          }
        }

        // Fallback intelligent matching engine
        if (!matchResult) {
          source = 'Executive Profile Pattern Matcher (Edge)';
          matchResult = {
            score: 96,
            verdict: `Strong strategic alignment for ${roleTitle} with 17+ years enterprise leadership, micro-frontend modernization, and AI automation.`,
            topAlignments: [
              'Enterprise Frontend & Micro-Frontend Architecture at Citicorp scale (12+ years)',
              'Autonomous AI Agent Development (RAG-based Non-AEM to AEM Migration Engine)',
              'Web Performance Optimization (Delivered up to 50% Core Web Vitals gains)',
              'Section 508, ADA, and WCAG 2.1/2.2 AA Compliance Governance with axe-core'
            ],
            relevantInnovations: [
              'Agentic Non-AEM to AEM Migration Engine (RAG & AST Scripts)',
              'EdgeNonce (Zero-Latency Dynamic CSP Nonce Streaming Engine)',
              'VS Code AI Prompt Generator Extension',
              'StateGuard.js (BFSI DOM Tamper Protection)',
              'Global Edge Sandbox & Load Balancer Inspector (Cloudflare Workers)'
            ],
            interviewTopics: [
              'How he orchestrated multi-agent RAG pipelines for legacy AEM replatforming',
              'Strategies for zero-downtime micro-frontend migration in highly regulated BFSI environments',
              'His approach to cultivating high-retention engineering teams (<8% attrition)'
            ]
          };
        }

        return new Response(JSON.stringify({
          match: matchResult,
          source,
          edgeColo: request.cf?.colo || 'EDGE'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (err) {
        return new Response(JSON.stringify({
          error: 'Failed to process match request',
          details: err.message
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ── API: Dynamic AI Cover Letter Generator ──────────────────────────────
    if (url.pathname === '/api/cover-letter' && request.method === 'POST') {
      try {
        const body = await request.json();
        const jd = (body.jobDescription || '').trim();
        let company = (body.company || '').trim();
        let roleTitle = (body.roleTitle || '').trim();
        const addressee = (body.addressee || 'Hiring Team').trim();
        const tone = (body.tone || 'balanced').trim(); // 'leadership', 'technical', 'bfsi', 'balanced'
        const format = (body.format || 'standard').trim(); // 'standard', 'bullets', 'concise'

        if (!jd) {
          return new Response(JSON.stringify({ error: 'Job description text is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Auto-extract Company if missing
        if (!company) {
          const compMatches = jd.match(/(?:at|with|join|about)\s+([A-Z][A-Za-z0-9&.\- ]{2,30}?)(?:,|\.|\n|'s|\s+is|\s+in|\s+team)/i);
          if (compMatches && compMatches[1]) {
            company = compMatches[1].trim();
          } else if (/mastercard/i.test(jd)) company = 'Mastercard';
          else if (/citibank|citigroup|citi/i.test(jd)) company = 'Citigroup';
          else if (/jpmorgan|chase/i.test(jd)) company = 'JPMorgan Chase';
          else if (/barclays/i.test(jd)) company = 'Barclays';
          else if (/sapient/i.test(jd)) company = 'Publicis Sapient';
          else company = 'the Hiring Organization';
        }

        // Auto-extract Role Title if missing
        if (!roleTitle) {
          const titleMatches = jd.match(/(?:seeking|hiring|role of|position of|looking for a|title:)\s*([A-Za-z0-9&,\- ]{4,40}?)(?:\.|\n|\r|who|to lead|to join)/i);
          if (titleMatches && titleMatches[1]) {
            roleTitle = titleMatches[1].trim();
          } else if (/vice president|vp/i.test(jd)) roleTitle = 'Vice President, Software Engineering';
          else if (/principal/i.test(jd)) roleTitle = 'Principal Frontend Architect';
          else if (/director/i.test(jd)) roleTitle = 'Director of Frontend Architecture';
          else roleTitle = 'Engineering Leader / Senior Frontend Architect';
        }

        let coverLetter = null;
        let source = null;

        // 1. Attempt Cloudflare Workers AI execution
        if (env.AI && typeof env.AI.run === 'function') {
          const prompt = `You are writing an executive cover letter for Ravindrakumar M. Suthar (Senior Frontend Architect & Engineering Leader at Citicorp Services India Pvt. Ltd., 17+ years experience).
Write an articulate, compelling, customized executive cover letter for:
Target Company: ${company}
Target Role: ${roleTitle}
Addressed To: ${addressee}
Tone Focus: ${tone}
Format Mode: ${format}

Job Description:
"""
${jd.slice(0, 3000)}
"""

Ravindra's Core Verified Credentials (MUST weave into the narrative):
- 17+ years product engineering experience; 12+ years as Senior Frontend Architect / Senior Frontend Architect at Citicorp Services India.
- Architected Citibank's unified Non-AEM to AEM Migration AI Agent paired with custom VS Code extension (RAG + AST scripts, 60%+ faster replatforming).
- Led legacy Banking, Financial Services, and Insurance (BFSI) monolith migration to micro-frontend architectures with 100% uptime and zero downtime across squads.
- Delivered up to 50% application load-time improvements via modern React, Next.js, TypeScript, route splitting, and Core Web Vitals telemetry.
- Pioneered Devin AI & GitHub Copilot autonomous coding agents (~35% engineering effort saved).
- Established institutional WCAG 2.1 & 2.2 AA/AAA accessibility compliance programs with axe-core and NVDA audits (60% remediation cost reduction).
- Governed OpenShift DevOps pipelines, Jira, ServiceNow, Clarity, MS Project, and Workday HRIS platform uploads.
- Sustained <8% team attrition across engineering squads through structured mentorship and internal guilds.
- Live personal innovations: FoodScan AI (Google Play Store), EdgeNonce (Zero-latency dynamic edge CSP streaming engine), StateGuard.js (DOM tamper protection).

Guidelines:
- Tone must be executive, strategic, confident, and professional.
- Focus directly on solving the challenges stated in the Job Description.
- Output ONLY the clean cover letter text from "Dear ${addressee}," to "Sincerely,\\nRavindrakumar M. Suthar". No markdown code fences, no quotes around text, no conversational preamble.`;

          for (const model of AI_MODELS) {
            try {
              const aiResult = await env.AI.run(model, {
                messages: [
                  { role: 'system', content: RAVINDRA_SYSTEM_PROMPT },
                  { role: 'user', content: prompt }
                ],
                max_tokens: 850,
                temperature: 0.35
              });

              if (aiResult && (aiResult.response || aiResult.text)) {
                coverLetter = (aiResult.response || aiResult.text).replace(/```(?:markdown|text)?/gi, '').replace(/```/g, '').trim();
                source = `Cloudflare Workers AI (${model} @ Edge)`;
                break;
              }
            } catch (err) {
              console.error(`Cover letter generation error with ${model}:`, err.message);
            }
          }
        }

        // 2. Deterministic Edge Fallback Generator
        if (!coverLetter) {
          source = 'Executive Profile Dynamic Generator (Edge Engine)';
          const hasMicrofrontends = /micro-?frontends?|federation|monolith/i.test(jd);
          const hasAI = /ai|genai|llm|copilot|rag|agent|automation/i.test(jd);
          const hasA11y = /accessibility|a11y|wcag|508|ada/i.test(jd);
          const hasDevOps = /devops|ci\/cd|pipeline|openshift|docker|kubernetes/i.test(jd);
          const hasLeadership = /lead|director|vp|manager|head|coach|mentor/i.test(jd);

          const p1 = `I am writing to express my strong interest in the ${roleTitle} role at ${company}. With over 17 years of enterprise software engineering leadership—including more than 12 years as Senior Frontend Architect & Engineering Leader at Citicorp Services India Pvt. Ltd.—I have dedicated my career to spearheading mission-critical digital modernization, cultivating high-retention engineering cultures, and delivering resilient, high-performance web platforms for Tier-1 Banking, Financial Services, and Insurance (BFSI) scale.`;

          const p2 = hasMicrofrontends 
            ? `Throughout my tenure at Citicorp, I have successfully governed the end-to-end modernization of complex monolithic Banking, Financial Services, and Insurance (BFSI) platforms into modular, zero-downtime micro-frontend architectures. By establishing reference design systems, enforcing strict UI/API boundary contracts, and implementing route-based code splitting with Core Web Vitals telemetry, our engineering squads delivered up to a 50% improvement in application load times while ensuring uninterrupted 100% business continuity across multi-phase rollouts.`
            : `At Citicorp, I lead enterprise frontend architecture across multi-pod engineering teams, establishing scalable architectural standards across React, Next.js, and TypeScript ecosystems. By aligning engineering execution with business roadmaps, our squads consistently achieved up to 50% application load-time improvements through route-based code splitting, Core Web Vitals optimization, and automated performance observability.`;

          const p3 = hasAI
            ? `A cornerstone of my recent leadership is pioneering autonomous developer productivity platforms. At Citicorp, I architected an enterprise Non-AEM to AEM Migration AI Agent operating in tandem with a custom Visual Studio Code extension—leveraging Retrieval-Augmented Generation (RAG) and automated AST transformation scripts directly within developer workflows to accelerate component replatforming cycle times by over 60%. Furthermore, standardizing GitHub Copilot and Devin AI coding agents enabled our teams to capture ~35% effort savings across repetitive migrations.`
            : `Beyond core frontend delivery, I operationalized institutional governance across accessibility, client-side security, and continuous delivery. I spearheaded company-wide Section 508 and WCAG 2.1/2.2 AA compliance initiatives by integrating axe-core and Lighthouse CI regression gates into OpenShift DevOps and GitHub Actions pipelines—slashing post-deployment remediation spend by 60%.`;

          const p4 = hasLeadership
            ? `Engineering excellence is fundamentally driven by high-trust teams. Across 12+ years of squad leadership, I have maintained an industry-leading attrition rate below 8% by establishing structured one-on-one coaching, transparent technical skill ladders, and internal engineering guilds. I partner closely with executive stakeholders, product owners, and cross-functional partners to translate complex technical imperatives into predictable, high-ROI business outcomes.`
            : `I pride myself on building collaborative partnerships across product, architecture, and executive leadership, managing technical risk, and balancing rapid feature delivery with architectural integrity.`;

          const pClose = `I welcome the opportunity to discuss how my 17+ years of architectural rigor, hands-on AI toolchain innovation, and executive leadership experience can accelerate ${company}'s strategic digital initiatives. You can explore my verified portfolio and open-source systems at https://ravindra.lets.gen.in/. Thank you for your consideration, and I look forward to connecting.`;

          if (format === 'bullets') {
            coverLetter = `Dear ${addressee},\n\n${p1}\n\nKey Strategic Alignments with ${company}'s Requirements:\n\n• Enterprise Architecture & Micro-Frontends: 17+ years architecting scalable React/Next.js platforms at Citicorp scale, achieving up to 50% load-time gains and zero downtime during monolithic replatforming.\n• Agentic AI & Developer Toolchains: Architected an autonomous Non-AEM to AEM Migration AI Agent and custom VS Code extension (60%+ faster delivery), while standardizing Devin AI and GitHub Copilot across squads.\n• Institutional Governance & DevOps: Operationalized WCAG 2.1/2.2 AA accessibility gates, OpenShift DevOps pipelines, and client-side DOM security protocols (StateGuard.js, EdgeNonce).\n• High-Retention People Leadership: Sustained team attrition below 8% through structured engineering guilds, SDLC release governance, and cross-functional agile delivery (CSM).\n\n${pClose}\n\nSincerely,\nRavindrakumar M. Suthar\nSenior Frontend Architect & Engineering Leader\nravindra.suthar@me.com | +91 83800 99988 | Pune, Maharashtra, India`;
          } else if (format === 'concise') {
            coverLetter = `Dear ${addressee},\n\nI am writing to express my enthusiastic interest in the ${roleTitle} opportunity at ${company}. With over 17 years of enterprise frontend engineering and architecture leadership—including 12+ years as Senior Frontend Architect at Citicorp Services India—I specialize in modernizing legacy Banking, Financial Services, and Insurance (BFSI) systems into resilient micro-frontends, accelerating delivery through autonomous AI migration agents (60%+ cycle time reduction), and scaling high-retention engineering teams (<8% attrition).\n\nHaving reviewed ${company}'s technical trajectory, I am confident my proven track record in Core Web Vitals optimization (50% gains), WCAG 2.2 AA accessibility governance, and OpenShift DevOps pipelines directly aligns with your strategic goals. I welcome the opportunity to discuss how my architectural rigor can drive tangible impact for your team.\n\nSincerely,\nRavindrakumar M. Suthar\nhttps://ravindra.lets.gen.in/ | +91 83800 99988 | ravindra.suthar@me.com`;
          } else {
            coverLetter = `Dear ${addressee},\n\n${p1}\n\n${p2}\n\n${p3}\n\n${p4}\n\n${pClose}\n\nSincerely,\nRavindrakumar M. Suthar\nSenior Frontend Architect & Engineering Leader\nravindra.suthar@me.com | +91 83800 99988 | Pune, Maharashtra, India\nhttps://ravindra.lets.gen.in/ | linkedin.com/in/ravindrasuthar`;
          }
        }

        // Alignments metadata
        const alignments = [
          'Enterprise Architecture & Micro-Frontends (17+ yrs, Citicorp Senior Architect)',
          'Agentic AI Productivity (Non-AEM to AEM Agent & VS Code Extension)',
          'Performance Engineering (50% Core Web Vitals Gains)',
          'OpenShift DevOps & Agile Release Governance',
          'Institutional Accessibility (WCAG 2.1/2.2 AA with axe-core)',
          'High-Retention Leadership (<8% Team Attrition)'
        ];

        return new Response(JSON.stringify({
          coverLetter,
          company,
          roleTitle,
          alignments,
          source,
          edgeColo: request.cf?.colo || 'EDGE',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (err) {
        return new Response(JSON.stringify({
          error: 'Failed to generate cover letter',
          details: err.message
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ── Static Assets Serving with Cache-Busting for HTML & Documents ───
    if (env.ASSETS) {
      let assetRequest = request;
      if (url.pathname === '/cover-letter') {
        url.pathname = '/cover-letter.html';
        assetRequest = new Request(url.toString(), request);
      }

      const response = await env.ASSETS.fetch(assetRequest);
      const contentType = response.headers.get('content-type') || '';

      // Force edge and client revalidation for HTML, PDF, and DOCX so updates reflect instantly
      if (
        contentType.includes('text/html') ||
        url.pathname === '/' ||
        url.pathname === '/resume' ||
        url.pathname === '/tools' ||
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.pdf') ||
        url.pathname.endsWith('.docx')
      ) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate, no-cache');
        newHeaders.set('CDN-Cache-Control', 'no-cache, must-revalidate');
        newHeaders.set('Cloudflare-CDN-Cache-Control', 'no-cache, must-revalidate');
        newHeaders.set('Pragma', 'no-cache');
        newHeaders.set('Expires', '0');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      }

      return response;
    }

    return new Response('Resource Not Found', { status: 404 });
  }
};
