import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { personalInfo, experiences, skillCategories, projects, services, certifications, educations, statistics } from './src/data/portfolio';

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey 
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'ombhavsar-portfolio',
        }
      }
    })
  : null;

// Standard offline keyword matcher for OB Assistant Chatbot
function getOfflineFallbackResponse(message: string) {
  const msg = message.toLowerCase();
  
  if (msg.includes('study') || msg.includes('education') || msg.includes('college') || msg.includes('school') || msg.includes('timeline') || msg.includes('diploma') || msg.includes('degree')) {
    return {
      reply: "Om Bhavsar is currently pursuing a Diploma in Artificial Intelligence & Machine Learning under the Maharashtra State Board of Technical Education (MSBTE) (2024 – 2027), and completed his Computer Programming Certification at I-Tech System in 2024. Let me show you his detailed academic timeline!",
      navigate: "education"
    };
  }
  
  if (msg.includes('cert') || msg.includes('qualification') || msg.includes('course') || msg.includes('ea') || msg.includes('sports') || msg.includes('deloitte')) {
    return {
      reply: "Om has earned excellent credentials, including EA Sports Software Engineering Job Simulation, Deloitte Australia Cybersecurity Job Simulation, and Java/Programming certifications. I've scrolled you down to the Credentials & Certificates section so you can view them!",
      navigate: "certifications"
    };
  }
  
  if (msg.includes('service') || msg.includes('offer') || msg.includes('solution') || msg.includes('pricing') || msg.includes('seo') || msg.includes('e-commerce') || msg.includes('landing')) {
    return {
      reply: "Om offers bespoke Full-Stack Development, Custom Website Creation, AI integrations (such as LLMs prompting and embeddings), SEO Optimization, and conversion-friendly Landing Pages. Let me show you his available Engineering Services!",
      navigate: "services"
    };
  }
  
  if (msg.includes('project') || msg.includes('work') || msg.includes('showcase') || msg.includes('thrift') || msg.includes('unicorn') || msg.includes('build')) {
    return {
      reply: "Some of Om's premier projects include 'My Thrift Crew' (a collaborative fashion-forward marketplace catalog) and 'Jersey Unicorn' (an e-commerce kit customizer powered by interactive AI recommendations). I will shift your view directly to his Projects work gallery!",
      navigate: "work"
    };
  }
  
  if (msg.includes('book') || msg.includes('schedule') || msg.includes('call') || msg.includes('calendar') || msg.includes('meeting') || msg.includes('talk') || msg.includes('appoin')) {
    return {
      reply: "I'd be thrilled to help you connect with Om for an interactive call or collaboration! Let me navigate you directly to his contact section where you can form-message him, send an email, or connect via custom platforms.",
      navigate: "contact"
    };
  }
  
  if (msg.includes('experience') || msg.includes('intern') || msg.includes('softcrowd') || msg.includes('freelance') || msg.includes('job') || msg.includes('r-tech')) {
    return {
      reply: "Om works as an AI & ML Intern at SoftCrowd Technologies Nashik and as a Freelance Full-Stack Developer. Previously, he worked as a Frontend Developer at R-Tech Solutions where he overhauled corporate components. Let me redirect you to his Experience section!",
      navigate: "experience"
    };
  }
  
  if (msg.includes('skills') || msg.includes('tech') || msg.includes('python') || msg.includes('react') || msg.includes('typescript') || msg.includes('java') || msg.includes('database')) {
    return {
      reply: "Om is proficient in Python, Java, C++, Javascript, and TypeScript. His specialties include React, Tailwind CSS, Node.js, and Supabase integration. I have directed your window to his Skills panel!",
      navigate: "skills"
    };
  }
  
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('phone') || msg.includes('whatsapp') || msg.includes('email') || msg.includes('number')) {
    return {
      reply: "You can reach out to Om Bhavsar directly using his email (ombhavsar552@gmail.com), calls/WhatsApp (+91 8208461469), or LinkedIn. Let me navigate you directly to his contact form section!",
      navigate: "contact"
    };
  }
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('who are you') || msg.includes('bot') || msg.includes('help')) {
    return {
      reply: "Hello! I am 'OB Assistant', Om's smart virtual helper. Ask me about his software projects, Machine Learning internships, certifications, academic path, or services!",
      navigate: ""
    };
  }
  
  return {
    reply: "As Om's personal AI, I can tell you about his AI/ML algorithms research, Full-Stack applications (like Jersey Unicorn or My Thrift Crew), education background, and freelance web services. What would you like to inquire about?",
    navigate: ""
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route: OB Assistant Chatbot
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    // --- LATENCY OPTIMIZATION: INSTANT PATH INTERCEPTOR ---
    // If the query directly matches a known section keyword or common greeting,
    // resolve locally and immediately bypass the model generation to ensure an instant response!
    const cleanMsg = message.toLowerCase().trim().replace(/[?.,!;]/g, '');
    const matchedLocal = getOfflineFallbackResponse(cleanMsg);
    if (matchedLocal.navigate !== "" || cleanMsg === 'hello' || cleanMsg === 'hi' || cleanMsg === 'hey' || cleanMsg === 'who are you' || cleanMsg === 'bot' || cleanMsg === 'help') {
      console.log(`⚡ Instant local intercept triggered (0ms latency) for: "${message}" -> Target: "${matchedLocal.navigate}"`);
      return res.json(matchedLocal);
    }

    const currentApiKey = process.env.GEMINI_API_KEY;

    if (!currentApiKey || !ai) {
      console.log('💡 GEMINI_API_KEY environment variable is not set or client is idle. Processing query via smart local rules.');
      return res.json(matchedLocal);
    }

    try {
      const systemInstruction = `
You are "OB Assistant" – an elite, charming, professional personal AI chatbot representative of Om Bhavsar.
Om Bhavsar is a talented AI & Machine Learning Engineer and Full-Stack Developer located in Nashik, Maharashtra, India.
Always answer only questions regarding Om Bhavsar, his background, his work, services, and portfolio records.
Do NOT assist with general-purpose programming, math, history, or recipe tasks unless they are directly illustrative of Om's professional domain. For any completely unrelated question, guide the user warmly stating you only assist with topics concerning Om's professional background.

Om's details for referencing:
Name: ${personalInfo.name}
Titles: ${JSON.stringify(personalInfo.titles)}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}
Summary: ${personalInfo.summary}

Experiences:
${JSON.stringify(experiences)}

Skills category:
${JSON.stringify(skillCategories)}

Portfolio Projects:
${JSON.stringify(projects)}

Services Offered:
${JSON.stringify(services)}

Credentials & Certifications:
${JSON.stringify(certifications)}

Education History:
${JSON.stringify(educations)}

Statistics & Achievements Summary:
${JSON.stringify(statistics)}

NAVIGATION DIRECTIVES INSTRUCTIONS:
If the user indicates an interest, request, or intention to see, view, go to, learn about, or navigate to a specific section, you MUST respond with the matching target value in the "navigate" field.
Target values:
- 'education' if they want to see, know, or show the education timeline, degrees, MSBTE, diploma, SIS, or school.
- 'certifications' if they ask about credentials, certificates, EA sports, Deloitte, or standard certifications.
- 'services' if they want to view details about custom websites, pricing details, full stack work, or solutions he offers.
- 'achievements' if they ask about stats, projects counted, freelance clients, or metrics.
- 'contact' if they ask to contact, book a call, schedule a meeting, send a message, fill contact form, email, or telephone.
- 'work' if they ask to view completed projects, thrift crew, jersey unicorn, or his products showcase.
- 'skills' if they speak about technologies, programming languages, python, or frontend stack.
- 'about' if they desire his bio summary/history.
- 'home' if they request to go back to the top or home view.
- 'experience' if they ask about his job experience, internships, or SoftCrowd.
Otherwise, set 'navigate' to "".

Make responses conversational, highly readable, concise, and structured (no more than 2-3 short, clear paragraphs).
`;

      const formattedContents = [];
      if (Array.isArray(history)) {
        // Latency Optimization: Restrict history context to the last 4 exchanges to minimize model parsing overhead
        const trimmedHistory = history.slice(-4);
        for (const chatMsg of trimmedHistory) {
          formattedContents.push({
            role: chatMsg.role === 'user' ? 'user' : 'model',
            parts: [{ text: chatMsg.content || chatMsg.text }]
          });
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      console.log(`🧠 Querying chat assistant model for: "${message}"`);
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: 'Your conversational reply answering the user query about Om.'
              },
              navigate: {
                type: Type.STRING,
                description: 'The section identification key to navigate to.'
              }
            },
            required: ['reply', 'navigate']
          },
          // Latency Optimization: Lower temperature and restrict maximum tokens to return response much quicker
          temperature: 0.1,
          candidateCount: 1
        }
      });

      const text = response.text || '';
      const parsed = JSON.parse(text.trim() || '{}');
      return res.json({
        reply: parsed.reply || "I'm happy to tell you more about Om's programming path!",
        navigate: parsed.navigate || ''
      });

    } catch (apiError: any) {
      console.error('❌ Assistant backend dispatch failed, running local matching fallback:', apiError);
      return res.json(matchedLocal);
    }
  });

  // API route first: Resend Email Proxy
  app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const toEmail = process.env.RESEND_TO_EMAIL || 'ombhavsar552@gmail.com';

    console.log('--- EMAIL NOTIFICATION RECEIVED ---');
    console.log(`Sender Config (From): ${fromEmail}`);
    console.log(`Recipient Config (To): ${toEmail}`);
    console.log(`Inquirer: ${name} <${email}>`);
    console.log(`Subject: ${subject || '(No Subject)'}`);
    
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('❌ Configuration Error: RESEND_API_KEY environment variable is not set. Please configure it in your server environment variables.');
      return res.status(500).json({
        error: 'RESEND_API_KEY is not configured on the server. Please define the RESEND_API_KEY environment variable in your deployment configuration in the Settings menu.'
      });
    }

    const resendClient = new Resend(resendApiKey);

    try {
      const formattedBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`;
      
      console.log('Attempting to send email via Resend API...');
      const result = await resendClient.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: subject ? `Portfolio Query: ${subject}` : 'New Portfolio Inquiry',
        replyTo: email,
        text: formattedBody,
      });

      if (result.error) {
        console.error('❌ Resend API returned error:', result.error);
        
        // Add specific diagnostic help
        let suggestHelp = '';
        if (result.error.name === 'validation_error' || result.error.message?.includes('verify')) {
          suggestHelp = ' (Hint: If you verified a custom domain on your Resend account, you MUST set the RESEND_FROM_EMAIL environment variable to an email on your custom domain, e.g. "contact@yourdomain.com". If you are using onboarding@resend.dev, ensure you are sending to the single email address used to sign up for Resend).';
        }

        return res.status(400).json({ 
          error: `${result.error.message}${suggestHelp}`, 
          code: result.error.name 
        });
      }

      console.log('✅ Email notification dispatched successfully! Resend Response ID:', result.data?.id);
      return res.json({ success: true, messageId: result.data?.id });
    } catch (error: any) {
      console.error('❌ Unhandled exception while sending email:', error);
      return res.status(500).json({ error: error?.message || 'Internal server error while sending email via Resend.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack dev server is actively listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
