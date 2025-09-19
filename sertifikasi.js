// Fungsi untuk membuka modal dengan gambar sertifikat
function openModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const loading = modal.querySelector('.loading');
    
    modal.classList.add('show');
    loading.style.display = 'block';
    modalImg.style.display = 'none';
    
    // Reset src terlebih dahulu untuk memastikan gambar dimuat ulang
    modalImg.src = '';
    
    // Set timeout untuk memastikan modal sudah terbuka sebelum memuat gambar
    setTimeout(() => {
        // Tambahkan path folder image/ ke sumber gambar
        modalImg.src = 'image/' + imageSrc;
    }, 100);
    
    // Mencegah scroll latar belakang saat modal terbuka
    document.body.style.overflow = "hidden";
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('show');
    
    // Mengembalikan scroll latar belakang
    document.body.style.overflow = "auto";
}

// Fungsi ketika gambar selesai dimuat
function imageLoaded() {
    const modalImg = document.getElementById('modalImage');
    const loading = document.querySelector('.loading');
    
    if (loading) {
        loading.style.display = 'none';
    }
    if (modalImg) {
        modalImg.style.display = 'block';
    }
}

// Fungsi ketika gambar gagal dimuat
function imageError() {
    const modalImg = document.getElementById('modalImage');
    const loading = document.querySelector('.loading');
    
    if (loading) {
        loading.textContent = 'Gagal memuat sertifikat. File tidak ditemukan.';
        loading.style.display = 'block';
    }
    if (modalImg) {
        modalImg.style.display = 'none';
    }
    
    // HAPUS BAGIAN INI: Tutup modal otomatis setelah 3 detik jika gambar gagal dimuat
    // setTimeout(() => {
    //     closeModal();
    // }, 3000);
}

// Menutup modal ketika mengklik di luar gambar
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Menutup modal dengan tombol Escape
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Inisialisasi ketika halaman dimuat
window.onload = function() {
    // Tambahkan event listener untuk semua kartu sertifikat
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('click', function() {
            const imageSrc = this.getAttribute('onclick').match(/'(.+?)'/)[1];
            openModal(imageSrc);
        });
    });
};