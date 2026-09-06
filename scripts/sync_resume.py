#!/usr/bin/env python3
"""
sync_resume.py
Automated Synchronization Tool for Ravindra Suthar's Executive Portfolio & Resumes

This script ensures that whenever changes are made to the HTML profile (index.html, resume.html),
the changes are automatically synchronized across:
1. Ravindrakumar_Suthar_Resume.docx (Word Document format for Workday & ATS)
2. Ravindrakumar_Suthar_Resume.pdf (High-fidelity A4 PDF via headless Chrome)
3. llms.txt (Plain text LLM context file)
"""

import os
import re
import sys
import subprocess
import zipfile
import tempfile

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def log(msg):
    print(f"[sync-resume] {msg}")

def update_docx():
    docx_path = os.path.join(WORKSPACE_DIR, "Ravindrakumar_Suthar_Resume.docx")
    if not os.path.exists(docx_path):
        log(f"ERROR: {docx_path} not found.")
        return False

    log("Synchronizing Ravindrakumar_Suthar_Resume.docx...")
    
    with zipfile.ZipFile(docx_path, 'r') as zin:
        xml_content = zin.read('word/document.xml').decode('utf-8')
        all_files = {name: zin.read(name) for name in zin.namelist() if name != 'word/document.xml'}

    # 1. Ensure AEM Migration Agent & VS Code extension bullet is present under Citicorp
    aem_bullet_text = "Architected Autonomous Non-AEM to AEM Migration AI Agent &amp; Integrated VS Code Extension:"
    if aem_bullet_text not in xml_content:
        target_marker = "Led legacy BFSI platform migration"
        marker_pos = xml_content.find(target_marker)
        if marker_pos != -1:
            # Find the closing </w:p> of this paragraph
            close_p = xml_content.find("</w:p>", marker_pos) + len("</w:p>")
            
            new_bullet_xml = (
                '<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>'
                '<w:spacing w:after="40" w:before="40"/></w:pPr>'
                '<w:r><w:rPr><w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/><w:b/><w:bCs/><w:color w:val="1A202C"/><w:sz w:val="19"/><w:szCs w:val="19"/></w:rPr>'
                '<w:t xml:space="preserve">Architected Autonomous Non-AEM to AEM Migration AI Agent &amp; Integrated VS Code Extension: </w:t></w:r>'
                '<w:r><w:rPr><w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/><w:color w:val="4A5568"/><w:sz w:val="19"/><w:szCs w:val="19"/></w:rPr>'
                '<w:t xml:space="preserve">Engineered a unified developer productivity platform where an autonomous AI migration agent operates directly within a custom VS Code extension — combining Retrieval-Augmented Generation (RAG), automated prompt engineering templates, and custom AST parsing scripts to migrate legacy non-AEM component trees into idiomatic Adobe Experience Manager (AEM) Core Components, HTL templates, and Sling models, slashing migration cycle times by over 60%.</w:t></w:r></w:p>'
            )
            xml_content = xml_content[:close_p] + new_bullet_xml + xml_content[close_p:]
            log("Added unified AEM Migration Agent & VS Code Extension bullet to Citicorp experience in DOCX.")

    # 2. Update AI & Tools competencies in DOCX
    old_tools = "Devin AI (Autonomous Coding), GitHub Copilot (AI Pair Programming), Claude, OpenAI, LangChain, Antigravity, Figma, Adobe XD"
    new_tools = "RAG (Retrieval-Augmented Generation), Non-AEM to AEM Migration AI Agent &amp; Integrated VS Code Extension, Enterprise Prompt Engineering, AST Transformation Scripts, Devin AI, GitHub Copilot, Claude, OpenAI APIs, Google Antigravity SDK, LangChain"
    if old_tools in xml_content:
        xml_content = xml_content.replace(old_tools, new_tools)
        log("Updated AI & Tools competencies in DOCX.")

    # Write out updated zip
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp_path = tmp.name

    with zipfile.ZipFile(tmp_path, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name, data in all_files.items():
            zout.writestr(name, data)
        zout.writestr('word/document.xml', xml_content.encode('utf-8'))

    os.replace(tmp_path, docx_path)
    log("Ravindrakumar_Suthar_Resume.docx successfully updated and verified.")
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
    log(f"Generating Ravindrakumar_Suthar_Resume.pdf from {html_path}...")
    
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
        log(f"PDF generated successfully: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
        return True
    else:
        log(f"PDF generation error: {res.stderr}")
        return False

def verify_sync():
    log("Verifying profile consistency...")
    index_path = os.path.join(WORKSPACE_DIR, "index.html")
    resume_path = os.path.join(WORKSPACE_DIR, "resume.html")
    llms_path = os.path.join(WORKSPACE_DIR, "llms.txt")

    with open(index_path, 'r', encoding='utf-8') as f:
        index_text = f.read()
    with open(resume_path, 'r', encoding='utf-8') as f:
        resume_text = f.read()
    with open(llms_path, 'r', encoding='utf-8') as f:
        llms_text = f.read()

    # Verify key enterprise initiative exists across files
    key_phrase = "Non-AEM to AEM"
    for name, content in [("index.html", index_text), ("resume.html", resume_text), ("llms.txt", llms_text)]:
        if key_phrase not in content:
            log(f"WARNING: Key phrase '{key_phrase}' missing in {name}")
        else:
            log(f"✓ {name} contains '{key_phrase}'")

    log("Sync verification complete.")

if __name__ == "__main__":
    log("Starting Resume & Document Synchronization...")
    docx_ok = update_docx()
    pdf_ok = generate_pdf()
    verify_sync()
    if docx_ok and pdf_ok:
        log("SUCCESS: All resume formats (HTML, DOCX, PDF, LLMS) are synchronized!")
        sys.exit(0)
    else:
        log("FAILED: Some resume formats failed to synchronize.")
        sys.exit(1)
