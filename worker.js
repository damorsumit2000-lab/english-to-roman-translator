// Cloudflare Worker - Secure API Proxy
// This keeps your Groq API key server-side and hidden from users

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Get request body
      const body = await request.json();
      const { text, language } = body;

      if (!text || !language) {
        return new Response(
          JSON.stringify({ error: 'Missing text or language parameter' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

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

      const langName = languageNames[language] || 'Roman Hindi';

      // Create prompt
      const prompt = `You are an expert translator specializing in Indian languages. Convert the following English text to ${langName} (Roman script only, NOT Devanagari or native script).

Important instructions:
- Use ONLY Roman/Latin alphabet characters
- Maintain natural pronunciation and common usage
- For ${language.charAt(0).toUpperCase() + language.slice(1)}, use authentic transliteration
- Keep the translation conversational and natural
- Do not include any explanations, just provide the transliterated text

English text: "${text}"

${langName} (Roman script):`;

      // Call Groq API with environment variable
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}` // API key from environment
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
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

      if (!groqResponse.ok) {
        const errorText = await groqResponse.text();
        console.error('Groq API error:', errorText);
        return new Response(
          JSON.stringify({ error: 'Translation service error', details: errorText }),
          { status: groqResponse.status, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const data = await groqResponse.json();
      const translatedText = data.choices[0].message.content.trim();

      // Return successful response
      return new Response(
        JSON.stringify({ 
          success: true,
          translation: translatedText,
          language: langName
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error', message: error.message }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }
  },
};