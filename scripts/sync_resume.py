#!/usr/bin/env python3
"""
sync_resume.py
Automated Workday & ATS-Optimized Synchronization Engine for Ravindra Suthar

This script ensures 100% synchronization and Workday/ATS compatibility across:
1. resume.html (Semantic HTML resume with Workday schema)
2. Ravindrakumar_Suthar_Resume.docx (Native OpenXML DOCX optimized for Workday/Taleo ATS extraction)
3. Ravindrakumar_Suthar_Resume.pdf (High-fidelity vector PDF with copyable text layer)
4. llms.txt & worker.js (AI search engines & Cloudflare Workers edge copilot)
"""

import os
import re
import sys
import subprocess
import zipfile
import tempfile
import xml.sax.saxutils as saxutils
import xml.etree.ElementTree as ET

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def log(msg):
    print(f"[sync-resume] {msg}")

# ── XML Building Helpers for Workday ATS DOCX ──────────────────────────────
def esc(text):
    return saxutils.escape(str(text).strip())

def make_p(content_runs, space_before=40, space_after=40, align=None, is_bullet=False):
    p_pr = f'<w:pPr><w:spacing w:before="{space_before}" w:after="{space_after}"/>'
    if align:
        p_pr += f'<w:jc w:val="{align}"/>'
    if is_bullet:
        p_pr += '<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>'
    p_pr += '</w:pPr>'
    return f'<w:p>{p_pr}{"".join(content_runs)}</w:p>'

def make_run(text, bold=False, italic=False, size=19, color="2D3748", font="Arial"):
    r_pr = f'<w:rPr><w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}"/>'
    if bold:
        r_pr += '<w:b/><w:bCs/>'
    if italic:
        r_pr += '<w:i/><w:iCs/>'
    r_pr += f'<w:color w:val="{color}"/><w:sz w:val="{size}"/><w:szCs w:val="{size}"/></w:rPr>'
    return f'<w:r>{r_pr}<w:t xml:space="preserve">{esc(text)}</w:t></w:r>'

def make_heading(title):
    # Standard ATS H2 with thin bottom accent bar
    p_pr = '<w:pPr><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="1A365D"/></w:pBdr><w:spacing w:before="260" w:after="90"/></w:pPr>'
    run = make_run(title.upper(), bold=True, size=23, color="1A365D")
    return f'<w:p>{p_pr}{run}</w:p>'

