/* =========================================================
   NAVALHA BARBEARIA — script.js
   Funcionalidades:
   1. Menu mobile (abrir/fechar hambúrguer)
   2. Smooth scroll ao clicar em links do menu
   3. Header ganha fundo sólido ao rolar a página
   4. Fade-in dos elementos ao entrarem na tela (IntersectionObserver)
   5. Ano atual automático no rodapé
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. MENU MOBILE (hambúrguer)
     --------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navBackdrop = document.getElementById("navBackdrop");
  const navLinks = document.querySelectorAll(".nav__link");

  function openMenu() {
    nav.classList.add("nav--open");
    navBackdrop.classList.add("is-active");
    hamburger.classList.add("is-active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // trava o scroll do fundo com o menu aberto
  }

  function closeMenu() {
    nav.classList.remove("nav--open");
    navBackdrop.classList.remove("is-active");
    hamburger.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.contains("nav--open");
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha o menu ao clicar no fundo escurecido
  navBackdrop.addEventListener("click", closeMenu);

  // Fecha o menu ao clicar em qualquer link de navegação
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Fecha o menu com a tecla Esc (acessibilidade)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------------------------------------------------------
     2. SMOOTH SCROLL para os links internos (#âncoras)
     Compensa a altura do header fixo para a seção não ficar
     escondida atrás dele.
     --------------------------------------------------------- */
  const header = document.getElementById("header");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ---------------------------------------------------------
     3. HEADER SÓLIDO AO ROLAR
     --------------------------------------------------------- */
  function updateHeaderOnScroll() {
    if (window.scrollY > 40) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  updateHeaderOnScroll(); // roda uma vez ao carregar
  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

  /* ---------------------------------------------------------
     4. FADE-IN AO ROLAR A PÁGINA
     Observa todos os elementos .fade-in e adiciona .is-visible
     quando entram no viewport, sem recalcular scroll a cada frame.
     --------------------------------------------------------- */
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  fadeElements.forEach((el) => observer.observe(el));

  /* ---------------------------------------------------------
     5. ANO ATUAL NO RODAPÉ
     --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});