"""
Turn a single-ink engraving on flat white into a transparent alpha mask.

The footer uses the result as a CSS mask-image, so the ink color comes from a
theme token (bg-foreground, bg-brand, ...). Ink darkness becomes alpha; the
white paper becomes fully transparent. The image is cropped to a wide ratio
(default 3:1, pass e.g. 2 for 2:1), keeping the bottom and dropping the sky.

Usage:
  python3 scripts/footer-illustration-alpha.py \
    src/assets/illustrations/footer-sources/kobbaklintar.png /tmp/kobbaklintar.png \
    [ratio] [trim] [ink] [scale] [mode]

  ratio  width:height to crop to, default 3 (3:1). Pass 1.7778 to keep 16:9.
  trim   fraction cut from the left, right and bottom before cropping, e.g.
         0.06. Generated drawings tend to fade into white at the edges;
         trimming turns that into a hard full-bleed cut.
  ink    ink darkness (0-255, inverted luminance) that counts as fully
         opaque, default 255. Lower values (e.g. 170) make hatching solid
         ink instead of a gray wash; use with full-opacity bg-foreground.
  scale  integer upscale factor, default 1. Generated drawings are ~1280px
         wide; 2 gives a 2560px mask for retina. Lanczos plus the ink
         threshold keeps line edges crisp instead of soft.
  mode   `alpha` (default) writes a transparent PNG for `mask-alpha`. `lum`
         writes a grayscale PNG for `mask-luminance`; encode it with plain
         `cwebp -q 70` (no -alpha_q), which is much smaller at 2x.

Production pipeline (used for scene-harbour): Lanczos `scale` only smooths
the 1280px source, so for the final masks upscale with Real-ESRGAN first,
then threshold at 2560:

  realesrgan-ncnn-vulkan -i footer-sources/scene-x.png -o /tmp/x4.png \
    -n realesrgan-x4plus-anime -s 4
  python3 -c "from PIL import Image; Image.open('/tmp/x4.png').convert('L') \
    .resize((2560, 1440), Image.LANCZOS).save('/tmp/x2560.png')"
  python3 scripts/footer-illustration-alpha.py /tmp/x2560.png /tmp/x-lum.png \
    2 0 170 1 lum
  cwebp -q 70 /tmp/x-lum.png -o src/images/illustrations/scene-x.webp

The anime model separates merged hatching better than realesrgan-x4plus.
Binary: github.com/xinntao/Real-ESRGAN/releases (ncnn-vulkan, macOS).
  cwebp -q 82 -alpha_q 100 -exact /tmp/kobbaklintar.png \
    -o src/images/illustrations/kobbaklintar.webp

Requires Pillow (python3 -m pip install pillow) and cwebp (brew install webp).
"""

import sys

from PIL import Image, ImageFilter, ImageOps

src, dst = sys.argv[1], sys.argv[2]
ratio = float(sys.argv[3]) if len(sys.argv) > 3 else 3.0
trim = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
ink = int(sys.argv[5]) if len(sys.argv) > 5 else 255
scale = int(sys.argv[6]) if len(sys.argv) > 6 else 1
mode = sys.argv[7] if len(sys.argv) > 7 else "alpha"
im = Image.open(src).convert("L")

if scale > 1:
    im = im.resize((im.width * scale, im.height * scale), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=2))

# Trim the faded margins on the left, right and bottom.
if trim:
    w, h = im.size
    im = im.crop((int(w * trim), 0, w - int(w * trim), h - int(h * trim)))

# Crop to width:height = ratio:1, keeping the bottom of the frame.
w, h = im.size
target_h = min(h, int(w / ratio))
im = im.crop((0, h - target_h, w, h))

# Ink darkness -> alpha; near-white paper -> fully transparent; anything at
# least as dark as `ink` -> fully opaque.
alpha = ImageOps.invert(im).point(
    lambda v: 0 if v < 10 else min(255, int((v - 10) * 255 / (ink - 10)))
)
if mode == "lum":
    # Grayscale for CSS mask-mode: luminance (Tailwind `mask-luminance`).
    # White = ink shows, black = hidden. Encodes as plain lossy WebP, which is
    # 2-3x smaller than a WebP alpha channel for dense hatching.
    out = alpha
else:
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.putalpha(alpha)
out.save(dst, optimize=True)
print(dst, out.size)