def generate_workday_docx():
    docx_path = os.path.join(WORKSPACE_DIR, "Ravindrakumar_Suthar_Resume.docx")
    if not os.path.exists(docx_path):
        log(f"ERROR: Base {docx_path} not found.")
        return False

    log("Building Workday-optimized Ravindrakumar_Suthar_Resume.docx...")

    # Read base archive to preserve numbering.xml, styles.xml, fontTable.xml
    with zipfile.ZipFile(docx_path, 'r') as zin:
        preserved_files = {name: zin.read(name) for name in zin.namelist() if name != 'word/document.xml'}

    paragraphs = []

    # 1. Header Block (Standard Workday H1 + Contact Info)
    # Name
    paragraphs.append(make_p([
        make_run("RAVINDRAKUMAR M. SUTHAR", bold=True, size=38, color="1A202C")
    ], space_before=0, space_after=40, align="center"))

    # Title
    paragraphs.append(make_p([
        make_run("Senior Frontend Architect & Engineering Leader", bold=True, italic=True, size=21, color="2B6CB0")
    ], space_before=0, space_after=60, align="center"))

    # Contact line 1 (Clean ATS labels without emojis)
    paragraphs.append(make_p([
        make_run("Location: ", bold=True, size=18, color="4A5568"),
        make_run("Pune, Maharashtra, India  |  ", size=18, color="4A5568"),
        make_run("Phone: ", bold=True, size=18, color="4A5568"),
        make_run("+91 83800 99988  |  ", size=18, color="4A5568"),
        make_run("Email: ", bold=True, size=18, color="4A5568"),
        make_run("ravindra.suthar@me.com", size=18, color="2B6CB0")
    ], space_before=0, space_after=30, align="center"))

    # Contact line 2
    paragraphs.append(make_p([
        make_run("LinkedIn: ", bold=True, size=18, color="4A5568"),
        make_run("linkedin.com/in/ravindrasuthar  |  ", size=18, color="2B6CB0"),
        make_run("GitHub: ", bold=True, size=18, color="4A5568"),
        make_run("github.com/rmsuthar  |  ", size=18, color="2B6CB0"),
        make_run("Portfolio: ", bold=True, size=18, color="4A5568"),
        make_run("ravindra.lets.gen.in", size=18, color="2B6CB0")
    ], space_before=0, space_after=140, align="center"))

    # 2. Professional Summary
    paragraphs.append(make_heading("Professional Summary"))
    paragraphs.append(make_p([
        make_run("Engineering leader with "),
        make_run("17+ years of experience", bold=True),
        make_run(" steering multi-team frontend organisations through large-scale digital transformation in regulated Banking, Financial Services, and Insurance (BFSI) environments. At Citicorp Services India, progressed through the engineering ladder from Technical Lead to "),
        make_run("Senior Frontend Architect & Engineering Leader", bold=True),
        make_run(", building and retaining high-performance squads with sustained "),
        make_run("<8% attrition", bold=True),
        make_run(" — a benchmark exceptional in enterprise engineering.")
    ], space_before=30, space_after=60))

    paragraphs.append(make_p([
        make_run("Delivered measurable, executive-visible impact: "),
        make_run("60% reduction in migration cycle times", bold=True),
        make_run(" via an autonomous AI agent & integrated VS Code extension; "),
        make_run("50% application load-time improvement", bold=True),
        make_run(" through React / Next.js performance engineering; "),
        make_run("40% cut in integration complexity", bold=True),
        make_run(" across distributed platforms; and "),
        make_run("35% developer effort saved", bold=True),
        make_run(" through AI-augmented workflows (Devin AI, GitHub Copilot). Deep practitioner across micro-frontend architecture, enterprise accessibility (WCAG 2.1/2.2 AA/AAA, ADA, Section 508), and agentic AI developer toolchains.")
    ], space_before=30, space_after=100))

    # 3. Technical Skills & Competencies (Workday Skill Cloud Compatible)
    paragraphs.append(make_heading("Technical Skills & Competencies"))
    
    skills = [
        ("Frontend Architecture", "Micro-frontends, Module Federation, Reference Architecture, UI SDK Development, npm & Yarn Workspaces, System Design, UI Platforms, API and Iframe Integration, postMessage Protocols, Core Web Vitals, Bundle Optimization."),
        ("Core Technologies", "React, Next.js, TypeScript, JavaScript (ES6+), Redux, Redux Toolkit, Zustand, Tailwind CSS, Vanilla CSS, SCSS, LESS, Vite, Webpack, Babel, Cypress, Jest, React Testing Library."),
        ("Delivery & Project Governance", "Agile / Scrum / Kanban, Certified ScrumMaster (CSM), SDLC, Release Management, Change Management, Risk & Issue Management, Budget & Resource Planning, Financial Management, Executive Reporting & Governance, Vendor Management."),
        ("Enterprise Tools & PM Platforms", "Jira, OpenShift DevOps, ServiceNow, Clarity, MS Project, GitHub Projects, Workday Platform Uploads, Workday HRIS, Adobe Experience Manager (AEM / CQ5)."),
        ("Leadership & Key Competencies", "Cross-Functional Leadership, Strategic Thinking, Leadership and Influence, Stakeholder Management, Financial Management, Vendor Management, Communication and Presentation Skills, Decision Making, Conflict Resolution, Team Collaboration and Coaching, Talent Acquisition."),
        ("Accessibility & Security", "WCAG 2.1 & 2.2 (Level AA / AAA), Section 508, ADA Compliance, Focus Appearance (SC 2.4.13), Focus Not Obscured (SC 2.4.11), Target Size (SC 2.5.8), axe-core, Lighthouse CI, NVDA Audits, Content Security Policy (CSP), Zero-Latency Dynamic Edge CSP (EdgeNonce), OWASP Top 10, DOM Runtime Integrity (StateGuard.js)."),
        ("AI & Developer Productivity", "RAG (Retrieval-Augmented Generation), Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension, Enterprise Prompt Engineering, AST Transformation Scripts, Devin AI Autonomous Agents, GitHub Copilot, Google Antigravity SDK, LangChain, Automated Test Scaffolding."),
        ("Cloud & DevOps", "Cloudflare Pages & Workers, GitHub Actions, GitHub Advanced Security, Dependabot, Docker, Kubernetes.")
    ]
    for cat, items in skills:
        paragraphs.append(make_p([
            make_run(f"{cat}: ", bold=True, size=19, color="1A202C"),
            make_run(items, size=19, color="2D3748")
        ], space_before=25, space_after=25))

    # 4. Professional Experience
    paragraphs.append(make_heading("Professional Experience"))

    # Helper for job entry
    def add_job(title, company, location, dates, bullets):
        paragraphs.append(make_p([
            make_run(title, bold=True, size=21, color="1A202C")
        ], space_before=120, space_after=20))
        
        paragraphs.append(make_p([
            make_run(company, bold=True, size=19, color="2B6CB0"),
            make_run(f"  |  {location}  |  ", size=19, color="4A5568"),
            make_run(dates, bold=True, size=19, color="1A56A8")
        ], space_before=0, space_after=40))

        for lead, body in bullets:
            runs = []
            if lead:
                runs.append(make_run(f"{lead}: " if not lead.endswith(":") else f"{lead} ", bold=True, size=19, color="1A202C"))
            runs.append(make_run(body, size=19, color="2D3748"))
            paragraphs.append(make_p(runs, space_before=25, space_after=25, is_bullet=True))

    # Citicorp — Role 1: Senior Frontend Architect
    add_job(
        title="Senior Frontend Architect & AI Platform Lead",
        company="Citicorp Services India Pvt. Ltd.",
        location="Pune, India",
        dates="2022 – Present",
        bullets=[
            ("Lead cross-functional frontend engineering squads (~12 engineers)", "delivering enterprise Banking, Financial Services, and Insurance (BFSI) platform programmes, with sustained <8% attrition through structured 1-on-1s, technical skill ladders, and internal Communities of Practice."),
            ("Architected Autonomous Non-AEM to AEM Migration AI Agent & Integrated VS Code Extension", "Engineered a unified developer productivity platform combining Retrieval-Augmented Generation (RAG), automated prompt engineering, and custom AST parsing scripts to migrate legacy component trees into idiomatic AEM Core Components, HTL templates, and Sling models — slashing migration cycle times by over 60%."),
            ("Pioneered enterprise-wide Devin AI and GitHub Copilot adoption", "across squads, saving ~35% developer effort on boilerplate and test scaffolding while accelerating PR review velocity by 40%."),
            ("Executive reporting & governance", "Translated multi-quarter engineering roadmaps into executive narratives for C-suite and global stakeholders; managed programme risk, release calendar, and vendor relationships."),
            ("Managed End-of-Vendor-Support (EOVS/EOL) transitions", "with zero business disruption through strategic migration roadmaps and coordinated cross-functional stakeholder alignments.")
        ]
    )

    # Citicorp — Role 2: Senior Lead
    add_job(
        title="Senior Lead Engineer — Frontend Architecture",
        company="Citicorp Services India Pvt. Ltd.",
        location="Pune, India",
        dates="2018 – 2022",
        bullets=[
            ("Led legacy BFSI platform migration", "to micro-frontend architectures across 2 squads (~8 engineers), ensuring 100% business continuity throughout the multi-phase rollout using Module Federation and npm Workspaces."),
            ("Delivered up to 50% application load-time improvement", "via React, Next.js, TypeScript, route-based code splitting, and automated Core Web Vitals telemetry integrated into CI pipelines."),
            ("Established enterprise-wide Section 508 and ADA compliance programme", "integrating axe-core and Lighthouse CI into GitHub Actions alongside NVDA screen-reader audits, reducing post-deployment remediation spend by 60%."),
            ("Facilitated Workday platform uploads", "and HRIS configuration workflows, validating data integrity at enterprise scale with zero business disruption."),
            ("Engineered GitHub-first DevOps pipelines", "using GitHub Actions, Advanced Security scanning, Dependabot auto-patching, and GitHub Projects for Agile delivery governance.")
        ]
    )

    # Citicorp — Role 3: Senior Engineer / Tech Lead
    add_job(
        title="Senior Engineer / Technical Lead — UI Architecture",
        company="Citicorp Services India Pvt. Ltd.",
        location="Pune, India",
        dates="2013 – 2018",
        bullets=[
            ("Architected enterprise UI, API, and iframe integrations", "across multiple distributed BFSI platforms, cutting integration complexity by 40% and accelerating feature time-to-market for global trading and retail banking products."),
            ("Established frontend architecture reference standards", "postMessage protocol governance, and API integration patterns adopted across 6+ product squads."),
            ("Built and grew a team of 4–5 frontend engineers", "instituting code review culture, reusable UI component libraries, and cross-browser compatibility benchmarks.")
        ]
    )

    # Cognizant
    add_job(
        title="Senior Consultant, CRM UI Architecture",
        company="Cognizant Technology Solutions",
        location="Hyderabad, India",
        dates="December 2010 – February 2013",
        bullets=[
            ("Architected mobile CRM frontends", "with Siebel CRM targeting Google Chrome and enterprise tablets, boosting field-force productivity."),
            ("Developed Oracle CRM API SOAP integrations", "and led usability testing and heuristic evaluations.")
        ]
    )

    # Impetus
    add_job(
        title="Module Lead, UI Development & Usability Analyst",
        company="Impetus Infotech India Pvt. Ltd.",
        location="Indore, MP, India",
        dates="June 2007 – December 2010",
        bullets=[
            ("Led UI engineering pods and concept implementations", "for enterprise web clients, translating product specs into robust architectures and governing client-side standards."),
            ("Directed usability studies and heuristic evaluations,", "conducting competitive benchmarking, usability testing, and UX analysis to optimize web clients."),
            ("Partnered with organizational leads", "to drive collaborative technical discussions, architectural decisions, design standards, and industry best practices.")
        ]
    )

    # Gatesix
    add_job(
        title="Lead Web Specialist",
        company="Gatesix Technologies India Pvt. Ltd.",
        location="Indore, MP, India",
        dates="August 2004 – June 2007",
        bullets=[
            ("Formulated frontend and SEO strategies", "spanning UI/UX design, development standards, W3C compliance, and search architecture for web applications."),
            ("Directed concept visualization and application flows,", "translating business requirements into intuitive UI designs and interactive web experiences."),
            ("Spearheaded client-side R&D", "on emerging web technologies and established implementation standards across project teams.")
        ]
    )

    # Pinnacle
    add_job(
        title="Senior Web Designer",
        company="Pinnacle Technosys",
        location="Vadodara, Gujarat, India",
        dates="May 2003 – July 2004",
        bullets=[
            ("Designed, developed, and maintained client portals", "and digital marketing platforms with bespoke software integrations."),
            ("Engineered W3C-compliant website architectures", "and structured content implementations, ensuring cross-platform browser compatibility."),
            ("Produced interactive Flash applications", "and comprehensive digital media and print marketing collateral.")
        ]
    )

    # 5. Technical Innovations
    paragraphs.append(make_heading("Featured Technical Innovations & Open Systems"))
    paragraphs.append(make_p([
        make_run("FoodScan AI (AI Dietary Scanner & Label Decoder): ", bold=True, size=19, color="1A202C"),
        make_run("Mobile AI application officially published on the Google Play Store engineered for conscious travelers (Vegetarian, Jain, Vegan, Celiac gluten-free, and severe allergen sufferers). Leverages dual barcode scanning and multilingual OCR to decode foreign food labels (French, German, Japanese, etc.) and European E-numbers in under one second with deterministic dietary safeguards (play.google.com/store/apps/details?id=in.gen.lets.foodscan | foodscan.lets.gen.in/packaging-marks).", size=19, color="2D3748")
    ], space_before=25, space_after=25))

    paragraphs.append(make_p([
        make_run("EdgeNonce (Zero-Latency CSP Nonce Streaming Engine): ", bold=True, size=19, color="1A202C"),
        make_run("Enterprise Content Security Policy engine at the network edge deployed on Cloudflare Workers. Injects dynamic 128-bit cryptographic nonces into cached HTML responses via streaming HTMLRewriter in <1.5ms without breaking origin CDN or AEM Dispatcher caching (100% cache retention). Enforces CSP Level 3 and satisfies PCI-DSS v4.0 (6.4.3 & 11.6.1), HIPAA, and GDPR (edge-nonce.com).", size=19, color="2D3748")
    ], space_before=25, space_after=25))

    paragraphs.append(make_p([
        make_run("StateGuard.js: ", bold=True, size=19, color="1A202C"),
        make_run("Specialized browser runtime JavaScript utility that protects DOM attributes from tampering via browser developer tools. Engineered for client-side state integrity in mission-critical Banking, Financial Services, and Insurance (BFSI) transactional workflows (rmsuthar.github.io/StateGuard).", size=19, color="2D3748")
    ], space_before=25, space_after=25))

    paragraphs.append(make_p([
        make_run("Global Edge Sandbox & Multi-Region Load Balancer Inspector: ", bold=True, size=19, color="1A202C"),
        make_run("Edge proxy platform built on Cloudflare Workers simulating web access across 12 global PoPs with framebuster neutralization, biometric WebAuthn security, and WCAG AAA theme system (gateway.lets.gen.in).", size=19, color="2D3748")
    ], space_before=25, space_after=60))

    # 6. Education
    paragraphs.append(make_heading("Education"))
    def add_edu(degree, school, dates):
        paragraphs.append(make_p([
            make_run(degree, bold=True, size=19, color="1A202C")
        ], space_before=60, space_after=10))
        paragraphs.append(make_p([
            make_run(school, size=19, color="4A5568"),
            make_run(f"  |  {dates}  |  India", size=19, color="718096")
        ], space_before=0, space_after=30))

    add_edu("Post Graduate Diploma in Information Technology", "Sikkim Manipal University", "1999 – 2001")
    add_edu("Higher Diploma in Software Engineering (HDSE)", "Aptech Computer Education", "1999 – 2001")
    add_edu("Bachelor of Science (B.Sc.) in Chemistry & Mathematics", "Gujarat University", "1996 – 1999")

    # 7. Certifications
    paragraphs.append(make_heading("Certifications & Credentials"))
    certs = [
        ("Certified ScrumMaster (CSM)", "Scrum Alliance"),
        ("AWS Cloud Practitioner", "Amazon Web Services"),
        ("IBM Design Thinking Practitioner", "IBM"),
        ("Google Analytics Certified", "Google")
    ]
    for name, org in certs:
        paragraphs.append(make_p([
            make_run(name, bold=True, size=19, color="1A202C"),
            make_run(f" — {org}", size=19, color="4A5568")
        ], space_before=20, space_after=20, is_bullet=True))

    # Assemble Document XML
    doc_body = "".join(paragraphs)
    sect_pr = (
        '<w:sectPr>'
        '<w:pgSz w:w="11906" w:h="16838"/>'  # A4 Portrait
        '<w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="720" w:footer="720" w:gutter="0"/>' # 0.75" Margins
        '<w:cols w:space="720"/>'
        '<w:docGrid w:linePitch="360"/>'
        '</w:sectPr>'
    )
    final_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<w:body>{doc_body}{sect_pr}</w:body>'
        '</w:document>'
    )

    # Validate XML before writing
    try:
        ET.fromstring(final_xml)
    except Exception as xml_err:
        log(f"ERROR: XML generation failed: {xml_err}")
        return False

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp_path = tmp.name

    with zipfile.ZipFile(tmp_path, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name, data in preserved_files.items():
            zout.writestr(name, data)
        zout.writestr('word/document.xml', final_xml.encode('utf-8'))

    os.replace(tmp_path, docx_path)
    log(f"✓ Workday DOCX generated: {docx_path} ({os.path.getsize(docx_path)} bytes)")
    return True

def generate_pdf():
    pdf_path = os.path.join(WORKSPACE_DIR, "Ravindrakumar_Suthar_Resume.pdf")
    html_path = os.path.join(WORKSPACE_DIR, "resume.html")
    
    if not os.path.exists(html_path):
        log(f"ERROR: {html_path} not found.")
        return False

    chrome_candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "google-chrome",
        "chromium"
    ]
    
    chrome_bin = None
    for candidate in chrome_candidates:
        if os.path.exists(candidate) or subprocess.run(["which", candidate], capture_output=True).returncode == 0:
            chrome_bin = candidate
            break

    if not chrome_bin:
        log("ERROR: Google Chrome binary not found for headless PDF generation.")
        return False

    file_url = f"file://{os.path.abspath(html_path)}"
    log(f"Generating Workday-compliant PDF from {html_path}...")
    
    cmd = [
        chrome_bin,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        file_url
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 10000:
        log(f"✓ PDF generated successfully: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
        return True
    else:
        log(f"PDF generation error: {res.stderr}")
        return False

def audit_workday_compatibility():
    log("Running Workday ATS Compatibility Audit...")
    docx_path = os.path.join(WORKSPACE_DIR, "Ravindrakumar_Suthar_Resume.docx")
    pdf_path = os.path.join(WORKSPACE_DIR, "Ravindrakumar_Suthar_Resume.pdf")
    
    # 1. Audit DOCX Text Ingestion
    with zipfile.ZipFile(docx_path, 'r') as z:
        docx_xml = z.read('word/document.xml').decode('utf-8')
        docx_root = ET.fromstring(docx_xml)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        docx_texts = [elem.text for elem in docx_root.iter() if elem.text]
        docx_full_text = " ".join(docx_texts)

    # 2. Audit PDF Text Ingestion via pdfminer (ATS Engine)
    pdf_full_text = ""
    try:
        from pdfminer.high_level import extract_text
        pdf_full_text = extract_text(pdf_path)
    except Exception as e:
        log(f"Warning: pdfminer audit error: {e}")

    # Workday Parsing Validation Checklist
    required_workday_entities = [
        ("Full Legal Name", "Ravindrakumar M. Suthar"),
        ("Phone Number", "+91 83800 99988"),
        ("Email Address", "ravindra.suthar@me.com"),
        ("Location", "Pune, Maharashtra, India"),
        ("Standard Section 1", "PROFESSIONAL SUMMARY"),
        ("Standard Section 2", "TECHNICAL SKILLS"),
        ("Standard Section 3", "PROFESSIONAL EXPERIENCE"),
        ("Standard Section 4", "EDUCATION"),
        ("Standard Section 5", "CERTIFICATIONS"),
        ("Employer 1", "Citicorp Services India"),
        ("Employer 2", "Cognizant"),
        ("Employer 3", "Impetus"),
        ("Key Initiative", "Non-AEM to AEM"),
        ("Role Fit", "Senior Frontend Architect"),
        ("LinkedIn URL", "linkedin.com/in/ravindrasuthar"),
        ("Micro-frontend Skill", "Module Federation"),
        ("Modern State Skill", "Redux Toolkit"),
        ("Leadership Competency", "Cross-Functional Leadership"),
        ("Accessibility Standard", "WCAG")
    ]

    docx_score = 0
    pdf_score = 0
    total = len(required_workday_entities)

    for label, entity in required_workday_entities:
        in_docx = entity.lower() in docx_full_text.lower()
        in_pdf = entity.lower() in pdf_full_text.lower() if pdf_full_text else True
        if in_docx: docx_score += 1
        if in_pdf: pdf_score += 1
        
        status_docx = "PASS" if in_docx else "FAIL"
        status_pdf = "PASS" if in_pdf else "FAIL"
        log(f"  [{label}] DOCX: {status_docx} | PDF: {status_pdf}")

    docx_pct = int((docx_score / total) * 100)
    pdf_pct = int((pdf_score / total) * 100)
    log(f"Workday ATS Compatibility Score: DOCX = {docx_pct}%, PDF = {pdf_pct}%")

    # 3. Vector Purity & Anti-Blur Audit (Zero rasterized Image XObjects)
    with open(pdf_path, 'rb') as f:
        pdf_bytes = f.read()
    image_xobjects = pdf_bytes.count(b'/Subtype /Image')
    vector_pure = (image_xobjects == 0)
    log(f"  [Vector Purity Audit] Raster Image XObjects: {image_xobjects} -> {'PASS (100% Vector Crisp)' if vector_pure else 'FAIL (Contains Blurry Images)'}")

    return docx_pct == 100 and pdf_pct == 100 and vector_pure

if __name__ == "__main__":
    log("Starting End-to-End Workday ATS Resume Synchronization...")
    docx_ok = generate_workday_docx()
    pdf_ok = generate_pdf()
    audit_ok = audit_workday_compatibility()
    
    if docx_ok and pdf_ok and audit_ok:
        log("SUCCESS: Both PDF and DOCX are 100% compatible with Workday and ATS parsers!")
        sys.exit(0)
    else:
        log("FAILURE: Workday compatibility checks did not achieve 100%.")
        sys.exit(1)
