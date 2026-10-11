"""Tone a clip to the site's paper and graphite, exactly like the stills, then encode it for the web.
usage: python3 scripts/tone-clip.py in.mp4 out.mp4 poster.webp [size] [crop_top_fraction] [reverse]
Needs ffmpeg, numpy and Pillow. The poster is the first frame of the output."""
import subprocess, sys, tempfile, pathlib
import numpy as np
from PIL import Image

src, dst, poster = sys.argv[1:4]
size = int(sys.argv[4]) if len(sys.argv) > 4 else 1080
crop_top = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
reverse = len(sys.argv) > 6 and sys.argv[6] == "reverse"
paper = np.array([251, 251, 250], np.float32)
graphite = np.array([28, 29, 31], np.float32)

with tempfile.TemporaryDirectory() as tmp:
    tmp = pathlib.Path(tmp)
    subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-an", "-pix_fmt", "rgb24", str(tmp / "f%04d.png")], check=True)
    frames = sorted(tmp.glob("f*.png"))
    if reverse:
        frames = frames[::-1]
    out = tmp / "out"; out.mkdir()
    for i, f in enumerate(frames):
        im = Image.open(f).convert("L")
        if crop_top:
            W, H = im.size
            im = im.crop((0, int(H * crop_top), W, H))
        if im.width > size:
            im = im.resize((size, round(im.height * size / im.width / 2) * 2), Image.LANCZOS)
        L = np.clip(np.asarray(im, np.float32) / 255.0 / 0.97, 0, 1)
        rgb = graphite + (paper - graphite) * L[..., None]
        Image.fromarray(rgb.clip(0, 255).astype(np.uint8)).save(out / f"g{i:04d}.png")
        if i == 0:
            Image.fromarray(rgb.clip(0, 255).astype(np.uint8)).save(poster, quality=82, method=6)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "24", "-i", str(out / "g%04d.png"),
                    "-c:v", "libx264", "-preset", "veryslow", "-crf", "24", "-pix_fmt", "yuv420p",
                    "-movflags", "+faststart", dst], check=True)
print(dst, "frames:", len(frames))
