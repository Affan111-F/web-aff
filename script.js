document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sistem Navigasi Single-Page (Tab Switching dengan Efek Halus)
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus kelas 'active' dari semua menu dan section
            navLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Tambahkan kelas 'active' ke menu yang diklik
            this.classList.add('active');

            // Ambil target ID dari atribut href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add('active');
                // Scroll otomatis mulus ke atas halaman konten
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Jika menu Data yang diklik, jalankan fungsi counter angka
                if(targetId === 'data') {
                    runCounters();
                }
            }
        });
    });

    // 2. Jam Digital Real-Time di Header
    function updateClock() {
        const clockElement = document.getElementById('live-clock');
        if (clockElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}:${seconds} WIB`;
        }
    }

    setInterval(updateClock, 1000);
    updateClock(); // Jalankan langsung saat dimuat

    // 3. 🌟 ANIMASI COUNTER ANGKA (Dari 1 naik ke nilai target saat discroll / diklik)
    let counterHasRun = false;

    function runCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 1; // Mulai dari angka 1
            counter.textContent = current;

            // Tentukan kecepatan increment berdasarkan besar target
            const increment = target / 50; 

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCount, 25); // Kecepatan animasi hitung
                } else {
                    counter.textContent = target; // Pastikan berhenti persis di angka target
                }
            };

            updateCount();
        });
    }

    // Deteksi scroll ke bawah agar counter otomatis aktif saat section Data terlihat
    window.addEventListener('scroll', function() {
        const dataSection = document.getElementById('data');
        if (dataSection) {
            const rect = dataSection.getBoundingClientRect();
            // Jika posisi section berada di dalam layar browser dan belum pernah dijalankan
            if (rect.top <= window.innerHeight && rect.bottom >= 0 && !counterHasRun) {
                runCounters();
                counterHasRun = true;
            }
        }
    });

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
});