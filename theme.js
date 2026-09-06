/**
 * Colour-theme toggle, shared by every page.
 *
 * The saved choice is applied by a small blocking snippet in each page's <head>,
 * not here — by the time this file runs the first paint has already happened, so
 * doing it here would flash the wrong theme. This file only wires up the button.
 *
 * Storage: localStorage["theme"] = "light" | "dark". Absent means "follow the OS",
 * which is the default and what the CSS media query handles on its own.
 */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    if (!current) {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* Private mode or blocked site data — the toggle still works for this page view. */
    }
  });
})();
