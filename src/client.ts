import "./app.css";

const themeSwitch = document.getElementById("theme-switch");
themeSwitch?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const modeText = document.getElementById("mode");
if (modeText) {
  modeText.innerHTML = import.meta.env?.MODE + " ";
}
