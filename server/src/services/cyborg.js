import { GoogleGenerativeAI } from '@google/generative-ai'
import config from '../config/config.js'

const genAI = new GoogleGenerativeAI(config.gemini.api_key)

export const analyseAndRespond = async (history, userMessage) => {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: 'application/json' }
    })

    const prompt = `
        You are a professional support agent for 'CloudKeep', a cloud storage Saas.
        Knowledge: Pro plan is $19/mo, Free plan is 5GB Refunds within 14 days only.

        Current History: ${history.map(m => `${m.role} : ${m.content}`).join('\n')}
        New User Message: "${userMessage}"

        TASK:
        1. Provide a helpful response.
        2. Rate your confidence (0.0 to 0.1).
        3. Provide a 5-word summary of the user's current need.

        RETURN ONLY JSON:
        {
            "answer": "String",
            "confidence": number,
            "summary": "string"
        }
    `

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()
        return JSON.parse(responseText)
    } catch (error) {
        console.error("Cyborg Error:", error);
        return {
            answer: "I'm having trouble thinking. Please try again.",
            confidence: 0,
            summary: "Error"
        }
    }
}