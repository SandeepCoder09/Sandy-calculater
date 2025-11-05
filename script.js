const display = document.getElementById("display");
const themeSwitch = document.getElementById("themeSwitch");
const binaryBg = document.querySelector(".binary-bg");
const boot = document.getElementById("boot");
const main = document.getElementById("main");
const historyList = document.getElementById("historyList");
let history = [];

// Binary Rain
function generateBinary() {
  let binary = "";
  const chars = ["0", "1"];
  for (let i = 0; i < 5000; i++) {
    binary += chars[Math.floor(Math.random() * 2)];
    if (i % 60 === 0) binary += "\n";
  }
  binaryBg.textContent = binary;
}
generateBinary();

// Boot screen
document.addEventListener("keydown", () => startApp(), { once: true });
setTimeout(() => startApp(), 6000);
function startApp() {
  boot.classList.add("hidden");
  main.classList.remove("hidden");
}

// Calculator Functions
function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = math.evaluate(display.value);
    if (result !== undefined) {
      addHistory(display.value, result);
      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
}

// Add to history
function addHistory(expr, result) {
  history.unshift(`${expr} = ${result}`);
  if (history.length > 10) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = history.map(item => `<li>${item}</li>`).join("");
}

// Keyboard Support
document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || "+-*/.%()".includes(e.key)) append(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearDisplay();
});

// Theme Toggle with persistence
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});
window.onload = () => {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
  }
};
