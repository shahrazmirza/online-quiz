"use client";
import { useState, useEffect } from "react";
import questionsData from "../data/javaScriptQuestions.json";

function javaScript() {
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuiz(shuffled.slice(0, 10));
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const score = quiz.reduce(
    (total, q) => total + (userAnswers[q.id] === q.answer ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          JavaScript Quiz
        </h1>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {quiz.map((q, idx) => (
              <div
                key={q.id}
                className="mb-6 border border-gray-200 p-6 rounded-lg hover:shadow-md transition duration-300"
              >
                <p className="font-semibold text-lg mb-3 text-gray-700">
                  {idx + 1}. {q.question}
                </p>
                {q.options.map((option) => {
                  const optionVal = option.charAt(0);
                  return (
                    <div key={option} className="mb-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={optionVal}
                          checked={userAnswers[q.id] === optionVal}
                          onChange={() => handleAnswerChange(q.id, optionVal)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-3 text-gray-600">{option}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-xl"
            >
              Submit Quiz
            </button>
          </form>
        ) : (
          <div className="results">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Your Score: {score} / {quiz.length}
            </h2>
            {quiz.map((q, idx) => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.answer;
              const correctOption = q.options.find(
                (option) => option.charAt(0) === q.answer
              );
              return (
                <div
                  key={q.id}
                  className="mb-6 border border-gray-200 p-6 rounded-lg"
                >
                  <p className="font-semibold text-lg text-gray-700">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-medium">Your answer:</span>{" "}
                    {userAnswer ? userAnswer : "No answer selected"}
                  </p>
                  {!isCorrect && (
                    <p className="mt-2 text-red-600">
                      <span className="font-medium">Correct answer:</span>{" "}
                      {correctOption}
                    </p>
                  )}
                  {isCorrect && (
                    <p className="mt-2 text-green-600 font-medium">Correct!</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default javaScript;
