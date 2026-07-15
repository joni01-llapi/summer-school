// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ── Helper: show feedback on button ──
function flashBtn(btn, label, bgColor, success = true) {
  const original = btn.textContent;
  const origBg = btn.style.background;
  btn.textContent = label;
  btn.style.background = bgColor;
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = origBg;
    btn.disabled = false;
  }, 2800);
}

// ── Contact form → API ──
document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const fd = new FormData(e.target);

    try {
      await submitContact({
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        track_interest: fd.get('track_interest'),
        message: fd.get('message')
      });
      e.target.reset();
      flashBtn(btn, '✓ Sent!', '#2563eb');
    } catch (err) {
      flashBtn(btn, '✗ ' + err.message, '#dc2626');
    }
});

// ── Register buttons (on pricing cards) ──
document.querySelectorAll('.btn-block').forEach(btn => {
  btn.addEventListener('click', async e => {
    const card = btn.closest('.offer-card');
    if (!card) return;

    e.preventDefault();
    const plan = card.querySelector('h3')?.textContent || 'Core';
    const name = prompt('Your full name:');
    if (!name) return;
    const email = prompt('Your email:');
    if (!email) return;
    const track = prompt('Preferred track (or leave blank):') || 'Not sure yet!';

    try {
      await submitRegistration({
        full_name: name,
        email: email,
        offer_plan: plan,
        track: track
      });
      flashBtn(btn, '✓ Registered!', '#16a34a');
    } catch (err) {
      flashBtn(btn, '✗ ' + err.message, '#dc2626');
    }
  });
});

// ── Newsletter subscribe ──
const subForm = document.getElementById('subscribe-form');
if (subForm) {
  subForm.addEventListener('submit', async e => {
    e.preventDefault();
    const input = subForm.querySelector('input');
    const btn = subForm.querySelector('button');
    const email = input.value.trim();
    if (!email) return;

    try {
      await subscribeNewsletter(email);
      input.value = '';
      flashBtn(btn, '✓ Subscribed!', '#16a34a');
    } catch (err) {
      flashBtn(btn, '✗ ' + err.message, '#dc2626');
    }
  });
}

// ── Animated counters ──
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    document.querySelectorAll('.stat-num').forEach(el => {
        const target = +el.dataset.target;
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    });
}

// ── Scroll-triggered animations ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.closest('.stats-ribbon')) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .timeline-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
});

const statsRibbon = document.querySelector('.stats-ribbon');
if (statsRibbon) {
    statsRibbon.style.opacity = '0';
    statsRibbon.style.transform = 'translateY(24px)';
    statsRibbon.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(statsRibbon);
}
