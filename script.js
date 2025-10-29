const display = document.getElementById('display');
const themeSwitch = document.getElementById('themeSwitch');

// Append values
function append(value) {
  display.value += value;
  display.classList.add('typing');
  setTimeout(() => display.classList.remove('typing'), 200);
}

// Clear display
function clearDisplay() {
  display.value = '';
}

// Backspace (delete last character)
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Theme toggle
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});