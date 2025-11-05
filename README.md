# Responsive Image Gallery

This is a small static image gallery built with HTML, CSS and JavaScript.

Features
- Responsive CSS grid layout (mobile → desktop)
- Category filters (All, Nature, People, Architecture, Animals)
- Hover effects and smooth transitions
- Lightbox modal with previous/next navigation and keyboard support
- Accessible basics: focusable items and buttons

Files
- `index.html` — main markup
- `css/styles.css` — layout, hover, responsive and lightbox styles
- `js/script.js` — filtering logic and lightbox behavior

How to use
1. Open `index.html` in your browser (double-click or right-click → Open With).
2. Copy your photos into the `images/` folder (create it if missing). The gallery expects files named `photo1.jpg`, `photo2.jpg`, ... `photo8.jpg` by default. You can also edit the `src` in `index.html` to match your filenames.

Quick PowerShell example (adjust SOURCE_PATH):

```powershell
# create images folder in the gallery project (if it doesn't exist)
New-Item -ItemType Directory -Path "c:\Users\ranja\OneDrive\Documents\Image gallery\images" -ErrorAction SilentlyContinue

# copy JPG/PNG files from another folder into the gallery images folder
Copy-Item "C:\path\to\your\photos\*.jpg" -Destination "c:\Users\ranja\OneDrive\Documents\Image gallery\images"
Copy-Item "C:\path\to\your\photos\*.png" -Destination "c:\Users\ranja\OneDrive\Documents\Image gallery\images"
```

Notes:
- If a referenced image file is missing, the gallery will show an inline SVG placeholder automatically.
- Use hyphens/underscores instead of spaces in filenames to avoid URL-encoding issues.

Customization tips
- To add a new category: add a new `.cat-btn` button in the controls (with the data-filter matching the `data-category` values on `.item`) and add `data-category` on images.
- To change hover effects or add extra image filters, edit `css/styles.css` (look for `.item:hover` and `.filter-*` classes).

Accessibility notes
- Items are keyboard focusable and can be opened with Enter.
- Lightbox supports Escape to close and arrow keys for navigation.

License
Use and modify freely.
