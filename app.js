//1.NAVIGATION


const initNavInjection = () => {
    const container = document.getElementById("main-nav-container");
    if (!container) return;

    const activePage = container.dataset.active || "";
    const base = container.dataset.base || "";

    // Get current page path for active detection
    const currentPath = window.location.pathname;
    
    const links = [
        {href: `${base}/index.html`, text: "Home", id: "home", path: "/index.html"},
        {href: `${base}/pages/about.html`, text: "About", id: "about", path: "/pages/about.html"},
        {href: `${base}/pages/contact.html`, text: "Contact", id: "contact", path: "/pages/contact.html"},
        {href: `${base}/pages/projects.html`, text: "Projects", id: "projects", path: "/pages/projects.html"},
        {href: `${base}/pages/visuallab.html`, text: "Visual Lab", id: "visuallab", path: "/pages/visuallab.html"},
    ];

    const listItems = links.map(link => {
        // Check if this link matches the current page
        let isActive = false;
        
        // Check by id from data-active attribute
        if (activePage && link.id === activePage) {
            isActive = true;
        }
        // Check by current path
        else if (link.path === currentPath) {
            isActive = true;
        }
        // Special case for index.html
        else if (link.path === "/index.html" && (currentPath === "/" || currentPath === "/index.html")) {
            isActive = true;
        }
        
        const activeAttribute = isActive ? 'class="active"' : "";
        return `<li ${activeAttribute}><a href="${link.href}">${link.text}</a></li>`;
    }).join("");

    container.innerHTML = `
        <nav id="main-nav" role="navigation" aria-label="Main Navigation">
            <a href="${base}index.html" class="nav-logo" aria-label="Nadirah Andrews - Home">Nadirah Andrews</a>
            <button class="nav-toggle" aria-controls="nav-links-list" aria-expanded="false" aria-label="Toggle navigation menu">Menu</button>
            <ul class="nav-links" id="nav-links-list" role="list">
                ${listItems}
            </ul>
        </nav>
    `;
    
    // Setup mobile menu toggle
    const toggleBtn = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
            this.setAttribute('aria-expanded', expanded);
            navLinks.classList.toggle('show');
        });
    }
};

// Initialize sticky nav functionality
const initStickyNav = () => {
    const navContainer = document.getElementById('main-nav-container');
    if (!navContainer) return;
    
    const handleScroll = () => {
        if (window.scrollY > 0) {
            navContainer.classList.add('sticky');
        } else {
            navContainer.classList.remove('sticky');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
};

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initNavInjection();
        initStickyNav();
    });
} else {
    initNavInjection();
    initStickyNav();
}



//2. MASONRY GALLERY
// Visual Lab - Masonry Gallery with Lightbox
document.addEventListener('DOMContentLoaded', function() {
    initVisualLab();
});

function initVisualLab() {
    // Add lightbox to gallery items
    const galleryItems = document.querySelectorAll('.vl-item');
    
    if (galleryItems.length === 0) return;
    
    // Create lightbox modal
    const lightbox = document.createElement('div');
    lightbox.className = 'vl-lightbox';
    lightbox.innerHTML = `
        <span class="vl-lightbox-close">&times;</span>
        <img class="vl-lightbox-img" src="" alt="">
        <div class="vl-lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.vl-lightbox-img');
    const lightboxCaption = lightbox.querySelector('.vl-lightbox-caption');
    const closeBtn = lightbox.querySelector('.vl-lightbox-close');
    
    // Add click event to each gallery item
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const medium = item.querySelector('.vl-medium');
        const date = item.querySelector('.vl-date');
        
        if (img) {
            item.addEventListener('click', function(e) {
                // Don't trigger if clicking on info overlay
                if (e.target.closest('.vl-info')) return;
                
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                
                if (medium && date) {
                    lightboxCaption.textContent = `${medium.textContent} — ${date.textContent}`;
                } else if (medium) {
                    lightboxCaption.textContent = medium.textContent;
                } else {
                    lightboxCaption.textContent = img.alt || 'Artwork';
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close lightbox on click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
}

//3. PROJECTS PAGE
document.addEventListener('DOMContentLoaded', function() {
    // Add placeholder backgrounds if images don't exist
    const cards = document.querySelectorAll('.proj-type-card');
    
    cards.forEach(card => {
        const img = card.querySelector('.proj-thumb');
        const wrapper = card.querySelector('.proj-image-wrapper');
        
        if (img) {
            // Check if image loads successfully
            img.addEventListener('error', function() {
                // Add colored background as fallback
                const isDigital = card.id === 'cardDigital';
                wrapper.style.background = isDigital 
                    ? 'linear-gradient(135deg, #2a1f14 0%, #1a1410 100%)'
                    : 'linear-gradient(135deg, #3a2a1a 0%, #1a1410 100%)';
                
                // Add a placeholder icon/text
                const overlay = card.querySelector('.proj-card-overlay');
                if (overlay && !card.querySelector('.placeholder-text')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder-text';
                    placeholder.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-family: var(--serif);
                        font-size: 3rem;
                        color: rgba(240,232,222,0.1);
                        pointer-events: none;
                    `;
                    placeholder.innerHTML = '🎨';
                    wrapper.appendChild(placeholder);
                }
            });
        }
    });
});

