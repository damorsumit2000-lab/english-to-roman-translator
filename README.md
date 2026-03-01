# 🌐 English to Roman Script Translator

A powerful web application that converts English text to Roman script versions of major Indian languages including Hinglish, Roman Gujarati, and more. Powered by Groq AI's advanced language models.

## ✨ Features

- **9 Indian Languages Supported:**
  - Roman Hindi (Hinglish)
  - Roman Gujarati
  - Roman Marathi
  - Roman Tamil
  - Roman Telugu
  - Roman Kannada
  - Roman Bengali
  - Roman Punjabi
  - Roman Malayalam

- **Smart Translation:** Uses Groq AI's Llama 3.3 70B model for accurate and natural transliterations
- **Clean UI:** Modern, responsive design that works on all devices
- **One-Click Copy:** Easy clipboard copying of translated text
- **Quick Examples:** Pre-loaded examples for instant testing
- **Fast Processing:** Lightning-fast translations powered by Groq AI

## 🚀 Live Demo

Visit the live application: [GitHub Pages Link](https://damorsumit2000-lab.github.io/english-to-roman-translator/)

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI Model:** Groq AI (Llama 3.3 70B Versatile)
- **Hosting:** GitHub Pages
- **API:** Groq Cloud API

## 📦 Installation & Setup

### Option 1: Use Directly (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/damorsumit2000-lab/english-to-roman-translator.git
cd english-to-roman-translator
```

2. Open `index.html` in your browser - that's it! The app works entirely client-side.

### Option 2: Local Server

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000
```

## 🔑 API Key Configuration

The app comes pre-configured with a Groq API key. If you want to use your own:

1. Get a free API key from [Groq Cloud](https://console.groq.com/)
2. Open `script.js`
3. Replace the `GROQ_API_KEY` value with your key:

```javascript
const GROQ_API_KEY = 'your-api-key-here';
```

## 💡 Usage

1. Select your target language from the dropdown
2. Enter English text in the input box
3. Click "Translate" or press Ctrl+Enter
4. Copy the result using the "Copy to Clipboard" button
5. Try the example phrases for quick testing

## 📝 Examples

- **English:** "How are you?"
  - **Hindi:** "Aap kaise hain?"
  - **Gujarati:** "Tame kem cho?"
  - **Marathi:** "Tumhi kase aahat?"

- **English:** "Good morning"
  - **Hindi:** "Suprabhat"
  - **Tamil:** "Kaalai vanakkam"
  - **Telugu:** "Subhodayam"

## 🌟 Features in Detail

### Supported Languages

Each language is transliterated to Roman script (Latin alphabet) for easy typing and reading:

| Language | Script Type | Example |
|----------|-------------|---------|
| Hindi | Hinglish | "Namaste" |
| Gujarati | Roman Gujarati | "Kem cho" |
| Marathi | Roman Marathi | "Namaskar" |
| Tamil | Roman Tamil | "Vanakkam" |
| Telugu | Roman Telugu | "Namaskaram" |
| Kannada | Roman Kannada | "Namaskara" |
| Bengali | Roman Bengali | "Nomoshkar" |
| Punjabi | Roman Punjabi | "Sat sri akal" |
| Malayalam | Roman Malayalam | "Namaskaram" |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions

- Add more Indian languages
- Improve translation accuracy
- Add voice input/output
- Create a mobile app version
- Add translation history
- Implement offline mode

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Groq AI** for providing the powerful language model API
- **Indian Language Community** for inspiration and feedback
- **Open Source Contributors** for making this project better

## 📧 Contact

**Sumit Damor**
- GitHub: [@damorsumit2000-lab](https://github.com/damorsumit2000-lab)
- Repository: [english-to-roman-translator](https://github.com/damorsumit2000-lab/english-to-roman-translator)

## 🐛 Bug Reports

Found a bug? Please open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 🔮 Future Enhancements

- [ ] Add more regional languages
- [ ] Implement batch translation
- [ ] Add pronunciation guide
- [ ] Create browser extension
- [ ] Add API endpoint for developers
- [ ] Implement translation memory
- [ ] Add dark mode
- [ ] Support for longer texts

---

Made with ❤️ for Indian Languages | Powered by Groq AI