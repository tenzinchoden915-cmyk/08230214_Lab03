/* ================================
   Lab 03 - Portfolio Interactivity
================================== */
document.addEventListener('DOMContentLoaded', function() {
    setupPreloader();
    setupThemeSwitcher();
    updateGreeting();
    setupEducationFilter();
    setupSkillSearch();
    setupProjectToggles();
    setupProjectFilter();
    setupContactValidation();
    setupCopyEmail();
    setupIntroReadMore();
    setupHighlightKeywords();
});

/* ---------- Preloader ---------- */
function setupPreloader() {
    const preloader = document.querySelector('.preloader');
    const loadingBar = document.querySelector('.loading-bar');

    if (!preloader || !loadingBar) return;

    window.addEventListener('load', () => {
        loadingBar.style.width = '100%';
        setTimeout(() => {
            preloader.classList.add('hidden');

            // Make sure all main sections are visible
            document.querySelectorAll('.section-container').forEach(sec => {
                sec.style.display = 'block';
                sec.style.opacity = 1;
            });

            // Also reset any boxes that may be hidden by filters
            document.querySelectorAll('.education-box, .skill-box, .projects-list li').forEach(el => {
                el.style.display = 'block';
            });
        }, 1000); // Faster fade
    });
}

/* ---------- Dark Mode ---------- */
function setupThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
}

/* ---------- Greeting ---------- */
function updateGreeting() {
    const greeting = document.getElementById('greeting');
    if (!greeting) return;
    const hour = new Date().getHours();
    if (hour < 12) greeting.textContent = "Good Morning, Tenzin!";
    else if (hour < 18) greeting.textContent = "Good Afternoon, Tenzin!";
    else greeting.textContent = "Good Evening, Tenzin!";
}

/* ---------- Education Filter ---------- */
function setupEducationFilter() {
    const filter = document.getElementById('edu-filter');
    const boxes = document.querySelectorAll('.education-box');
    if (!filter) return;

    filter.addEventListener('change', function() {
        const val = this.value;
        boxes.forEach(box => {
            box.style.display = (val === 'all' || box.textContent.toLowerCase().includes(val)) 
                ? 'block' : 'none';
        });
    });
}

/* ---------- Skill Search ---------- */
function setupSkillSearch() {
    const search = document.getElementById('skill-search');
    const skills = document.querySelectorAll('.skill-box');
    if (!search) return;

    search.addEventListener('keyup', function() {
        const term = this.value.toLowerCase();
        skills.forEach(s => {
            s.style.display = s.textContent.toLowerCase().includes(term) ? 'block' : 'none';
        });
    });
}

/* ---------- Projects: Read More ---------- */
function setupProjectToggles() {
    const projects = document.querySelectorAll('.projects-list li');
    projects.forEach(project => {
        const paragraphs = project.querySelectorAll('p');
        paragraphs.forEach(p => {
            if (p.textContent.length > 150) {
                const fullText = p.textContent;
                const shortText = fullText.slice(0, 150) + "...";
                p.textContent = shortText;

                const btn = document.createElement('button');
                btn.textContent = "Read More";
                btn.className = "btn";
                btn.addEventListener('click', () => {
                    if (btn.textContent === "Read More") {
                        p.textContent = fullText;
                        btn.textContent = "Read Less";
                    } else {
                        p.textContent = shortText;
                        btn.textContent = "Read More";
                    }
                });
                project.appendChild(btn);
            }
        });
    });
}

/* ---------- Project Filter ---------- */
function setupProjectFilter() {
    const filter = document.getElementById('project-filter');
    const projects = document.querySelectorAll('.projects-list li');
    if (!filter) return;

    filter.addEventListener('change', function() {
        const val = this.value;
        projects.forEach(p => {
            p.style.display = (val === 'all' || p.textContent.toLowerCase().includes(val)) 
                ? 'block' : 'none';
        });
    });
}

/* ---------- Contact Validation ---------- */
function setupContactValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const msg = form.message.value.trim();

        if (!name || !email || !msg) {
            alert("⚠️ Please fill in all fields.");
            e.preventDefault();
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("⚠️ Invalid email format.");
            e.preventDefault();
        }
    });
}

/* ---------- Contact: Copy Email ---------- */
function setupCopyEmail() {
    const btn = document.getElementById('copy-btn');
    const emailText = document.getElementById('copy-email');
    if (!btn || !emailText) return;

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText.textContent);
        alert("📋 Email copied to clipboard!");
    });
}

