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
      tags: ["React", "Node.js", "SQLite", "TailwindCSS"],
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

    whatsappCta.href = `https://wa.me/5492615790969?text=${encodeURIComponent(waText)}`;
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
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalCloseBtn");
  const privacyBtn = document.getElementById("openPrivacyModal");
  const termsBtn = document.getElementById("openTermsModal");

  if (!modal || !title || !body) return;

  const legalContent = {
    privacy: {
      title: "Políticas de Privacidad",
      body: `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">1. Responsabilidad y Compromiso</h4>
            <p>En <strong>Alfa Digital</strong> (Mendoza, Argentina), nos tomamos con máxima seriedad la protección de los datos personales y comerciales de nuestros clientes y visitantes, en estricto cumplimiento de la <strong>Ley N° 25.326 de Protección de Datos Personales</strong> de la República Argentina.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">2. Información que Recopilamos</h4>
            <p>Solo recopilamos los datos que nos proporcionas de forma voluntaria a través de nuestro formulario de contacto o enlace directo de WhatsApp (nombre, teléfono/WhatsApp, correo electrónico y detalles del proyecto). No recolectamos información sensible ni instalamos rastreadores invasivos de terceros.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">3. Finalidad del Uso de Datos</h4>
            <p>La información provista se utiliza exclusivamente para: (a) responder tus consultas comerciales en menos de 2 horas, (b) elaborar propuestas técnicas y presupuestos a medida, y (c) coordinar el desarrollo y entrega del software o sitio web contratado.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">4. Cero Venta o Cesión a Terceros</h4>
            <p>Alfa Digital <strong>no vende, no alquila, no transfiere ni comparte</strong> bajo ninguna circunstancia datos de clientes con agencias de publicidad, bases de datos de telemarketing ni plataformas externas.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">5. Seguridad y Confidencialidad</h4>
            <p>Implementamos estándares modernos de seguridad, cifrado SSL/HTTPS en tránsito y almacenamiento seguro con acceso restringido únicamente a los fundadores técnicos (Facundo Rodriguez y Alma Ponce).</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">6. Derechos de Acceso y Supresión</h4>
            <p>Tienes derecho en cualquier momento a solicitar el acceso, rectificación, actualización o eliminación definitiva de tus datos de contacto escribiéndonos a <a href="mailto:alfa.digital.arg@gmail.com" style="color: var(--accent-core); text-decoration: underline;">alfa.digital.arg@gmail.com</a> o por WhatsApp al <strong>+54 9 2615 79-0969</strong>.</p>
          </div>
        </div>
      `,
    },
    terms: {
      title: "Términos del Servicio",
      body: `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">1. Alcance del Servicio y Propuesta Técnica</h4>
            <p>Todo proyecto de desarrollo web o software a medida se inicia tras acordar un alcance detallado (funcionalidades, secciones, módulos adicionales y plazos de entrega estimados) acordado entre el cliente y Alfa Digital.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">2. Esquema de Pago Transparente (50% / 50%)</h4>
            <p>Trabajamos con un esquema de <strong>50% de anticipo</strong> para reservar calendario e iniciar el diseño y desarrollo en código, y el <strong>50% restante únicamente contra entrega final</strong> y aprobación en servidor de pruebas. Aceptamos transferencia bancaria en pesos (ARS) o dólares (USD), MercadoPago y USDT/Crypto.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">3. Propiedad Intelectual Total (100% Tuya)</h4>
            <p>Al cancelar el saldo final del proyecto, <strong>el cliente adquiere el 100% de los derechos de propiedad</strong> sobre el código fuente, archivos de diseño, accesos al repositorio, dominio propio y credenciales del servidor. Alfa Digital no aplica licencias cautivas ("vendor lock-in") ni cobra comisiones recurrentes obligatorias.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">4. Garantía Técnica Post-Lanzamiento (30 Días)</h4>
            <p>Todos nuestros proyectos incluyen <strong>30 días corridos de garantía técnica sin cargo</strong> posterior al lanzamiento para solucionar cualquier bug, error de carga o ajuste menor sin costo adicional.</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">5. Tiempos de Entrega</h4>
            <p>Los plazos estimados (Landing Pages: 3 a 5 días; Sitios Corporativos: 7 a 10 días; E-Commerce/Sistemas: 2 a 3 semanas) comienzan a computarse a partir de la recepción del anticipo y el material inicial provisto por el cliente (logos, textos o fotos base).</p>
          </div>

          <div>
            <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.35rem;">6. Confidencialidad Absoluta</h4>
            <p>Alfa Digital mantiene estricta reserva profesional sobre las ideas de negocio, bases de datos de clientes, productos y estrategias comerciales compartidas durante el proyecto.</p>
          </div>
        </div>
      `,
    },
  };

  function openModal(type) {
    const data = legalContent[type] || legalContent.terms;
    title.textContent = data.title;
    body.innerHTML = data.body;
    modal.classList.add("open");
    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");
  }

  function closeModal() {
    modal.classList.remove("open");
    document.documentElement.classList.remove("scroll-locked");
    document.body.classList.remove("scroll-locked");
  }

  if (privacyBtn) {
    privacyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("privacy");
    });
  }

  if (termsBtn) {
    termsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("terms");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}
