/**
 * ALFA DIGITAL — Studio Interaction Engine
 * Ultra-Fluid 120 FPS Architecture (No layout thrashing, 0 scroll lag)
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initNavbar();
  initMobileMenu();
  initHeroProjectSwitcher();
  initProjectFilter();
  initCalculator();
  initFaqAccordion();
  initContactForm();
  initLegalModal();
});

/* ============================================================
   0. HERO INTERACTIVE PROJECT PREVIEW SWITCHER
   ============================================================ */
function initHeroProjectSwitcher() {
  const tabs = document.querySelectorAll(".preview-tab");
  const imgEl = document.getElementById("heroPreviewImg");
  const titleEl = document.getElementById("heroPreviewTitle");
  const descEl = document.getElementById("heroPreviewDesc");
  const pathEl = document.getElementById("heroPreviewPath");
  const tagsEl = document.getElementById("heroPreviewTags");

  if (!tabs.length || !imgEl || !titleEl || !descEl || !pathEl) return;

  const projectData = {
    utnhub: {
      path: "alfadigital.studio/utn-hub",
      img: "img/utnhub.png",
      alt: "UTN Hub Preview",
      title: "UTN Hub — Plataforma Universitaria",
      desc: "Portal académico integral desarrollado para la comunidad de ingeniería de la UTN Mendoza, con miles de visitas mensuales.",
      tags: ["React", "Next.js", "Cloudflare", "TailwindCSS"],
    },
    kubo: {
      path: "alfadigital.studio/kubo-pos",
      img: "img/kubo.webp",
      alt: "Kubo POS Preview",
      title: "Kubo POS — Sistema de Punto de Venta",
      desc: "Software comercial y gastronómico para control de pedidos, comandas, mesas y facturación en tiempo real con 0 latencia.",
      tags: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    },
    mila: {
      path: "alfadigital.studio/mila-crush",
      img: "img/mila-crush-preview.webp",
      alt: "Mila Crush Preview",
      title: "Mila Crush — Catálogo & Pedidos Online",
      desc: "Experiencia web gastronómica de alta conversión con sincronización directa de pedidos a WhatsApp y carga ultra-rápida.",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "WhatsApp API"],
    },
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.getAttribute("data-preview");
      const data = projectData[key];
      if (!data) return;

      imgEl.style.opacity = "0.3";
      imgEl.style.transition = "opacity 0.18s ease";
      setTimeout(() => {
        imgEl.src = data.img;
        imgEl.alt = data.alt;
        pathEl.textContent = data.path;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        if (tagsEl) {
          tagsEl.innerHTML = data.tags
            .map((t) => `<span class="tag-badge">${t}</span>`)
            .join("");
        }
        imgEl.style.opacity = "1";
      }, 150);
    });
  });
}

/* ============================================================
   1. NATIVE INTERSECTION OBSERVER (Replaces expensive scroll loops)
   ============================================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("active"));
  }
}

/* ============================================================
   2. NAVBAR SCROLL STATE
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ============================================================
   3. MOBILE NAVIGATION MENU
   ============================================================ */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const panel = document.getElementById("mobileMenuPanel");
  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
    const isOpen = panel.classList.contains("open");
    toggleBtn.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("open");
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* ============================================================
   4. PROJECT BENTO FILTER
   ============================================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".bento-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translate3d(0, 0, 0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translate3d(0, 10px, 0)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ============================================================
   5. INTERACTIVE PROJECT SCOPE & BUDGET CALCULATOR
   ============================================================ */
function initCalculator() {
  const pillOptions = document.querySelectorAll(".calc-pill");
  const addonCheckboxes = document.querySelectorAll(".calc-checkbox-item");
  const priceDisplay = document.getElementById("calcPriceDisplay");
  const timelineDisplay = document.getElementById("calcTimelineDisplay");
  const breakdownList = document.getElementById("calcBreakdownList");
  const whatsappCta = document.getElementById("calcWhatsappBtn");

  if (!priceDisplay || !timelineDisplay || !whatsappCta) return;

  const projectTypes = {
    landing: {
      name: "Landing Page Ágil",
      baseUSD: 85,
      timeline: "3 a 5 días hábiles",
    },
    corporativo: {
      name: "Sitio Corporativo Full",
      baseUSD: 160,
      timeline: "7 a 10 días hábiles",
    },
    ecommerce: {
      name: "E-Commerce / Catálogo",
      baseUSD: 240,
      timeline: "2 a 3 semanas",
    },
    sistema: {
      name: "Sistema Web / SAAS",
      baseUSD: 320,
      timeline: "3 a 4 semanas",
    },
    invitacion: {
      name: "Invitación Web Interactiva",
      baseUSD: 45,
      timeline: "48 a 72 hs hábiles",
    },
  };

  const addonsData = {
    admin: { name: "Panel Admin Custom (CMS)", usd: 60 },
    pagos: { name: "Pasarela de Pagos (MercadoPago/Stripe)", usd: 40 },
    seo: { name: "SEO Avanzado & Analytics", usd: 25 },
    hosting: { name: "Hosting + Dominio 1 Año", usd: 35 },
  };

  let selectedType = "landing";
  let activeAddons = new Set();

  pillOptions.forEach((pill) => {
    pill.addEventListener("click", () => {
      pillOptions.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      selectedType = pill.getAttribute("data-type");
      updateCalculator();
    });
  });

  addonCheckboxes.forEach((item) => {
    item.addEventListener("click", () => {
      const addonKey = item.getAttribute("data-addon");
      if (activeAddons.has(addonKey)) {
        activeAddons.delete(addonKey);
        item.classList.remove("checked");
      } else {
        activeAddons.add(addonKey);
        item.classList.add("checked");
      }
      updateCalculator();
    });
  });

  function updateCalculator() {
    const typeInfo = projectTypes[selectedType] || projectTypes.landing;
    let total = typeInfo.baseUSD;
    let itemsHTML = `
      <div class="calc-breakdown-item">
        <span>${typeInfo.name}</span>
        <strong>USD $${typeInfo.baseUSD}</strong>
      </div>
    `;

    let messageAddons = [];

    activeAddons.forEach((key) => {
      const addon = addonsData[key];
      if (addon) {
        total += addon.usd;
        itemsHTML += `
          <div class="calc-breakdown-item">
            <span>+ ${addon.name}</span>
            <span>USD $${addon.usd}</span>
          </div>
        `;
        messageAddons.push(addon.name);
      }
    });

    priceDisplay.textContent = `~ USD $${total}`;
    timelineDisplay.innerHTML = `<i class="fas fa-clock"></i> Entrega estimada: ${typeInfo.timeline}`;
    if (breakdownList) {
      breakdownList.innerHTML = itemsHTML;
    }

    // Build pre-populated WhatsApp message
    let waText = `¡Hola Alfa Digital! Estuve usando el cotizador de su web y me interesa el siguiente proyecto:\n\n`;
    waText += `📌 *Tipo de Proyecto:* ${typeInfo.name}\n`;
    if (messageAddons.length > 0) {
      waText += `➕ *Adicionales:* ${messageAddons.join(", ")}\n`;
    }
    waText += `⏱ *Plazo aproximado:* ${typeInfo.timeline}\n`;
    waText += `💰 *Presupuesto base estimado:* USD $${total}\n\n`;
    waText += `¿Podríamos coordinar una breve llamada o chat para hablar de los detalles?`;

    whatsappCta.href = `https://wa.me/5492614994711?text=${encodeURIComponent(waText)}`;
  }

  // Initial calculation
  updateCalculator();
}

