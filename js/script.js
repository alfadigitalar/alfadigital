// --- Menú Móvil ---
const btn = document.getElementById("mobile-menu-btn"),
  menu = document.getElementById("mobile-menu");
btn.addEventListener("click", () => menu.classList.toggle("hidden"));
// --- Función de Aparición al Scroll (Reveal) ---
function reveal() {
  var e = document.querySelectorAll(".reveal");
  for (var t = 0; t < e.length; t++) {
    var n = window.innerHeight;
    e[t].getBoundingClientRect().top < n - 100 && e[t].classList.add("active");
  }
}
window.addEventListener("scroll", reveal), reveal();
// --- Lógica del Acordeón ---
function toggleAccordion(e) {
  const t = e.parentElement,
    n = t.classList.contains("is-open");
  document.querySelectorAll(".accordion-item").forEach((e) => {
    e.classList.remove("is-open");
  }),
    n || t.classList.add("is-open");
}
let counterStarted = !1;
// --- Animación de Contadores Estadísticos ---
const statsSection = document.getElementById("metodologia");
function animateValue(e, t, n, a) {
  let o = null;
  const r = (i) => {
    o || (o = i);
    const c = Math.min((i - o) / a, 1);
    (e.innerHTML = Math.floor(c * (n - t) + t) + (n > 50 ? "%" : "+")),
      c < 1 && window.requestAnimationFrame(r);
  };
  window.requestAnimationFrame(r);
}
window.addEventListener("scroll", () => {
  window.scrollY + window.innerHeight > statsSection.offsetTop &&
    !counterStarted &&
    ((counterStarted = !0),
    document.querySelectorAll(".counter").forEach((e) => {
      const t = +e.getAttribute("data-target");
      animateValue(e, 0, t, 2e3);
    }));
});
// --- Filtrado de Proyectos ---
function filterProjects(e) {
  const t = document.querySelectorAll(".project-card"),
    n = document.querySelectorAll(".filter-btn");
  n.forEach((t) => {
    t.classList.remove("bg-white", "text-alfa-dark", "ring-2", "ring-white"),
      t.classList.add("border", "text-slate-300"),
      t.innerText.toLowerCase().includes("all" === e ? "todos" : e) &&
        (t.classList.remove("border", "text-slate-300"),
        t.classList.add("bg-white", "text-alfa-dark", "ring-2", "ring-white"));
  }),
    t.forEach((t) => {
      "all" === e || t.dataset.category === e
        ? (t.parentElement.classList.remove("hidden"),
          (t.style.display = "block"),
          (t.style.animation = "none"),
          t.offsetHeight,
          (t.style.animation = "fadeInUp 0.5s ease-out forwards"))
        : (t.style.display = "none");
    });
}
// --- Manejo del Formulario de Contacto ---
function handleContact(e) {
  e.preventDefault();
  const t = e.target,
    n = document.getElementById("success-msg"),
    a = t.querySelector("button"),
    o = a.innerHTML;
  (a.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'),
    (a.disabled = !0);
  const r = new FormData(t);
  fetch("https://formsubmit.co/ajax/alfa.digital.arg@gmail.com", {
    method: "POST",
    body: r,
  })
    .then((e) => e.json())
    .then((e) => {
      n.classList.remove("hidden"), t.reset();
    })
    .catch((e) => {
      console.error("Error:", e),
        alert(
          "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
        );
    })
    .finally(() => {
      (a.innerHTML = o), (a.disabled = !1);
    });
}
function resetForm() {
  document.getElementById("success-msg").classList.add("hidden");
}
// --- Inicialización al Cargar el DOM ---
document.addEventListener("DOMContentLoaded", () => {
  // Configuración del Gráfico de ROI
  new Chart(e, {
    type: "line",
    data: {
      labels: [
        "Idea",
        "Estrategia",
        "Diseño",
        "Desarrollo",
        "Lanzamiento",
        "Escalado",
      ],
      datasets: [
        {
          label: "Impacto Digital",
          data: [15, 35, 55, 75, 95, 100],
          borderColor: "#1E293B",
          backgroundColor: (e) => {
            const t = e.chart.ctx.createLinearGradient(0, 0, 0, 300);
            return (
              t.addColorStop(0, "rgba(30, 41, 59, 0.2)"),
              t.addColorStop(1, "rgba(30, 41, 59, 0)"),
              t
            );
          },
          borderWidth: 3,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: "#FF6B6B",
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: { legend: { display: !0, position: "bottom" } },
      scales: {
        y: {
          grid: { display: !0, color: "#f1f5f9" },
          beginAtZero: !0,
          max: 100,
          ticks: {
            callback: function (e) {
              return e + "%";
            },
          },
        },
        x: { grid: { display: !1 } },
      },
    },
  });
  // --- Modal Legal ---
  const t = document.getElementById("legalModal"),
    n = document.getElementById("legalBackdrop"),
    a = document.getElementById("legalContent"),
    o = document.getElementById("legalTitle"),
    r = document.getElementById("legalBody"),
    i = {
      terms: {
        title: "Términos de Servicio",
        content:
          '<p>Bienvenido a Alfa Digital. Al utilizar nuestros servicios, aceptas los siguientes términos básicos:</p><ul class="list-disc pl-5 space-y-2"><li><strong>Servicios:</strong> Proveemos desarrollo web y diseño digital bajo contrato.</li><li><strong>Pagos:</strong> Se requiere un 50% de anticipo para comenzar cualquier proyecto.</li><li><strong>Propiedad:</strong> El cliente retiene el 100% de los derechos sobre el código entregado tras el pago final.</li><li><strong>Garantía:</strong> Ofrecemos 30 días de corrección de errores post-lanzamiento.</li></ul>',
      },
      privacy: {
        title: "Política de Privacidad",
        content:
          '<p>En Alfa Digital, nos tomamos tu privacidad en serio.</p><ul class="list-disc pl-5 space-y-2"><li><strong>Datos:</strong> Solo recopilamos los datos necesarios para el contacto y facturación.</li><li><strong>No Compartir:</strong> Nunca vendemos ni compartimos tu información con terceros.</li><li><strong>Seguridad:</strong> Utilizamos estándares de encriptación modernos para proteger tus datos.</li></ul>',
      },
      cookies: {
        title: "Uso de Cookies",
        content:
          '<p>Utilizamos cookies esenciales para el funcionamiento del sitio:</p><ul class="list-disc pl-5 space-y-2"><li><strong>Analíticas:</strong> Para entender cómo interactúas con nuestra web y mejorarla.</li><li><strong>Preferencias:</strong> Para recordar tu idioma o configuración.</li></ul><p class="text-sm mt-4">Puedes desactivarlas en la configuración de tu navegador en cualquier momento.</p>',
      },
      report: {
        title: "Reportar Problema",
        content:
          '<p>¿Encontraste un error en nuestra web o en un proyecto?</p><p>Por favor, envíanos un correo directamente a <strong class="text-alfa-coral">soporte@alfadigital.com</strong> con:</p><ul class="list-disc pl-5 space-y-2"><li>Captura de pantalla del error.</li><li>Descripción breve de lo sucedido.</li><li>Dispositivo y navegador que usabas.</li></ul><p class="mt-4">Te responderemos en menos de 24 horas.</p>',
      },
    };
  (window.openLegal = function (e) {
    const c = i[e];
    c &&
      ((o.innerText = c.title),
      (r.innerHTML = c.content),
      t.classList.remove("hidden"),
      setTimeout(() => {
        n.classList.remove("opacity-0"),
          a.classList.remove("scale-95", "opacity-0");
      }, 10));
  }),
    (window.closeLegal = function () {
      n.classList.add("opacity-0"),
        a.classList.add("scale-95", "opacity-0"),
        setTimeout(() => {
          t.classList.add("hidden");
        }, 300);
    }),
    t.addEventListener("click", (e) => {
      (e.target !== n && "legalModal" !== e.target.id) || closeLegal();
    });
  // --- Animación del Canvas (Hero) ---
  const c = document.getElementById("heroCanvas"),
    l = c.getContext("2d"),
    s = document.getElementById("hero");
  let d,
    u,
    g = [];
  let m = { x: null, y: null, radius: 250 };
  window.addEventListener("mousemove", (e) => {
    const t = c.getBoundingClientRect();
    (m.x = e.clientX - t.left), (m.y = e.clientY - t.top);
  }),
    window.addEventListener("mouseout", () => {
      (m.x = null), (m.y = null);
    });
  function p() {
    (d = c.width = s.offsetWidth), (u = c.height = s.offsetHeight);
  }
  // Clase Partícula
  class f {
    constructor() {
      (this.x = Math.random() * d),
        (this.y = Math.random() * u),
        (this.baseSize = 2 * Math.random() + 1),
        (this.size = this.baseSize),
        (this.speedX = 0.4 * Math.random() - 0.2),
        (this.speedY = 0.4 * Math.random() - 0.2),
        (this.baseColor = "rgba(148, 163, 184, 0.6)"),
        (this.activeColor = "rgba(255, 107, 107, 1)"),
        (this.r = 148),
        (this.g = 163),
        (this.b = 184),
        (this.a = 0.9);
    }
    draw() {
      (l.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`),
        l.beginPath(),
        l.arc(this.x, this.y, this.size, 0, 2 * Math.PI),
        l.fill();
    }
    update() {
      if (
        ((this.x += this.speedX),
        (this.y += this.speedY),
        (this.x < 0 || this.x > d) && (this.speedX = -this.speedX),
        (this.y < 0 || this.y > u) && (this.speedY = -this.speedY),
        null != m.x)
      ) {
        let e = m.x - this.x,
          t = m.y - this.y;
        if (Math.sqrt(e * e + t * t) < m.radius) {
          let e =
            1 -
            Math.sqrt(Math.pow(m.x - this.x, 2) + Math.pow(m.y - this.y, 2)) /
              m.radius;
          (this.size = this.baseSize + 6 * e),
            (this.r = 148 + 107 * e),
            (this.g = 163 - 56 * e),
            (this.b = 184 - 77 * e),
            (this.a = 0.6 + 0.4 * e);
        } else
          (this.size = this.baseSize),
            (this.r = 148),
            (this.g = 163),
            (this.b = 184),
            (this.a = 0.6);
      } else
        (this.size = this.baseSize),
          (this.r = 148),
          (this.g = 163),
          (this.b = 184),
          (this.a = 0.6);
    }
  }
  function h() {
    g = [];
    let e = (d * u) / 1e4;
    for (let t = 0; t < e; t++) g.push(new f());
  }
  function b() {
    l.clearRect(0, 0, d, u);
    for (let e = 0; e < g.length; e++) {
      g[e].update(), g[e].draw();
      for (let t = e; t < g.length; t++) {
        let n = g[e].x - g[t].x,
          a = g[e].y - g[t].y;
        if (Math.sqrt(n * n + a * a) < 120) {
          l.beginPath();
          let o =
            1 -
            Math.sqrt(
              Math.pow(g[e].x - g[t].x, 2) + Math.pow(g[e].y - g[t].y, 2)
            ) /
              120;
          g[e].r > 200 && g[t].r > 200
            ? (l.strokeStyle = `rgba(255, 107, 107, ${1 * o})`)
            : (l.strokeStyle = `rgba(148, 163, 184, ${0.4 * o})`),
            (l.lineWidth = 0.6),
            l.moveTo(g[e].x, g[e].y),
            l.lineTo(g[t].x, g[t].y),
            l.stroke();
        }
      }
    }
    requestAnimationFrame(b);
  }
  window.addEventListener("resize", () => {
    p(), h();
  }),
    p(),
    h(),
    b();
  // --- Efecto Tilt 3D para tarjeta ---
  const y = document.getElementById("tiltCard");
  y &&
    (y.addEventListener("mousemove", (e) => {
      const t = y.getBoundingClientRect(),
        n = e.clientX - t.left,
        a = e.clientY - t.top,
        o = ((a - t.height / 2) / (t.height / 2)) * -5,
        r = ((n - t.width / 2) / (t.width / 2)) * 5;
      y.style.transform = `perspective(1000px) rotateX(${o}deg) rotateY(${r}deg) scale3d(1.02, 1.02, 1.02)`;
    }),
    y.addEventListener("mouseleave", () => {
      y.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }));
});
