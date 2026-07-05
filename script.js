/* ============================================================
   SANDY CALCULATOR — script.js (Clean Theme)
   ============================================================ */

// ── Element refs ──
const display       = document.getElementById('display');
const expression    = document.getElementById('expression');
const historyList   = document.getElementById('historyList');
const themeBtn      = document.getElementById('themeBtn');
const histToggleBtn = document.getElementById('histToggleBtn');
const historyPanel  = document.getElementById('historyPanel');

let calcHistory = JSON.parse(localStorage.getItem('calcHistory') || '[]');

// ============================================================
//  CALCULATOR LOGIC
// ============================================================
function append(value) {
  if (display.value === 'Error') clearDisplay();
  display.value += value;
}

function clearDisplay() {
  display.value = '';
  expression.textContent = '';
}

function backspace() {
  if (display.value === 'Error') { clearDisplay(); return; }
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const expr = display.value.trim();
  if (!expr) return;

  try {
    const sanitized = expr
      .replace(/\u00d7/g, '*')
      .replace(/\u00f7/g, '/')
      .replace(/\u2212/g, '-');

    const result = math.evaluate(sanitized);
    if (result === undefined || result === null) return;

    const formatted = parseFloat(result.toFixed(10)).toString();
    expression.textContent = expr + ' =';
    addHistory(expr, formatted);
    display.value = formatted;
  } catch {
    display.classList.add('shake');
    display.addEventListener('animationend', () => display.classList.remove('shake'), { once: true });
    display.value = 'Error';
  }
}

// ============================================================
//  HISTORY
// ============================================================
function addHistory(expr, result) {
  calcHistory.unshift({
    expr,
    result,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  if (calcHistory.length > 20) calcHistory.pop();
  localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
  renderHistory();
}

function clearHistory() {
  calcHistory = [];
  localStorage.removeItem('calcHistory');
  renderHistory();
}

function renderHistory() {
  if (calcHistory.length === 0) {
    historyList.innerHTML = '<li class="history-empty">No calculations yet.</li>';
    return;
  }
  historyList.innerHTML = calcHistory.map((item, i) => `
    <li onclick="recallHistory(${i})" title="Tap to recall">
      <span class="hist-time">${item.time}</span>
      ${item.expr}
      <span class="hist-result">= ${item.result}</span>
    </li>
  `).join('');
}

function recallHistory(idx) {
  const item = calcHistory[idx];
  if (!item) return;
  display.value = item.result;
  expression.textContent = item.expr + ' =';
}

// ============================================================
//  KEYBOARD SUPPORT
// ============================================================
document.addEventListener('keydown', e => {
  const key = e.key;
  if (!isNaN(key) || '+-*/.%()'.includes(key)) {
    append(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});

// ============================================================
//  THEME TOGGLE
// ============================================================
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'true' : 'false');
}

themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  applyTheme(!isDark);
});

// Restore saved theme on load
(function () {
  const saved = localStorage.getItem('theme') === 'true';
  applyTheme(saved);
  renderHistory();
})();

// ============================================================
//  HISTORY PANEL TOGGLE (Mobile)
// ============================================================
histToggleBtn.addEventListener('click', () => {
  const open = historyPanel.classList.toggle('panel-open');
  // Swap icon: clock when closed, X when open
  histToggleBtn.innerHTML = open
    ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
         <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
       </svg>`
    : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
         <polyline points="12 7 12 12 15 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`;
});
