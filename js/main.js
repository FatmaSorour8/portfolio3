let portfolioData = null,
  currentProjectsPage = 1,
  typewriterTimer = null;
const fallbackData = {
  site: {
    logoText: "Farouk.Data",
    pageTitle: "Farouk Seliem | Data Analyst Portfolio",
    metaDescription: "Data Analyst portfolio.",
    keywords: "Data Analyst, Power BI, SQL, Python",
    author: "Farouk Hamed Seliem",
    canonicalUrl: "",
    ogImage: "assets/profile.png",
  },
  personal: {
    name: "Farouk Seliem",
    fullName: "Farouk Hamed Seliem",
    typewriterText: "Farouk Seliem...",
    title: "Data Analyst",
    badge: "Translating complex data into strategy",
    heroHeadline: "I turn raw data into insights, dashboards, and decisions.",
    heroDescription:
      "Versatile Data Analyst leveraging SQL, Python, Excel, and Power BI.",
    profileImage: "assets/profile.png",
    cvFile: "assets/Farouk_Seliem_CV.pdf",
    aboutSubtitle: "About me",
    aboutTitle: "The Intersection of Data & Business",
    aboutDescription: [
      "I transform raw data into clear insights and dashboards.",
    ],
  },
  contactInfo: {
    address: "Cairo, Egypt",
    email: "faroukseliem123@gmail.com",
    phone: "+20 112 534 9216",
    availability: "Available for Data Analysis & BI Projects",
    contactIntro: "Let's turn your data into decisions.",
  },
  socialLinks: [],
  stats: [],
  experiences: [],
  skills: {},
  education: [],
  courses: [],
  projectsSettings: { itemsPerPage: 3 },
  projects: [],
};
document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initTheme();
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  loadPortfolioData();
});
async function loadPortfolioData() {
  try {
    const e = await fetch("data/portfolio.json", { cache: "no-store" });
    if (!e.ok) throw new Error("Could not load data/portfolio.json");
    portfolioData = await e.json();
  } catch (e) {
    console.warn("Using fallback portfolio data:", e);
    portfolioData = fallbackData;
  }
  renderPortfolio();
}
function initAOS() {
  window.AOS &&
    AOS.init({ once: !0, offset: 60, duration: 800, easing: "ease-out-cubic" });
}
function initTheme() {
  const e = document.getElementById("themeBtn"),
    t = document.getElementById("themeIcon"),
    o = document.documentElement;
  function n(e) {
    t &&
      (t.className = "dark" === e ? "bi bi-moon-stars-fill" : "bi bi-sun-fill");
  }
  (n(o.getAttribute("data-theme")),
    e?.addEventListener("click", () => {
      const e = o.getAttribute("data-theme") || "dark",
        t = "dark" === e ? "light" : "dark";
      (o.setAttribute("data-theme", t),
        localStorage.setItem("portfolio-theme", t),
        n(t));
    }));
}
function initMobileMenu() {
  const menu = document.getElementById("navbarNav");
  const backdrop = document.getElementById("mobileMenuBackdrop");
  const closeBtn = document.getElementById("mobileMenuClose");

  if (!menu || !window.bootstrap) return;

  const collapse = bootstrap.Collapse.getOrCreateInstance(menu, {
    toggle: false,
  });

  const openMenu = () => {
    document.body.classList.add("mobile-menu-open");
    backdrop?.classList.add("show");
  };

  const closeMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    backdrop?.classList.remove("show");
  };

  menu.addEventListener("show.bs.collapse", openMenu);
  menu.addEventListener("shown.bs.collapse", openMenu);
  menu.addEventListener("hide.bs.collapse", closeMenu);
  menu.addEventListener("hidden.bs.collapse", closeMenu);

  backdrop?.addEventListener("click", () => collapse.hide());
  closeBtn?.addEventListener("click", () => collapse.hide());

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      collapse.hide();
      closeMenu();
    }
  });
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((e) => {
    e.addEventListener("click", function (e) {
      const t = this.getAttribute("href");
      if (!t || "#" === t) return;
      const o = document.querySelector(t);
      o &&
        (e.preventDefault(),
        o.scrollIntoView({ behavior: "smooth", block: "start" }),
        document.querySelector(".navbar-collapse.show") &&
          window.bootstrap &&
          bootstrap.Collapse.getOrCreateInstance(
            document.querySelector(".navbar-collapse.show"),
          ).hide());
    });
  });
}
function initBackToTop() {
  const e = document.getElementById("backToTop");
  e &&
    (window.addEventListener("scroll", () => {
      e.classList.toggle("show", window.scrollY > 350);
    }),
    e.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
}
function renderPortfolio() {
  renderSEO();
  renderHero();
  renderSocialLinks();
  renderAbout();
  renderStats();
  renderExperience();
  renderSkills();
  renderEducation();
  renderCourses();
  renderProjects(1);
  renderContact();
  renderFooter();
  setupContactForm(portfolioData.contactInfo?.email || "");
  window.AOS && AOS.refresh();
}
function renderSEO() {
  const e = portfolioData.site || {},
    t = portfolioData.personal || {},
    o = portfolioData.contactInfo || {},
    n = portfolioData.socialLinks || [];
  ((document.title = e.pageTitle || `${t.name || "Portfolio"} | Portfolio`),
    setMeta("description", e.metaDescription || t.heroDescription || ""),
    setMeta("keywords", e.keywords || ""),
    setMeta("author", e.author || t.fullName || t.name || ""),
    setOg("og:title", e.pageTitle || `${t.name || "Portfolio"} | Portfolio`),
    setOg("og:description", e.metaDescription || t.heroDescription || ""),
    setOg(
      "og:image",
      assetUrl(e.ogImage || t.profileImage || "assets/profile.png"),
    ),
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", e.canonicalUrl || window.location.href));
  const r = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: t.fullName || t.name,
      jobTitle: t.title,
      url: e.canonicalUrl || window.location.href,
      email: o.email,
      telephone: o.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: o.address || "Cairo, Egypt",
      },
      sameAs: n.map((e) => e.url).filter((e) => e && "#" !== e),
      knowsAbout: [
        "Power BI",
        "SQL",
        "Python",
        "Excel",
        "Data Analysis",
        "Business Intelligence",
        "ETL",
      ],
    },
    i = document.getElementById("schema-person");
  i && (i.textContent = JSON.stringify(r));
}
function setMeta(e, t) {
  document.querySelector(`meta[name="${e}"]`)?.setAttribute("content", t);
}
function setOg(e, t) {
  document.querySelector(`meta[property="${e}"]`)?.setAttribute("content", t);
}
function renderHero() {
  const e = portfolioData.personal || {},
    t = document.getElementById("siteLogo");
  if (t) {
    const o = e.name ? `${e.name.split(" ")[0]}.Data` : "Farouk.Data";
    t.innerHTML = escapeHtml((portfolioData.site || {}).logoText || o).replace(
      ".Data",
      '<span class="highlight-text">.Data</span>',
    );
  }
  (setText("heroBadge", e.badge),
    setText("heroHeadline", e.heroHeadline),
    setText("heroDescription", e.heroDescription));
  const o = document.querySelector(".profile-img");
  o &&
    ((o.src = assetUrl(e.profileImage, "assets/profile.png")),
    (o.alt = `${e.name || "Profile"} profile picture`));
  const n = document.getElementById("downloadCvBtn");
  (n &&
    ((n.href = assetUrl(e.cvFile, "assets/Farouk_Seliem_CV.pdf")),
    n.setAttribute(
      "download",
      (e.cvFile || "Farouk_Seliem_CV.pdf").split("/").pop(),
    )),
    startTypewriter(e.typewriterText || e.name || "Farouk Seliem"));
}
function startTypewriter(e) {
  const t = document.getElementById("typewriterText");
  if (t) {
    clearTimeout(typewriterTimer);
    let o = 0,
      n = !1;
    !(function r() {
      const i = n ? e.substring(0, o--) : e.substring(0, o++);
      ((t.textContent = i),
        !n && o > e.length
          ? ((n = !0), (typewriterTimer = setTimeout(r, 1600)))
          : n && o < 0
            ? ((n = !1), (o = 0), (typewriterTimer = setTimeout(r, 350)))
            : (typewriterTimer = setTimeout(r, n ? 55 : 120)));
    })();
  }
}
function renderSocialLinks() {
  const e = (portfolioData.socialLinks || [])
    .map(
      (e) =>
        `<a href="${safeUrl(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(e.platform || "social link")}"><i class="${escapeHtml(e.icon || iconForPlatform(e.platform))}"></i></a>`,
    )
    .join("");
  ["heroSocialLinks", "contactSocialLinks", "footerSocialLinks"].forEach(
    (t) => {
      const o = document.getElementById(t);
      o && (o.innerHTML = e);
    },
  );
}
function renderAbout() {
  const e = portfolioData.personal || {};
  (setText("aboutSubtitle", e.aboutSubtitle || "About me"),
    document.getElementById("aboutTitle") &&
      (document.getElementById("aboutTitle").innerHTML = highlightTitle(
        e.aboutTitle || "About Me",
      )));
  const t = document.getElementById("aboutDescription");
  t &&
    (t.innerHTML = (e.aboutDescription || [])
      .map(
        (e) =>
          `<p class="text-secondary fs-5" style="line-height:1.8">${escapeHtml(e)}</p>`,
      )
      .join(""));
}
function renderStats() {
  const e = document.getElementById("statsContainer");
  e &&
    (e.innerHTML = (portfolioData.stats || [])
      .map(
        (e, t) =>
          `<div class="col-12 col-sm-6" data-aos="zoom-in" data-aos-delay="${100 * t}"><div class="modern-card"><i class="${escapeHtml(e.icon || "bi bi-bar-chart")} card-icon"></i><h3 class="brand-font fs-2 highlight-text">${escapeHtml(e.value)}</h3><p class="text-secondary mb-0">${escapeHtml(e.label)}</p></div></div>`,
      )
      .join(""));
}
function renderExperience() {
  const e = document.getElementById("experienceContainer");
  e &&
    (e.innerHTML = (portfolioData.experiences || [])
      .map(
        (e, t) =>
          `<div class="timeline-item" data-aos="fade-left" data-aos-delay="${120 * t}"><div class="timeline-date">${escapeHtml(e.period || "")}</div><h4 class="brand-font">${escapeHtml(e.title || "")}</h4><h6 class="text-secondary mb-3">${escapeHtml(e.company || "")}${e.location ? " • " + escapeHtml(e.location) : ""}</h6><ul class="text-secondary">${(e.responsibilities || []).map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul><div class="mt-3">${(e.technologies || []).map((e) => `<span class="tag">${escapeHtml(e)}</span>`).join("")}</div></div>`,
      )
      .join(""));
}
function renderSkills() {
  const e = document.getElementById("skillsContainer");
  if (e) {
    const t = [
        ["analytics", "bi bi-bar-chart-steps", "Data Analytics"],
        ["dataTools", "bi bi-tools", "Data Tools"],
        ["programming", "bi bi-code-slash", "Programming"],
        ["database", "bi bi-database", "Database & SQL"],
      ],
      o = portfolioData.skills || {};
    e.innerHTML = t
      .map(
        ([e, t, n], r) =>
          `<div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="${120 * r}"><div class="skill-group"><h4 class="mb-4"><i class="${t} text-primary me-2"></i>${n}</h4>${(o[e] || []).map((e) => `<span class="tag">${escapeHtml(e)}</span>`).join("")}</div></div>`,
      )
      .join("");
  }
}
function renderEducation() {
  const e = document.getElementById("educationContainer");
  e &&
    (e.innerHTML = `<div class="modern-card" data-aos="fade-right"><i class="bi bi-mortarboard card-icon"></i><h3 class="brand-font mb-4">Education</h3>${(portfolioData.education || []).map((e) => `<div class="mb-4"><div class="timeline-date">${escapeHtml(e.period)}</div><h5 class="brand-font">${escapeHtml(e.title)}</h5><p class="text-secondary mb-0">${escapeHtml(e.description)}</p></div>`).join("")}</div>`);
}
function renderCourses() {
  const e = document.getElementById("coursesContainer");
  e &&
    (e.innerHTML = `<div class="modern-card" data-aos="fade-left"><i class="bi bi-award card-icon"></i><h3 class="brand-font mb-4">Courses</h3>${(portfolioData.courses || []).map((e) => `<div class="course-item border-bottom border-secondary-subtle py-3"><div><h6 class="brand-font mb-1">${escapeHtml(e.title)}</h6><p class="text-secondary mb-0">${escapeHtml(e.provider)}</p></div><span class="tag">${escapeHtml(e.year)}</span></div>`).join("")}</div>`);
}
function renderProjects(e = 1) {
  const t = document.getElementById("projectsContainer"),
    o = document.getElementById("projectsPagination");
  if (t && portfolioData) {
    const n = portfolioData.projects || [],
      r = Number(portfolioData.projectsSettings?.itemsPerPage || 3),
      i = Math.max(1, Math.ceil(n.length / r));
    currentProjectsPage = Math.min(Math.max(e, 1), i);
    const a = (currentProjectsPage - 1) * r,
      s = n.slice(a, a + r);
    t.innerHTML = s
      .map(
        (e, t) =>
          `<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${120 * t}"><div class="modern-card project-card"><img class="project-image" src="${assetUrl(e.image, "assets/inventory-dashboard.svg")}" alt="${escapeHtml(e.title || "Project")} screenshot" onerror="this.src='assets/inventory-dashboard.svg'" /><div class="d-flex justify-content-between align-items-center gap-3 mb-3"><span class="tag">${escapeHtml(e.category || "Project")}</span><i class="bi bi-graph-up-arrow card-icon m-0 fs-3"></i></div><h4 class="brand-font mb-3">${escapeHtml(e.title || "")}</h4><p class="text-secondary project-description">${escapeHtml(e.description || "")}</p><div class="mb-3">${(e.technologies || []).map((e) => `<span class="tag">${escapeHtml(e)}</span>`).join("")}</div><div class="project-links">${e.liveLink ? `<a href="${safeUrl(e.liveLink)}" target="_blank" rel="noopener noreferrer" class="fw-bold"><i class="bi bi-globe"></i> Preview <i class="bi-arrow-right"></i></a>` : ""}${e.githubLink ? `<a href="${safeUrl(e.githubLink)}" target="_blank" rel="noopener noreferrer" class="fw-bold"><i class="bi bi-github"></i> Source Code <i class="bi-arrow-right"></i></a>` : ""}</div></div></div>`,
      )
      .join("");
    if (!o) return;
    if (n.length <= r) return void (o.innerHTML = "");
    const l = Array.from({ length: i }, (e, t) => {
      const o = t + 1;
      return `<button class="pagination-btn ${o === currentProjectsPage ? "active" : ""}" data-page="${o}">${o}</button>`;
    }).join("");
    ((o.innerHTML = `<button class="pagination-btn" ${1 === currentProjectsPage ? "disabled" : ""} data-page="${currentProjectsPage - 1}"><i class="bi bi-chevron-left"></i></button>${l}<button class="pagination-btn" ${currentProjectsPage === i ? "disabled" : ""} data-page="${currentProjectsPage + 1}"><i class="bi bi-chevron-right"></i></button>`),
      o.querySelectorAll("[data-page]").forEach((e) => {
        e.addEventListener("click", () => {
          (renderProjects(Number(e.dataset.page)),
            document
              .getElementById("portfolio")
              ?.scrollIntoView({ behavior: "smooth", block: "start" }));
        });
      }),
      window.AOS && AOS.refresh());
  }
}
function renderContact() {
  const e = portfolioData.contactInfo || {};
  setText("contactIntro", e.contactIntro || "");
  const t = document.getElementById("contactInfoContainer");
  if (t) {
    const o = [
      //   ["bi bi-geo-alt", "Location", e.address],
      ["bi bi-envelope-at", "Email", e.email],
      ["bi bi-phone", "Phone", e.phone],
      ["bi bi-calendar-check", "Availability", e.availability],
    ];
    t.innerHTML = o
      .map(
        ([e, t, o]) =>
          `<div class="contact-info-card"><i class="${e}"></i><div><h5 class="mb-1 brand-font">${t}</h5><p class="mb-0 text-secondary">${escapeHtml(o || "")}</p></div></div>`,
      )
      .join("");
  }
}
function renderFooter() {
  const e = portfolioData.personal || {},
    t = new Date().getFullYear();
  (setText("footerName", e.name || ""),
    setText(
      "footerText",
      `© ${t} ${e.name || "Portfolio"}. Engineered with Data & Design.`,
    ));
}

