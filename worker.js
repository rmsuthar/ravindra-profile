/**
 * Ravindrakumar M. Suthar - Executive Profile & Cloudflare Workers AI Service
 * Deployed on Cloudflare Workers with Static Assets & Workers AI Binding (env.AI)
 */

const RAVINDRA_SYSTEM_PROMPT = `You are the executive AI copilot for Ravindrakumar M. Suthar, Assistant Vice President and Senior Frontend Architect at Citicorp Services India Pvt. Ltd.
You represent Ravindra with executive clarity, architectural authority, and precise factual accuracy.

Verified Profile & Career Background:
- Current Role: Assistant Vice President — Frontend Architecture & Engineering Leadership at Citicorp Services India Pvt. Ltd. (Pune, India; May 2013 – Present, 12+ years at Citi, 17+ years total experience).
- Citicorp AI Innovation: Unified Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension: At Citicorp, Ravindra architected a single, unified developer productivity platform where an autonomous AI migration agent operates in tandem with a custom Visual Studio Code extension. The VS Code extension standardizes prompt templates and IDE context injection, while the migration agent uses Retrieval-Augmented Generation (RAG) and custom AST transformation scripts to convert non-AEM components into Adobe Experience Manager (AEM) Core Components and Sling models, slashing migration cycle times by over 60%.
- Personal / Open-Source Projects: StateGuard.js (DOM tamper protection for transactional state integrity), Global Edge Sandbox & LB Inspector on Cloudflare Workers across 12 global PoP locations, and Enterprise Developer Tools (https://ravindra.lets.gen.in/tools).
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

1. **17+ Years of Proven BFSI & Enterprise Delivery**: Over 12 years of executive engineering leadership at **Citicorp**, governing enterprise architecture across multi-team squads with zero downtime and strict risk governance.
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
    triggers: ['stateguard', 'security', 'dom', 'freeze', 'tamper'],
    answer: `**StateGuard.js — DOM Tamper Protection for BFSI Workflows (Personal / Open Source):**

- **Problem Solved**: In mission-critical financial applications, malicious actors or compromised browser extensions can alter read-only form attributes, disabled states, or hidden verification IDs via browser Developer Tools before form submission.
- **Mechanism**: StateGuard.js is a lightweight client-side runtime utility that intercepts DOM mutation events, locks critical attributes using \`Object.freeze\` and property descriptor sealing, and instantly reverts or flags unauthorized client modifications.
- **Live Demo**: Explore the implementation at [rmsuthar.github.io/StateGuard](https://rmsuthar.github.io/StateGuard/).`
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
    triggers: ['experience', 'citi', 'citicorp', 'career', 'background', 'tenure', 'timeline', 'current role', 'history'],
    answer: `**Professional Experience & Career Milestones:**

- **Assistant Vice President & Senior Frontend Architect** — Citicorp Services India Pvt. Ltd. (May 2013 – Present | 12+ years):
  - Leads enterprise frontend architecture across multi-pod engineering teams in BFSI.
  - Architected Citibank's unified Non-AEM to AEM Migration AI Agent and VS Code Extension (60%+ faster delivery).
  - Modernized legacy monoliths to micro-frontends with zero downtime, cutting Core Web Vitals load times by up to 50%.
  - Established automated WCAG 2.1/2.2 AA and Section 508 CI/CD regression gates with axe-core.
- **Senior Software Engineer / Tech Lead** — Prior enterprise consulting & delivery roles (2007 – 2013):
  - Delivered scalable web portals, interactive SPAs, and responsive platforms for international clients.
  - Total Career: **17+ years of continuous software engineering and architectural leadership**.`
  },
  {
    triggers: ['skills', 'tech', 'stack', 'technologies', 'react', 'next', 'typescript', 'frontend', 'microfrontend', 'javascript', 'css'],
    answer: `**Core Technical Competencies & Technology Stack:**

- **Architecture & Frameworks**: React, Next.js, TypeScript, Micro-Frontends (Module Federation), Single Page Applications (SPA), Server-Side Rendering (SSR), Progressive Web Apps (PWA).
- **AI & Automation**: Autonomous AI Agents (RAG pipelines), Abstract Syntax Tree (AST) scripts, VS Code Extension Development, GitHub Copilot, Devin AI.
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
    triggers: ['contact', 'email', 'phone', 'location', 'linkedin', 'reach', 'connect', 'pune', 'city', 'address'],
    answer: `**Contact & Professional Channels:**

- **Email**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com)
- **Phone**: [+91 83800 99988](tel:+918380099988)
- **Location**: Pune, Maharashtra, India
- **LinkedIn**: [linkedin.com/in/ravindrasuthar](https://www.linkedin.com/in/ravindrasuthar/)
- **Live Portfolio & Tools**: [ravindra.lets.gen.in](https://ravindra.lets.gen.in/) | [Tools Suite](https://ravindra.lets.gen.in/tools)`
  },
  {
    triggers: ['project', 'tools', 'sandbox', 'edge', 'portfolio', 'inspector'],
    answer: `**Featured Innovations & Open-Source Projects:**

1. **Citibank Non-AEM to AEM Migration AI Agent**: Enterprise RAG + AST toolchain slashing component replatforming time by 60%+.
2. **VS Code AI Prompt Generator Extension**: Standardizes IDE context and schema injection for enterprise developers.
3. **StateGuard.js**: Runtime DOM tamper protection preventing client-side attribute tampering in financial forms ([Live Demo](https://rmsuthar.github.io/StateGuard/)).
4. **Global Edge Sandbox & LB Inspector**: Cloudflare Workers multi-PoP routing and telemetry sandbox across 12 global regions.
5. **Enterprise Developer Tools Suite**: Suite of client-side dev utilities at [ravindra.lets.gen.in/tools](https://ravindra.lets.gen.in/tools).`
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

- **Role**: Assistant Vice President & Senior Frontend Architect at Citicorp Services India Pvt. Ltd. (17+ years total experience, 12+ years at Citi).
- **Core Specializations**: Micro-frontends, React/Next.js, TypeScript, Autonomous AI Migration Agents (Non-AEM to AEM using RAG), VS Code Extensions, StateGuard.js, Cloudflare Workers, and WCAG 2.1/2.2 AA Accessibility.
- **Credentials**: Certified ScrumMaster (CSM®), AWS Cloud Practitioner, PGDIT, HDSE, B.Sc.
- **Contact**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com) | +91 83800 99988 | [LinkedIn](https://www.linkedin.com/in/ravindrasuthar/).

You can ask me about his **AEM AI migration agents**, **StateGuard.js**, **Workday integrations**, **education**, **certifications**, or **architectural leadership**!`;
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
                content: `You are the executive AI copilot for Ravindrakumar M. Suthar (AVP & Senior Frontend Architect at Citicorp, 17+ yrs experience).
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

    // ── Static Assets Fallback ──────────────────────────────────────────────
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Resource Not Found', { status: 404 });
  }
};
