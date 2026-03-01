# 🚀 Cloudflare Deployment Guide

Deploy your translator app to Cloudflare with a secure Worker backend that keeps your API key hidden!

## 🎯 Two Deployment Options

### Option 1: Simple (Client-Side API Key) ⚡
- Quick setup (5 minutes)
- API key visible in browser
- Good for: Personal use, testing

### Option 2: Secure (Worker Backend) 🔒
- Professional setup (15 minutes)
- API key completely hidden
- Good for: Production, public use

---

## 🚀 OPTION 1: Simple Cloudflare Pages Deployment

### Step 1: Prepare Your Code

```bash
# Clone the repo
git clone https://github.com/damorsumit2000-lab/english-to-roman-translator.git
cd english-to-roman-translator

# Create config.js with your API key
cat > config.js << 'EOF'
const CONFIG = {
    GROQ_API_KEY: 'YOUR_GROQ_API_KEY_HERE',
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    MODEL: 'llama-3.3-70b-versatile'
};
EOF

# Commit it (temporarily remove from .gitignore)
git add config.js
git commit -m "Add config for deployment"
git push origin main
```

### Step 2: Deploy to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. **Workers & Pages** → **Create application** → **Pages**
3. **Connect to Git** → Select your repository
4. **Configure:**
   - Project name: `english-roman-translator`
   - Build command: (leave empty)
   - Build output: `/`
5. Click **Save and Deploy**

**Done!** Your site is live at: `https://english-roman-translator.pages.dev`

---

## 🔒 OPTION 2: Secure Deployment with Cloudflare Worker

This keeps your API key completely hidden on the server!

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

### Step 3: Deploy the Worker

```bash
cd english-to-roman-translator

# Deploy worker
wrangler deploy worker.js --name english-roman-translator-api
```

You'll get a URL like:
```
https://english-roman-translator-api.YOUR-SUBDOMAIN.workers.dev
```

**Save this URL!**

### Step 4: Add Your API Key as Secret

```bash
# Set API key securely (it won't be visible anywhere)
wrangler secret put GROQ_API_KEY

# When prompted, paste your Groq API key
```

### Step 5: Update Frontend

```bash
# Copy the worker-compatible script
cp script-worker.js script.js

# Edit script.js and update line 4 with YOUR worker URL:
# const WORKER_URL = 'https://english-roman-translator-api.YOUR-SUBDOMAIN.workers.dev';

# Commit changes
git add script.js
git commit -m "Use Cloudflare Worker for API calls"
git push origin main
```

### Step 6: Deploy to Cloudflare Pages

Same as Option 1, Step 2 above.

---

## 🧪 Testing

### Test Worker:

```bash
curl -X POST https://YOUR-WORKER-URL.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "language": "hindi"}'
```

Expected:
```json
{
  "success": true,
  "translation": "Namaste",
  "language": "Roman Hindi (Hinglish)"
}
```

### Test Frontend:

Visit your Pages URL and try translating!

---

## 📊 What You Get (Free Tier)

- **100,000 Worker requests/day**
- **Unlimited Pages requests**
- **Automatic HTTPS**
- **Global CDN**
- **Auto-deploy on Git push**

---

## 🔄 Updating

### Update Worker:
```bash
wrangler deploy worker.js --name english-roman-translator-api
```

### Update Frontend:
```bash
git add .
git commit -m "Update"
git push origin main
# Auto-deploys!
```

---

## 🐛 Troubleshooting

**Worker not responding?**
```bash
wrangler tail english-roman-translator-api
```

**Need to update API key?**
```bash
wrangler secret put GROQ_API_KEY
```

**CORS errors?**
Check that WORKER_URL in script.js matches your actual worker URL.

---

## 📚 Files You Need

- `worker.js` - Cloudflare Worker (API proxy)
- `wrangler.toml` - Worker configuration
- `script-worker.js` - Frontend that calls Worker
- `index.html`, `style.css` - Your app

---

## ✅ Quick Checklist

**For Simple Deployment:**
- [ ] Create config.js with API key
- [ ] Push to GitHub
- [ ] Deploy to Cloudflare Pages
- [ ] Done!

**For Secure Deployment:**
- [ ] Install Wrangler
- [ ] Deploy Worker
- [ ] Set API key secret
- [ ] Update script.js with Worker URL
- [ ] Deploy to Cloudflare Pages
- [ ] Test everything
- [ ] Celebrate! 🎉

---

## 💡 Pro Tips

1. **Custom Domain:** Add your own domain in Cloudflare Pages settings
2. **Analytics:** Enable Web Analytics in Cloudflare dashboard
3. **Rate Limiting:** Add rate limiting in Worker if needed
4. **Caching:** Worker can cache translations to save API calls

---

**Your API key is in the IMPORTANT_SETUP.txt file in the repo!**

Need help? Check the full SETUP.md or open an issue on GitHub.