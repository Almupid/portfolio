"use strict";

// Fungsi untuk inisialisasi halaman kontak
function initContactPage() {
  // Animasi untuk item kontak
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach((item, index) => {
    // Tambahkan delay untuk animasi berurutan
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 200 + (index * 150));
  });
  
  // Efek hover untuk card utama
  const contactCard = document.querySelector('.contact-card');
  if (contactCard) {
    contactCard.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleY = (x - centerX) / 25;
      const angleX = (centerY - y) / 25;
      
      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    contactCard.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }
}

// Jalankan fungsi inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initContactPage);