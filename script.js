// Always start at the top on page load
window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Dark / Light mode toggle
const themeToggle = document.querySelector('.theme-toggle');

// Always start in dark mode
document.documentElement.setAttribute('data-theme', 'dark');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Typewriter Effect ----
function typeWriter(element, text, speed, callback) {
  element.textContent = '';
  element.classList.add('typing');
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function deleteText(element, speed, callback) {
  let text = element.textContent;
  function erase() {
    if (text.length > 0) {
      text = text.slice(0, -1);
      element.textContent = text;
      setTimeout(erase, speed);
    } else if (callback) {
      callback();
    }
  }
  erase();
}

// Rotating taglines
const taglines = ['IT Student', 'Web Developer', 'Creative Builder', 'Problem Solver'];
let taglineIndex = 0;
const heroGreeting = document.querySelector('.hero-greeting');
const heroTagline = document.querySelector('.hero-tagline');
const greetingText = 'Hi, my name is';

function cycleTagline() {
  typeWriter(heroTagline, taglines[taglineIndex], 80, () => {
    setTimeout(() => {
      deleteText(heroTagline, 40, () => {
        heroTagline.textContent = '';
        taglineIndex = (taglineIndex + 1) % taglines.length;
        cycleTagline();
      });
    }, 2000);
  });
}

// Start typewriter on load
typeWriter(heroGreeting, greetingText, 60, () => {
  heroGreeting.classList.remove('typing');
  heroTagline.classList.add('typing');
  cycleTagline();
});

// ---- Scroll Reveal (IntersectionObserver) ----
const revealElements = document.querySelectorAll('.scroll-reveal');
const skillTags = document.querySelectorAll('.skill-tag');

// Stagger skill tags
skillTags.forEach((tag, i) => {
  tag.classList.add('scroll-reveal');
  tag.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger project cards
document.querySelectorAll('.project-card.scroll-reveal').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.15}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ---- Project Card 3D Tilt ----
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * 10;  // max ±5deg
      const rotateX = -(y / rect.height) * 10;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---- Animated Leaf Cursor ----
const leafCursor = document.createElement('div');
leafCursor.classList.add('leaf-cursor');
leafCursor.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='28' viewBox='-2 -2 32 42'>
  <g transform='rotate(-30 14 17)'>
    <!-- stem -->
    <path d='M14 33 C14 36 15 39 16 42' fill='none' stroke='#5c6e3b' stroke-width='1.5' stroke-linecap='round'/>
    <!-- leaf body -->
    <path d='M14 1 C6 6 1 13 1 19 C1 26 6 33 14 33 C22 33 27 26 27 19 C27 13 22 6 14 1Z' fill='#8A9A5B' stroke='#5c6e3b' stroke-width='1.3' stroke-linejoin='round'/>
    <!-- center vein -->
    <path d='M14 3 L14 33' fill='none' stroke='#5c6e3b' stroke-width='1' opacity='0.6'/>
    <!-- right veins -->
    <path d='M14 9 C17 8 21 10 23 12' fill='none' stroke='#5c6e3b' stroke-width='0.8' opacity='0.45' stroke-linecap='round'/>
    <path d='M14 15 C18 14 22 17 24 19' fill='none' stroke='#5c6e3b' stroke-width='0.8' opacity='0.45' stroke-linecap='round'/>
    <path d='M14 21 C17 21 21 23 23 26' fill='none' stroke='#5c6e3b' stroke-width='0.8' opacity='0.45' stroke-linecap='round'/>
    <!-- left veins -->
    <path d='M14 9 C11 8 7 10 5 12' fill='none' stroke='#5c6e3b' stroke-width='0.8' opacity='0.45' stroke-linecap='round'/>
    <path d='M14 15 C10 14 6 17 4 19' fill='none' stroke='#5c6e3b' stroke-width='0.8' opacity='0.45' stroke-linecap='round'/>
    <path d='M14 21 C11 21 7 23 5 26' fill='none' stroke='#5c6e3b' stroke-width='0.8' opacity='0.45' stroke-linecap='round'/>
  </g>
</svg>`;
document.body.appendChild(leafCursor);

document.addEventListener('mousemove', (e) => {
  leafCursor.style.left = e.clientX + 'px';
  leafCursor.style.top = e.clientY + 'px';
});

// Squish leaf on click
document.addEventListener('mousedown', () => { leafCursor.classList.add('pressed'); });
document.addEventListener('mouseup', () => { leafCursor.classList.remove('pressed'); });

// Hide when mouse leaves window, show when it returns
document.addEventListener('mouseleave', () => { leafCursor.style.display = 'none'; });
document.addEventListener('mouseenter', () => { leafCursor.style.display = 'block'; });

// ---- Falling Leaf Cursor Trail ----
const leafColors = ['#8A9A5B', '#a3b57a', '#6b7f3f', '#b5c48b', '#7a9a4b'];
const leafSVGs = [
  `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='17' viewBox='0 0 28 34'><path d='M14 1C6 6 1 13 1 19C1 26 6 33 14 33C22 33 27 26 27 19C27 13 22 6 14 1Z' fill='COLOR' stroke='#5c6e3b' stroke-width='1' opacity='0.8'/><path d='M14 3L14 33' fill='none' stroke='#5c6e3b' stroke-width='0.7' opacity='0.4'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 28 34'><path d='M14 1C6 6 1 13 1 19C1 26 6 33 14 33C22 33 27 26 27 19C27 13 22 6 14 1Z' fill='COLOR' opacity='0.7'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='7' height='9' viewBox='0 0 28 34'><path d='M14 1C6 6 1 13 1 19C1 26 6 33 14 33C22 33 27 26 27 19C27 13 22 6 14 1Z' fill='COLOR' opacity='0.6'/></svg>`,
];

let lastLeafTime = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastLeafTime < 80) return; // throttle: one leaf every 80ms
  lastLeafTime = now;

  const leaf = document.createElement('div');
  leaf.classList.add('leaf-particle');

  const color = leafColors[Math.floor(Math.random() * leafColors.length)];
  const svg = leafSVGs[Math.floor(Math.random() * leafSVGs.length)].replace('COLOR', color);

  leaf.innerHTML = svg;

  const driftX = (Math.random() - 0.5) * 60;  // sway left/right
  const driftY = 40 + Math.random() * 80;       // fall down
  const spin = (Math.random() - 0.5) * 540;     // tumble
  const duration = 1 + Math.random() * 1;        // 1–2s

  leaf.style.left = e.clientX + 'px';
  leaf.style.top = e.clientY + 'px';
  leaf.style.setProperty('--drift-x', driftX + 'px');
  leaf.style.setProperty('--drift-y', driftY + 'px');
  leaf.style.setProperty('--spin', spin + 'deg');
  leaf.style.setProperty('--duration', duration + 's');

  document.body.appendChild(leaf);
  leaf.addEventListener('animationend', () => leaf.remove());
});


