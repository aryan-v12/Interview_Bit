# Interview_Bit

Interview_Bit is a full-stack AI-powered application that generates highly personalized, day-by-day interview preparation strategies, technical and behavioral questions, and skill gap analyses based on a candidate's resume and target job description. 

It uses the **Groq API** (`llama-3.3-70b-versatile`) to generate intelligent, human-like reports and can also generate a professional, ATS-friendly PDF resume tailored for the job.

![Interview_Bit Preview](https://via.placeholder.com/1200x600.png?text=Interview_Bit+UI+Preview)

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: SCSS (Midnight Navy theme, Glassmorphism UI, Custom gradients)
- **Fonts**: Poppins (Headings/UI) & Plus Jakarta Sans (Body)
- **Routing**: React Router DOM

### Backend
- **Environment**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Groq SDK (`llama-3.3-70b-versatile`)
- **PDF Handling**: `pdf-parse` (v1.1.1 for safe Node environment parsing) & `puppeteer` (for HTML to PDF generation)

---

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd interview-ai-yt
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```
Start the backend server:
```bash
npm run dev
```
*(Server will run on `http://localhost:3000`)*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Frontend
npm install
```
Start the Vite development server:
```bash
npm run dev
```
*(Frontend will run on `http://localhost:5173`)*

---

## 🌍 Deployment Guide

This project is structured as a monorepo with separate `Frontend` and `Backend` directories. 

### Deploying the Backend (e.g., Render, Railway, Heroku)
1. Set the root directory to `Backend` or deploy the `Backend` folder specifically.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. **Important**: Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `GROQ_API_KEY`) in the hosting provider's dashboard.
5. **Note on Puppeteer**: If deploying to a serverless environment (like Render), you may need to configure Puppeteer to download the correct Chromium binary, or use a lightweight alternative if memory is highly restricted.

### Deploying the Frontend (e.g., Vercel, Netlify)
1. Set the root directory to `Frontend` in your deployment settings.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. **Environment Variables**: If you hardcoded `http://localhost:3000` in the frontend API calls, you must update `src/features/auth/services/auth.api.js` and `src/features/interview/services/interview.api.js` to point to your **deployed backend URL**. 
   *(Recommended: Use a `.env.production` file with `VITE_API_URL=https://your-backend-url.com`)*

---

## ✨ Features
- **Secure Authentication**: JWT-based login/register flow.
- **AI Resume Parsing**: Extracts text from uploaded PDFs safely using `pdf-parse@1.1.1`.
- **Intelligent Reports**: Generates a Match Score, Technical & Behavioral Questions, Skill Gaps, and a Multi-Day Preparation Roadmap.
- **Resume Generator**: Generates an ATS-friendly, tailored HTML resume and converts it to a downloadable PDF.
- **Premium UI/UX**: Midnight Navy palette with subtle gradients, glassmorphism authentication cards, and smooth CSS animations.
