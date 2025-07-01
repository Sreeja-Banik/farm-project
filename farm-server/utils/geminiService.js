// const axios = require('axios');
const { GoogleGenAI } = require("@google/genai");
// async function askGemini(prompt) {
async function askGemini(prompt, context = "") {
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const fullPrompt = `
${context ? `Here is some context:\n${context}\n\n` : ""}
User: ${prompt}
AI:
`;

    // const cache = await ai.caches.create({
    //     model: "gemini-2.0-flash",
    //     config: {
    //         contents: createUserContent(`Here is some context data:\n${context}` ),
    //         systemInstruction: "You are an expert in agriculture and farming equipments. You are very helpful and friendly.",
    //     },
    // });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `I want to know is : ${prompt} \nHere are some context data:\n${context}`,
        // config:{
        //     cachedContent: cache.name
        // }
        config: {
            // contents: createUserContent(`Here is some context data:\n${context}` ),
            systemInstruction: "You are an expert in agriculture and farming equipments. You are very helpful and friendly.",
        },
    });
    // console.log(response.text);
    //
    // // return response.data.candidates[0].content.parts[0].text;
    // return response.text;

    // const result = await ai.models.generateContent({
    //     model: "gemini-2.0-flash",
    //     contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    // });
    //
    // const response = await result.response;
    // const text = response.text();
    // return text;

    // const response = await ai.models.generateContent({
    //     model: "gemini-2.0-flash",
    //     contents: [
    //         { role: "system", parts: `Here is some context data:\n${context}` },
    //         { role: "user", parts: prompt },
    //     ],
    // });

    return response.text;
}

module.exports = { askGemini };

