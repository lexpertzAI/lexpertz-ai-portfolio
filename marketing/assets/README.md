# LinkedIn assets

Rendered cards for the social campaign. Source is HTML; output is a looping GIF
plus a static PNG of the end frame. 1080×1350 (4:5), under LinkedIn's 5 MB image
limit.

| File | What it is |
|---|---|
| `linkedin/infographic.html` | the card. `?v=l1` or `?v=l2`, `t=` seconds. Open it in a browser to preview |
| `render.mjs` | captures frames with Chrome, assembles the GIF |
| `gif.py` | Pillow encoder: one shared palette, no ffmpeg |
| `linkedin/renders/l1.gif` + `.png` | "An agent is what it may do" — authority model (Nov 2) |
| `linkedin/renders/l2.gif` + `.png` | "'Read-only' is a label" — tool surface (Nov 4) |

## Regenerate

```bash
node marketing/assets/render.mjs        # both
node marketing/assets/render.mjs l2     # one variant
```

Requires Google Chrome and Python 3 with Pillow. The GIF holds the headline from
frame 0 and fades the body out at 4.55s, so it loops without a blank flash.

## Notes

- Add the GIF as a **document/image** post on LinkedIn, not a link preview. Link
  stays in the first comment.
- 14:30 WAT (13:30 UTC) posting slot.
- Edit the HTML and re-render rather than retouching a GIF: text is not
  recoverable once encoded.
