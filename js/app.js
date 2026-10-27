const STORAGE_KEY = "electricPulseSettings";

const DEFAULT_SETTINGS = {
  theme: "light",
  visitorName: "",
  lastVisit: null
};

function loadSettings() {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEY);

    if (!savedSettings) {
      return { ...DEFAULT_SETTINGS };
    }

    const settings = JSON.parse(savedSettings);

    return {
      theme: settings.theme === "dark" ? "dark" : "light",

      visitorName:
        typeof settings.visitorName === "string"
          ? settings.visitorName
          : "",

      lastVisit:
        typeof settings.lastVisit === "string"
          ? settings.lastVisit
          : null
    };
  } catch (error) {
    console.warn("Invalid Local Storage data. Default settings used.");
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}

function formatLastVisit(lastVisit) {
  if (!lastVisit) {
    return "NO PREVIOUS VISIT RECORDED";
  }

  const visitDate = new Date(lastVisit);

  if (Number.isNaN(visitDate.getTime())) {
    return "VISIT DATA IS INVALID";
  }

  return `LAST VISIT: ${visitDate.toLocaleString()}`;
}

function updatePage(settings) {
  const themeButton = document.querySelector("#theme-toggle");
  const welcomeMessage = document.querySelector("#welcome-message");
  const lastVisitMessage = document.querySelector("#last-visit");
  const nameInput = document.querySelector("#visitor-name");

  document.documentElement.setAttribute(
    "data-theme",
    settings.theme
  );

  themeButton.textContent =
    settings.theme === "dark"
      ? "LIGHT MODE"
      : "DARK MODE";

  welcomeMessage.textContent = settings.visitorName
    ? `WELCOME BACK, ${settings.visitorName.toUpperCase()}`
    : "WELCOME // ENTER YOUR NAME";

  lastVisitMessage.textContent =
    formatLastVisit(settings.lastVisit);

  nameInput.value = settings.visitorName;
}

function startApp() {
  let settings = loadSettings();

  updatePage(settings);

  const themeButton = document.querySelector("#theme-toggle");
  const visitorForm = document.querySelector("#visitor-form");
  const nameInput = document.querySelector("#visitor-name");
  const formMessage = document.querySelector("#form-message");

  themeButton.addEventListener("click", () => {
    settings.theme =
      settings.theme === "dark"
        ? "light"
        : "dark";

    saveSettings(settings);
    updatePage(settings);
  });

  visitorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredName = nameInput.value.trim();

    if (!enteredName) {
      formMessage.textContent =
        "ERROR // PLEASE ENTER YOUR NAME.";

      return;
    }

    settings.visitorName = enteredName;
    settings.lastVisit = new Date().toISOString();

    saveSettings(settings);
    updatePage(settings);

    formMessage.textContent =
      "PROFILE SAVED // DATA CONNECTION COMPLETE.";
  });
}

document.addEventListener("DOMContentLoaded", startApp);