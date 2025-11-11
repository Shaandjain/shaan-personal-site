# Adding Your Portrait Image

## Quick Steps

1. **Save your image** as `portrait.png` in the `/public` folder
   - Replace the placeholder file that's currently there

2. **Background Removal** (Recommended):
   - Use [remove.bg](https://www.remove.bg/) (free, online)
   - Or use Photoshop/GIMP with background eraser
   - Or Canva Pro has background removal

3. **Image Specs**:
   - Size: 800x800px (square) recommended
   - Format: JPG or PNG
   - File name: `portrait.png`

4. **The component will automatically**:
   - Apply painted/watercolor SVG filters
   - Adapt to light/dark theme
   - Blend with site colors (ivory/ink)
   - Add paper grain texture

## Current Setup

The portrait is used in:
- About section (main portrait)
- Business card hero (if you add it there)

The styling automatically:
- Removes white backgrounds via mix-blend-mode
- Adjusts contrast/brightness for each theme
- Applies artistic filters for the "painted" effect

## Testing

After adding your image:
1. Run `npm run dev`
2. Check both light and dark modes
3. The portrait should blend seamlessly with the site colors
