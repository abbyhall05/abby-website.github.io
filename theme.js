// Theme Management (Classic Light & Dark Mode)
(function () {
  const STORAGE_KEY = 'abby_hall_theme';

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch (e) {
      console.warn('localStorage unavailable:', e);
    }
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    // Update button aria-label if present
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Set theme immediately to prevent any flicker
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Bind click listener once DOM is ready
  function initToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
      toggleBtn.onclick = function (e) {
        e.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();
