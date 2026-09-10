document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const backTop = document.querySelector('.back-top');
  const sections = [...document.querySelectorAll('main section[id]')];
  const form = document.getElementById('contactForm');
  const formMessage = document.querySelector('.form-message');

  document.getElementById('year').textContent = new Date().getFullYear();

  const closeMenu = () => {
    nav.classList.remove('open');
    menuButton.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  const updateOnScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    backTop.classList.toggle('show', window.scrollY > 650);

    let current = 'domu';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach(link => {
      const target = link.getAttribute('href').slice(1);
      link.classList.toggle('active', target === current && !link.classList.contains('nav-cta'));
    });
  };

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  updateOnScroll();
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    formMessage.textContent = 'Ukázkový formulář funguje. Před ostrým spuštěním je potřeba připojit odesílací službu nebo vlastní backend.';
    formMessage.classList.add('show');
    form.reset();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
});
