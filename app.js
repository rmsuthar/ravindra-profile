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
  initAISoundbitePulse();
  init3DParallaxHero();
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
  let lastActiveElement = null;

  // Toggle Drawer
  function openDrawer(tab = 'chat') {
    lastActiveElement = document.activeElement;
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
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    } else if (triggerBtn) {
      triggerBtn.focus();
    }
  }

  // WCAG SC 2.1.2: Close drawer on Escape key and restore focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

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
    const q = (query || '').toLowerCase().trim();

    if (q.includes('why') || q.includes('hire') || q.includes('fit') || q.includes('vp') || q.includes('architect') || q.includes('leadership')) {
      return {
        answer: `**Why Ravindra is an exceptional fit for an Executive Frontend Architect / VP role:**\n\n- **17+ Years Enterprise Scale**: 12+ years governing mission-critical BFSI architecture at **Citicorp Services India**, sustaining zero-downtime rollouts.\n- **Pioneering AI & Agentic Tooling**: Architected autonomous **Non-AEM to AEM Migration Agents** using **RAG & AST scripts** (60%+ faster replatforming) and custom **VS Code Prompt Generator Extensions**.\n- **Proven Metrics**: 50% web application load-time gains, 60% remediation reduction via Section 508/ADA CI pipelines, and <8% team attrition.\n- **Workday & Cloudflare**: Direct experience leading Workday platform uploads, micro-frontend migrations, and Cloudflare Workers edge computing.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('aem') || q.includes('migration') || q.includes('rag') || q.includes('agent') || q.includes('vscode')) {
      return {
        answer: `**Citibank AI Innovation — Unified Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension:**\n\n- **Multi-Agent Architecture**: Autonomous pipeline ingesting legacy component markup, scripts, and CSS.\n- **VS Code Extension**: Standardizes structured prompt templates and IDE context injection for developers.\n- **RAG Context Retrieval**: Maps legacy patterns against Adobe Experience Manager (AEM) Core Component standards.\n- **AST Transformation Scripts**: Synthesizes production-ready AEM HTL templates, Sling Models, and Touch UI dialogs automatically.\n- **Impact**: Accelerated enterprise replatforming by over **60%** with validated structural fidelity.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('stateguard') || q.includes('security') || q.includes('dom') || q.includes('tamper')) {
      return {
        answer: `**StateGuard.js — DOM Tamper Protection for BFSI Workflows:**\n\n- Specialized browser runtime utility that intercepts DOM mutations and seals form elements using \`Object.freeze\` and property descriptor locking.\n- Prevents client-side state manipulation via browser DevTools in financial transactions.\n- Open source live demo: [rmsuthar.github.io/StateGuard](https://rmsuthar.github.io/StateGuard/).`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('panchang') || q.includes('tithi') || q.includes('choghadiya') || q.includes('gujarat') || q.includes('astronomical')) {
      return {
        answer: `**Gujarat Panchang & Automated Broadcast System (Personal / Open Platform):**\n\n- **Overview**: Precision astronomical calculation engine, edge-published web app, and messaging system delivering accurate daily Gujarati Panchang, live Choghadiyas, Vedic muhurats, and inauspicious affliction tracking.\n- **Architecture**: Python & PyEphem computing high-precision planetary ephemerides with Lahiri Ayanamsha math for Gujarat coordinates (\`23.0225° N, 72.5714° E\`).\n- **Edge Delivery**: Pure semantic HTML5, Vanilla CSS, and modular ES6 deployed atomically to Cloudflare Pages edge network.\n- **Clientside Engine**: IST ticker locked to \`Asia/Kolkata\`, dynamic Choghadiya countdown scanner finding the next truly unblemished (*શુદ્ધ*) auspicious slot, and mathematical SVG lunar crescent.\n- **Automated Broadcast**: Automated morning broadcast to WhatsApp Channel subscribers via headless Playwright.\n- **Metrics**: 0px horizontal scroll (iOS/Android down to 320px) & WCAG AA high-contrast design (>13:1).\n- **Live Platform**: [https://tithi.lets.gen.in/](https://tithi.lets.gen.in/)`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('workday') || q.includes('ats') || q.includes('resume') || q.includes('docx') || q.includes('cv')) {
      return {
        answer: `**Workday ATS Integration & Resume Assets:**\n\n- **Workday Platform Integrations**: Led Workday platform candidate uploads and HRIS data configuration workflows at Citicorp.\n- **ATS Assets Available**:\n  - [Download Workday DOCX](https://ravindra.lets.gen.in/Ravindrakumar_Suthar_Resume.docx)\n  - [Download Single-Column PDF](https://ravindra.lets.gen.in/Ravindrakumar_Suthar_Resume.pdf)\n  - [View ATS Web Resume](https://ravindra.lets.gen.in/resume)`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('college') || q.includes('study')) {
      return {
        answer: `**Educational Background & Academic Credentials:**\n\n- **PGDIT (Post Graduate Diploma in IT)** — Sikkim Manipal University.\n- **HDSE (Higher Diploma in Software Engineering)** — Aptech Computer Education.\n- **B.Sc. in Chemistry & Mathematics** — Gujarat University. Solid analytical and quantitative problem-solving foundation.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('cert') || q.includes('scrum') || q.includes('csm') || q.includes('aws') || q.includes('agile')) {
      return {
        answer: `**Professional Certifications & Accreditations:**\n\n- **Certified ScrumMaster (CSM®)** — Scrum Alliance (Lic. 000481231).\n- **AWS Certified Cloud Practitioner** — Amazon Web Services.\n- **Google Analytics Individual Qualification (GAIQ)** — Core Web Vitals telemetry & instrumentation.\n- **IBM Design Thinking Practitioner** — Human-centric enterprise UX architecture.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('experience') || q.includes('citi') || q.includes('career') || q.includes('background') || q.includes('role')) {
      return {
        answer: `**Professional Experience & Career Milestones:**\n\n- **Assistant Vice President & Senior Frontend Architect** at **Citicorp Services India** (May 2013 – Present | 12+ years at Citi):\n  - Enterprise BFSI architecture governance, micro-frontend modernization, AEM RAG AI migration agent, WCAG 2.1/2.2 AA automation, and Workday HRIS integrations.\n- **17+ Years Total Experience**: Prior senior software engineering and technical leadership roles across high-traffic digital platforms.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('next') || q.includes('typescript')) {
      return {
        answer: `**Core Technical Competencies:**\n\n- **Frontend**: React, Next.js, TypeScript, Micro-Frontends (Module Federation), SSR, Core Web Vitals optimization (50% speedup).\n- **AI & Automation**: Autonomous AI Agents (RAG pipelines), AST scripts, VS Code Extensions, Devin AI, GitHub Copilot.\n- **Edge & Cloud**: Cloudflare Workers, Edge Computing, AWS.\n- **Standards**: WCAG 2.1/2.2 AA, Section 508, axe-core, NVDA audits.`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('reach') || q.includes('linkedin')) {
      return {
        answer: `**Contact Information:**\n\n- **Email**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com)\n- **Phone**: [+91 83800 99988](tel:+918380099988)\n- **Location**: Pune, Maharashtra, India\n- **LinkedIn**: [linkedin.com/in/ravindrasuthar](https://www.linkedin.com/in/ravindrasuthar/)\n- **Tools Suite**: [ravindra.lets.gen.in/tools](https://ravindra.lets.gen.in/tools)`,
        source: 'Verified Knowledge Base (Edge Fallback)'
      };
    }

    return {
      answer: `**Ravindrakumar M. Suthar — Executive Overview:**\n\n- **Role**: Assistant Vice President & Senior Frontend Architect at Citicorp Services India Pvt. Ltd. (17+ years total experience, 12+ years at Citi).\n- **Core Capabilities**: Micro-frontends, React/Next.js, TypeScript, Autonomous AEM Migration Agents, VS Code Extensions, StateGuard.js, Cloudflare Workers, and WCAG 2.1/2.2 AA Accessibility.\n- **Credentials**: Certified ScrumMaster (CSM®), AWS Cloud Practitioner, PGDIT, HDSE, B.Sc.\n- **Contact**: [ravindra.suthar@me.com](mailto:ravindra.suthar@me.com) | +91 83800 99988.\n\nYou can ask about his **AEM AI migration agents**, **StateGuard.js**, **education**, **certifications**, **Workday integrations**, or **architectural leadership**!`,
      source: 'Verified Knowledge Base (Edge Fallback)'
    };
  }
}

/* ── Live AI Architecture Pulse & Dynamic Executive Soundbite ─────────── */
function initAISoundbitePulse() {
  const banner = document.getElementById('ai-soundbite-banner');
  const quoteEl = document.getElementById('ai-soundbite-text');
  const themeEl = document.getElementById('ai-soundbite-theme');
  const shuffleBtn = document.getElementById('ai-soundbite-shuffle');

  if (!banner || !quoteEl) return;

  const SOUNDBITES_POOL = [
    {
      quote: "Autonomous AI migration agents achieve peak reliability when integrated directly inside the IDE — injecting AST snippets and prompt schemas to eliminate drift before code hits git.",
      theme: "Agentic Engineering Directive"
    },
    {
      quote: "Monolith-to-microfrontend migrations in BFSI succeed only when decoupled at the edge. Zero downtime requires route-level federation, isolated blast radiuses, and automated contract tests.",
      theme: "Resilient BFSI Architecture"
    },
    {
      quote: "Never trust the client runtime blindly. In transactional financial systems, client-side state must be protected against malicious DevTools tampering via runtime DOM descriptor sealing.",
      theme: "StateGuard.js Security Principle"
    },
    {
      quote: "Sub-second LCP and zero cumulative layout shift aren't post-launch patches — they are engineered by default through aggressive route-based code splitting and edge CDN hydration.",
      theme: "Core Web Vitals Blueprint"
    },
    {
      quote: "Enterprise WCAG 2.2 AA and Section 508 compliance cannot be treated as an audit afterthought; it must run as an automated pre-commit regression gate in CI/CD pipelines.",
      theme: "Inclusive Engineering Standard"
    },
    {
      quote: "Sustaining under 8% team attrition across 12 years of enterprise delivery comes from radical architectural transparency, technical skill ladders, and genuine psychological safety.",
      theme: "Engineering Leadership Culture"
    },
    {
      quote: "Replatforming legacy CMS components using RAG context retrieval and custom AST transformation scripts slashed Citicorp component migration cycle times by over 60%.",
      theme: "Citicorp AI Migration Benchmark"
    },
    {
      quote: "Precision astronomical calculation and Vedic limb mathematics demand exactitude — coupling Python PyEphem ephemerides with zero-framework Cloudflare edge delivery delivers sub-second Gujarati Panchang.",
      theme: "Astronomical Computing Architecture"
    },
    {
      quote: "Standardizing AI coding agents like Devin and GitHub Copilot drives real ROI when measured by cycle time compression, freeing senior architects for security and governance.",
      theme: "GenAI Team Productivity"
    },
    {
      quote: "Pushing compute to Cloudflare global edge PoPs transforms regional latency from hundreds of milliseconds to single-digit response times worldwide.",
      theme: "Edge-First Systems Design"
    },
    {
      quote: "A design system without strict accessibility tokens and cross-framework components is just a style guide; true systems bind design tokens to production DOM semantics.",
      theme: "Design System Architecture"
    },
    {
      quote: "Enterprise Workday integrations require strict semantic schemas and clean XML structures so candidate data flows across HRIS systems with zero data loss.",
      theme: "Workday ATS Integrity"
    },
    {
      quote: "Clean reactive state models isolate mutations to deterministic pipelines, ensuring complex financial transaction dashboards never suffer cascading re-renders.",
      theme: "Predictable Frontend State"
    }
  ];

  // Pick a fresh soundbite on every page load/refresh (ensuring different from previous session view)
  try {
    const lastIdx = parseInt(sessionStorage.getItem('rs_soundbite_idx'), 10);
    let newIdx = Math.floor(Math.random() * SOUNDBITES_POOL.length);
    if (!isNaN(lastIdx) && SOUNDBITES_POOL.length > 1 && newIdx === lastIdx) {
      newIdx = (newIdx + 1) % SOUNDBITES_POOL.length;
    }
    sessionStorage.setItem('rs_soundbite_idx', String(newIdx));
    applySoundbite(SOUNDBITES_POOL[newIdx], false);
  } catch (e) {
    applySoundbite(SOUNDBITES_POOL[0], false);
  }

  function applySoundbite(item, animate = true) {
    if (!item || !item.quote) return;
    if (animate) {
      quoteEl.classList.add('updating');
      setTimeout(() => {
        quoteEl.textContent = `"${item.quote.replace(/^"|"$/g, '')}"`;
        if (themeEl && item.theme) themeEl.textContent = item.theme;
        quoteEl.classList.remove('updating');
      }, 200);
    } else {
      quoteEl.textContent = `"${item.quote.replace(/^"|"$/g, '')}"`;
      if (themeEl && item.theme) themeEl.textContent = item.theme;
    }
  }

  // Shuffle & Regenerate button handler
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', async () => {
      shuffleBtn.classList.add('loading');
      shuffleBtn.disabled = true;

      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 4000);

        const res = await fetch('/api/ai-soundbite?fresh=true', {
          signal: controller.signal
        });
        clearTimeout(timer);

        if (res.ok) {
          const data = await res.json();
          if (data && data.quote) {
            applySoundbite(data, true);
            showToast('✨ Fresh AI architectural insight generated!');
            return;
          }
        }
        throw new Error('API returned invalid data');
      } catch (err) {
        // Smooth offline/instant fallback rotation
        const currentText = quoteEl.textContent;
        const remaining = SOUNDBITES_POOL.filter(s => `"${s.quote}"` !== currentText);
        const fallbackItem = remaining[Math.floor(Math.random() * remaining.length)] || SOUNDBITES_POOL[0];
        applySoundbite(fallbackItem, true);
        showToast('✨ Rotated to fresh architectural principle');
      } finally {
        setTimeout(() => {
          shuffleBtn.classList.remove('loading');
          shuffleBtn.disabled = false;
        }, 500);
      }
    });
  }
}