/* ============================================================
   6. FAQ ACCORDION
   ============================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question-btn");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Optional: close other open items for a clean single-open feel
      faqItems.forEach((other) => other.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

/* ============================================================
   7. CONTACT FORM SUBMISSION HANDLER
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedbackMsg");
  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/alfa.digital.arg@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        feedback.classList.add("show");
        feedback.innerHTML =
          '<i class="fas fa-check-circle"></i> ¡Mensaje recibido con éxito! Te responderemos en menos de 24 horas.';
        form.reset();
      })
      .catch((err) => {
        console.error("Form error:", err);
        feedback.classList.add("show");
        feedback.style.borderColor = "#ef4444";
        feedback.style.color = "#ef4444";
        feedback.style.background = "rgba(239, 68, 68, 0.1)";
        feedback.innerHTML =
          '<i class="fas fa-exclamation-circle"></i> Ocurrió un error al enviar. Por favor contáctanos directamente vía WhatsApp.';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
}

/* ============================================================
   8. LEGAL & PRIVACY MODAL SYSTEM
   ============================================================ */
function initLegalModal() {
  const modal = document.getElementById("legalModal");
  const title = document.getElementById("legalModalTitle");
  const body = document.getElementById("legalModalBody");
  const closeBtn = document.getElementById("legalModalClose");
  const confirmBtn = document.getElementById("legalModalConfirm");

  if (!modal || !title || !body) return;

  const legalContent = {
    terms: {
      title: "Términos del Servicio",
      body: `
        <p><strong>1. Propuesta y Alcance:</strong> Cada proyecto se ejecuta bajo especificaciones técnicas acordadas formalmente en la propuesta de trabajo previa al inicio.</p>
        <p><strong>2. Propiedad Intelectual:</strong> Tras la liquidación final del proyecto, el cliente retiene el 100% de los derechos de propiedad intelectual del código fuente, diseño y activos desarrollados.</p>
        <p><strong>3. Garantía y Mantenimiento:</strong> Incluimos un período de garantía post-lanzamiento de 30 días corridos para corrección de incidencias o bugs sin costo adicional.</p>
        <p><strong>4. Confidencialidad:</strong> Nos comprometemos a mantener bajo estricta confidencialidad toda la información estratégica y datos provistos por el cliente.</p>
      `,
    },
    privacy: {
      title: "Política de Privacidad",
      body: `
        <p><strong>1. Uso de Datos:</strong> Los datos de contacto provistos a través de nuestro formulario o canal de WhatsApp se utilizan exclusivamente para responder consultas y elaborar propuestas comerciales.</p>
        <p><strong>2. No Tercerización:</strong> Alfa Digital no vende, comparte ni cede información personal ni corporativa a terceras partes bajo ninguna circunstancia.</p>
        <p><strong>3. Seguridad:</strong> Implementamos estándares modernos de seguridad y encriptación en todos los sistemas y despliegues web que administramos.</p>
      `,
    },
    cookies: {
      title: "Política de Cookies",
      body: `
        <p>Este sitio web utiliza exclusivamente cookies técnicas esenciales y métricas anónimas de rendimiento para asegurar una navegación rápida, fluida y sin interrupciones.</p>
        <p>Puedes gestionar o bloquear cookies en cualquier momento desde las preferencias de tu navegador web sin afectar la funcionalidad básica del sitio.</p>
      `,
    },
  };

  window.openLegalModal = function (type) {
    const data = legalContent[type] || legalContent.terms;
    title.textContent = data.title;
    body.innerHTML = data.body;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeLegalModal = function () {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLegalModal);
  if (confirmBtn) confirmBtn.addEventListener("click", closeLegalModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeLegalModal();
    }
  });
}
