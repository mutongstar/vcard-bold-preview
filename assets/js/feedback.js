/* Feedback mode for style previews. House style: neutral Muse tool UI, identical on every site. Self-gating: only runs with ?feedback=1.
   Click anywhere on the page to pin a comment; copy all feedback as text and
   paste it back into the chat. No backend, comments live in localStorage.
   Navigation tabs and the language button keep working in feedback mode. */
(function () {
  "use strict";
  if (!/[?&]feedback=1\b/.test(location.search)) return;

  var STORAGE_KEY = "vcard-bold-feedback";
  var comments = [];
  try { comments = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (e) { comments = []; }
  var nextId = comments.reduce(function (m, c) { return Math.max(m, c.id || 0); }, 0) + 1;
  var pending = null;

  function closest(el, sel) {
    if (!el || !el.closest) return null;
    try { return el.closest(sel); } catch (e) { return null; }
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(comments)); } catch (e) {}
  }

  function describe(el) {
    if (!el || el === document.body || el === document.documentElement) return "页面整体";
    var page = closest(el, "article[data-page]");
    var chain = [];
    var node = el;
    for (var i = 0; i < 3 && node && node !== document.body; i++) {
      var s = node.tagName ? node.tagName.toLowerCase() : "?";
      if (node.id) s += "#" + node.id;
      var cls = (typeof node.className === "string") ? node.className.trim().split(/\s+/).filter(function (c) { return c && c !== "active"; }).slice(0, 2).join(".") : "";
      if (cls) s += "." + cls;
      chain.unshift(s);
      node = node.parentElement;
    }
    var text = "";
    try { text = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40); } catch (e) {}
    var label = chain.join(" > ") + (text ? ' “' + text + '”' : "");
    return (page ? "页面:" + page.getAttribute("data-page") + " · " : "") + label;
  }

  /* ---------- styles ---------- */
  var style = document.createElement("style");
  style.textContent = [
    "body.fb-mode { padding-top: 48px !important; }",
    "#fb-bar { position: fixed; top: 0; left: 0; right: 0; height: 48px; z-index: 10000; display: flex; align-items: center; gap: 10px; padding: 0 14px; background: #17171a; border-bottom: 2px solid #0a84ff; color: #f5f5f7; font: 13px/1.4 -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; }",
    "#fb-bar b { background: #0a84ff; color: #fff; padding: 3px 8px; border-radius: 9999px; }",
    "#fb-bar .fb-spacer { flex: 1; }",
    "#fb-bar button { font: 600 12px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; padding: 6px 12px; border-radius: 9999px; border: 1px solid rgba(10,132,255,.6); background: transparent; color: #0a84ff; cursor: pointer; }",
    "#fb-bar button:hover { background: #0a84ff; color: #111; }",
    "#fb-pins { position: absolute; inset: 0; z-index: 9998; pointer-events: none; }",
    ".fb-pin { position: absolute; width: 26px; height: 26px; border-radius: 50%; background: #0a84ff; color: #111; font: 700 13px/26px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; text-align: center; transform: translate(-50%, -50%); box-shadow: 0 2px 10px rgba(0,0,0,.6); }",
    "#fb-panel { position: fixed; top: 60px; right: 12px; width: 320px; max-width: calc(100vw - 24px); max-height: calc(100vh - 76px); overflow: auto; z-index: 10001; background: #1c1c1e; border: 1px solid #33333d; border-radius: 12px; padding: 12px; color: #f5f5f7; font: 13px/1.5 -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; box-shadow: 0 18px 40px rgba(0,0,0,.55); }",
    "#fb-panel[hidden] { display: none; }",
    "#fb-panel h3 { margin: 0 0 8px; font-size: 14px; color: #0a84ff; }",
    ".fb-item { border-top: 1px solid #26262e; padding: 8px 0; }",
    ".fb-item .fb-target { color: #9a978e; font-size: 11px; word-break: break-all; }",
    ".fb-item .fb-text { white-space: pre-wrap; word-break: break-word; }",
    ".fb-item button { float: right; background: none; border: none; color: #ff453a; cursor: pointer; font-size: 12px; }",
    "#fb-editor { position: fixed; z-index: 10002; width: 300px; max-width: calc(100vw - 24px); background: #1c1c1e; border: 1px solid #0a84ff; border-radius: 12px; padding: 12px; color: #f5f5f7; font: 13px/1.5 -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; box-shadow: 0 18px 40px rgba(0,0,0,.6); }",
    "#fb-editor[hidden] { display: none; }",
    "#fb-editor .fb-target { color: #9a978e; font-size: 11px; margin-bottom: 6px; word-break: break-all; }",
    "#fb-editor textarea { width: 100%; min-height: 74px; box-sizing: border-box; background: #000000; color: #f5f5f7; border: 1px solid #33333d; border-radius: 8px; padding: 8px; font: 13px/1.5 -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; resize: vertical; }",
    "#fb-editor .fb-row { display: flex; gap: 8px; margin-top: 8px; justify-content: flex-end; }",
    "#fb-editor .fb-row button { font: 600 12px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; padding: 6px 14px; border-radius: 9999px; cursor: pointer; }",
    "#fb-save { background: #0a84ff; border: none; color: #fff; }",
    "#fb-cancel { background: transparent; border: 1px solid #55555f; color: #f5f5f7; }"
  ].join("\n");
  document.head.appendChild(style);
  document.body.classList.add("fb-mode");

  /* ---------- top bar ---------- */
  var bar = document.createElement("div");
  bar.id = "fb-bar";
  bar.innerHTML = "<b>MUSE 反馈</b><span>点页面任意处写意见，导航和语言切换仍可用</span><span class='fb-spacer'></span><button type='button' id='fb-toggle'>反馈列表 (<span id='fb-count'>0</span>)</button><button type='button' id='fb-copy'>复制全部反馈</button><button type='button' id='fb-clear'>清空</button><button type='button' id='fb-exit'>退出反馈模式</button>";
  document.body.appendChild(bar);

  /* ---------- pins layer ---------- */
  var pins = document.createElement("div");
  pins.id = "fb-pins";
  document.body.appendChild(pins);

  /* ---------- side panel ---------- */
  var panel = document.createElement("div");
  panel.id = "fb-panel";
  panel.hidden = true;
  panel.innerHTML = "<h3>反馈列表</h3><div id='fb-list'></div>";
  document.body.appendChild(panel);

  /* ---------- editor card ---------- */
  var editor = document.createElement("div");
  editor.id = "fb-editor";
  editor.hidden = true;
  editor.innerHTML = "<div class='fb-target' id='fb-editor-target'></div><textarea id='fb-editor-text' placeholder='这里想怎么改？写具体一点，比如：标题再大一点 / 这个间距太挤…'></textarea><div class='fb-row'><button type='button' id='fb-cancel'>取消</button><button type='button' id='fb-save'>保存</button></div>";
  document.body.appendChild(editor);
  var editorText = editor.querySelector("#fb-editor-text");

  function renderPins() {
    pins.innerHTML = "";
    comments.forEach(function (c) {
      var pin = document.createElement("div");
      pin.className = "fb-pin";
      pin.textContent = c.id;
      pin.style.left = c.x + "px";
      pin.style.top = c.y + "px";
      pins.appendChild(pin);
    });
    document.getElementById("fb-count").textContent = comments.length;
  }

  function renderList() {
    var list = document.getElementById("fb-list");
    list.innerHTML = "";
    if (!comments.length) {
      list.innerHTML = "<p style='color:#9a978e'>还没有反馈。点页面任意处开始写。</p>";
      return;
    }
    comments.forEach(function (c) {
      var item = document.createElement("div");
      item.className = "fb-item";
      var del = document.createElement("button");
      del.type = "button";
      del.textContent = "删除";
      del.addEventListener("click", function () {
        comments = comments.filter(function (x) { return x.id !== c.id; });
        persist(); renderPins(); renderList();
      });
      var head = document.createElement("div");
      head.innerHTML = "<b>#" + c.id + "</b> ";
      head.appendChild(del);
      var target = document.createElement("div");
      target.className = "fb-target";
      target.textContent = c.target;
      var text = document.createElement("div");
      text.className = "fb-text";
      text.textContent = c.text;
      item.appendChild(head);
      item.appendChild(target);
      item.appendChild(text);
      list.appendChild(item);
    });
  }

  function closeEditor() {
    editor.hidden = true;
    pending = null;
  }

  function openEditor(e) {
    pending = { x: e.pageX, y: e.pageY, target: describe(e.target) };
    document.getElementById("fb-editor-target").textContent = pending.target;
    editorText.value = "";
    editor.hidden = false;
    var w = 300, h = 190;
    editor.style.left = Math.max(8, Math.min(e.clientX + 12, window.innerWidth - w - 8)) + "px";
    editor.style.top = Math.max(56, Math.min(e.clientY + 12, window.innerHeight - h - 8)) + "px";
    editorText.focus();
  }

  document.getElementById("fb-save").addEventListener("click", function () {
    var text = editorText.value.trim();
    if (!pending || !text) { closeEditor(); return; }
    comments.push({ id: nextId++, x: pending.x, y: pending.y, target: pending.target, text: text });
    persist(); renderPins(); renderList(); closeEditor();
  });
  document.getElementById("fb-cancel").addEventListener("click", closeEditor);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEditor(); });

  document.getElementById("fb-toggle").addEventListener("click", function () {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) renderList();
  });
  document.getElementById("fb-clear").addEventListener("click", function () {
    if (!comments.length) return;
    if (!window.confirm("清空全部 " + comments.length + " 条反馈？")) return;
    comments = [];
    persist(); renderPins(); renderList();
  });
  document.getElementById("fb-copy").addEventListener("click", function () {
    if (!comments.length) { window.alert("还没有反馈，先点页面写几条。"); return; }
    var lines = ["反馈：vCard 加粗预览版", location.href, "共 " + comments.length + " 条：", ""];
    comments.forEach(function (c) {
      lines.push(c.id + ". [" + c.target + "]");
      lines.push("   " + c.text);
      lines.push("");
    });
    var out = lines.join("\n");
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = out;
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); window.alert("已复制，到聊天里粘贴给我就行。"); }
      catch (e) { window.prompt("复制下面这段文字发给我：", out); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(out).then(function () {
        window.alert("已复制 " + comments.length + " 条反馈，到聊天里粘贴给我就行。");
      }, fallback);
    } else fallback();
  });
  document.getElementById("fb-exit").addEventListener("click", function () {
    var url = new URL(location.href);
    url.searchParams.delete("feedback");
    location.href = url.toString();
  });

  /* ---------- click capture: annotate, except on nav / language / UI ---------- */
  document.addEventListener("click", function (e) {
    if (closest(e.target, "#fb-bar, #fb-panel, #fb-editor, .fb-pin")) return;
    if (closest(e.target, "[data-nav-link], [data-lang-btn]")) return;
    e.preventDefault();
    e.stopPropagation();
    openEditor(e);
  }, true);

  renderPins();
  renderList();
})();
