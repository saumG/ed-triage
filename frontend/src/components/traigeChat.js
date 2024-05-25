import { useState } from "react";
import { getAnswer } from "../config/config";

export default function TriageChat() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await getAnswer(question);

    setConversation((prevConversation) => [
      ...prevConversation,
      { question, answer: result },
    ]);
    setQuestion(""); // Clear the input after submission
  }

  return (
    <main className="overflow-hidden w-full h-screen relative flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex-1 w-full max-w-lg px-4 py-6">
          <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600">
            ED TRIAGE AI
          </h1>
          <div className="mt-4 flex flex-col space-y-4">
            {conversation.map((entry, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-md">
                  <p className="text-base text-gray-900 dark:text-gray-100">
                    <strong>You:</strong> {entry.question}
                  </p>
                </div>
                <div className="text-base bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  <p className="text-gray-900 dark:text-gray-100">
                    <strong>AI:</strong> {entry.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.currentTarget.value)}
              placeholder="Enter your symptoms here.."
              className="w-full resize-none border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50">
        <span>
          The responses may include inaccurate information about people, places,
          or facts.
        </span>
      </div>
    </main>
  );
}
