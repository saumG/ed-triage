import { OpenAI } from "@langchain/openai";

console.log("OpenAI API Key:", process.env.REACT_APP_OPENAI_API_KEY); // Add this line for debugging

const llm = new OpenAI({
  openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function getAnswer(question) {
  let answer = "";

  try {
    answer = await llm.invoke(question);
  } catch (e) {
    console.error(e);
  }

  return answer;
}
