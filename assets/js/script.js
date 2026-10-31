'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button (guarded: testimonials modal removed in this portfolio)
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.dataset.selectValue;
    selectValue.innerText = this.innerText;
    currentFilter = selectedValue;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterValue;
    selectValue.innerText = this.innerText;
    currentFilter = selectedValue;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.dataset.nav === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

/*-----------------------------------*\
  #LANGUAGE, THEMES & ACCESS GATE (added 2026-10-31)
  All copy lives in I18N below; the HTML carries
  data-i18n keys only. Default language is English.
  Chinese copy follows CV V0.6 wording.
\*-----------------------------------*/

const I18N = {
  en: {
    metaTitle: "Michael Mu — Head of Design",
    name: "Michael Mu",
    role: "Head of Design",
    showContacts: "Show Contacts",
    labelEmail: "Email",
    labelGithub: "GitHub",
    labelLocation: "Location",
    location: "Shenzhen, China",
    navAbout: "About",
    navResume: "Resume",
    navPortfolio: "Portfolio",
    aboutTitle: "About me",
    aboutP1: "19 years of user experience and product design, spanning Tencent, WeSing, and OPPO ColorOS. I combine 0-to-1 product building, system experience strategy, design systems, and team building — currently leading ColorOS interconnect experience at OPPO.",
    aboutP2: "I served as the UX design representative for ColorOS 14–16, managed 40+ designers, rebuilt the user research team, and established NPS-based experience measurement. Since 2025 I have been exploring new interaction experiences with AI and runnable prototypes.",
    servicesTitle: "What i'm doing",
    svc1Title: "System experience strategy",
    svc1Text: "OS-level experience strategy and cross-business coordination, from insight to shipped system behavior.",
    svc2Title: "Design language & systems",
    svc2Text: "Shared design systems, controls, and motion — including the ColorOS 15 & 16 UI Kits published on Figma Community.",
    svc3Title: "Research & validation",
    svc3Text: "User insight, design-stage user testing, and NPS-based experience measurement.",
    svc4Title: "Team building",
    svc4Text: "Hiring, coaching, and growing designers — three team members I coached have been promoted to department heads.",
    resumeTitle: "Resume",
    expTitle: "Experience",
    job1Title: "ColorOS Interconnect Experience Lead — OPPO",
    job1Date: "2026.04 — Present",
    job1Text: "Leading user experience for OPPO's ColorOS interconnect direction; contributing to next-year strategy planning and cross-device collaboration experiences.",
    job2Title: "Design Expert & Platform Design Team Lead — OPPO",
    job2Text: "UX design representative for ColorOS 14, 15, and 16; coordinated cross-business experience collaboration and delivery. Led user insight work for ColorOS 14 and proposed its aesthetic direction, landed through the shared design system. Led the platform team for system motion, brand, and the shared design system; published the ColorOS 15 & 16 UI Kits on Figma Community.",
    job3Title: "Internet Services Experience Design Lead — OPPO",
    job3Text: "Led experience design for the internet services BU — app store, browser, game center, and game assistant — balancing user experience with commercial goals; managed 40+ designers. Rebuilt the software user research team and established NPS-based experience measurement.",
    job4Title: "Design Lead, WeSing & Innovation Product Matrix — Tencent",
    job4Text: "Joined WeSing (全民K歌) from 0 to 1, leading audio-video creation, social, and livestream interaction experiences. Built the design platform and component capabilities behind multiple products and platforms.",
    job5Title: "Senior Interaction Designer, Core PC Products — Tencent",
    job5Text: "Interaction design for QQ, QQ Pay, and PC Manager; owned QQ system-level design specifications and contributed to Tencent's experience design principles.",
    eduTitle: "Education",
    eduName: "Xi'an Jiaotong University",
    eduText: "B.Eng, Industrial Design — human-computer interface focus.",
    focusTitle: "Focus areas",
    focus1Title: "Design leadership & team building",
    focus1Text: "Hiring, coaching, critique culture, and design quality at team scale.",
    focus2Title: "Design systems & motion",
    focus2Text: "Tokens, components, interaction paradigms, and motion language for OS-scale products.",
    focus3Title: "OS, foldables & ecosystem",
    focus3Text: "System interaction, new form factors, and cross-device continuity.",
    focus4Title: "On-device AI experiences",
    focus4Text: "Runnable prototypes, personal agents, local models, and AI-assisted design workflows — explored hands-on since 2025.",
    portfolioTitle: "Portfolio",
    filterAll: "All",
    filterDS: "Design Systems",
    filterPE: "Product Experience",
    filterDL: "Design Leadership",
    selectPlaceholder: "Select category",
    proj1Title: "ColorOS 15 & 16 UI Kits",
    proj2Title: "ColorOS 14 Aesthetic Direction & Motion",
    proj3Title: "WeSing — 0 to 1",
    proj4Title: "ColorOS Interconnect Experience",
    proj5Title: "AI Prototyping & Runnable Demos",
    proj6Title: "Teams, Research & NPS Metrics",
    catDS: "Design Systems",
    catPE: "Product Experience",
    catDL: "Design Leadership",
  orgOPPO: "OPPO",
  orgTencent: "Tencent",
  orgPersonal: "Personal",
  },
  zh: {
    metaTitle: "牟伟成 — 设计负责人",
    name: "牟伟成",
    role: "设计负责人",
    showContacts: "显示联系方式",
    labelEmail: "邮箱",
    labelGithub: "GitHub",
    labelLocation: "所在地",
    location: "中国 · 深圳",
    navAbout: "关于",
    navResume: "简历",
    navPortfolio: "作品集",
    aboutTitle: "关于我",
    aboutP1: "19 年用户体验与产品设计经验，经历覆盖腾讯、全民 K 歌与 OPPO ColorOS。兼具产品从 0 到 1、系统体验策略、设计体系与团队建设经验，现负责 OPPO ColorOS 互联体验。",
    aboutP2: "担任 ColorOS 14—16 版本 UX 设计代表，曾管理 40+ 名设计师、重组用户研究团队并建立 NPS 体验度量标准。自 2025 年起，持续以 AI 与可运行原型探索新的交互体验。",
    servicesTitle: "我在做的事",
    svc1Title: "系统体验策略",
    svc1Text: "OS 层级的体验策略与跨业务协同，从用户洞察到系统行为落地。",
    svc2Title: "设计语言与系统",
    svc2Text: "共享设计系统、控件与动效，包括发布在 Figma Community 的 ColorOS 15 & 16 UI Kit。",
    svc3Title: "研究与验证",
    svc3Text: "用户洞察、设计稿阶段用户测试与基于 NPS 的体验度量。",
    svc4Title: "团队建设",
    svc4Text: "招聘、辅导与培养设计师——我辅导的三位团队成员已晋升为部门负责人。",
    resumeTitle: "简历",
    expTitle: "工作经历",
    job1Title: "ColorOS 互联体验负责人 — OPPO",
    job1Date: "2026.04 — 至今",
    job1Text: "负责 OPPO ColorOS 互联方向的用户体验工作，参与下一年度战略规划及跨端协同体验探索。",
    job2Title: "部门交互专家及平台设计团队负责人 — OPPO",
    job2Text: "担任 ColorOS 14、15、16 版本 UX 设计代表，统筹跨业务体验协作与设计交付；在 ColorOS 14 深入参与用户洞察，主导提出美学方向，通过公共设计系统与控件推动落地。带领平台团队负责系统动效、品牌设计及公共规范设计系统；在 Figma Community 发布 ColorOS 15、16 两代 UI Kit。",
    job3Title: "互联网服务业务体验设计负责人 — OPPO",
    job3Text: "负责互联网服务 BU 全部产品体验设计，覆盖软件商店、浏览器、游戏中心及游戏助手，统筹用户体验与商业化需求，管理 40+ 名正式设计师。重新组建软件用户研究团队，带领团队建立围绕 NPS 的体验度量标准。",
    job4Title: "全民 K 歌及创新产品矩阵设计负责人 — 腾讯",
    job4Text: "从 0 到 1 参与打造全民 K 歌，主导音视频创作、关系链社交与直播互动等核心体验；搭建设计中台及组件化能力，支持多业务、多平台交付。",
    job5Title: "核心 PC 产品高级交互设计师 — 腾讯",
    job5Text: "负责 QQ、QQ 支付、电脑管家等产品交互；负责 QQ 业务系统级设计规范，参与定义腾讯体验设计原则。",
    eduTitle: "教育经历",
    eduName: "西安交通大学",
    eduText: "工学学士，工业设计 — 人机界面方向。",
    focusTitle: "专注领域",
    focus1Title: "设计领导力与团队建设",
    focus1Text: "招聘、辅导、评审文化与团队规模下的设计质量。",
    focus2Title: "设计系统与动效",
    focus2Text: "面向 OS 级产品的设计 Token、组件、交互范式与动效语言。",
    focus3Title: "系统、折叠屏与生态",
    focus3Text: "系统交互、新形态设备与跨端连续性。",
    focus4Title: "端侧 AI 体验",
    focus4Text: "可运行原型、个人 Agent、本地模型与 AI 辅助设计工作流——自 2025 年起亲自实践探索。",
    portfolioTitle: "作品集",
    filterAll: "全部",
    filterDS: "设计系统",
    filterPE: "产品体验",
    filterDL: "设计领导力",
    selectPlaceholder: "选择分类",
    proj1Title: "ColorOS 15 & 16 UI Kit",
    proj2Title: "ColorOS 14 美学方向与动效",
    proj3Title: "全民 K 歌 — 从 0 到 1",
    proj4Title: "ColorOS 互联体验",
    proj5Title: "AI 原型与可运行 Demo",
    proj6Title: "团队、研究与 NPS 度量",
    catDS: "设计系统",
    catPE: "产品体验",
    catDL: "设计领导力",
  orgOPPO: "OPPO",
  orgTencent: "腾讯",
  orgPersonal: "个人",
  }
};

