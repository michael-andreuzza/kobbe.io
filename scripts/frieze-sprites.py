"""
Build the animated hero frieze from two generated ink-and-watercolour halves.

Input: footer-sources/frieze-sketch-a.png and -b.png, already upscaled 4x with
Real-ESRGAN to /tmp/fa-a-x4.png and /tmp/fa-b-x4.png (see
footer-illustration-alpha.py for the upscale command).

Output, all under src/images/illustrations/frieze/:
  quay.webp          the stone quay line + water wash, full width
  frieze.webp        the whole stitched frieze (reduced-motion fallback)
  sprite-NN.webp     one cutout per figure or group, paper knocked out
  manifest.json      canvas size and each sprite's box in canvas pixels
and a contact sheet at /tmp/frieze-contact.png for classifying sprites.

Usage: python3 scripts/frieze-sprites.py
"""

import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src/images/illustrations/frieze"
OUT.mkdir(parents=True, exist_ok=True)
PAPER = np.array([255.0, 255.0, 255.0])
W, H = 2560, 1440


def knockout(rgb: np.ndarray, alpha: np.ndarray, solid: bool = False) -> Image.Image:
    """
    Un-composite the paper. With solid=True, every region enclosed by ink
    (white coats, the gull's body, faces) keeps an opaque paper fill, so the
    cutout does not show whatever it drifts over.
    """
    safe = np.where(alpha > 0, alpha, 1)[..., None]
    col = np.clip((rgb - PAPER * (1 - alpha[..., None])) / safe, 0, 255)
    col[alpha == 0] = 0
    alpha = alpha.copy()
    if solid:
        ink = Image.fromarray(((alpha > 0.2) * 255).astype(np.uint8))
        closed = ink.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9))
        pad = Image.new("L", (closed.width + 2, closed.height + 2), 0)
        pad.paste(closed, (1, 1))
        ImageDraw.floodfill(pad, (0, 0), 128)
        outside = np.asarray(pad)[1:-1, 1:-1] == 128
        inside = ~outside & (alpha < 1)
        col[inside] = rgb[inside]  # already composited over paper
        alpha[inside] = 1
    return Image.fromarray(
        np.dstack([col, alpha[..., None] * 255]).round().astype(np.uint8)
    )


def webp(png: Path, dst: Path, q: int = 85) -> None:
    subprocess.run(
        ["cwebp", "-quiet", "-q", str(q), "-alpha_q", "100", "-exact", str(png), "-o", str(dst)],
        check=True,
    )


# 1. Load halves, find the quay line and the x-range where it is solid.
parts = []
for n in ["a", "b"]:
    im = Image.open(f"/tmp/fa-{n}-x4.png").convert("RGB").resize((W, H), Image.LANCZOS)
    rgb = np.asarray(im).astype(np.float32)
    d = np.abs(rgb - PAPER).max(axis=2)
    alpha = np.clip((d - 6) / 34, 0, 1)
    rowfrac = (alpha > 0.3).mean(axis=1)
    quay = int(np.where(rowfrac > 0.6)[0].min())
    band = alpha[quay + 5 : quay + 60].mean(axis=0)
    # Relative threshold: the hatched stone quay is not fully opaque ink.
    solid = np.where(band > 0.65 * np.median(band))[0]
    x0, x1 = int(solid.min()), int(solid.max())
    top = int(np.where((alpha > 0.05).sum(axis=1) > 3)[0].min())
    parts.append((rgb[:, x0:x1], alpha[:, x0:x1], quay, top))
    print(n, "quay", quay, "x", x0, x1, "top", top)

# 2. Stitch on the quay line.
above = max(q - t for _, _, q, t in parts) + 30
below = 300
CW = sum(p[0].shape[1] for p in parts)
CH = above + below
rgb = np.zeros((CH, CW, 3), np.float32)
alpha = np.zeros((CH, CW), np.float32)
x = 0
for prgb, palpha, q, _ in parts:
    w = prgb.shape[1]
    rgb[:, x : x + w] = prgb[q - above : q + below]
    alpha[:, x : x + w] = palpha[q - above : q + below]
    x += w
QUAY = above  # quay top row in canvas coords

knockout(rgb, alpha).save("/tmp/frieze-all.png")
webp(Path("/tmp/frieze-all.png"), OUT / "frieze.webp")