function setupContactForm(targetEmail) {
  const contactForm = document.getElementById("contactForm");
  const successDiv = document.getElementById("form-success");
  const errorDiv = document.getElementById("form-error");
  const sendButton = document.getElementById("sendBtn");

  if (!contactForm || contactForm.dataset.bound === "true") return;

  contactForm.dataset.bound = "true";

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName")?.value.trim() || "";

    const lastName = document.getElementById("lastName")?.value.trim() || "";

    const email = document.getElementById("email")?.value.trim() || "";

    const message = document.getElementById("message")?.value.trim() || "";

    if (
      !firstName ||
      !lastName ||
      !email ||
      !message ||
      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      errorDiv?.classList.remove("d-none");
      successDiv?.classList.add("d-none");

      setTimeout(() => {
        errorDiv?.classList.add("d-none");
      }, 3000);

      return;
    }

    const originalText = sendButton.innerHTML;

    sendButton.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Sending...';

    sendButton.disabled = true;

    const formData = new FormData();

    formData.append("name", `${firstName} ${lastName}`);
    formData.append("email", email);
    formData.append("message", message);

    formData.append(
      "_subject",
      `Portfolio Message from ${firstName} ${lastName}`,
    );

    formData.append("_captcha", "false");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${targetEmail || "example@example.com"}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (result.success === true || response.ok) {
        successDiv?.classList.remove("d-none");
        errorDiv?.classList.add("d-none");

        contactForm.reset();

        setTimeout(() => {
          successDiv?.classList.add("d-none");
        }, 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Failed to send email:", error);

      errorDiv?.classList.remove("d-none");
      successDiv?.classList.add("d-none");

      setTimeout(() => {
        errorDiv?.classList.add("d-none");
      }, 5000);
    } finally {
      sendButton.innerHTML = originalText;
      sendButton.disabled = false;
    }
  });
}