//4. PROJECT WORKS PAGES
// Simple Endless Carousel
document.addEventListener('DOMContentLoaded', function() {
    initSimpleEndlessGallery();
    initVideoPlayback();
});

function initSimpleEndlessGallery() {
    const scrollContainer = document.getElementById('scrollContainer');
    const leftBtn = document.getElementById('scrollLeft');
    const rightBtn = document.getElementById('scrollRight');
    
    if (!scrollContainer) return;
    
    // Get original cards
    const originalCards = Array.from(document.querySelectorAll('.pw-card'));
    const cardCount = originalCards.length;
    
    // Clone all cards and append
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        scrollContainer.appendChild(clone);
    });
    
    // Also prepend clones
    originalCards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        scrollContainer.insertBefore(clone, scrollContainer.firstChild);
    });
    
    // Get all cards including clones
    const allCards = document.querySelectorAll('.pw-card');
    const middleIndex = Math.floor(allCards.length / 2);
    
    // Set initial scroll to middle
    function setToMiddle() {
        const firstCard = allCards[middleIndex];
        if (firstCard) {
            firstCard.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    // Move to next card
    let isTransitioning = false;
    
    function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const containerRect = scrollContainer.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        
        let currentCenterCard = null;
        let minDistance = Infinity;
        
        allCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(centerX - (cardRect.left + cardRect.width / 2));
            if (distance < minDistance) {
                minDistance = distance;
                currentCenterCard = card;
            }
        });
        
        if (currentCenterCard) {
            const nextCard = currentCenterCard.nextElementSibling;
            if (nextCard && nextCard.classList.contains('pw-card')) {
                nextCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            } else {
                // Loop to first card
                allCards[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    function movePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const containerRect = scrollContainer.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        
        let currentCenterCard = null;
        let minDistance = Infinity;
        
        allCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(centerX - (cardRect.left + cardRect.width / 2));
            if (distance < minDistance) {
                minDistance = distance;
                currentCenterCard = card;
            }
        });
        
        if (currentCenterCard) {
            const prevCard = currentCenterCard.previousElementSibling;
            if (prevCard && prevCard.classList.contains('pw-card')) {
                prevCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            } else {
                // Loop to last card
                allCards[allCards.length - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Arrow buttons
    if (rightBtn) rightBtn.addEventListener('click', moveNext);
    if (leftBtn) leftBtn.addEventListener('click', movePrev);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            moveNext();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            movePrev();
        }
    });
    
    // Card scaling effect
    function updateCardScales() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        
        allCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(centerX - cardCenter);
            const maxDistance = 350;
            
            if (distance < maxDistance) {
                const scale = 1 - (distance / maxDistance) * 0.15;
                card.style.transform = `scale(${scale})`;
                card.style.opacity = '1';
                card.style.filter = 'blur(0px)';
            } else {
                card.style.transform = 'scale(0.85)';
                card.style.opacity = '0.5';
                card.style.filter = 'blur(1.5px)';
            }
        });
    }
    
    scrollContainer.addEventListener('scroll', () => {
        requestAnimationFrame(updateCardScales);
    });
    
    setToMiddle();
    setTimeout(updateCardScales, 100);
    window.addEventListener('resize', () => setTimeout(updateCardScales, 100));
}

function initVideoPlayback() {
    const videos = document.querySelectorAll('.pw-video');
    
    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        const card = video.closest('.pw-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play error:', e));
            });
            
            card.addEventListener('mouseleave', () => {
                video.pause();
            });
        }
    });
}

