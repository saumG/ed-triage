import { OpenAI } from "@langchain/openai";

// console.log("OpenAI API Key:", process.env.REACT_APP_OPENAI_API_KEY); // Add this line for debugging

const llm = new OpenAI({
  openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function getAnswer(conversation) {
  let answer = "";

  const prompt = `
  You are a triage AI nurse. Your goal is to ask a maximum of 4 questions to determine the patient's triage score from 1 to 5. After the conversation, make an educated case about the patient's triage score based on their responses.

  Conversation:
  ${conversation
    .map(
      (entry, index) =>
        `${index + 1}. Nurse: ${entry.question} Patient: ${entry.answer}`
    )
    .join("\n")}

  Based on this short conversation, provide the triage score and explain your reasoning.
  `;

  try {
    answer = await llm.invoke(prompt);
  } catch (e) {
    console.error(e);
  }

  console.log(answer);
  return answer;
}
