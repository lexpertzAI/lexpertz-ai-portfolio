"""Assemble a directory of PNG frames into a looping GIF.

    python3 marketing/assets/gif.py FRAMES_DIR OUT.gif [FPS] [COLORS]

One palette is derived from the final frame and reused for every frame, which
keeps flat infographic colours stable and the file small. Pillow only; no
ffmpeg or external encoder.
"""
import os
import sys

from PIL import Image


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2

    src, out = sys.argv[1], sys.argv[2]
    fps = int(sys.argv[3]) if len(sys.argv) > 3 else 12
    colors = int(sys.argv[4]) if len(sys.argv) > 4 else 160

    files = sorted(f for f in os.listdir(src) if f.endswith(".png"))
    if not files:
        print(f"no frames in {src}")
        return 1

    # Palette from the end frame: it contains every colour the animation uses.
    base = Image.open(os.path.join(src, files[-1])).convert("RGB").quantize(
        colors=colors, method=Image.MEDIANCUT
    )

    frames = [
        Image.open(os.path.join(src, name))
        .convert("RGB")
        .quantize(palette=base, dither=Image.NONE)
        for name in files
    ]

    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=round(1000 / fps),
        loop=0,
        optimize=True,
        disposal=2,
    )

    size = os.path.getsize(out) / (1024 * 1024)
    print(f"{out}: {len(frames)} frames, {size:.2f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
