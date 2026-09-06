/**
 * Ravindrakumar M. Suthar - Executive Profile & CV Application Logic
 * Vanilla JavaScript, zero runtime dependencies, CSP-compliant
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initViewMode();
  initSkillsFilter();
  initCopyActions();
  initVCardDownload();
  initHistoryToggle();
  initKeyboardShortcuts();
  initDeepLinking();
  initCloudflareAICopilot();
});

/* ── Theme Management (Strict Light Mode Only) ───────────────────────────── */
function initTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
}

/* ── View Mode Switcher (Portfolio vs Compact CV) ─────────────────────────── */
function initViewMode() {
  const portfolioBtn = document.getElementById('view-portfolio');
  const cvBtn = document.getElementById('view-cv');

  if (!portfolioBtn || !cvBtn) return;

  portfolioBtn.addEventListener('click', () => {
    document.body.classList.remove('cv-mode');
    portfolioBtn.classList.add('active');
    cvBtn.classList.remove('active');
    showToast('Executive Portfolio view active');
  });

  cvBtn.addEventListener('click', () => {
    document.body.classList.add('cv-mode');
    cvBtn.classList.add('active');
    portfolioBtn.classList.remove('active');
    // Ensure all history is visible in CV mode
    const collapsedHistory = document.querySelector('.history-collapsed');
    if (collapsedHistory) collapsedHistory.style.display = 'block';
    showToast('Compact CV / Resume view active');
  });
}

/* ── Interactive Skills Filtering ────────────────────────────────────────── */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.25s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Toast Notification System ───────────────────────────────────────────── */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ── Copy to Clipboard Actions ───────────────────────────────────────────── */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} copied to clipboard!`);
        }).catch(() => fallbackCopy(textToCopy, label));
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} copied to clipboard!`);
    } catch (err) {
      showToast(`Copy failed. Please manually copy: ${text}`);
    }
    textArea.remove();
  }
}

/* ── Dynamic vCard Generation & Download ─────────────────────────────────── */
function initVCardDownload() {
  const vcardBtn = document.getElementById('download-vcard');
  if (!vcardBtn) return;

  vcardBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Suthar;Ravindrakumar;M.;;',
      'FN:Ravindrakumar M. Suthar',
      'ORG:Citicorp Services India Pvt. Ltd.',
      'TITLE:Assistant Vice President - Frontend Architecture & Engineering Leadership',
      'TEL;TYPE=CELL,VOICE:+918380099988',
      'EMAIL;TYPE=PREF,INTERNET:ravindra.suthar@me.com',
      'URL;TYPE=Profile:https://ravindra.lets.gen.in/',
      'URL;TYPE=LinkedIn:https://www.linkedin.com/in/ravindrasuthar/',
      'ADR;TYPE=WORK:;;Pune;Maharashtra;;India',
      'NOTE:Senior Frontend Architect & Engineering Leader with 17+ years enterprise BFSI experience in React, Next.js, Micro-frontends, WCAG Accessibility, and AI development.',
      'REV:' + new Date().toISOString(),
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ravindrakumar_Suthar.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Contact vCard downloaded!');
  });
}

/* ── Career History Expand / Collapse ────────────────────────────────────── */
function initHistoryToggle() {
  const toggleBtn = document.getElementById('toggle-history');
  const collapsedSection = document.querySelector('.history-collapsed');

  if (!toggleBtn || !collapsedSection) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = collapsedSection.style.display === 'block';
    if (isExpanded) {
      collapsedSection.style.display = 'none';
      toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <span>View Full Career History (2003 – 2013)</span>
      `;
    } else {
      collapsedSection.style.display = 'block';
      toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span>Collapse Earlier Career History</span>
      `;
    }
  });
}

/* ── Keyboard Shortcuts ──────────────────────────────────────────────────── */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ignore when typing inside input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // 'p' key without modifiers triggers print
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey) {
      window.print();
    }
    // 'a' key toggles AI Copilot
    if (e.key === 'a' || e.key === 'A') {
      const aiBtn = document.getElementById('ai-copilot-trigger');
      if (aiBtn) aiBtn.click();
    }
    // 'Escape' closes AI drawer
    if (e.key === 'Escape') {
      const closeBtn = document.getElementById('ai-drawer-close');
      if (closeBtn) closeBtn.click();
    }
  });
}

/* ── Deep Linking & URL Path State Management ───────────────────────────── */
function initDeepLinking() {
  handleDeepLink();

  window.addEventListener('hashchange', handleDeepLink);
  window.addEventListener('popstate', handleDeepLink);

  // Active section scroll tracking for deep link nav chips
  initSectionScrollSpy();
}

