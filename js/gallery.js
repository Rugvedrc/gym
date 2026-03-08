// js/gallery.js — Gallery lightbox for full-screen image viewing
export function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;

    // Create lightbox DOM
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');

    const img = document.createElement('img');
    img.className = 'lightbox-img';
    img.alt = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close image');

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Open lightbox
    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    // Close lightbox
    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { img.src = ''; }, 300);
    }

    // Attach open to gallery items
    galleryItems.forEach(item => {
        const itemImg = item.querySelector('img');
        if (!itemImg) return;

        item.style.cursor = 'zoom-in';
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View: ${itemImg.alt || 'image'}`);

        const handler = () => open(itemImg.src, itemImg.alt);
        item.addEventListener('click', handler);
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handler();
            }
        });
    });

    // Close actions
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });
}
