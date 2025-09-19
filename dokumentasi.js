"use strict";

// Fungsi untuk memastikan navbar berfungsi dengan benar
function initNavbar() {
  const navbar = document.querySelector('.container-navbar');
  const navLinks = document.querySelectorAll('.li-navbar a');

  // Pastikan navbar dapat diklik
  if (navbar) {
    navbar.style.pointerEvents = 'auto';
  }

  // Pastikan semua link navbar dapat diklik
  navLinks.forEach(link => {
    link.style.pointerEvents = 'auto';
    link.style.cursor = 'pointer';
  });

  console.log('Navbar initialized successfully');
}

// Fungsi untuk inisialisasi modal PDF - DIPERBAIKI
function initPdfViewer() {
  // Dapatkan modal PDF
  const pdfModal = document.getElementById("pdf-modal");
  const pdfViewer = document.getElementById("pdf-viewer");
  const pdfModalTitle = document.getElementById("pdf-modal-title");
  const closePdfBtn = document.querySelector(".close-pdf");

  // Dapatkan semua tombol view PDF
  const viewPdfButtons = document.querySelectorAll(".view-pdf-btn");

  // Ketika tombol view PDF diklik
  viewPdfButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();

      // Dapatkan path PDF dan judul
      const pdfPath = this.getAttribute("data-pdf");
      const pdfTitle = this.querySelector("span").textContent;

      // Set judul modal
      pdfModalTitle.textContent = pdfTitle;

      // Set sumber iframe
      pdfViewer.src = pdfPath + "#toolbar=0&navpanes=0";

      // Tampilkan modal
      pdfModal.style.display = "block";

      // Scroll ke atas halaman untuk memastikan modal terlihat
      window.scrollTo(0, 0);

      // Nonaktifkan scroll pada body
      document.body.style.overflow = "hidden";
    });
  });

  // Ketika tombol close diklik
  closePdfBtn.addEventListener("click", function() {
    pdfModal.style.display = "none";
    pdfViewer.src = "";
    document.body.style.overflow = "auto";
  });

  // Ketika klik di luar modal
  window.addEventListener("click", function(e) {
    if (e.target === pdfModal) {
      pdfModal.style.display = "none";
      pdfViewer.src = "";
      document.body.style.overflow = "auto";
    }
  });

  // Blokir klik kanan pada iframe
  pdfViewer.addEventListener("load", function() {
    try {
      const iframeDoc = pdfViewer.contentDocument || pdfViewer.contentWindow.document;
      iframeDoc.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        return false;
      });
    } catch (e) {
      console.log("Tidak dapat memblokir klik kanan karena kebijakan CORS");
    }
  });
}

// Fungsi untuk modal donasi (salin dari script.js dengan penyesuaian)
function initDonationModal() {
  // Get the modal
  var modal = document.getElementById("donate-modal");
  if (!modal) return;

  // Get the donate button
  var donateBtn = document.querySelector(".donate-button");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get the copy button
  var copyBtn = document.getElementById("copy-btn");

  // When the user clicks on donate button, open the modal
  if (donateBtn) {
    donateBtn.onclick = function () {
      modal.style.display = "block";
    };
  }

  // When the user clicks on <span> (x), close the modal
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Copy account number to clipboard
  if (copyBtn) {
    copyBtn.onclick = function () {
      var accountNumber = document.getElementById("account-number").textContent;

      // Fallback function untuk browser yang tidak support clipboard API
      function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = 0;
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          var successful = document.execCommand("copy");
          var msg = successful ? "berhasil" : "gagal";
        } catch (err) {
          console.error("Fallback: Gagal menyalin teks", err);
        }

        document.body.removeChild(textArea);

        return successful;
      }

      // Coba menggunakan Clipboard API modern
      if (!navigator.clipboard) {
        // Fallback untuk browser lama
        var success = fallbackCopyTextToClipboard(accountNumber);
        if (success) {
          copyBtn.textContent = "Tersalin!";
          setTimeout(function () {
            copyBtn.textContent = "Salin Nomor Rekening";
          }, 2000);
        } else {
          alert(
            "Gagal menyalin nomor rekening. Silakan salin manual: " +
              accountNumber
          );
        }
        return;
      }

      navigator.clipboard
        .writeText(accountNumber)
        .then(function () {
          // Change button text temporarily
          copyBtn.textContent = "Tersalin!";
          setTimeout(function () {
            copyBtn.textContent = "Salin Nomor Rekening";
          }, 2000);
        })
        .catch(function (err) {
          console.error("Gagal menyalin teks: ", err);
          // Coba fallback method
          var success = fallbackCopyTextToClipboard(accountNumber);
          if (!success) {
            alert(
              "Gagal menyalin nomor rekening. Silakan salin manual: " +
                accountNumber
            );
          } else {
            copyBtn.textContent = "Tersalin!";
            setTimeout(function () {
              copyBtn.textContent = "Salin Nomor Rekening";
            }, 2000);
          }
        });
    };
  }
}

// Inisialisasi saat dokumen dimuat
document.addEventListener("DOMContentLoaded", function() {
  initNavbar();
  initPdfViewer();
  initDonationModal();

  // PERBAIKAN: Hapus baris ini karena perbaikan CSS sudah cukup
  // const svgElement = document.querySelector('svg');
  // if (svgElement) {
  //   svgElement.style.pointerEvents = 'none';
  // }
});

// Handle case where script is loaded after DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initPdfViewer();
    initDonationModal();
  });
} else {
  initNavbar();
  initPdfViewer();
  initDonationModal();
}