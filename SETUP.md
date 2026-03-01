# 🚀 Setup Instructions

Follow these steps to get your English to Roman Script Translator up and running!

## Quick Start (5 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/damorsumit2000-lab/english-to-roman-translator.git
cd english-to-roman-translator
```

### Step 2: Configure API Key

You have two options:

#### Option A: Create config.js manually (Recommended)

1. Copy the example config file:
```bash
cp config.example.js config.js
```

2. Open `config.js` in your text editor

3. Replace `'your-groq-api-key-here'` with your actual Groq API key:
```javascript
const CONFIG = {
    GROQ_API_KEY: 'gsk_YOUR_ACTUAL_KEY_HERE',
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    MODEL: 'llama-3.3-70b-versatile'
};
```

#### Option B: Use the provided key (Already configured)

The repository already has a `config.js` file with the API key you provided. You can use it directly!

### Step 3: Get a Groq API Key (if you don't have one)

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy your new API key
6. Paste it in `config.js`

### Step 4: Run the Application

Simply open `index.html` in your web browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server (optional):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Then visit http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

Want to host it online for free?

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**

### Step 2: Wait for Deployment

GitHub will automatically deploy your site. It usually takes 1-2 minutes.

### Step 3: Access Your Site

Your site will be available at:
```
https://damorsumit2000-lab.github.io/english-to-roman-translator/
```

## ⚠️ Important Security Notes

### For Public Deployment

If you're deploying to GitHub Pages or any public hosting:

1. **DO NOT commit your API key to GitHub** - GitHub will automatically block it
2. Instead, use one of these approaches:

#### Approach 1: Environment Variables (Recommended for production)

Create a backend service that handles API calls:

```javascript
// Instead of calling Groq directly from frontend
// Call your own backend endpoint
const response = await fetch('https://your-backend.com/translate', {
    method: 'POST',
    body: JSON.stringify({ text, language })
});
```

#### Approach 2: User-Provided API Key

Let users enter their own API key:

```javascript
// Add an input field for API key
const apiKey = localStorage.getItem('groq_api_key') || prompt('Enter your Groq API key:');
```

### For Local/Private Use

If you're only using this locally or privately:
- The current setup with `config.js` works perfectly
- Just don't commit `config.js` to a public repository
- The `.gitignore` file already excludes it

## 🔧 Troubleshooting

### "Please configure your Groq API key" error

**Solution:** Make sure `config.js` exists and contains your API key.

```bash
# Check if config.js exists
ls -la config.js

# If not, create it from example
cp config.example.js config.js
```

### API Key Not Working

**Possible causes:**
1. Invalid API key - Get a new one from Groq Console
2. API key expired - Generate a new key
3. Rate limit exceeded - Wait a few minutes or upgrade your plan

### CORS Errors

**Solution:** Use a local server instead of opening the file directly:

```bash
python -m http.server 8000
```

### Translation Not Accurate

**Tips:**
- Be specific in your English input
- Try different phrasings
- Some phrases may not have direct transliterations
- The AI learns from context, so longer sentences work better

## 📱 Mobile Testing

To test on mobile devices on the same network:

1. Start a local server:
```bash
python -m http.server 8000
```

2. Find your computer's IP address:
```bash
# On macOS/Linux
ifconfig | grep inet

# On Windows
ipconfig
```

3. On your mobile device, visit:
```
http://YOUR_IP_ADDRESS:8000
```

## 🎨 Customization

### Change Colors

Edit `style.css`:

```css
/* Change gradient colors */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### Add More Languages

Edit `script.js`:

```javascript
const languageNames = {
    'hindi': 'Roman Hindi (Hinglish)',
    'your_language': 'Your Language Name',
    // ... add more
};
```

Then update `index.html` to add the option in the dropdown.

### Change AI Model

Edit `config.js`:

```javascript
MODEL: 'llama-3.1-70b-versatile' // or any other Groq model
```

Available models:
- `llama-3.3-70b-versatile` (Default - Best quality)
- `llama-3.1-70b-versatile` (Fast)
- `mixtral-8x7b-32768` (Good for longer texts)

## 📚 Additional Resources

- [Groq Documentation](https://console.groq.com/docs)
- [GitHub Pages Guide](https://pages.github.com/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🆘 Need Help?

- Open an issue on GitHub
- Check existing issues for solutions
- Read the main README.md for more information

---

Happy Translating! 🎉