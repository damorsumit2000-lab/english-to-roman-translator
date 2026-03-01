// Language mapping
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

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const targetLanguage = document.getElementById('targetLanguage');
const translateBtn = document.getElementById('translateBtn');
const copyBtn = document.getElementById('copyBtn');
const btnText = translateBtn.querySelector('.btn-text');
const loader = translateBtn.querySelector('.loader');

// Event Listeners
translateBtn.addEventListener('click', translateText);
copyBtn.addEventListener('click', copyToClipboard);

// Example items click handlers
document.querySelectorAll('.example-item').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        const text = item.getAttribute('data-text');
        targetLanguage.value = lang;
        inputText.value = text;
        translateText();
    });
});

// Main translation function
async function translateText() {
    const text = inputText.value.trim();
    
    if (!text) {
        alert('Please enter some text to translate!');
        return;
    }

    // Check if config is loaded
    if (typeof CONFIG === 'undefined' || !CONFIG.GROQ_API_KEY || CONFIG.GROQ_API_KEY === 'your-groq-api-key-here') {
        alert('Please configure your Groq API key in config.js file!\n\n1. Copy config.example.js to config.js\n2. Add your API key from https://console.groq.com/');
        return;
    }

    const selectedLang = targetLanguage.value;
    const langName = languageNames[selectedLang];

    // Show loading state
    translateBtn.disabled = true;
    btnText.textContent = 'Translating...';
    loader.style.display = 'inline-block';
    outputText.value = '';
    copyBtn.style.display = 'none';

    try {
        const prompt = `You are an expert translator specializing in Indian languages. Convert the following English text to ${langName} (Roman script only, NOT Devanagari or native script).

Important instructions:
- Use ONLY Roman/Latin alphabet characters
- Maintain natural pronunciation and common usage
- For ${selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}, use authentic transliteration
- Keep the translation conversational and natural
- Do not include any explanations, just provide the transliterated text

English text: "${text}"

${langName} (Roman script):`;

        const response = await fetch(CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert translator for Indian languages. Always respond with ONLY the transliterated text in Roman script, no explanations or additional text.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const translatedText = data.choices[0].message.content.trim();

        // Display result
        outputText.value = translatedText;
        copyBtn.style.display = 'block';

    } catch (error) {
        console.error('Translation error:', error);
        outputText.value = `Error: ${error.message}\n\nPlease check your API key and internet connection.`;
    } finally {
        // Reset button state
        translateBtn.disabled = false;
        btnText.textContent = 'Translate';
        loader.style.display = 'none';
    }
}

// Copy to clipboard function
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

// Enter key support
inputText.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        translateText();
    }
});