/* ---------- Intro Section Read More ---------- */
function setupIntroReadMore() {
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreText = document.getElementById('more-text');

    if (!readMoreBtn || !moreText) return;

    readMoreBtn.addEventListener('click', () => {
        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "inline";
            readMoreBtn.textContent = "Read Less";
        } else {
            moreText.style.display = "none";
            readMoreBtn.textContent = "Read More";
        }
    });
}

/* ---------- Highlight Keywords Toggle ---------- */
function setupHighlightKeywords() {
    const highlightBtn = document.getElementById('highlight-btn');
    const aboutText = document.querySelector('.about-text');
    const funFactBox = document.getElementById('fun-fact-box');

    if (!highlightBtn || !aboutText) return;

    const originalHTML = aboutText.innerHTML;
    let highlighted = false;

    const keywords = [
        'teaching', 'technology', 'creativity',
        'learning', 'web design', 'programming',
        'education', 'students'
    ];

    function escapeRegex(word) {
        return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightText(node) {
        if (node.nodeType === 3) { 
            let text = node.nodeValue;
            keywords.forEach(word => {
                const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
                text = text.replace(regex, '<mark>$1</mark>');
            });
            const span = document.createElement('span');
            span.innerHTML = text;
            node.parentNode.replaceChild(span, node);
        } else if (node.nodeType === 1 && node.childNodes) {
            node.childNodes.forEach(child => highlightText(child));
        }
    }

    highlightBtn.addEventListener('click', () => {
        if (!highlighted) {
            highlightText(aboutText);
            highlightBtn.textContent = "Undo Highlight";
            if (funFactBox) funFactBox.textContent = "✨ Keywords highlighted!";
            highlighted = true;
        } else {
            aboutText.innerHTML = originalHTML;
            highlightBtn.textContent = "Highlight Keywords";
            if (funFactBox) funFactBox.textContent = "";
            highlighted = false;
        }
    });
}
/* ================================
   Lab 03 - Portfolio Interactivity (UPDATED)
================================== */
document.addEventListener('DOMContentLoaded', function() {
    setupPreloader();
    setupThemeSwitcher();
    updateGreeting();
    setupEducationFilter();
    setupSkillSearch();
    setupProjectToggles();
    setupProjectFilter();
    setupContactValidation();
    setupCopyEmail();
    setupIntroReadMore();
    setupHighlightKeywords();
    
    // NEW: Call the function to set up the mobile menu toggle
    setupMobileMenu(); 
});

/* ---------- Preloader ---------- */
function setupPreloader() {
    const preloader = document.querySelector('.preloader');
    const loadingBar = document.querySelector('.loading-bar');

    if (!preloader || !loadingBar) return;

    window.addEventListener('load', () => {
        loadingBar.style.width = '100%';
        setTimeout(() => {
            preloader.classList.add('hidden');

            // Make sure all main sections are visible
            document.querySelectorAll('.section-container').forEach(sec => {
                sec.style.display = 'block';
                sec.style.opacity = 1;
            });

            // Also reset any boxes that may be hidden by filters
            document.querySelectorAll('.education-box, .skill-box, .projects-list li').forEach(el => {
                el.style.display = 'block';
            });
        }, 1000); // Faster fade
    });
}

/* ---------- Dark Mode ---------- */
function setupThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
}

/* ---------- Greeting ---------- */
function updateGreeting() {
    const greeting = document.getElementById('greeting');
    if (!greeting) return;
    const hour = new Date().getHours();
    if (hour < 12) greeting.textContent = "Good Morning, Tenzin!";
    else if (hour < 18) greeting.textContent = "Good Afternoon, Tenzin!";
    else greeting.textContent = "Good Evening, Tenzin!";
}

/* ---------- Education Filter ---------- */
function setupEducationFilter() {
    const filter = document.getElementById('edu-filter');
    const boxes = document.querySelectorAll('.education-box');
    if (!filter) return;

    filter.addEventListener('change', function() {
        const val = this.value;
        boxes.forEach(box => {
            box.style.display = (val === 'all' || box.textContent.toLowerCase().includes(val)) 
                ? 'block' : 'none';
        });
    });
}

/* ---------- Skill Search ---------- */
function setupSkillSearch() {
    const search = document.getElementById('skill-search');
    const skills = document.querySelectorAll('.skill-box');
    if (!search) return;

    search.addEventListener('keyup', function() {
        const term = this.value.toLowerCase();
        skills.forEach(s => {
            s.style.display = s.textContent.toLowerCase().includes(term) ? 'block' : 'none';
        });
    });
}

