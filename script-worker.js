// Frontend script that calls Cloudflare Worker (secure version)
// Replace script.js with this file when using Cloudflare Worker

// IMPORTANT: Update this URL after deploying your Cloudflare Worker
const WORKER_URL = 'https://super-haze-94cb.damorsumit2000.workers.dev';

const languageNames = {
    'hindi': 'Roman Hindi (Hinglish)',
    'gujarati': 'Roman Gujarati',
    'marathi': 'Roman Marathi',
    'tamil': 'Roman Tamil',
    'telugu': 'Roman Telugu',
    'kannada': 'Roman Kannada',
    'bengali': 'Roman Bengali',
    'punjabi': 'Roman Punjabi',
    'malayalam': 'Roman Malayalam'
};

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const targetLanguage = document.getElementById('targetLanguage');
const translateBtn = document.getElementById('translateBtn');
const copyBtn = document.getElementById('copyBtn');
const btnText = translateBtn.querySelector('.btn-text');
const loader = translateBtn.querySelector('.loader');

translateBtn.addEventListener('click', translateText);
copyBtn.addEventListener('click', copyToClipboard);

document.querySelectorAll('.example-item').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        const text = item.getAttribute('data-text');
        targetLanguage.value = lang;
        inputText.value = text;
        translateText();
    });
});

async function translateText() {
    const text = inputText.value.trim();
    
    if (!text) {
        alert('Please enter some text to translate!');
        return;
    }

    const selectedLang = targetLanguage.value;

    translateBtn.disabled = true;
    btnText.textContent = 'Translating...';
    loader.style.display = 'inline-block';
    outputText.value = '';
    copyBtn.style.display = 'none';

    try {
        // Call Cloudflare Worker instead of Groq directly
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                language: selectedLang
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.translation) {
            outputText.value = data.translation;
            copyBtn.style.display = 'block';
        } else {
            throw new Error('Invalid response from translation service');
        }

    } catch (error) {
        console.error('Translation error:', error);
        outputText.value = `Error: ${error.message}\n\nPlease check your internet connection or try again later.`;
    } finally {
        translateBtn.disabled = false;
        btnText.textContent = 'Translate';
        loader.style.display = 'none';
    }
}

function copyToClipboard() {
    outputText.select();
    document.execCommand('copy');
    
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    copyBtn.style.background = '#218838';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#28a745';
    }, 2000);
}

inputText.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        translateText();
    }
});
