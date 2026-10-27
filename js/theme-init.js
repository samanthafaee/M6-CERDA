(function loadThemeBeforePage() {
  const STORAGE_KEY = "electricPulseSettings";
  const defaultTheme = "light";

  let selectedTheme = defaultTheme;

  try {
    const savedSettings = localStorage.getItem(STORAGE_KEY);

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      if (
        settings.theme === "light" ||
        settings.theme === "dark"
      ) {
        selectedTheme = settings.theme;
      }
    }
  } catch (error) {
    selectedTheme = defaultTheme;
  }

  document.documentElement.setAttribute(
    "data-theme",
    selectedTheme
  );
})();