# Generate Open Graph PNG Image

The Open Graph image needs to be in PNG format (not SVG) for compatibility with messaging platforms like iMessage, WhatsApp, and Signal.

## Quick Method (Recommended)

1. Open `scripts/generate-og-image.html` in Chrome or Safari
2. Take a screenshot at exactly 1200x630 pixels
3. Save it as `public/og-image.png`

## Alternative: Online Converter

1. Go to https://svgtopng.com/ or similar SVG to PNG converter
2. Upload `public/og-image.svg`
3. Set dimensions to 1200x630
4. Download and save as `public/og-image.png`

## After Generating

Once `public/og-image.png` exists, commit it:
```bash
git add public/og-image.png
git commit -m "Add Open Graph PNG image"
git push
```

The meta tags in `index.html` are already configured to use `og-image.png`.

