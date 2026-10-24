/* ============================================
   Proposta Interativa v2.0
   Autor: Edvaldo Valódia Ndonga (Edvaldo Quinglish)
   Licença: MIT
   ============================================ */

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const card = document.getElementById('card');
const success = document.getElementById('successScreen');
const hintText = document.getElementById('hintText');
const attemptsEl = document.getElementById('attempts');
const heartsContainer = document.getElementById('hearts');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const girlNameEl = document.getElementById('girlName');

let noCount = 0;
let musicPlaying = false;

const phrases = [
  "Tem certeza? 🥺",
  "Pensa mais...",
  "O SIM é mais bonito!",
  "Não foge 😅",
  "Só tem SIM! 😜",
  "Última chance... ❤️"
];

/* ========== NO BUTTON – stays fully on screen ========== */
function moveNoButton() {
  noCount++;

  // Keep button fully visible (accounting for its size ~110x48)
  const btnW = noBtn.offsetWidth || 110;
  const btnH = noBtn.offsetHeight || 48;
  const padding = 16;

  const maxX = Math.max(0, window.innerWidth - btnW - padding);
  const maxY = Math.max(0, window.innerHeight - btnH - padding);

  const x = Math.random() * maxX + padding / 2;
  const y = Math.random() * maxY + padding / 2;

  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  noBtn.style.zIndex = '50';
  noBtn.style.transition = 'left 0.25s ease, top 0.25s ease';

  const phrase = phrases[Math.min(noCount - 1, phrases.length - 1)];
  noBtn.textContent = phrase;
  hintText.textContent = phrase;
  attemptsEl.textContent = `Tentativa ${noCount} de fugir do SIM`;

  createHearts(3);

  if (noCount >= 5) {
    noBtn.style.display = 'none';
    yesBtn.textContent = 'SIM, MIL VEZES SIM! 💖';
    yesBtn.style.transform = 'scale(1.25)';
  }
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

/* ========== YES BUTTON ========== */
yesBtn.addEventListener('click', () => {
  card.style.transform = 'scale(0.9)';
  card.style.opacity = '0';

  setTimeout(() => {
    success.classList.add('active');
    launchConfetti();
    createHearts(25);
    if (navigator.vibrate) navigator.vibrate([200, 80, 200, 80, 300]);
  }, 320);
});

/* ========== RESTART ========== */
document.getElementById('restart').addEventListener('click', () => {
  success.classList.remove('active');
  card.style.transform = 'scale(1)';
  card.style.opacity = '1';
  noCount = 0;
  noBtn.style.display = 'block';
  noBtn.style.position = 'relative';
  noBtn.style.left = 'auto';
  noBtn.style.top = 'auto';
  noBtn.style.transition = 'none';
  noBtn.textContent = 'Não';
  yesBtn.textContent = 'SIM, QUERO! 😍';
  yesBtn.style.transform = 'scale(1)';
  hintText.textContent = 'Prometo te fazer sorrir todos os dias';
  attemptsEl.textContent = '';
});

/* ========== HEARTS ========== */
function createHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
      h.style.left = Math.random() * 100 + 'vw';
      h.style.fontSize = (18 + Math.random() * 22) + 'px';
      heartsContainer.appendChild(h);
      setTimeout(() => h.remove(), 4200);
    }, i * 90);
  }
}
setInterval(() => createHearts(1), 2800);

/* ========== CONFETTI ========== */
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 3,
      color: ['#FF2D55', '#FFB6C1', '#FFD1DC', '#FF69B4', '#FFD700'][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 2,
      life: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.life -= 0.009;
      if (p.life > 0) {
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    if (alive) requestAnimationFrame(animate);
  }
  animate();
}

/* ========== SHARE SYSTEM ========== */
const shareMessage = "Ela/Ele disse SIM! ❤️\nAcabamos de ficar oficialmente namorados! ✨\n\nCriado com amor por Edvaldo Quinglish";
const shareUrl = window.location.href;