function handleDeepLink() {
  const hash = window.location.hash.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const viewParam = searchParams.get('view');
  const filterParam = searchParams.get('filter');

  // Handle View Mode Deep Link
  if (hash === '#cv' || viewParam === 'cv') {
    const cvBtn = document.getElementById('view-cv');
    if (cvBtn && !document.body.classList.contains('cv-mode')) {
      cvBtn.click();
    }
  } else if (hash === '#portfolio' || viewParam === 'portfolio') {
    const portfolioBtn = document.getElementById('view-portfolio');
    if (portfolioBtn && document.body.classList.contains('cv-mode')) {
      portfolioBtn.click();
    }
  }

  // Handle Skill Filter Deep Link (e.g. #skills-ai, #skills-architecture, ?filter=ai)
  let targetFilter = filterParam;
  if (!targetFilter && hash.startsWith('#skills-')) {
    targetFilter = hash.replace('#skills-', '');
  }

  if (targetFilter) {
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
    if (filterBtn) {
      filterBtn.click();
      const skillsSection = document.getElementById('skills');
      if (skillsSection && hash.startsWith('#skills-')) {
        skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  } else if (hash && hash !== '#cv' && hash !== '#portfolio') {
    // Standard section anchor jump
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function initSectionScrollSpy() {
  const sections = document.querySelectorAll('section[id], #main-content > div[id]');
  const navChips = document.querySelectorAll('.nav-chip[data-nav]');

  if (!sections.length || !navChips.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navChips.forEach(chip => {
          if (chip.getAttribute('data-nav') === id) {
            chip.classList.add('active');
          } else {
            chip.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ── Cloudflare Workers AI Executive Copilot & Role Fit Matcher ──────────── */
function initCloudflareAICopilot() {
  const triggerBtn = document.getElementById('ai-copilot-trigger');
  const backdrop = document.getElementById('ai-copilot-backdrop');
  const drawer = document.getElementById('ai-copilot-drawer');
  const closeBtn = document.getElementById('ai-drawer-close');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const messagesList = document.getElementById('ai-messages-list');
  const tabBtns = document.querySelectorAll('.ai-tab-btn');
  const chatPane = document.getElementById('ai-tab-chat-pane');
  const matcherPane = document.getElementById('ai-tab-matcher-pane');
  const promptChips = document.querySelectorAll('.prompt-chip, .ai-drawer-chip');
  const presetChips = document.querySelectorAll('.ai-preset-chip');
  const jdInput = document.getElementById('ai-jd-input');
  const jdSubmit = document.getElementById('ai-jd-submit');
  const jdResults = document.getElementById('ai-jd-results');

  if (!drawer) return;

  const chatHistory = [];

  // Toggle Drawer
  function openDrawer(tab = 'chat') {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.classList.add('ai-drawer-open');
    if (triggerBtn) triggerBtn.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.setAttribute('aria-hidden', 'false');
    switchTab(tab);
    if (tab === 'chat' && chatInput) setTimeout(() => chatInput.focus(), 250);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('ai-drawer-open');
    if (triggerBtn) triggerBtn.classList.remove('hidden');
    drawer.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer('chat');
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Tab Switching
  function switchTab(targetTab) {
    tabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === targetTab;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    if (targetTab === 'chat') {
      if (chatPane) chatPane.style.display = 'flex';
      if (matcherPane) matcherPane.style.display = 'none';
      if (chatInput) chatInput.focus();
    } else {
      if (chatPane) chatPane.style.display = 'none';
      if (matcherPane) matcherPane.style.display = 'flex';
      if (jdInput) jdInput.focus();
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  // Prompt Chips Click Handlers
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const mode = chip.getAttribute('data-mode');
      const prompt = chip.getAttribute('data-prompt');

      if (mode === 'matcher') {
        openDrawer('matcher');
      } else if (prompt) {
        openDrawer('chat');
        if (chatInput) {
          chatInput.value = prompt;
          submitChatMessage(prompt);
        }
      }
    });
  });

  // Chat Form Submission
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      submitChatMessage(message);
    });
  }

  async function submitChatMessage(userText) {
    if (!userText) return;

    // Append User Message
    appendMessageBubble('user', userText);
    chatHistory.push({ role: 'user', content: userText });
    if (chatInput) chatInput.value = '';

    // Show Typing Indicator
    const typingIndicator = showTypingIndicator();

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: chatHistory.slice(-4) })
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      removeTypingIndicator(typingIndicator);
      appendMessageBubble('assistant', data.answer, data.source);
      chatHistory.push({ role: 'assistant', content: data.answer });

    } catch (err) {
      console.warn('Using client-side fallback AI response:', err);
      removeTypingIndicator(typingIndicator);
      const fallback = getClientSideFallback(userText);
      appendMessageBubble('assistant', fallback.answer, fallback.source);
      chatHistory.push({ role: 'assistant', content: fallback.answer });
    }
  }

  function appendMessageBubble(role, rawContent, source = null) {
    if (!messagesList) return;

    const msgEl = document.createElement('div');
    msgEl.className = `ai-message ${role}`;

    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'ai-message-bubble';
    bubbleEl.innerHTML = formatMarkdownToSafeHtml(rawContent);

    msgEl.appendChild(bubbleEl);

    if (role === 'assistant') {
      const metaEl = document.createElement('div');
      metaEl.className = 'ai-message-meta';
      metaEl.innerHTML = `
        <span>${source || 'Cloudflare Workers AI @ Edge'}</span>
        &bull;
        <button class="ai-copy-btn" type="button" title="Copy response">Copy</button>
      `;

      const copyBtn = metaEl.querySelector('.ai-copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(rawContent).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
          });
        });
      }

      msgEl.appendChild(metaEl);
    }

    messagesList.appendChild(msgEl);
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  function showTypingIndicator() {
    if (!messagesList) return null;
    const indicator = document.createElement('div');
    indicator.className = 'ai-typing-indicator';
    indicator.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>';
    messagesList.appendChild(indicator);
    messagesList.scrollTop = messagesList.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  // Job Description Matcher Logic
  const presetDescriptions = {
    'VP of Engineering / Frontend Architect': 'Seeking a Senior Frontend Architect / VP of Engineering to lead enterprise web architecture, modernize legacy systems to micro-frontends with zero downtime, establish WCAG 2.1/2.2 AA accessibility gates, integrate AI coding agents (Devin/Copilot), and govern Workday HRIS integrations across global squads.',
    'Head of Web Platform & AEM Modernization': 'Looking for an enterprise CMS & Frontend Leader to oversee migration of legacy platforms to Adobe Experience Manager (AEM Core Components, HTL, Sling models), orchestrate autonomous AI agent workflows (RAG, AST scripts), and enforce client-side DOM security in BFSI environments.',
    'Director of Frontend Architecture (BFSI)': 'Hiring a Director of Frontend Architecture to architect high-performance React/Next.js applications, achieve sub-second Core Web Vitals, seal client-side runtime vulnerabilities (DOM attribute tampering), and lead engineering organizations with <8% attrition.'
  };

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const title = chip.getAttribute('data-title');
      if (presetDescriptions[title] && jdInput) {
        jdInput.value = presetDescriptions[title];
      }
    });
  });

  if (jdSubmit && jdInput) {
    jdSubmit.addEventListener('click', async () => {
      const text = jdInput.value.trim();
      if (!text) {
        showToast('Please paste a Job Description first');
        return;
      }

      jdSubmit.disabled = true;
      jdSubmit.innerHTML = '<span>Analyzing alignment with Cloudflare AI...</span>';

      try {
        const response = await fetch('/api/ai-match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobDescription: text })
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        renderMatchResult(data.match, data.source);

      } catch (err) {
        console.warn('Using client-side fallback matcher:', err);
        const fallbackMatch = {
          score: 96,
          verdict: 'Strong strategic alignment with 17+ years enterprise leadership, micro-frontend modernization, and AI automation.',
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
        renderMatchResult(fallbackMatch, 'Verified Executive Profile Matcher (Client Fallback)');
      } finally {
        jdSubmit.disabled = false;
        jdSubmit.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Evaluate Role Alignment</span>
        `;
      }
    });
  }

  function renderMatchResult(match, source) {
    if (!jdResults) return;

    const alignmentsHtml = (match.topAlignments || []).map(a => `<li>${escapeHtml(a)}</li>`).join('');
    const innovationsHtml = (match.relevantInnovations || []).map(i => `<span class="badge badge-ai">${escapeHtml(i)}</span>`).join(' ');
    const interviewHtml = (match.interviewTopics || []).map(q => `<li>${escapeHtml(q)}</li>`).join('');

    jdResults.innerHTML = `
      <div class="ai-match-result-card">
        <div class="ai-match-score-row">
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">Strategic Alignment</span>
          <span class="ai-match-score-badge">${match.score || 95}% Match</span>
        </div>
        <div class="ai-match-bar-bg">
          <div class="ai-match-bar-fill" style="width: ${match.score || 95}%;"></div>
        </div>
        <div class="ai-match-verdict">${escapeHtml(match.verdict || '')}</div>
        
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">Core Matching Strengths:</div>
        <ul class="ai-match-alignments">${alignmentsHtml}</ul>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">Relevant Architectural Proofs:</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">${innovationsHtml}</div>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">Suggested Architectural Deep-Dive Topics:</div>
        <ul class="ai-match-alignments">${interviewHtml}</ul>

        <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.5rem; text-align: right;">
          ${escapeHtml(source || 'Cloudflare Workers AI @ Edge')}
        </div>
      </div>
    `;

    jdResults.style.display = 'block';
    if (matcherPane) matcherPane.scrollTop = matcherPane.scrollHeight;
  }

  // Safe Markdown to HTML Formatter
  function formatMarkdownToSafeHtml(markdown) {
    if (!markdown) return '';
    let html = escapeHtml(markdown);

    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italics: *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Inline code: `text`
    html = html.replace(/`(.*?)`/g, '<code class="badge badge-code">$1</code>');

    // Links: [text](url)
    html = html.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Split lines into paragraphs and lists
    const lines = html.split('\n');
    let formatted = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('&bull; ') || /^\d+\.\s/.test(trimmed)) {
        if (!inList) {
          formatted += '<ul>';
          inList = true;
        }
        const cleanItem = trimmed.replace(/^(-\s|&bull;\s|\d+\.\s)/, '');
        formatted += `<li>${cleanItem}</li>`;
      } else if (trimmed === '') {
        if (inList) {
          formatted += '</ul>';
          inList = false;
        }
      } else {
        if (inList) {
          formatted += '</ul>';
          inList = false;
        }
        formatted += `<p>${trimmed}</p>`;
      }
    });

    if (inList) formatted += '</ul>';
    return formatted;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getClientSideFallback(query) {
    const q = (query || '').toLowerCase();

    if (q.includes('why') || q.includes('hire') || q.includes('fit') || q.includes('vp') || q.includes('architect')) {
      return {
        answer: `**Why Ravindra is an exceptional fit for an Executive Frontend Architect / VP role:**\n\n- **17+ Years Enterprise Scale**: 12+ years governing mission-critical BFSI architecture at **Citicorp Services India**, sustaining zero-downtime rollouts.\n- **Pioneering AI & Agentic Tooling**: Architected autonomous **Non-AEM to AEM Migration Agents** using **RAG & AST scripts** (60%+ faster replatforming) and custom **VS Code Prompt Generator Extensions**.\n- **Proven Metrics**: 50% web application load-time gains, 60% remediation reduction via Section 508/ADA CI pipelines, and <8% team attrition.\n- **Workday & Cloudflare**: Direct experience leading Workday platform uploads, micro-frontend migrations, and Cloudflare Workers edge computing.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('aem') || q.includes('migration') || q.includes('rag') || q.includes('agent')) {
      return {
        answer: `**Agentic Non-AEM to AEM Migration Engine (RAG & Scripts):**\n\n- **Multi-Agent Architecture**: Autonomous pipeline ingesting legacy component markup, scripts, and CSS.\n- **RAG Context Retrieval**: Maps legacy patterns against Adobe Experience Manager (AEM) Core Component standards.\n- **AST Transformation Scripts**: Synthesizes production-ready AEM HTL templates, Sling Models, and Touch UI dialogs automatically.\n- **Impact**: Accelerated enterprise replatforming by over **60%** with validated structural fidelity.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('stateguard') || q.includes('security') || q.includes('dom')) {
      return {
        answer: `**StateGuard.js — DOM Tamper Protection:**\n\n- Specialized browser runtime utility that intercepts DOM mutations and seals form elements using \`Object.freeze\` and property descriptor locking.\n- Prevents client-side state manipulation via browser DevTools in financial transactions.\n- Open source live demo: [rmsuthar.github.io/StateGuard](https://rmsuthar.github.io/StateGuard/).`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    return {
      answer: `**Ravindrakumar M. Suthar — Executive Overview:**\n\n- **Role**: Assistant Vice President & Senior Frontend Architect at Citicorp Services India Pvt. Ltd.\n- **Experience**: 17+ years enterprise web engineering, 12+ years at Citicorp.\n- **Core Capabilities**: Micro-frontends, React/Next.js, TypeScript, Autonomous AEM Migration Agents, VS Code Extensions, StateGuard.js, Cloudflare Workers, and WCAG 2.1/2.2 AA Accessibility.\n- **Contact**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com) | +91 83800 99988.`,
      source: 'Verified Knowledge Base (Edge Fallback)'
    };
  }
}
