// Hide main content initially for preloader
document.addEventListener('DOMContentLoaded', function() {
    const mainElement = document.querySelector('.main');
    if (mainElement) {
        mainElement.style.display = 'none';
    }

    // Mobile Menu Toggle
    // Create mobile menu button
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.navmenu ul');

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.color = 'var(--accent)';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.cursor = 'pointer';

    header.appendChild(mobileMenuBtn);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('mobile-menu-open');
        this.innerHTML = nav.classList.contains('mobile-menu-open') ?
            '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
    });

    // Show/hide mobile menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            nav.classList.remove('mobile-menu-open');
            mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
        } else {
            mobileMenuBtn.style.display = 'none';
            nav.classList.remove('mobile-menu-open');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                nav.classList.remove('mobile-menu-open');
                mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
            }
        });
    });

    // Active navigation on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navmenu a');

    function setActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Typing animation for the changing span text
    const changingSpan = document.querySelector('.hero h1 span[data-text]');
    if (changingSpan) {
        const texts = changingSpan.getAttribute('data-text').split(',');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                changingSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeWriter, 500);
                    return;
                }
            } else {
                changingSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, 2000);
                    return;
                }
            }
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Animate counters
    const counters = document.querySelectorAll('.purecounter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-purecounter-end');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Trigger counter animation when fun facts section is visible
    const funfactsSection = document.querySelector('.funfacts');
    if (funfactsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(funfactsSection);
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.portfolio-filters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            // Add active class to clicked button
            this.classList.add('filter-active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const subject = this.querySelector('input[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });

    // Digital Clock
    function updateDigitalClock() {
        const clockElement = document.getElementById('digital-clock');
        if (clockElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    // Update clock every second
    setInterval(updateDigitalClock, 1000);
    updateDigitalClock(); // Initial call

    // Enhanced Preloader will be handled below

    // Add particle effect to hero background
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            hero.appendChild(particle);
        }
    }

    createParticles();

    // Add CSS for particles and mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent);
            border-radius: 50%;
            opacity: 0.3;
            animation: float 20s infinite linear;
            pointer-events: none;
        }

        .mobile-menu-btn {
            display: none;
        }

        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }

            .navmenu ul {
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(7, 18, 38, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border-top: 1px solid var(--border);
            }

            .navmenu ul.mobile-menu-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .navmenu li {
                margin: 10px 0;
                text-align: center;
            }
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }

        /* Futuristic Cursor */
        .cursor-trail {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
        }

        .cursor-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent);
            border-radius: 50%;
            opacity: 0.8;
            animation: cursorFade 0.5s ease-out forwards;
        }

        @keyframes cursorFade {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(0); opacity: 0; }
        }

        /* Floating Code Snippets */
        .floating-code {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }

        .code-snippet {
            position: absolute;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid var(--accent);
            padding: 8px 12px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: var(--accent);
            white-space: nowrap;
            animation: codeFloat 15s infinite linear;
            backdrop-filter: blur(5px);
        }

        .code-snippet:nth-child(1) { animation-delay: 0s; top: 10%; left: -200px; }
        .code-snippet:nth-child(2) { animation-delay: 3s; top: 30%; left: -200px; }
        .code-snippet:nth-child(3) { animation-delay: 6s; top: 50%; left: -200px; }
        .code-snippet:nth-child(4) { animation-delay: 9s; top: 70%; left: -200px; }
        .code-snippet:nth-child(5) { animation-delay: 12s; top: 20%; left: -200px; }

        @keyframes codeFloat {
            0% { transform: translateX(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
        }

        /* Theme Switcher */
        .theme-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        }

        .theme-btn {
            padding: 8px 16px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid var(--accent);
            color: var(--accent);
            border-radius: 20px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .theme-btn:hover, .theme-btn.active {
            background: var(--accent);
            color: var(--primary);
            box-shadow: 0 0 20px var(--accent);
        }

        @media (max-width: 768px) {
            .theme-switcher {
                top: auto;
                bottom: 20px;
                right: 20px;
                flex-direction: column;
                gap: 5px;
            }

            .theme-btn {
                padding: 6px 12px;
                font-size: 10px;
            }
        }

        @media (max-width: 480px) {
            .theme-switcher {
                bottom: 10px;
                right: 10px;
                gap: 3px;
            }

            .theme-btn {
                padding: 4px 8px;
                font-size: 9px;
            }
        }

        /* Enhanced Preloader */
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        #preloader.hide {
            opacity: 0;
            visibility: hidden;
        }

        .preloader-content {
            text-align: center;
            color: var(--accent);
        }

        .loading-bar {
            width: 300px;
            height: 4px;
            background: rgba(0, 255, 255, 0.2);
            border-radius: 2px;
            margin: 20px auto;
            overflow: hidden;
        }

        .loading-progress {
            height: 100%;
            background: var(--accent);
            border-radius: 2px;
            width: 0%;
            animation: loadingProgress 3s ease-in-out forwards;
            box-shadow: 0 0 10px var(--accent);
        }

        .loading-text {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            margin-top: 10px;
            animation: textGlow 1s ease-in-out infinite alternate;
        }

        @keyframes loadingProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }

        @keyframes textGlow {
            0% { text-shadow: 0 0 5px var(--accent); }
            100% { text-shadow: 0 0 20px var(--accent), 0 0 30px var(--accent); }
        }

        /* Enhanced Hero Glitch */
        .hero h1.glitch {
            position: relative;
            animation: glitch 2s infinite;
        }

        .hero h1.glitch::before,
        .hero h1.glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .hero h1.glitch::before {
            animation: glitch-1 0.5s infinite;
            color: #ff0000;
            z-index: -1;
        }

        .hero h1.glitch::after {
            animation: glitch-2 0.5s infinite;
            color: #00ffff;
            z-index: -2;
        }

        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(2px, -2px); }
            40% { transform: translate(2px, 2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(-2px, 2px); }
        }

        /* Enhanced Portfolio Cards */
        .portfolio-card:hover {
            transform: rotateX(15deg) rotateY(15deg) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 255, 255, 0.3);
        }

        .portfolio-card:hover .portfolio-img img {
            filter: brightness(1.2) contrast(1.1);
        }

        /* Interactive Particles */
        .particle.interactive {
            transition: all 0.3s ease;
        }

        .particle.interactive:hover {
            transform: scale(2);
            opacity: 1;
        }

        /* Circuit Patterns */
        .circuit-pattern {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.1;
        }

        .circuit-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, var(--accent), transparent);
            height: 1px;
            animation: circuitFlow 8s infinite linear;
        }

        .circuit-line:nth-child(1) { width: 200px; top: 20%; left: -200px; animation-delay: 0s; }
        .circuit-line:nth-child(2) { width: 150px; top: 40%; left: -150px; animation-delay: 2s; }
        .circuit-line:nth-child(3) { width: 180px; top: 60%; left: -180px; animation-delay: 4s; }
        .circuit-line:nth-child(4) { width: 120px; top: 80%; left: -120px; animation-delay: 6s; }

        @keyframes circuitFlow {
            0% { transform: translateX(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Futuristic Cursor Implementation
    let cursorTrail = [];
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create cursor particle
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = mouseX + 'px';
        particle.style.top = mouseY + 'px';
        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 500);
    });

    // Enhanced Hero Glitch Effect
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.classList.add('glitch');
        heroTitle.setAttribute('data-text', heroTitle.textContent);

        // Random glitch activation
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 5 seconds
                heroTitle.style.animationDuration = '0.1s';
                setTimeout(() => {
                    heroTitle.style.animationDuration = '2s';
                }, 100);
            }
        }, 5000);
    }

    // Interactive Particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.classList.add('interactive');

        particle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(3)';
            this.style.opacity = '1';
        });

        particle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.3';
        });
    });

    // Theme Switcher Implementation
    const themeButtons = document.querySelectorAll('.theme-btn');
    const root = document.documentElement;

    const themes = {
        cyberpunk: {
            '--primary': '#071226',
            '--secondary': '#0f2138',
            '--accent': '#00ffff',
            '--text': '#ffffff',
            '--border': '#00ffff'
        },
        neon: {
            '--primary': '#000000',
            '--secondary': '#1a1a1a',
            '--accent': '#ff00ff',
            '--text': '#ffffff',
            '--border': '#ff00ff'
        },
        matrix: {
            '--primary': '#000000',
            '--secondary': '#001100',
            '--accent': '#00ff00',
            '--text': '#00ff00',
            '--border': '#00ff00'
        }
    };

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            const themeColors = themes[theme];

            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Apply theme
            Object.keys(themeColors).forEach(property => {
                root.style.setProperty(property, themeColors[property]);
            });

            // Store theme preference
            localStorage.setItem('selectedTheme', theme);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
    const savedThemeButton = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (savedThemeButton) {
        savedThemeButton.click();
    }

    // Enhanced Preloader
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');

    let progress = 0;
    const loadingTexts = ['Initializing...', 'Loading assets...', 'Preparing interface...', 'Almost ready...'];

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                preloader.classList.add('hide');
                // Show main content after preloader hides
                const mainElement = document.querySelector('.main');
                if (mainElement) {
                    mainElement.style.display = 'block';
                }
            }, 500);
        }

        loadingProgress.style.width = progress + '%';

        // Change loading text
        const textIndex = Math.floor(progress / 25);
        if (loadingTexts[textIndex]) {
            loadingText.textContent = loadingTexts[textIndex];
        }
    }, 200);

    // Circuit Patterns
    const circuitPattern = document.createElement('div');
    circuitPattern.className = 'circuit-pattern';
    document.body.appendChild(circuitPattern);

    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        circuitPattern.appendChild(line);
    }

    // Enhanced Portfolio Cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(15deg) scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    });
});
