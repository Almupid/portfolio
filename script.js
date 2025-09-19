"use strict";

// Fungsi untuk menyesuaikan layout berdasarkan ukuran layar
function adjustLayout() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;
  
  // Penyesuaian khusus untuk halaman dokumentasi
  if (window.location.pathname.includes('dokumentasi') || window.location.pathname.endsWith('dokumentasi.html')) {
    if (width < 993) {
      // Untuk layar kecil pada halaman dokumentasi
      const docContainers = document.querySelectorAll('.main-content-asj, .main-content-elk, .main-content-afj');
      docContainers.forEach(container => {
        container.style.marginBottom = '20px';
      });
    } else {
      // Untuk layar besar pada halaman dokumentasi
      const contentWrapper = document.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.style.gap = '40px';
      }
    }
  }
}

// Fungsi untuk memastikan teks tetap dalam satu baris
function ensureSingleLineText() {
  const greetingElement = document.getElementById('greeting');
  const titleElement = document.querySelector('.mid-left-text h2');
  
  // Cek jika teks perlu di-wrap untuk layar kecil
  const width = window.innerWidth;
  
  if (width < 993) {
    // Untuk layar kecil, biarkan teks wrap normal
    if (greetingElement) {
      greetingElement.style.whiteSpace = 'normal';
    }
    if (titleElement) {
      titleElement.style.whiteSpace = 'normal';
    }
  } else {
    // Untuk layar besar, pastikan satu baris
    if (greetingElement) {
      greetingElement.style.whiteSpace = 'nowrap';
    }
    if (titleElement) {
      titleElement.style.whiteSpace = 'nowrap';
    }
  }
}

// Fungsi untuk mendeteksi device type
function detectDeviceType() {
  const userAgent = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  const isTablet = /iPad|Android/i.test(userAgent) && !isMobile;
  
  if (isMobile) {
    document.body.classList.add('mobile-device');
  } else if (isTablet) {
    document.body.classList.add('tablet-device');
  } else {
    document.body.classList.add('desktop-device');
  }
}

// Fungsi untuk inisialisasi animasi SVG
function initSvgAnimation() {
  const screen = document.getElementById("screen");
  if (!screen) return;
  
  // Bersihkan elemen SVG yang sudah ada sebelumnya
  while (screen.firstChild) {
    screen.removeChild(screen.firstChild);
  }
  
  const xmlns = "http://www.w3.org/2000/svg";
  const xlinkns = "http://www.w3.org/1999/xlink";

  window.addEventListener(
    "pointermove",
    (e) => {
      rad = 0;
    },
    false
  );

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  let width, height;
  window.addEventListener("resize", () => resize(), false);
  resize();

  const prepend = (use, i) => {
    const elem = document.createElementNS(xmlns, "use");
    elems[i].use = elem;
    elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
    screen.prepend(elem);
  };

  const N = 40;

  const elems = [];
  for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
  const pointer = { x: width / 2, y: height / 2 };
  const radm = Math.min(pointer.x, pointer.y) - 20;
  let frm = Math.random();
  let rad = 0;

  for (let i = 1; i < N; i++) {
    if (i === 1) prepend("Cabeza", i);
    else if (i === 8 || i === 14) prepend("Aletas", i);
    else prepend("Espina", i);
  }

  const run = () => {
    requestAnimationFrame(run);
    let e = elems[0];
    pointer.x = width / 2 + Math.cos(frm * 2) * 200;
    pointer.y = height / 2 + Math.sin(frm * 1.5) * 150;
    const ax = (Math.cos(3 * frm) * rad * width) / height;
    const ay = (Math.sin(4 * frm) * rad * height) / width;
    e.x += (ax + pointer.x - e.x) / 10;
    e.y += (ay + pointer.y - e.y) / 10;
    for (let i = 1; i < N; i++) {
      let e = elems[i];
      let ep = elems[i - 1];
      const a = Math.atan2(e.y - ep.y, e.x - ep.x);
      e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
      e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
      const s = (162 + 4 * (1 - i)) / 50;
      if (e.use) {
        e.use.setAttributeNS(
          null,
          "transform",
          `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${
            (180 / Math.PI) * a
          }) translate(${0},${0}) scale(${s},${s})`
        );
      }
    }
    if (rad < radm) rad += 0.5;
    frm += 0.003;
    if (rad > 60) {
      pointer.x += (width / 2 - pointer.x) * 0.05;
      pointer.y += (height / 2 - pointer.y) * 0.05;
    }
  };

  run();
}

// Fungsi untuk modal donasi
function initDonationModal() {
  // Get the modal
  var modal = document.getElementById("donate-modal");
  if (!modal) return;

  // Get the Documentation link
  var docLinks = document.querySelectorAll(
    '.li-navbar a[href="dokumentasi.html"]'
  );

  // Get the donate button
  var donateBtn = document.querySelector(".donate-button");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get the copy button
  var copyBtn = document.getElementById("copy-btn");

  // When the user clicks on Documentation link, open the modal
  docLinks.forEach(function (link) {
    link.onclick = function (event) {
      // Only prevent default if we're not already on the documentation page
      if (!window.location.pathname.includes('dokumentasi')) {
        event.preventDefault();
      }
      modal.style.display = "block";
    };
  });

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

  // Copy account number to clipboard - VERSI DIPERBAIKI
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

function updateGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (!greetingElement) return;
  
  const now = new Date();
  const hour = now.getHours();
  let timeGreeting = "";

  if (hour >= 5 && hour < 11) {
    timeGreeting = "Selamat Pagi";
  } else if (hour >= 11 && hour < 15) {
    timeGreeting = "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    timeGreeting = "Selamat Sore";
  } else {
    timeGreeting = "Selamat Malam";
  }

  const finalGreeting =
    "Hallo " + timeGreeting + " dan Selamat datang di website saya";

  greetingElement.textContent = finalGreeting;
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  adjustLayout();
  ensureSingleLineText();
  detectDeviceType();
  updateGreeting();
  initDonationModal();
  initSvgAnimation();
  
  // Debounce resize event untuk performa
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      adjustLayout();
      ensureSingleLineText();
    }, 250);
  });
});

// Handle case where script is loaded after DOM is already loaded
if (document.readyState === 'loading') {
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', init);
} else {
  // `DOMContentLoaded` has already fired
  init();
}

function init() {
  adjustLayout();
  ensureSingleLineText();
  detectDeviceType();
  updateGreeting();
  initDonationModal();
  initSvgAnimation();
}