const FILTER_LABELS = {
  "all": "filterAll",
  "design systems": "filterDS",
  "product experience": "filterPE",
  "design leadership": "filterDL"
};

let currentFilter = null;
let currentLang = localStorage.getItem("vcard-lang") || "en";
const langBtn = document.querySelector("[data-lang-btn]");

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
  document.title = I18N[lang].metaTitle;
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang][key] !== undefined) { el.textContent = I18N[lang][key]; }
  });
  if (selectValue) {
    selectValue.textContent = currentFilter
      ? I18N[lang][FILTER_LABELS[currentFilter]]
      : I18N[lang].selectPlaceholder;
  }
  if (langBtn) { langBtn.textContent = (lang === "en") ? "中文" : "EN"; }
  try { localStorage.setItem("vcard-lang", lang); } catch (e) { /* private mode */ }
}

if (langBtn) {
  langBtn.addEventListener("click", function () {
    applyLang(currentLang === "en" ? "zh" : "en");
  });
}

/* themes */
const themeBtns = document.querySelectorAll("[data-theme-btn]");

function applyTheme(theme) {
  if (theme === "gold") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  themeBtns.forEach(function (b) {
    b.classList.toggle("active", b.dataset.themeBtn === theme);
  });
  try { localStorage.setItem("vcard-theme", theme); } catch (e) { /* private mode */ }
}

