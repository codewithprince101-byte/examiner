"use server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export async function generateQuestions(topic: string, templateId: number) {
  // 1. Initialize the API
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  // 2. Configure the model
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });

  // 3. Dynamic Instruction Logic based on Template
  let formatInstruction = "";

  switch (templateId) {
    case 1:
      formatInstruction = `Generate exactly 10 Multiple Choice Questions (MCQs). 
      For each question, include 2 options labeled A, B, C, and D. 
      The 'question' field should include the options text.`;
      break;
    case 2:
      formatInstruction = `Generate exactly 10 "Very Short Answer" questions. 
      Answers must be strictly 1 sentence long.`;
      break;
    case 3:
      formatInstruction = `Generate exactly 5 "Short Answer" questions. 
      Answers should be 3-4 sentences long and provide a clear explanation.`;
      break;
    default:
      formatInstruction = `Generate 10 standard academic questions.`;
  }

  // 4. The Master System Prompt
  const systemPrompt = `You are an expert academic examiner for 9th-grade board exams.
  
  ${formatInstruction}
  
  Topic: ${topic}

  Strict Constraints:
  1. Difficulty: Standard 9th-grade level.
  2. Format: You must output ONLY a valid JSON array of objects with "question" and "answer" keys.
  3. No conversational filler or markdown code blocks.
  
  Expected JSON Structure:
  [
    {"question": "Text of the question", "answer": "The expected answer"}
  ]`;

  try {
    const result = await model.generateContent([systemPrompt, topic]);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error("Examiner AI Error:", error);
    return null;
  }
}