function initContactForm() {
  const e = document.getElementById("contactForm");
  e &&
    "true" !== e.dataset.bound &&
    ((e.dataset.bound = "true"),
    e.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = document.getElementById("contactName")?.value.trim(),
        o = document.getElementById("contactEmail")?.value.trim(),
        n = document.getElementById("contactMessage")?.value.trim(),
        r = document.getElementById("formError"),
        i = document.getElementById("formSuccess");
      if (!t || !o || !n || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))
        return (r?.classList.remove("d-none"), void i?.classList.add("d-none"));
      const a = portfolioData.contactInfo?.email || "",
        s = encodeURIComponent(`Portfolio inquiry from ${t}`),
        l = encodeURIComponent(`Name: ${t}\nEmail: ${o}\n\n${n}`);
      (i?.classList.remove("d-none"),
        r?.classList.add("d-none"),
        (window.location.href = `mailto:${a}?subject=${s}&body=${l}`));
    }));
}
function setText(e, t) {
  const o = document.getElementById(e);
  o && (o.textContent = t || "");
}
function highlightTitle(e) {
  const t = escapeHtml(e || ""),
    o = t.split(" ");
  if (o.length < 2) return t;
  const n = o.pop();
  return `${o.join(" ")} <span>${n}</span>`;
}
function escapeHtml(e = "") {
  return String(e)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function safeUrl(e, t = "#") {
  return e && String(e).trim() ? String(e).trim() : t;
}
function assetUrl(e, t = "#") {
  const o = safeUrl(e, t);
  return /^(https?:|mailto:|tel:|data:|#)/i.test(o) ? o : o.replace(/^\/+/, "");
}
function iconForPlatform(e = "") {
  const t = e.toLowerCase();
  return t.includes("github")
    ? "bi bi-github"
    : t.includes("linkedin")
      ? "bi bi-linkedin"
      : t.includes("whatsapp")
        ? "bi bi-whatsapp"
        : t.includes("facebook")
          ? "bi bi-facebook"
          : t.includes("instagram")
            ? "bi bi-instagram"
            : "bi bi-link-45deg";
}
// Initialize AOS Animations
        AOS.init({
            once: true, // Whether animation should happen only once - while scrolling down
            offset: 100, // Offset (in px) from the original trigger point
            duration: 800, // Values from 0 to 3000, with step 50ms
        });