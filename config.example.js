// Configuration file for Groq AI API
// Copy this file to config.js and add your API key

const CONFIG = {
    GROQ_API_KEY: 'your-groq-api-key-here',
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    MODEL: 'llama-3.3-70b-versatile'
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}