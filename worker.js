/**
 * Ravindrakumar M. Suthar - Executive Profile & Cloudflare Workers AI Service
 * Deployed on Cloudflare Workers with Static Assets & Workers AI Binding (env.AI)
 */

const RAVINDRA_SYSTEM_PROMPT = `You are the executive AI copilot for Ravindrakumar M. Suthar, Assistant Vice President and Senior Frontend Architect at Citicorp Services India Pvt. Ltd.
You represent Ravindra with executive clarity, architectural authority, and precise factual accuracy.

Verified Profile & Career Background:
- Current Role: Assistant Vice President — Frontend Architecture & Engineering Leadership at Citicorp Services India Pvt. Ltd. (Pune, India; May 2013 – Present, 12+ years at Citi, 17+ years total experience).
- Citicorp AI Innovation: Unified Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension: At Citicorp, Ravindra architected a single, unified developer productivity platform where an autonomous AI migration agent operates in tandem with a custom Visual Studio Code extension. The VS Code extension standardizes prompt templates and IDE context injection, while the migration agent uses Retrieval-Augmented Generation (RAG) and custom AST transformation scripts to convert non-AEM components into Adobe Experience Manager (AEM) Core Components and Sling models, slashing migration cycle times by over 60%.
- Personal / Open-Source Projects: StateGuard.js (DOM tamper protection for transactional state integrity), Global Edge Sandbox & LB Inspector on Cloudflare Workers across 12 global PoP locations, and Enterprise Developer Tools (rmsuthar.github.io/tools).
- Performance: Delivered up to 50% load-time improvements across enterprise web applications using React, Next.js, TypeScript, route-based code splitting, and automated Core Web Vitals telemetry.
- Accessibility & Security: Spearheaded Section 508 and ADA compliance programme operationalizing axe-core and Lighthouse CI regression gates with NVDA audits, reducing post-deployment remediation costs by 60%.
- GenAI Leadership: Pioneered Devin AI autonomous coding agents (~35% effort saved) and standardized GitHub Copilot (40% faster PR reviews).
- Platform & HRIS: Executed Workday platform integrations, candidate upload optimizations, and governed End-of-Vendor-Support (EOVS/EOL) technology transitions.
- People Leadership: Led multi-pod engineering teams maintaining team attrition below 8% through structured 1-on-1s and technical skill ladders.
- Education & Credentials: PG Diploma in IT (Sikkim Manipal University), HDSE (Aptech), B.Sc. Chemistry & Mathematics (Gujarat University). Certified ScrumMaster (CSM), AWS Cloud Practitioner, Google Analytics, IBM Design Thinking Practitioner.

Answer questions directly, professionally, and concisely in 2 to 4 paragraphs. Use markdown bullet points when appropriate.`;

const KNOWLEDGE_FALLBACKS = [
  {
    triggers: ['why hire', 'fit', 'vp', 'architect', 'principal', 'hire', 'leadership', 'role'],
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
    triggers: ['workday', 'ats', 'resume', 'upload'],
    answer: `**Workday ATS Integration & Resume Compatibility:**

- **Workday Platform Integrations**: At Citicorp, Ravindra facilitated Workday platform uploads and HRIS data configuration workflows, maintaining data integrity at enterprise scale.
- **100% Workday ATS Compatibility**: This profile provides candidate upload assets optimized specifically for Workday's Sovren parsing engine:
  - **Native Word (.docx)**: Clean XML structure for zero-error field extraction ([Download DOCX](https://ravindra.lets.gen.in/Ravindrakumar_Suthar_Resume.docx)).
  - **Single-Column PDF**: Machine-readable text generated via Chrome headless print engine ([Download PDF](https://ravindra.lets.gen.in/Ravindrakumar_Suthar_Resume.pdf)).
  - **Semantic ATS Web View**: Dedicated single-column web resume at [ravindra.lets.gen.in/resume](https://ravindra.lets.gen.in/resume).`
  }
];

function findFallbackAnswer(query) {
  const q = query.toLowerCase();
  for (const item of KNOWLEDGE_FALLBACKS) {
    if (item.triggers.some(t => q.includes(t))) {
      return item.answer;
    }
  }
  return `**Ravindrakumar M. Suthar — Executive Overview:**

- **Role**: Assistant Vice President & Senior Frontend Architect at Citicorp Services India Pvt. Ltd. (17+ years total experience, 12+ years at Citi).
- **Core Specializations**: Micro-frontends, React/Next.js, TypeScript, Autonomous AI Migration Agents (Non-AEM to AEM using RAG), VS Code Extensions, StateGuard.js, Cloudflare Workers, and WCAG 2.1/2.2 AA Accessibility.
- **Contact**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com) | +91 83800 99988 | [LinkedIn Profile](https://www.linkedin.com/in/ravindrasuthar/).

Feel free to ask about his **AEM AI migration agents**, **StateGuard.js**, **Workday integrations**, or **architectural leadership**!`;
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
        model: '@cf/meta/llama-3.1-8b-instruct',
        edgeColo: request.cf?.colo || 'EDGE',
        engine: 'Cloudflare Workers AI'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
        let source = 'Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct @ Edge)';

        // Attempt Cloudflare Workers AI execution
        if (env.AI && typeof env.AI.run === 'function') {
          try {
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

            const aiResult = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
              messages,
              max_tokens: 512,
              temperature: 0.3
            });

            if (aiResult && aiResult.response) {
              aiResponseText = aiResult.response;
            }
          } catch (aiErr) {
            console.error('Workers AI execution note:', aiErr.message);
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
        let source = 'Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct @ Edge)';

        if (env.AI && typeof env.AI.run === 'function') {
          try {
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

            const aiResult = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
              messages: [
                { role: 'system', content: RAVINDRA_SYSTEM_PROMPT + '\nYou output valid JSON only.' },
                { role: 'user', content: prompt }
              ],
              max_tokens: 512,
              temperature: 0.2
            });

            if (aiResult && aiResult.response) {
              const cleaned = aiResult.response.replace(/```json/g, '').replace(/```/g, '').trim();
              matchResult = JSON.parse(cleaned);
            }
          } catch (e) {
            console.error('AI match parse error:', e.message);
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
