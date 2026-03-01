// ═══════════════════════════════════════════════
//  Likhavat — English to Roman Script Translator
//  Cloudflare Worker backend
// ═══════════════════════════════════════════════

const WORKER_URL = 'https://super-haze-94cb.damorsumit2000.workers.dev';

let selectedLang = 'Hindi';
let isLoading = false;

// ── Elements ──
const inputText    = document.getElementById('inputText');
const outputText   = document.getElementById('outputText');
const outputLabel  = document.getElementById('outputLabel');
const translateBtn = document.getElementById('translateBtn');
const clearBtn     = document.getElementById('clearBtn');
const clearAllBtn  = document.getElementById('clearAllBtn');
const copyBtn      = document.getElementById('copyBtn');
const charCount    = document.getElementById('charCount');
const errorMsg     = document.getElementById('errorMsg');
const langGrid     = document.getElementById('langGrid');
const examplesGrid = document.getElementById('examplesGrid');

// ── Language selection ──
langGrid.addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (!btn) return;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedLang = btn.dataset.lang;
  outputLabel.textContent = `Roman ${selectedLang}`;
  // Re-translate if output already exists
  if (inputText.value.trim() && !outputText.classList.contains('placeholder')) {
    translate();
  }
});

// ── Char counter ──
inputText.addEventListener('input', () => {
  const len = inputText.value.length;
  if (len > 1000) inputText.value = inputText.value.slice(0, 1000);
  charCount.textContent = `${Math.min(len, 1000)} / 1000`;
  hideError();
});

// ── Ctrl+Enter shortcut ──
inputText.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    translate();
  }
});

// ── Button events ──
translateBtn.addEventListener('click', translate);

clearBtn.addEventListener('click', () => {
  inputText.value = '';
  charCount.textContent = '0 / 1000';
  hideError();
  inputText.focus();
});

clearAllBtn.addEventListener('click', () => {
  inputText.value = '';
  charCount.textContent = '0 / 1000';
  setOutput('placeholder', 'Translation will appear here…');
  hideError();
  inputText.focus();
});

copyBtn.addEventListener('click', () => {
  const text = outputText.textContent.trim();
  if (!text || outputText.classList.contains('placeholder')) return;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
});

// ── Example cards ──
examplesGrid.addEventListener('click', e => {
  const card = e.target.closest('.example-card');
  if (!card) return;
  inputText.value = card.dataset.text;
  charCount.textContent = `${card.dataset.text.length} / 1000`;
  hideError();
  translate();
});

// ── Core translate function ──
async function translate() {
  const text = inputText.value.trim();
  if (!text) { showError('Please enter some text to translate.'); return; }
  if (isLoading) return;

  isLoading = true;
  hideError();
  translateBtn.disabled = true;
  translateBtn.textContent = 'Translating…';

  // Loading dots
  outputText.className = 'output-text loading';
  outputText.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: selectedLang })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    setOutput('result', data.translation || 'No translation returned.');

  } catch (err) {
    setOutput('placeholder', 'Translation will appear here…');
    showError(`Error: ${err.message}`);
  } finally {
    isLoading = false;
    translateBtn.disabled = false;
    translateBtn.textContent = 'Translate';
  }
}

// ── Helpers ──
function setOutput(type, text) {
  outputText.innerHTML = '';
  outputText.textContent = text;
  outputText.className = type === 'placeholder' ? 'output-text placeholder' : 'output-text';
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add('visible');
}

function hideError() {
  errorMsg.classList.remove('visible');
}
