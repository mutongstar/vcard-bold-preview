/* Sliding active-pill indicator for the navbar (preview only).
   A single gold pill glides to the active link with a slight spring
   overshoot. Links keep a fixed English-based width, so the pill only
   ever moves, never resizes the bar. Without this script the static
   active-link style applies instead. */
(function () {
  "use strict";
  var list = document.querySelector(".navbar-list");
  if (!list) return;
  var indicator = document.createElement("span");
  indicator.className = "navbar-indicator";
  indicator.setAttribute("aria-hidden", "true");
  list.appendChild(indicator);
  function move() {
    var active = list.querySelector(".navbar-link.active");
    if (!active) return;
    var listRect = list.getBoundingClientRect();
    var linkRect = active.getBoundingClientRect();
    var x = linkRect.left - listRect.left + list.scrollLeft;
    indicator.style.width = linkRect.width + "px";
    indicator.style.height = linkRect.height + "px";
    indicator.style.transform = "translateX(" + x + "px) translateY(-50%)";
    list.classList.add("has-indicator");
  }
  function moveSoon() { requestAnimationFrame(move); }
  list.addEventListener("click", moveSoon);
  var langBtn = document.querySelector("[data-lang-btn]");
  if (langBtn) langBtn.addEventListener("click", moveSoon);
  window.addEventListener("resize", moveSoon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveSoon);
  window.addEventListener("load", moveSoon);
  moveSoon();
})();
