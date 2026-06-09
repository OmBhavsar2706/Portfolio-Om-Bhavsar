# Om Bhavsar | Professional Portfolio

A high-performance, premium, and fully responsive custom portfolio ecosystem showcasing the professional career, credentials, engineering services, and technical projects of Om Bhavsar — Artificial Intelligence & Machine Learning specialist and Full-Stack Developer.

---

## 🎨 Overview & Design Concept

This application is built with a bespoke **lunar Slate & Warm Gold theme** to deliver a sleek, minimalist, first-class user experience. Built with performance-first design and native fluidity, the portal balances elegant design mechanics with rich data density.

Key visual elements include:
*   **Deep Charcoal Canvas**: Off-whites, soft slate-tones, and amber-gold highlights to emphasize readability and high-contrast accessibility.
*   **Custom Glassmorphic Surface Shaders**: Custom displacement wave mapping filters running on high-efficiency SVG grids.
*   **Motion Transitions**: Spring-driven layout entries and interactive state morphing.
*   **Dynamic Background Sparx**: Clean interactive particles utilizing cursor gravity fields on click sequences.

---

## 🔧 Core Architectural Features

### 1. OB Assistant (Zero-Latency Intelligent Chat Agent)
An advanced interactive virtual helper that responds to user inquiries about Om's career timeline, project cases, services pricing, and technical skills.
*   **Hybrid Query Resolution**: Overcomes latency concerns by instantly intercepting navigation keywords on the client-side (0ms latency), falling back to a structured backend language model pipeline for deep contextual conversations.
*   **Custom Vector Branding**: Powered by an inline, premium geometric SVG avatar representing custom microprocessor node linkages.

### 2. High-Fidelity Credentials & Timeline Viewers
Interactive chronological maps tracking MSBTE Academy paths and prestigious digital job simulations from global institutions like EA Sports and Deloitte.
*   An integrated interactive viewer supports full-screen high-fidelity certification modals and credentials tracking.

### 3. Contact Form & Email Integration
A secure communication gate linking direct message entries to an integrated server-side Resend API dispatcher pipeline.

### 4. Custom Resume Builder & Document Generator
An online developer utility allowing prospective recruiters to generate, customize, and immediately download Om's official PDF resume dynamically on-demand.

---

## 💻 Technical Stack

*   **Frontend Library**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (Client-side Single Page Application wrapper)
*   **Programming Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-safety, clean modular interfaces)
*   **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first fluid typography and layout system)
*   **Animation Interface**: [Motion](https://motion.dev/) (Subtle and unified micro-animations and transition states)
*   **Backend Server**: [Express](https://expressjs.com/) (Node.js full-stack middleware serving static bundles and hosting APIs)
*   **AI Integration**: [@google/genai SDK](https://www.npmjs.com/package/@google/genai) (Conversational model routing and schema compliance checks)
*   **Email Deliverability**: [Resend](https://resend.com/) (Server-proxied notification pipelines)

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root workspace directory matching the structural definitions of `.env.example`:

```env
# Google GenAI API Key for the conversational assistant chatbot
GEMINI_API_KEY=your_gemini_api_key_here

# Resend Mail dispatch key for contact notifications
RESEND_API_KEY=your_resend_api_key_here
```

*Note: The application includes smart offline fallbacks; if keys are missing during development or testing, conversational structures and navigations remain fully operational locally!*

---

## 🚀 Execution & Lifecyle Commands

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

### 1. Installation of Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000` with the hot asset compiler active.

### 3. Production Compilation Build
```bash
npm run build
```
This script will:
1. Compile the web assets into standard production-optimized static files under `dist/`.
2. Bundle the backend Express server into a unified stand-alone CommonJS format (`dist/server.cjs`) with `esbuild` for maximum reliability and server cold-start optimization.

### 4. Running Production Server
```bash
npm run start
```
Starts the bundled, standalone enterprise portfolio server on port `3000`.

---

## 🛡️ License

Custom Developer Portfolio and Codebase. Designed and Maintained by Om Bhavsar. All rights reserved. Code and structure may be used as reference material for professional developer portals.