/* ── 3D Interactive Mousemove Parallax & Multi-Layer Depth Engine ────────── */
function init3DParallaxHero() {
  const heroCard = document.getElementById('hero-card') || document.querySelector('.hero-card');
  if (!heroCard) return;

  // Respect user preference for reduced motion or touch-only screens
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (prefersReducedMotion || isTouchDevice) return;

  let targetRx = 0;
  let targetRy = 0;
  let currentRx = 0;
  let currentRy = 0;

  let targetGlareX = 50;
  let targetGlareY = 50;
  let currentGlareX = 50;
  let currentGlareY = 50;

  let targetGlareOpacity = 0;
  let currentGlareOpacity = 0;

  let rafId = null;
  let isMouseOverSection = false;

  function updateSpringLoop() {
    // Lerp factor for buttery, physics-damped spring motion
    const lerpFactor = 0.085;

    currentRx += (targetRx - currentRx) * lerpFactor;
    currentRy += (targetRy - currentRy) * lerpFactor;

    currentGlareX += (targetGlareX - currentGlareX) * lerpFactor;
    currentGlareY += (targetGlareY - currentGlareY) * lerpFactor;
    currentGlareOpacity += (targetGlareOpacity - currentGlareOpacity) * lerpFactor;

    // Differential parallax offsets across depth planes:
    // Background layers translate in counter-motion to intensify perspective depth
    const gridPx = -currentRy * 1.5;
    const gridPy = currentRx * 1.2;
    const glow1Px = -currentRy * 2.2;
    const glow1Py = currentRx * 1.8;
    const glow2Px = -currentRy * 2.5;
    const glow2Py = currentRx * 2.0;

    // Content typography and interactive CTAs translate forward with balanced offsets
    const titlePx = currentRy * 0.5;
    const titlePy = -currentRx * 0.4;
    const textPx = currentRy * 0.35;
    const textPy = -currentRx * 0.25;
    const pillPx = currentRy * 0.45;
    const pillPy = -currentRx * 0.35;
    const cardPx = currentRy * 0.4;
    const cardPy = -currentRx * 0.3;
    const actionsPx = currentRy * 0.7;
    const actionsPy = -currentRx * 0.5;

    heroCard.style.setProperty('--hero-rx', `${currentRx.toFixed(3)}deg`);
    heroCard.style.setProperty('--hero-ry', `${currentRy.toFixed(3)}deg`);

    heroCard.style.setProperty('--grid-px', `${gridPx.toFixed(2)}px`);
    heroCard.style.setProperty('--grid-py', `${gridPy.toFixed(2)}px`);
    heroCard.style.setProperty('--glow1-px', `${glow1Px.toFixed(2)}px`);
    heroCard.style.setProperty('--glow1-py', `${glow1Py.toFixed(2)}px`);
    heroCard.style.setProperty('--glow2-px', `${glow2Px.toFixed(2)}px`);
    heroCard.style.setProperty('--glow2-py', `${glow2Py.toFixed(2)}px`);

    heroCard.style.setProperty('--title-px', `${titlePx.toFixed(2)}px`);
    heroCard.style.setProperty('--title-py', `${titlePy.toFixed(2)}px`);
    heroCard.style.setProperty('--text-px', `${textPx.toFixed(2)}px`);
    heroCard.style.setProperty('--text-py', `${textPy.toFixed(2)}px`);
    heroCard.style.setProperty('--pill-px', `${pillPx.toFixed(2)}px`);
    heroCard.style.setProperty('--pill-py', `${pillPy.toFixed(2)}px`);
    heroCard.style.setProperty('--card-px', `${cardPx.toFixed(2)}px`);
    heroCard.style.setProperty('--card-py', `${cardPy.toFixed(2)}px`);
    heroCard.style.setProperty('--actions-px', `${actionsPx.toFixed(2)}px`);
    heroCard.style.setProperty('--actions-py', `${actionsPy.toFixed(2)}px`);

    heroCard.style.setProperty('--glare-x', `${currentGlareX.toFixed(2)}%`);
    heroCard.style.setProperty('--glare-y', `${currentGlareY.toFixed(2)}%`);
    heroCard.style.setProperty('--glare-opacity', `${currentGlareOpacity.toFixed(3)}`);

    // Continue loop until momentum settles
    const delta = Math.abs(targetRx - currentRx) + Math.abs(targetRy - currentRy) + Math.abs(targetGlareOpacity - currentGlareOpacity);
    if (delta > 0.005) {
      rafId = requestAnimationFrame(updateSpringLoop);
    } else {
      rafId = null;
    }
  }

  function onWindowMouseMove(e) {
    const rect = heroCard.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    // Viewport relative coordinates for page-wide left-to-right tracking
    const halfWinW = window.innerWidth / 2;
    const halfWinH = window.innerHeight / 2;
    const normPageX = Math.max(-1, Math.min(1, (e.clientX - halfWinW) / halfWinW));
    const normPageY = Math.max(-1, Math.min(1, (e.clientY - halfWinH) / halfWinH));

    // Direct card bounds checking
    const padding = 60;
    const isDirectHover = (
      e.clientX >= rect.left - padding &&
      e.clientX <= rect.right + padding &&
      e.clientY >= rect.top - padding &&
      e.clientY <= rect.bottom + padding
    );

    if (isDirectHover) {
      // High-precision local card coordinates
      const normCardX = Math.max(-1, Math.min(1, (e.clientX - cardCenterX) / (rect.width / 2)));
      const normCardY = Math.max(-1, Math.min(1, (e.clientY - cardCenterY) / (rect.height / 2)));

      // Refined maximum tilt angle when interacting directly over the hero card
      targetRy = normCardX * 6.5;
      targetRx = -normCardY * 4.5;

      // Specular glare glides across card
      const localPctX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const localPctY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      targetGlareX = localPctX;
      targetGlareY = localPctY;
      targetGlareOpacity = 0.55;
      isMouseOverSection = true;
    } else {
      // Global subtle 3D tilt across the whole page (left to right)
      targetRy = normPageX * 3.5;
      targetRx = -normPageY * 2.5;

      targetGlareX = 50 + normPageX * 35;
      targetGlareY = 50 + normPageY * 35;
      targetGlareOpacity = 0.12;
      isMouseOverSection = false;
    }

    if (!rafId) {
      rafId = requestAnimationFrame(updateSpringLoop);
    }
  }

  function onWindowMouseLeave() {
    targetRx = 0;
    targetRy = 0;
    targetGlareOpacity = 0;
    isMouseOverSection = false;
    if (!rafId) {
      rafId = requestAnimationFrame(updateSpringLoop);
    }
  }

  window.addEventListener('mousemove', onWindowMouseMove, { passive: true });
  document.addEventListener('mouseleave', onWindowMouseLeave, { passive: true });
  window.addEventListener('blur', onWindowMouseLeave, { passive: true });
}


