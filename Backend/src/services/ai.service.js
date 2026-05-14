const Groq = require("groq-sdk")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const MODEL = "llama-3.3-70b-versatile"


const interviewReportSchema = z.object({
    matchScore: z.number(),
    title: z.string(),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"])
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    })),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `You are an expert career coach and technical interviewer. Generate a detailed interview preparation report for the candidate below.

Resume: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}

Respond ONLY with a valid JSON object (no markdown, no extra text) matching this exact structure:
{
  "title": "Job title extracted from the job description",
  "matchScore": <number 0-100, how well the candidate matches the job>,
  "technicalQuestions": [
    { "question": "...", "intention": "Why the interviewer asks this", "answer": "How to answer, key points to cover" }
  ],
  "behavioralQuestions": [
    { "question": "...", "intention": "...", "answer": "..." }
  ],
  "skillGaps": [
    { "skill": "skill name", "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "Topic to study", "tasks": ["task1", "task2"] }
  ]
}

Include at least 5 technical questions, 3 behavioral questions, and a 7-day preparation plan.`

    const response = await groq.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
    })

    const parsed = JSON.parse(response.choices[0].message.content)
    return interviewReportSchema.parse(parsed)
}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const prompt = `You are a professional resume writer. Generate a polished, ATS-friendly HTML resume for the candidate below.

Resume/Experience: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}

Respond ONLY with a valid JSON object (no markdown, no extra text) in this exact format:
{ "html": "<full HTML resume here>" }

Requirements for the HTML resume:
- Tailored to the job description, highlighting relevant skills and experience
- Professional, clean design with subtle colors and good typography (use inline CSS only)
- ATS-friendly structure (no tables for layout, use divs and semantic tags)
- 1-2 pages when printed to A4 PDF
- Do NOT sound AI-generated — write naturally like a real human resume
- Include sections: Contact, Summary, Experience, Skills, Education (as applicable)`

    const response = await groq.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
    })

    const jsonContent = JSON.parse(response.choices[0].message.content)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }