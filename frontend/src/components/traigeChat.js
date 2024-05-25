import { useEffect, useRef, useState } from "react";
import { getAnswer } from "../config/config";

const triageQuestions = [
  "What symptoms are you experiencing?",
  "How severe are your symptoms on a scale of 1-10?",
  "Have you experienced these symptoms before?",
  "Are you experiencing any difficulty breathing or chest pain?",
];

export default function TriageChat() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [conversation, setConversation] = useState([]);
  const [AIRec, setAIRec] = useState("");
  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, AIRec]);

  async function handleSubmit(e) {
    e.preventDefault();
    const answer = e.target.elements.answer.value;

    const newConversation = [
      ...conversation,
      { question: triageQuestions[questionIndex], answer },
    ];

    if (questionIndex === triageQuestions.length - 1) {
      console.log(`new conversation is ${JSON.stringify(newConversation)}`);
      const result = await getAnswer(newConversation);
      setConversation(newConversation);
      setAIRec(result);
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log(`new conversation is ${JSON.stringify(newConversation)}`);
      console.log(`updated question index to ${questionIndex + 1}`);
      setConversation(newConversation);
      setQuestionIndex(questionIndex + 1);
    }

    e.target.reset();
  }

  return (
    <main className="w-full h-screen flex flex-col ">
      <div className="flex-1 flex flex-col items-center overflow-auto p-4 scrollbar">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600">
            ED TRIAGE AI
          </h1>
          <div className="mt-4 flex flex-col space-y-4">
            {conversation.map((entry, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-md">
                  <p className="text-base text-gray-900 dark:text-gray-100">
                    <strong>AI:</strong> {entry.question}
                  </p>
                </div>
                <div className="text-base bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  <p className="text-gray-900 dark:text-gray-100">
                    <strong>You:</strong> {entry.answer}
                  </p>
                </div>
              </div>
            ))}
            {questionIndex < triageQuestions.length && (
              <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-md">
                <p className="text-base text-gray-900 dark:text-gray-100">
                  <strong>AI:</strong> {triageQuestions[questionIndex]}
                </p>
              </div>
            )}
            <div ref={conversationEndRef}></div>
          </div>
          {AIRec !== "" && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-base text-gray-900 dark:text-gray-100">
                <strong>TriageAI Recommendation:</strong> {AIRec}
              </p>
            </div>
          )}
        </div>
      </div>
      {questionIndex < triageQuestions.length && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto p-4 flex flex-col"
        >
          <textarea
            name="answer"
            placeholder="Type your answer here..."
            className="w-full resize-none border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Submit
          </button>
        </form>
      )}
      <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50">
        <span>
          The recommendation is generated from Artificial Intelligence and may
          include inaccurate information, hence it is meant to be reviewed by a
          medical professional.
        </span>
      </div>
    </main>
  );
}