/* ---------- Projects: Read More ---------- */
function setupProjectToggles() {
    const projects = document.querySelectorAll('.projects-list li');
    projects.forEach(project => {
        const paragraphs = project.querySelectorAll('p');
        paragraphs.forEach(p => {
            if (p.textContent.length > 150) {
                const fullText = p.textContent;
                const shortText = fullText.slice(0, 150) + "...";
                p.textContent = shortText;

                const btn = document.createElement('button');
                btn.textContent = "Read More";
                btn.className = "btn";
                btn.addEventListener('click', () => {
                    if (btn.textContent === "Read More") {
                        p.textContent = fullText;
                        btn.textContent = "Read Less";
                    } else {
                        p.textContent = shortText;
                        btn.textContent = "Read More";
                    }
                });
                project.appendChild(btn);
            }
        });
    });
}

/* ---------- Project Filter ---------- */
function setupProjectFilter() {
    const filter = document.getElementById('project-filter');
    const projects = document.querySelectorAll('.projects-list li');
    if (!filter) return;

    filter.addEventListener('change', function() {
        const val = this.value;
        projects.forEach(p => {
            p.style.display = (val === 'all' || p.textContent.toLowerCase().includes(val)) 
                ? 'block' : 'none';
        });
    });
}

/* ---------- Contact Validation ---------- */
function setupContactValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const msg = form.message.value.trim();

        if (!name || !email || !msg) {
            alert("⚠️ Please fill in all fields.");
            e.preventDefault();
            return;
        }
        if (!/\S+@\S+\.\S/.test(email)) {
            alert("⚠️ Invalid email format.");
            e.preventDefault();
        }
    });
}

/* ---------- Contact: Copy Email ---------- */
function setupCopyEmail() {
    const btn = document.getElementById('copy-btn');
    const emailText = document.getElementById('copy-email');
    if (!btn || !emailText) return;

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText.textContent);
        alert("📋 Email copied to clipboard!");
    });
}

/* ---------- Intro Section Read More ---------- */
function setupIntroReadMore() {
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreText = document.getElementById('more-text');

    if (!readMoreBtn || !moreText) return;

    readMoreBtn.addEventListener('click', () => {
        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "inline";
            readMoreBtn.textContent = "Read Less";
        } else {
            moreText.style.display = "none";
            readMoreBtn.textContent = "Read More";
        }
    });
}

/* ---------- Highlight Keywords Toggle ---------- */
function setupHighlightKeywords() {
    const highlightBtn = document.getElementById('highlight-btn');
    const aboutText = document.querySelector('.about-text');
    const funFactBox = document.getElementById('fun-fact-box');

    if (!highlightBtn || !aboutText) return;

    const originalHTML = aboutText.innerHTML;
    let highlighted = false;

    const keywords = [
        'teaching', 'technology', 'creativity',
        'learning', 'web design', 'programming',
        'education', 'students'
    ];

    function escapeRegex(word) {
        return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightText(node) {
        if (node.nodeType === 3) { 
            let text = node.nodeValue;
            keywords.forEach(word => {
                const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
                text = text.replace(regex, '<mark>$1</mark>');
            });
            const span = document.createElement('span');
            span.innerHTML = text;
            node.parentNode.replaceChild(span, node);
        } else if (node.nodeType === 1 && node.childNodes) {
            node.childNodes.forEach(child => highlightText(child));
        }
    }

    highlightBtn.addEventListener('click', () => {
        if (!highlighted) {
            highlightText(aboutText);
            highlightBtn.textContent = "Undo Highlight";
            if (funFactBox) funFactBox.textContent = "✨ Keywords highlighted!";
            highlighted = true;
        } else {
            aboutText.innerHTML = originalHTML;
            highlightBtn.textContent = "Highlight Keywords";
            if (funFactBox) funFactBox.textContent = "";
            highlighted = false;
        }
    });
}

/* ---------- Mobile Menu Toggle (NEW FUNCTION) ---------- */
function setupMobileMenu() {
    // IMPORTANT: This assumes your HTML has an element with ID 'menu-toggle' (the icon) 
    // and your navigation links are inside an element with class 'nav-links'.
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links'); 

    if (!menuToggle || !navLinks) return; 

    menuToggle.addEventListener('click', () => {
        // This toggles a CSS class. You must define CSS rules to SHOW the links 
        // when 'nav-open' is present (and HIDE them when it is not).
        navLinks.classList.toggle('nav-open'); 
    });
}
