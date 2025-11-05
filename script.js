const display = document.getElementById("display");
const themeSwitch = document.getElementById("themeSwitch");
const binaryBg = document.querySelector(".binary-bg");

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
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// === Binary Rain Background Animation ===
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
