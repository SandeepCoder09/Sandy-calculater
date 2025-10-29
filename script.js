const display = document.getElementById('display');
const themeSwitch = document.getElementById('themeSwitch');

// Append values
function append(value) {
  display.value += value;
  display.classList.add('typing');
  setTimeout(() => display.classList.remove('typing'), 200);
}

// Calculate result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

// Clear display
function clearDisplay() {
  display.value = '';
}

// Theme toggle
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});