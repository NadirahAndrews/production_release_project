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

