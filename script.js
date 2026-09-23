// ===== Navbar au scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Menu mobile =====
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('menu-open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

// ===== Reveal au scroll =====
const revealTargets = document.querySelectorAll('.feature, .card, .why, .gcard, .timeline li, .stat');
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => io.observe(el));

// ===== Filtres réalisations =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('#gallery .gcard');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ===== Compteurs animés (chiffres clés) =====
// Modifiez les valeurs via l'attribut data-target de chaque .stat-num dans index.html
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10) || 0;
    const prefix = el.textContent.trim().startsWith('+') ? '+' : '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = prefix + current;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => counterIO.observe(el));

// ===== Formulaire de contact =====
// Prêt pour Google Sheets via Google Apps Script :
// remplacez FORM_ENDPOINT par l'URL de votre déploiement Web App.
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwVj37Ecd1Ga1XDbph2LAw33ymxOeoU-MlLU6SzmWH7RwsmHncquIKfBNcFRvtMX3bS0g/exec';

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  feedback.textContent = '';
  feedback.className = 'form-feedback';

  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const empty = !field.value.trim();
    field.classList.toggle('invalid', empty);
    if (empty) valid = false;
  });

  if (!valid) {
    feedback.textContent = 'Merci de remplir tous les champs obligatoires.';
    feedback.classList.add('error');
    return;
  }

  if (!FORM_ENDPOINT) {
    feedback.textContent = 'Formulaire non connecté : ajoutez votre URL Google Apps Script (FORM_ENDPOINT) dans js/script.js.';
    feedback.classList.add('error');
    return;
  }

  fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form) })
    .then(() => {
      feedback.textContent = 'Votre message a bien été envoyé.';
      feedback.classList.add('success');
      form.reset();
    })
    .catch(() => {
      feedback.textContent = "Une erreur est survenue lors de l'envoi.";
      feedback.classList.add('error');
    });
});
