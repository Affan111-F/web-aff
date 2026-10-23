document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebarNav');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
        });

        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => sidebar.classList.remove('mobile-open'));
        });

        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }

    let lastScrollTop = 0;
    const headerWrapper = document.querySelector('.site-header-wrapper'); 
    const heroBanner = document.querySelector('.hero-banner');
    const scrollThreshold = 50; 

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (heroBanner) {
            heroBanner.style.backgroundPositionY = (currentScroll * 0.35) + 'px';
        }

        if (!headerWrapper) return;

        if (currentScroll <= 10) {
            headerWrapper.classList.remove('header-hidden');
            if (window.innerWidth > 992 && sidebar) sidebar.style.top = '130px'; 
        } 
        else if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            headerWrapper.classList.add('header-hidden');
            if (window.innerWidth > 992 && sidebar) sidebar.style.top = '20px'; 
        } 
        else if (currentScroll < lastScrollTop) {
            headerWrapper.classList.remove('header-hidden');
            if (window.innerWidth > 992 && sidebar) sidebar.style.top = '130px'; 
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    }, { passive: true });

    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar ul li a');

    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
                if (currentId === 'data') runCounters();
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const ppdbBtn = document.querySelector('.hero-banner .btn-primary');
    if (ppdbBtn) {
        ppdbBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const kontakSection = document.getElementById('kontak');
            if (kontakSection) {
                kontakSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    function updateClock() {
        const clockElement = document.getElementById('live-clock');
        if (clockElement) {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            clockElement.innerHTML = `<span class="pulse-dot"></span>${h}:${m}:${s} WIB`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    let counterHasRun = false;
    function runCounters() {
        if (counterHasRun) return;
        document.querySelectorAll('.counter').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 1;
            const increment = target / 50; 
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCount, 25);
                } else {
                    counter.textContent = target;
                }
            };
            updateCount();
        });
        counterHasRun = true;
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            formAlert.textContent = `Terima kasih, ${nama}! Pesan Anda telah terkirim ke Kesekretariatan.`;
            formAlert.classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => formAlert.classList.add('hidden'), 5000);
        });
    }

    const revealElements = document.querySelectorAll('.card, .taruna-card, .stat-box, .ach-item, .news-card, .gallery-item, .vm-box');
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        if (index % 3 === 0) el.classList.add('from-left');
        else if (index % 3 === 1) el.classList.add('from-bottom');
        else el.classList.add('from-right');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // EFEK 3D TILT YANG DIPERBAIKI (Akurat pada kartu yang disentuh)
    // ==========================================================================
    const tiltCards = document.querySelectorAll('.taruna-card, .stat-box, .news-card, .vm-box');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            this.style.transition = 'transform 0.4s ease';
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'none'; 
        });
    });
});