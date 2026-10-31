/* Case-study modal (mock data) for the portfolio preview.
   Clicking a project card opens a mock case page so the owner can see
   exactly what content each case needs. All body copy is placeholder and
   is labeled as mock inside the modal. Preview only, not the live site. */
(function () {
  "use strict";

  var CASES = [
    {
      role: "Design Lead", year: "2025", team: "12 designers, 4 researchers", platform: "ColorOS / Figma Community",
      overview: "Rebuilt the system UI kit across two major OS releases, from scattered components to one governed kit with motion rules.",
      challenge: "Six product teams shipped their own variants of the same controls, so the OS felt assembled rather than designed.",
      process: [
        "Audited 400+ screens and merged 60+ duplicate components into 32.",
        "Defined the visual language, spacing scale, and motion curves in one token set.",
        "Published the kit on Figma Community and ran adoption reviews with each team."
      ],
      results: ["+18% task success in usability tests (mock)", "40% fewer visual defects at release (mock)", "6 product teams adopted the kit (mock)"]
    },
    {
      role: "Platform Design Lead", year: "2023", team: "8 designers, 2 motion designers", platform: "ColorOS",
      overview: "Set the aesthetic direction and motion language for a full OS release: calmer surfaces, one easing curve, motion with meaning.",
      challenge: "Motion was decorative and inconsistent, so every animation felt like a different product.",
      process: [
        "Defined three motion principles and one shared easing curve for the whole system.",
        "Built motion prototypes for the highest-frequency transitions first.",
        "Wrote the motion spec engineers could implement without guesswork."
      ],
      results: ["One shared motion spec across the OS (mock)", "Hero transitions prototyped before build (mock)", "Design QA sign-off on every release (mock)"]
    },
    {
      role: "Design Lead", year: "2014-2016", team: "Grew from 3 to 20 designers", platform: "iOS / Android",
      overview: "Led design for WeSing from zero to one of China's biggest music social products: sing, share, and perform together.",
      challenge: "Karaoke is a solo habit. The product had to make singing feel social without stage fright.",
      process: [
        "Mapped the journey from first open to first shared performance.",
        "Designed the duet and chorus mechanics that made strangers sing together.",
        "Built the team and the review rituals that kept quality up as we scaled."
      ],
      results: ["10M+ MAU in the first two years (mock)", "Duet became the top sharing mechanic (mock)", "Design team grew 3 to 20 (mock)"]
    },
    {
      role: "Experience Lead", year: "2026", team: "Cross-device team", platform: "Phone / Tablet / PC",
      overview: "Designed the cross-device experience: start on the phone, continue on the tablet, finish on the PC.",
      challenge: "Cross-device tasks died at the boundary between apps, accounts, and operating systems.",
      process: [
        "Mapped the tasks that genuinely cross devices instead of mirroring screens.",
        "Defined the handoff moments: what carries over, what restarts, what asks.",
        "Prototyped the flows end to end on real hardware before committing."
      ],
      results: ["3 cross-device journeys shipped (mock)", "Handoff success measured in field tests (mock)", "One shared pattern library (mock)"]
    },
    {
      role: "Design Expert", year: "2025", team: "Solo, AI-assisted workflow", platform: "Web / prototypes",
      overview: "Used AI and runnable prototypes to test interaction ideas in days instead of quarters.",
      challenge: "New interaction patterns could not be judged from static mocks.",
      process: [
        "Turned each idea into a runnable prototype the same week it was sketched.",
        "Tested with real tasks instead of slide walkthroughs.",
        "Kept what survived contact with users, cut what did not, in writing."
      ],
      results: ["12 ideas prototyped, 4 shipped (mock)", "Review cycles cut from weeks to days (mock)", "Reusable AI workflow documented (mock)"]
    },
    {
      role: "Design Manager", year: "2020-2026", team: "40+ designers", platform: "Organization",
      overview: "Built the research function and the NPS measurement loop that made experience quality visible to leadership.",
      challenge: "Design quality was argued from taste. Nobody could show whether it was getting better.",
      process: [
        "Rebuilt the research team and its intake, from requests to readouts.",
        "Set up NPS measurement with a fixed cadence and named owners.",
        "Turned findings into a prioritized backlog the roadmap actually used."
      ],
      results: ["NPS loop running every release (mock)", "Research readouts driving roadmap items (mock)", "Team of 40+ with clear levels (mock)"]
    }
  ];

  var NEEDS = [
    "真实截图或录屏（已脱密）：封面 1 张 + 关键界面 3-5 张",
    "真实数据与口径：基线、样本量、时间窗，注明来源",
    "你的决策点：哪几个关键决定是你拍的，团队做了什么",
    "约束与取舍：时间、人力、技术限制下放弃了什么",
    "一句话结论：这个案例证明了你哪项能力"
  ];

  var modal = document.createElement("div");
  modal.className = "case-modal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="case-backdrop" data-close></div>' +
    '<div class="case-panel" role="dialog" aria-modal="true" aria-label="Case study">' +
    '<button type="button" class="case-close" data-close aria-label="Close">\u00d7</button>' +
    '<img class="case-hero" alt="">' +
    '<div class="case-body">' +
    '<div class="case-tags"><span class="case-tag case-tag-cat"></span><span class="case-tag case-tag-org"></span></div>' +
    '<h3 class="case-title"></h3>' +
    '<dl class="case-meta"></dl>' +
    '<p class="case-overview"></p>' +
    '<h4>背景与挑战</h4><p class="case-challenge"></p>' +
    '<h4>做法与过程</h4><ul class="case-process"></ul>' +
    '<h4>结果（示例数据）</h4><ul class="case-results"></ul>' +
    '<div class="case-todo"><h4>需要你补充的真实内容</h4><ul class="case-needs"></ul></div>' +
    '<p class="case-mock-note">以上正文与数据均为示例（mock），用来定结构和篇幅，不代表真实业绩。替换成真实内容后删掉这句。</p>' +
    '</div></div>';
  document.body.appendChild(modal);

  var hero = modal.querySelector(".case-hero");
  var tagCat = modal.querySelector(".case-tag-cat");
  var tagOrg = modal.querySelector(".case-tag-org");
  var title = modal.querySelector(".case-title");
  var meta = modal.querySelector(".case-meta");
  var overview = modal.querySelector(".case-overview");
  var challenge = modal.querySelector(".case-challenge");
  var process = modal.querySelector(".case-process");
  var results = modal.querySelector(".case-results");
  var needs = modal.querySelector(".case-needs");
  var closeBtn = modal.querySelector(".case-close");

  function fillList(ul, items) {
    ul.innerHTML = "";
    items.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  function fillMeta(c) {
    var fields = [["Role", c.role], ["Year", c.year], ["Team", c.team], ["Platform", c.platform]];
    meta.innerHTML = "";
    fields.forEach(function (f) {
      var wrap = document.createElement("div");
      var dt = document.createElement("dt");
      dt.textContent = f[0];
      var dd = document.createElement("dd");
      dd.textContent = f[1];
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      meta.appendChild(wrap);
    });
  }

  function openCase(index, anchor) {
    var c = CASES[index] || CASES[0];
    var img = anchor.querySelector(".project-img img");
    var t = anchor.querySelector(".project-title");
    var cat = anchor.querySelector(".project-category");
    var org = anchor.querySelector(".project-org");
    if (img) { hero.src = img.getAttribute("src"); hero.alt = img.getAttribute("alt") || ""; }
    tagCat.textContent = cat ? cat.textContent.trim() : "";
    tagOrg.textContent = org ? org.textContent.trim() : "";
    title.textContent = t ? t.textContent.trim() : "";
    fillMeta(c);
    overview.textContent = c.overview;
    challenge.textContent = c.challenge;
    fillList(process, c.process);
    fillList(results, c.results);
    fillList(needs, NEEDS);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeCase() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  var cards = Array.prototype.slice.call(document.querySelectorAll(".project-item > a"));
  cards.forEach(function (anchor, index) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      openCase(index, anchor);
    });
  });
  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeCase);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeCase();
  });
})();