// ---- Hide leaf cursor over resume iframe ----
const resumeViewer = document.querySelector('.resume-viewer');

if (resumeViewer) {
  resumeViewer.addEventListener('mouseenter', () => {
    leafCursor.style.display = 'none';
  });

  resumeViewer.addEventListener('mouseleave', () => {
    leafCursor.style.display = 'block';
  });
}

// ---- Particle Bloom Welcome Screen ----
(function () {

  const welcome = document.getElementById('welcome');
  const canvas = document.getElementById('welcome-canvas');
  if (!welcome || !canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles
  const PARTICLE_COUNT = 80;
  const particles = [];
  const colors = ['#8A9A5B', '#a3b57a', '#C5B9AC', '#D8DCCF', '#b5c48b', '#7a9a4b'];
  let bloomed = false;
  let bloomOriginX = W / 2;
  let bloomOriginY = H / 2;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 3 + 1.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.3;
      this.driftX = (Math.random() - 0.5) * 0.3;
      this.driftY = (Math.random() - 0.5) * 0.3;
      this.bloomVX = 0;
      this.bloomVY = 0;
    }
    drift(f) {
      this.x = this.baseX + Math.sin(f * 0.01 + this.baseX) * 15 + this.driftX * f * 0.5;
      this.y = this.baseY + Math.cos(f * 0.012 + this.baseY) * 12 + this.driftY * f * 0.5;
      // Wrap around
      if (this.x < -10) this.x += W + 20;
      if (this.x > W + 10) this.x -= W + 20;
      if (this.y < -10) this.y += H + 20;
      if (this.y > H + 10) this.y -= H + 20;
    }
    bloom() {
      const angle = Math.atan2(this.y - bloomOriginY, this.x - bloomOriginX);
      const dist = Math.random() * 600 + 200;
      this.bloomVX = Math.cos(angle) * dist;
      this.bloomVY = Math.sin(angle) * dist;
    }
    updateBloom(progress) {
      // Ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      this.x = this.baseX + this.bloomVX * ease;
      this.y = this.baseY + this.bloomVY * ease;
      this.alpha = Math.max(0, (1 - progress) * 0.8);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction — particles gently repel from cursor
  let mouseX = -100, mouseY = -100;
  welcome.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let frame = 0;
  let bloomStart = 0;
  const BLOOM_DURATION = 1200; // ms

  function loop() {
    frame++;
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#FDFBF7';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (bloomed) {
      const elapsed = Date.now() - bloomStart;
      const progress = Math.min(elapsed / BLOOM_DURATION, 1);
      particles.forEach(p => {
        p.updateBloom(progress);
        p.draw();
      });

      if (progress >= 1) {
        welcome.classList.add('fade-out');
        setTimeout(() => { welcome.remove(); }, 800);
        return;
      }
    } else {
      particles.forEach(p => {
        p.drift(frame);

        // Gentle repel from mouse
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        p.draw();
      });

      // Draw subtle connecting lines between close particles
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.globalAlpha = (1 - dist / 80) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(loop);
  }

  // Click to bloom
  welcome.addEventListener('click', (e) => {
    if (bloomed) return;
    bloomed = true;
    bloomOriginX = e.clientX;
    bloomOriginY = e.clientY;
    bloomStart = Date.now();
    particles.forEach(p => {
      p.baseX = p.x;
      p.baseY = p.y;
      p.bloom();
    });
  });

  // Also support touch
  welcome.addEventListener('touchstart', (e) => {
    if (bloomed) return;
    const t = e.touches[0];
    bloomed = true;
    bloomOriginX = t.clientX;
    bloomOriginY = t.clientY;
    bloomStart = Date.now();
    particles.forEach(p => {
      p.baseX = p.x;
      p.baseY = p.y;
      p.bloom();
    });
  });

  loop();
})();