function shareTo(platform) {
  const encodedText = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(shareUrl);
  const fullText = encodeURIComponent(shareMessage + '\n' + shareUrl);

  switch (platform) {
    case 'whatsapp':
      // Works for chat and can be used in Status/Story on mobile
      window.open(`https://wa.me/?text=${fullText}`, '_blank');
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank');
      break;
    case 'email':
      window.location.href = `mailto:?subject=${encodeURIComponent('Ela disse SIM! ❤️')}&body=${fullText}`;
      break;
    case 'sms':
      // sms: works on most mobile browsers
      window.location.href = `sms:?body=${fullText}`;
      break;
    case 'instagram':
      // Instagram has no direct web share URL – copy + open app tip
      copyAndNotify('Texto copiado! Abre o Instagram e cola no Story ou Post.');
      // Try to open Instagram app
      window.open('https://www.instagram.com/', '_blank');
      break;
    case 'tiktok':
      copyAndNotify('Texto copiado! Abre o TikTok e cola na descrição do teu vídeo.');
      window.open('https://www.tiktok.com/upload', '_blank');
      break;
    case 'youtube':
      copyAndNotify('Texto copiado! Podes usar no título/descrição do teu vídeo no YouTube.');
      window.open('https://studio.youtube.com/', '_blank');
      break;
    case 'native':
      if (navigator.share) {
        navigator.share({
          title: 'Ela disse SIM! ❤️',
          text: shareMessage,
          url: shareUrl
        }).catch(() => {});
      } else {
        copyAndNotify('Link copiado para a área de transferência!');
      }
      break;
  }
}

function copyAndNotify(msg) {
  const text = shareMessage + '\n' + shareUrl;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(msg);
    }).catch(() => {
      fallbackCopy(text);
      showToast(msg);
    });
  } else {
    fallbackCopy(text);
    showToast(msg);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

function showToast(message) {
  let toast = document.getElementById('shareToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shareToast';
    toast.style.cssText = `
      position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
      background:#1A1A1A;color:white;padding:12px 22px;border-radius:999px;
      font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:opacity 0.3s;
      box-shadow:0 8px 30px rgba(0,0,0,0.25);max-width:90vw;text-align:center;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2800);
}

// Attach share buttons
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    shareTo(btn.dataset.platform);
  });
});

/* ========== MUSIC ========== */
musicToggle.addEventListener('click', () => {
  if (!musicPlaying) {
    // Try to play. User may need to add music.mp3 in the same folder.
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-icon').textContent = '🔊';
    }).catch(() => {
      showToast('Adiciona um ficheiro music.mp3 na pasta do projeto para ter música de fundo.');
    });
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.classList.remove('playing');
    musicToggle.querySelector('.music-icon').textContent = '🎵';
  }
});

/* ========== SCROLL REVEAL (stronger) ========== */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4');
  const footer = document.getElementById('siteFooter');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  // Footer
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  if (footer) footerObserver.observe(footer);

  // Also trigger card on load
  setTimeout(() => {
    document.querySelectorAll('.reveal, [class*="reveal-delay"]').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

/* ========== GIRL NAME animation (extra sparkle on load) ========== */
function animateGirlName() {
  if (!girlNameEl) return;
  // Already has CSS animation; we can add a little entrance
  girlNameEl.style.opacity = '0';
  girlNameEl.style.transform = 'scale(0.6)';
  setTimeout(() => {
    girlNameEl.style.transition = 'opacity 0.6s, transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    girlNameEl.style.opacity = '1';
    girlNameEl.style.transform = 'scale(1)';
  }, 600);
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  animateGirlName();
  // Subtle continuous hearts
  createHearts(2);
});

// Keep no-button inside viewport on resize
window.addEventListener('resize', () => {
  if (noBtn.style.position === 'fixed') {
    const btnW = noBtn.offsetWidth || 110;
    const btnH = noBtn.offsetHeight || 48;
    const maxX = window.innerWidth - btnW - 8;
    const maxY = window.innerHeight - btnH - 8;
    let x = parseFloat(noBtn.style.left) || 0;
    let y = parseFloat(noBtn.style.top) || 0;
    x = Math.min(Math.max(8, x), maxX);
    y = Math.min(Math.max(8, y), maxY);
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
  }
});
