document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 0. FITUR: Header & Ticker Auto Hide/Show saat Scroll
    // ==========================================================================
    let lastScrollTop = 0;
    const headerWrapper = document.querySelector('.site-header-wrapper'); 
    const scrollThreshold = 50; 

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!headerWrapper) return;

        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            headerWrapper.classList.add('header-hidden');
        } else if (currentScroll < lastScrollTop) {
            headerWrapper.classList.remove('header-hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    }, { passive: true });


    // 1. ScrollSpy Otomatis: Menu Sidebar berpindah dari atas ke bawah saat halaman di-scroll
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                        link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });

                if (currentId === 'data') {
                    runCounters();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Klik menu sidebar untuk melompat halus ke section tujuan
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

    // Hubungkan tombol "Daftar PPDB Sekarang" di beranda agar langsung melompat ke bagian 'kontak'
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

    // 2. Jam Digital Real-Time di Header
    function updateClock() {
        const clockElement = document.getElementById('live-clock');
        if (clockElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockElement.innerHTML = `<span class="pulse-dot"></span>${hours}:${minutes}:${seconds} WIB`;
        }
    }

    setInterval(updateClock, 1000);
    updateClock();

    // 3. Animasi Counter Angka
    let counterHasRun = false;

    function runCounters() {
        if (counterHasRun) return;
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 1;
            counter.textContent = current;

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

    // 4. Tombol Kembali ke Atas (Back to Top)
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Interaksi Formulir Kontak Taruna
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const namaInput = document.getElementById('nama').value;
            
            formAlert.textContent = `Terima kasih, ${namaInput}! Aspirasi atau pesan Anda telah berhasil dikirim ke bagian Kesekretariatan Taruna.`;
            formAlert.classList.remove('hidden');

            contactForm.reset();

            setTimeout(function() {
                formAlert.classList.add('hidden');
            }, 6000);
        });
    }

    // ==========================================================================
    // 6. ANIMASI SCROLL REVEAL (Slide-in dari berbagai arah ke tengah)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.card, .taruna-card, .stat-box, .ach-item, .news-card, .gallery-item, .vm-box');
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        if (index % 3 === 0) {
            el.classList.add('from-left');
        } else if (index % 3 === 1) {
            el.classList.add('from-bottom');
        } else {
            el.classList.add('from-right');
        }
    });

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});