# 3. Quay layer: everything from a few px above the quay line down.
qy = QUAY - 6
knockout(rgb[qy:], alpha[qy:]).save("/tmp/frieze-quay.png")
webp(Path("/tmp/frieze-quay.png"), OUT / "quay.webp")

# 4. Sprites: connected blobs of ink above the quay, found per half so the
# seam never glues two figures together. A generous dilation joins a person
# to their dog, leash, coin or slate; anything still separate (the flying
# gull above a runner) becomes its own sprite, and each cutout is masked by
# its blob so neighbours never leak into the box.
fig_alpha = alpha[:qy]
JOIN = 10  # px, half the largest gap that still counts as one figure


def components(mask: np.ndarray, x_off: int):
    """Yield (bbox, blob mask) for each blob in a boolean mask."""
    lab = Image.fromarray((mask * 255).astype(np.uint8))
    lab = lab.filter(ImageFilter.MaxFilter(2 * JOIN + 1))
    arr = np.array(lab)
    while True:
        ys, xs = np.nonzero(arr == 255)
        if len(ys) == 0:
            return
        ImageDraw.floodfill(lab, (int(xs[0]), int(ys[0])), 100)
        arr = np.array(lab)
        blob = arr == 100
        by, bx = np.nonzero(blob)
        yield (
            int(bx.min()) + x_off,
            int(by.min()),
            int(bx.max()) + x_off,
            int(by.max()),
        ), blob
        arr[blob] = 50
        # fromarray() images are read-only views; floodfill needs a copy.
        lab = Image.fromarray(arr).copy()


segments = []
x = 0
for prgb, palpha, q, _ in parts:
    w = prgb.shape[1]
    for box, blob in components(fig_alpha[:, x : x + w] > 0.15, x):
        if box[2] - box[0] < 24 or box[3] - box[1] < 24:
            continue
        full = np.zeros(fig_alpha.shape, bool)
        full[:, x : x + w] = blob
        segments.append((box, full))
    x += w
segments.sort(key=lambda s: s[0][0])

manifest = {"width": CW, "height": CH, "quay": QUAY, "sprites": []}
sheet = Image.fromarray(
    np.dstack([rgb, alpha[..., None] * 255]).round().astype(np.uint8)
).convert("RGBA")
bg = Image.new("RGBA", sheet.size, (247, 246, 243, 255))
bg.alpha_composite(sheet)
draw = ImageDraw.Draw(bg)
idx = 0
for (sx0, sy0, sx1, sy_bottom), blob in segments:
    # Only airborne blobs (the flying gull) drift over other things and need
    # an opaque paper fill; on standing figures the fill can leak into
    # pockets closed by a leash or a walking stick, so they stay as drawn.
    airborne = sy_bottom < qy - 30
    sy0 = max(0, sy0 - 2)
    sy1 = qy + 4  # include feet down onto the quay line
    sx0p, sx1p = max(0, sx0 - 2), min(CW, sx1 + 3)
    # Blob mask, extended straight down over the quay rows for the feet.
    m = np.zeros((sy1 - sy0, sx1p - sx0p), np.float32)
    m[: qy - sy0] = blob[sy0:qy, sx0p:sx1p]
    m[qy - sy0 :] = blob[qy - 12 : qy, sx0p:sx1p].max(axis=0)
    spr = knockout(
        rgb[sy0:sy1, sx0p:sx1p], alpha[sy0:sy1, sx0p:sx1p] * m, solid=airborne
    )
    png = Path(f"/tmp/sprite-{idx:02d}.png")
    spr.save(png)
    webp(png, OUT / f"sprite-{idx:02d}.webp")
    manifest["sprites"].append(
        {"id": idx, "x": sx0p, "y": sy0, "w": sx1p - sx0p, "h": sy1 - sy0}
    )
    draw.rectangle([sx0p, sy0, sx1p, sy1], outline=(200, 40, 40), width=3)
    draw.text((sx0p + 4, sy0 + 4), str(idx), fill=(200, 40, 40))
    idx += 1

(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
bg.resize((bg.width // 2, bg.height // 2)).save("/tmp/frieze-contact.png")
print("canvas", CW, CH, "quay", QUAY, "sprites", idx)
