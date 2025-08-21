import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import SurveyQuestion from "../components/SurveyQuestion";
import ProgressBar from "../components/ProgressBar";
import BgGradient from "../components/BgGradient";
import Loading from "../components/Loading";

import { getQuestions } from "../api";

const Survey = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getQuestions().then((res) => {
      setQuestions(res.data.questions);
      setIsLoading(false);
    });
  }, []);

  // Verify that all the questions were answered
  useEffect(() => {
    const questionsAnswered = Object.keys(answers).length === questions.length;
    setAllQuestionsAnswered(questionsAnswered);
  }, [answers]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Save the answers in localStorage to use them in the results page
  const handleSubmit = () => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
    navigate("/results");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex items-center justify-center relative w-full min-h-screen bg-[#060F0E]">
      <BgGradient />

      <div className="flex flex-row w-full min-h-screen">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between flex-2 min-h-screen px-10 md:px-14 lg:px-20 survey-container">
          {/* Progress Bar */}
          <div className="flex justify-end mt-8">
            <ProgressBar
              currentStep={currentQuestionIndex + 1}
              totalSteps={questions.length}
            />
          </div>

          {/* Question */}
          <span className="font-light text-2xl md:text-3xl lg:text-4xl text-white">
            {currentQuestion.question}
          </span>

          <div className="h-20"></div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between flex-3 min-h-screen px-10 bg-none md:bg-white/4 border border-l-1 border-[#999999]/40 survey-container">
          {/* Bar */}
          <div className="flex items-center justify-between mt-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/frontfind-logo.svg"
                alt="FrontFind Logo"
                className="size-8 lg:size-10"
              />

              <span className="text-base lg:text-xl font-bold text-[#B4B4B4]">
                FrontFind
              </span>
            </div>
            {/* Progress Bar */}
            <div className="flex md:hidden justify-end">
              <ProgressBar
                currentStep={currentQuestionIndex + 1}
                totalSteps={questions.length}
              />
            </div>
          </div>

          {/* Container */}
          <div className="px-10 md:px-14 lg:px-20">
            {/* Question */}
            <span className="flex md:hidden font-light text-3xl mb-8">
              {currentQuestion.question}
            </span>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-[#E6FF79] mb-5">
              Choose an option
            </h1>
            {/* Options */}
            {currentQuestion && (
              <SurveyQuestion
                options={currentQuestion.options}
                currentAnswer={answers[currentQuestion.id]}
                onAnswerChange={handleAnswerChange}
                multiSelect={Boolean(currentQuestion.multiSelect) || false}
                maxSelections={currentQuestion.maxSelections || 1}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-end gap-3 mb-8">
            <button
              className="survey-btn rounded-l-full"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className="survey-btn rounded-r-full"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                Next
              </button>
            ) : (
              <button
                className="survey-btn rounded-r-full"
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
              >
                View results
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Survey;