themeBtns.forEach(function (b) {
  b.addEventListener("click", function () { applyTheme(b.dataset.themeBtn); });
});

/* access gate: light front-end password check.
   GATE_HASH is the SHA-256 of the access password.
   To change the password, replace it with the SHA-256
   of the new password. This is casual sharing control,
   not real security: the hash lives in public source. */
const GATE_ENABLED = false; // 密码门开关：false = 隐藏（当前），改为 true 重新启用
const GATE_HASH = "8b901ca3b1b86b98edfeff8688f0b2b8098b256becde78342275d4e3dc3bbda2";
const gateOverlay = document.getElementById("gateOverlay");
const gateForm = document.getElementById("gateForm");
const gateInput = document.getElementById("gateInput");
const gateError = document.getElementById("gateError");

async function sha256hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(function (b) {
    return b.toString(16).padStart(2, "0");
  }).join("");
}

if (gateOverlay) {
  if (!GATE_ENABLED || sessionStorage.getItem("vcard-gate") === "1") {
    gateOverlay.classList.add("unlocked");
  } else if (gateInput) {
    gateInput.focus();
  }
}

if (gateForm) {
  gateForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
      const h = await sha256hex(gateInput.value);
      if (h === GATE_HASH) {
        sessionStorage.setItem("vcard-gate", "1");
        gateOverlay.classList.add("unlocked");
      } else {
        gateError.hidden = false;
        gateInput.value = "";
        gateInput.focus();
        gateOverlay.classList.remove("shake");
        void gateOverlay.offsetWidth;
        gateOverlay.classList.add("shake");
      }
    } catch (err) {
      gateError.hidden = false;
    }
  });
}

/* init saved preferences */
applyTheme(localStorage.getItem("vcard-theme") || "gold");
applyLang(currentLang);
