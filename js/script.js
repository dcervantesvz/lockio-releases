(function () {
  const btn = document.getElementById("themeToggle");

  // Resolve initial theme: saved preference > system
  const saved = localStorage.getItem("lockio-theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = saved || (prefersDark ? "dark" : "light");

  applyTheme(theme);

  btn?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    localStorage.setItem("lockio-theme", theme);
  });

  function applyTheme(next) {
    document.documentElement.setAttribute("data-theme", next);
    document.body.classList.toggle("dark", next === "dark");
    document.body.classList.toggle("light", next === "light");
    if (btn) btn.textContent = next === "dark" ? "Modo claro" : "Modo oscuro";
    setCSSVariables(next);
  }

  // Optional: override CSS variables to ensure consistent theme beyond prefers-color-scheme
  function setCSSVariables(next) {
    const root = document.documentElement;
    const light = {
      "--bg": "#ffffff",
      "--text": "#1b1f23",
      "--muted": "#5f6b7a",
      "--card": "#f6f8fa",
      "--border": "#e5e7eb",
      "--primary": "#2563eb",
      "--primary-contrast": "#ffffff",
    };
    const dark = {
      "--bg": "#0f1216",
      "--text": "#e6e8ea",
      "--muted": "#a3a9b3",
      "--card": "#151920",
      "--border": "#232833",
      "--primary": "#3b82f6",
      "--primary-contrast": "#0f1216",
    };
    const set = next === "dark" ? dark : light;
    Object.entries(set).forEach(([k, v]) => root.style.setProperty(k, v));
  }
})();
