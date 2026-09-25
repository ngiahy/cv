#!/usr/bin/env python3
"""Rebuild the static PDF and the social-preview image from the CV page.

    python tools/build.py          # both
    python tools/build.py pdf      # assets/Nguyen-Gia-Hy-CV.pdf only
    python tools/build.py og       # assets/og-image.jpg only

Needs Microsoft Edge or Google Chrome installed (headless mode is used).
The preview image additionally needs Pillow (pip install pillow).
Run it after every change to js/data.js, then commit the regenerated files.
It also sets lastUpdated in js/data.js to the current month.
"""
import os
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_OUT = os.path.join(ROOT, "assets", "Nguyen-Gia-Hy-CV.pdf")
OG_OUT = os.path.join(ROOT, "assets", "og-image.jpg")
DATA_JS = os.path.join(ROOT, "js", "data.js")
MONTHS = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]


def stamp_date():
    """Set lastUpdated in js/data.js to the current month so the site and PDF carry today's date."""
    now = time.localtime()
    label = "%s %d" % (MONTHS[now.tm_mon - 1], now.tm_year)
    with open(DATA_JS, encoding="utf-8") as f:
        s = f.read()
    new, n = re.subn(r'(lastUpdated:\s*")[^"]*(")', lambda m: m.group(1) + label + m.group(2), s, count=1)
    if n and new != s:
        with open(DATA_JS, "w", encoding="utf-8", newline="\n") as f:
            f.write(new)
        print("DATE -> lastUpdated set to %s in js/data.js" % label)


def find_browser():
    env = os.environ.get("BROWSER_EXE")
    if env and os.path.isfile(env):
        return env
    pf = [os.environ.get("ProgramFiles", r"C:\Program Files"),
          os.environ.get("ProgramFiles(x86)", r"C:\Program Files (x86)"),
          os.environ.get("LocalAppData", "")]
    rel = [r"Microsoft\Edge\Application\msedge.exe",
           r"Google\Chrome\Application\chrome.exe"]
    for base in pf:
        for r in rel:
            p = os.path.join(base, r)
            if base and os.path.isfile(p):
                return p
    for name in ("msedge", "microsoft-edge", "google-chrome", "chrome", "chromium", "chromium-browser"):
        p = shutil.which(name)
        if p:
            return p
    mac = ["/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
           "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
    for p in mac:
        if os.path.isfile(p):
            return p
    sys.exit("No Edge/Chrome found. Set BROWSER_EXE=<path to msedge.exe or chrome.exe> and retry.")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    server = ThreadingHTTPServer(("127.0.0.1", port), partial(QuietHandler, directory=ROOT))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, "http://127.0.0.1:%d" % port


def run_browser(exe, args, out_file, timeout=90):
    profile = tempfile.mkdtemp(prefix="cv-build-")
    if os.path.exists(out_file):
        os.remove(out_file)
    cmd = [exe, "--headless=new", "--disable-gpu", "--hide-scrollbars",
           "--user-data-dir=" + profile, "--virtual-time-budget=8000"] + args
    try:
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=timeout)
    except subprocess.TimeoutExpired:
        pass
    for _ in range(60):
        if os.path.exists(out_file) and os.path.getsize(out_file) > 0:
            break
        time.sleep(0.5)
    shutil.rmtree(profile, ignore_errors=True)
    if not (os.path.exists(out_file) and os.path.getsize(out_file) > 0):
        sys.exit("Browser did not produce " + out_file)


def build_pdf(exe, base):
    run_browser(exe, ["--no-pdf-header-footer", "--print-to-pdf=" + PDF_OUT, base + "/index.html?build=pdf"], PDF_OUT)
    with open(PDF_OUT, "rb") as f:
        data = f.read()
    pages = len(re.findall(rb"/Type\s*/Page(?![s/])", data))
    print("PDF  -> %s (%d KB, %s page%s)" % (os.path.relpath(PDF_OUT, ROOT), len(data) // 1024, pages or "?", "" if pages == 1 else "s"))
    if pages > 2:
        print("     WARNING: the PDF is longer than two pages; tighten the content or the print CSS.")


def build_og(exe, base):
    tmp_png = os.path.join(tempfile.gettempdir(), "cv-og-%d.png" % os.getpid())
    run_browser(exe, ["--window-size=1200,630", "--force-device-scale-factor=2",
                      "--screenshot=" + tmp_png, base + "/tools/og-image.html?build=og"], tmp_png)
    try:
        from PIL import Image
    except ImportError:
        fallback = os.path.splitext(OG_OUT)[0] + ".png"
        shutil.move(tmp_png, fallback)
        print("OG   -> %s (Pillow not installed, saved as PNG at 2x; run: pip install pillow)" % os.path.relpath(fallback, ROOT))
        return
    im = Image.open(tmp_png).convert("RGB").resize((1200, 630), Image.LANCZOS)
    im.save(OG_OUT, "JPEG", quality=86, optimize=True, progressive=True)
    os.remove(tmp_png)
    print("OG   -> %s (%d KB, 1200x630)" % (os.path.relpath(OG_OUT, ROOT), os.path.getsize(OG_OUT) // 1024))


def main():
    what = (sys.argv[1] if len(sys.argv) > 1 else "all").lower()
    if what not in ("all", "pdf", "og"):
        sys.exit(__doc__)
    stamp_date()
    exe = find_browser()
    server, base = serve()
    try:
        if what in ("all", "pdf"):
            build_pdf(exe, base)
        if what in ("all", "og"):
            build_og(exe, base)
    finally:
        server.shutdown()


if __name__ == "__main__":
    main()
