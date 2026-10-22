"""
Cut a generated quay scene into a transparent hero strip for a feature page.

Input: src/assets/illustrations/footer-sources/feature-<slug>.jpg, a 1280px
generation in the frieze style (pencil and wash on white paper).

Steps: upscale 4x with Real-ESRGAN (anime model, keeps pencil hatching
crisp), crop to the band that holds the figures, quay, and water, knock out
the paper, and save src/images/illustrations/feature-<slug>.webp at 3840px.

Usage: python3 scripts/feature-scene.py <slug>
Real-ESRGAN binary: ~/bin/realesrgan (github.com/xinntao/Real-ESRGAN releases).
"""

import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ESRGAN = Path.home() / "bin/realesrgan/realesrgan-ncnn-vulkan"
OUT_W = 3840
PAD = 16

slug = sys.argv[1]
src = ROOT / f"src/assets/illustrations/footer-sources/feature-{slug}.jpg"
dst = ROOT / f"src/images/illustrations/feature-{slug}.webp"
x4 = Path(f"/tmp/feature-{slug}-x4.png")
strip = Path(f"/tmp/feature-{slug}-strip.png")

subprocess.run(
    [str(ESRGAN), "-i", str(src), "-o", str(x4), "-n", "realesrgan-x4plus-anime", "-s", "4"],
    check=True,
    cwd=ESRGAN.parent,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

im = Image.open(x4).convert("RGB")
a = np.asarray(im).astype(float)
paper = np.median(a[: a.shape[0] // 4].reshape(-1, 3), axis=0)

# The band with content: rows with any ink, padded a little.
ink = (paper - a).max(axis=2) > 18
rows = np.where(ink.mean(axis=1) > 0.002)[0]
top, bottom = max(rows.min() - PAD * 4, 0), min(rows.max() + PAD * 4, a.shape[0])
band = im.crop((0, top, im.width, bottom))
band = band.resize((OUT_W, round(band.height * OUT_W / band.width)), Image.LANCZOS)

c = np.asarray(band).astype(float)
dark = np.clip((paper - c).max(axis=2) / 255, 0, 1)
alpha = np.clip((dark - 0.03) / 0.97, 0, 1) ** 0.85
safe = np.where(alpha > 0, alpha, 1)[..., None]
col = np.clip((c - paper * (1 - alpha[..., None])) / safe, 0, 255)
Image.fromarray(np.dstack([col, alpha[..., None] * 255]).round().astype(np.uint8)).save(strip)

subprocess.run(
    ["cwebp", "-quiet", "-q", "85", "-alpha_q", "100", "-exact", str(strip), "-o", str(dst)],
    check=True,
)
print(f"{dst.relative_to(ROOT)} {band.width}x{band.height}, preview {strip}")
