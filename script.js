document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const items = Array.from(gallery.querySelectorAll('.item'));
  const btns = Array.from(document.querySelectorAll('.cat-btn'));

  
  function placeholderDataURL(label = 'Image') {
    const bg = '#0b1220';
    const fg = '#94a3b8';
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'>
        <rect width='100%' height='100%' fill='${bg}' />
        <g transform='translate(40,40)'>
          <rect x='0' y='0' width='1120' height='820' rx='12' fill='rgba(255,255,255,0.02)' />
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${fg}' font-family='Segoe UI, Roboto, Arial' font-size='48'>${label}</text>
        </g>
      </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }


  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach(item => {
      if (filter === '*' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }));

  items.forEach((item, idx) => {
    const img = item.querySelector('img');
    if (!img) return;
    img.addEventListener('error', () => {
      if (!img.dataset.fallback) {
        img.dataset.fallback = '1';
       
        const label = img.alt ? img.alt : `Photo ${idx + 1}`;
        img.src = placeholderDataURL(label);
      }
    });
  });


  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');

  let currentIndex = -1;

  function visibleItems() {
    return items.filter(i => !i.classList.contains('hidden'));
  }

  function openLightboxAt(index) {
    const vis = visibleItems();
    if (!vis.length) return;
    currentIndex = (index + vis.length) % vis.length;
    const item = vis[currentIndex];
    const img = item.querySelector('img');
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    lbCaption.textContent = item.querySelector('figcaption')?.textContent || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImage.src = '';
    currentIndex = -1;
  }

  gallery.addEventListener('click', (e) => {
    const fig = e.target.closest('.item');
    if (!fig || fig.classList.contains('hidden')) return;
    const vis = visibleItems();
    const idx = vis.indexOf(fig);
    if (idx >= 0) openLightboxAt(idx);
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function prev() { openLightboxAt(currentIndex - 1); }
  function next() { openLightboxAt(currentIndex + 1); }
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  document.addEventListener('keydown', (e) => {
    const hidden = lightbox.getAttribute('aria-hidden') === 'true';
    if (!hidden) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') closeLightbox();
    }
  });

  let startX = 0;
  let endX = 0;
  const threshold = 40; // px
  const lbContent = document.querySelector('.lb-content');
  lbContent.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
  lbContent.addEventListener('touchmove', (e) => endX = e.touches[0].clientX);
  lbContent.addEventListener('touchend', () => {
    const diff = startX - endX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) next(); else prev();
    }
    startX = endX = 0;
  });

  const observer = new MutationObserver(() => {
    if (lightbox.getAttribute('aria-hidden') === 'false') lbClose.focus();
  });
  observer.observe(lightbox, { attributes: true, attributeFilter: ['aria-hidden'] });

  items.forEach(item => {
    item.tabIndex = 0; 
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter') item.click(); });
  });


});
