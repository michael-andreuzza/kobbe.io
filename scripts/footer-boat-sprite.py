"""Cut the rowing boat out of the footer village so it can bob.

Reads watercolour-village-mixed.webp and produces:
  - village-boat.webp: the hull (posts, waterline shadow) as an alpha
    sprite, cut along a hand-traced polygon whose edges only cross open
    water — no colour segmentation, so the pale interior planks stay solid
    and the shore rocks behind the gunwale stay out.
  - watercolour-village-boatless.webp: the same village with open water
    cloned over the hull, so the animated sprite is the only boat. The
    mooring rope stays in the base, anchoring the bobbing boat visually.

The footer overlays the sprite at the boat's original position (percent
coordinates) and animates it with a slow moored-boat sway.

Usage: python3 scripts/footer-boat-sprite.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ILLUSTRATIONS = ROOT / "src" / "images" / "illustrations"
SOURCE = ILLUSTRATIONS / "watercolour-village-mixed.webp"

# Hull outline in source pixels (2560x853), traced on a grid overlay:
# bow tip, oarlock posts, stern post, stern, keel, waterline shadow.
HULL = [
    (1628, 668),
    (1642, 646),
    (1714, 627),
    (1736, 627),
    (1800, 638),
    (1872, 628),
    (1894, 628),
    (1902, 656),
    (1896, 682),
    (1840, 700),
    (1760, 705),
    (1690, 696),
    (1648, 682),
]

# Clone offset for the water patch: open water this many px to the right of
# the hull, same rows, similar ripple density.
CLONE_DX = 380


def polygon_mask(size: tuple[int, int], points: list[tuple[int, int]], blur: float) -> np.ndarray:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return np.array(mask.filter(ImageFilter.GaussianBlur(blur)))


def main() -> None:
    village = Image.open(SOURCE).convert("RGBA")
    art = np.array(village)
    w, h = village.size

    xs = [p[0] for p in HULL]
    ys = [p[1] for p in HULL]
    pad = 8
    bx0, bx1 = min(xs) - pad, max(xs) + pad
    by0, by1 = min(ys) - pad, max(ys) + pad

    # --- Sprite: hull cut on a feathered polygon --------------------------
    soft = polygon_mask((w, h), HULL, blur=2.0)
    sprite = art[by0:by1, bx0:bx1].copy()
    sprite[..., 3] = np.minimum(sprite[..., 3], soft[by0:by1, bx0:bx1])
    Image.fromarray(sprite).save(ILLUSTRATIONS / "village-boat.webp", lossless=True)

    # --- Boatless base: clone water over the hull -------------------------
    # Wider feather so the cloned ripples melt into the originals.
    blend = (polygon_mask((w, h), HULL, blur=5.0)[by0:by1, bx0:bx1] / 255.0)[..., None]
    patch = art[by0:by1, bx0 + CLONE_DX : bx1 + CLONE_DX].astype(float)
    base_box = art[by0:by1, bx0:bx1].astype(float)
    art[by0:by1, bx0:bx1] = (patch * blend + base_box * (1.0 - blend)).astype(np.uint8)
    # Lossy like the source (a lossless 2560px webp would be megabytes).
    Image.fromarray(art).save(ILLUSTRATIONS / "watercolour-village-boatless.webp", quality=90)

    print(f"sprite: {bx1 - bx0}x{by1 - by0} at ({bx0},{by0}) -> village-boat.webp")
    print("base -> watercolour-village-boatless.webp")
    print("css: left", f"{bx0 / w * 100:.3f}%", "top", f"{by0 / h * 100:.3f}%", "width", f"{(bx1 - bx0) / w * 100:.3f}%")


if __name__ == "__main__":
    main()
