

"use client";

import React, { useState, useEffect } from "react";
import { quizQuestions } from "@/utils/constants"; // Import your quiz questions
import Link from "next/link";
import QuizHeader from "./Header";
import QuizFooter from "./Footer";

const Numbers = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [allAnswered, setAllAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10); // Timer state for 2 minutes

  useEffect(() => {
    const initialOptions: { [key: number]: number | null } = {};
    quizQuestions.forEach((_, index) => {
      initialOptions[index] = null;
    });
    setSelectedOptions(initialOptions);
  }, []);

  useEffect(() => {
    const answered = Object.values(selectedOptions).every(
      (option) => option !== null
    );
    setAllAnswered(answered);
  }, [selectedOptions]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: optionIndex,
    }));

    setBookmarkedQuestions((prevBookmarks) =>
      prevBookmarks.filter((index) => index !== questionIndex)
    );
  };

  const handleSaveAndNext = () => {
    setSelectedQuestion((prev) => Math.min(prev + 1, quizQuestions.length - 1));
  };

  const handleClearResponse = () => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [selectedQuestion]: null,
    }));
  };

  const handleBookmark = () => {
    setBookmarkedQuestions((prev) => {
      if (prev.includes(selectedQuestion)) {
        return prev.filter((index) => index !== selectedQuestion);
      }
      return [...prev, selectedQuestion];
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
    const handleSubmit = () => {
    setShowModal(false);
    setQuizSubmitted(true); // Show quiz submission modal
  };

//   const handleSubmit = () => {
//     setShowModal(false);
//     // Handle quiz submission logic
//   };

  const handleReviewNext = () => {
    // Logic for marking question for review and going to the next question
    handleSaveAndNext();
  };

  const getQuestionColor = (index: number) => {
    if (selectedOptions[index] !== null) return "bg-green-500";
    if (bookmarkedQuestions.includes(index)) return "bg-blue-500";
    return "bg-gray-300";
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <QuizHeader timeLeft={timeLeft} title="Quiz" />
      
      <div className="grid grid-cols-4">
        <div className="col-span-1 bg-gray-100 p-4 h-screen">
          <h3 className="font-bold text-lg mb-4">Chapter 1</h3>
          <div className="grid grid-cols-5 gap-2">
            {quizQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedQuestion(i)}
                className={`w-10 h-10 rounded-full text-white ${getQuestionColor(i)}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-3 bg-white p-4">
          <div>
            <h3 className="font-bold text-lg mb-4">
              Question {selectedQuestion + 1}:{" "}
              {quizQuestions[selectedQuestion].question}
            </h3>
            <ul>
              {quizQuestions[selectedQuestion].options.map(
                (option, optIndex) => (
                  <li key={optIndex} className="mb-2">
                    <input
                      className="cursor-pointer"
                      type="radio"
                      id={`option-${selectedQuestion}-${optIndex}`}
                      name={`question-${selectedQuestion}`}
                      checked={selectedOptions[selectedQuestion] === optIndex}
                      onChange={() => handleOptionSelect(selectedQuestion, optIndex)}
                    />
                    <label
                      htmlFor={`option-${selectedQuestion}-${optIndex}`}
                      className="ml-2"
                    >
                      {option}
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>
          
          <QuizFooter
            onBookmark={handleBookmark}
            onClearResponse={handleClearResponse}
            onReviewNext={handleReviewNext}
            onSaveAndNext={handleSaveAndNext}
            isAnswered={selectedOptions[selectedQuestion] !== null}
            isLastQuestion={selectedQuestion === quizQuestions.length - 1}
            bookmarked={bookmarkedQuestions.includes(selectedQuestion)}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Submit Quiz</h3>
            <p>Are you sure you want to submit your answers?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )};
       {quizSubmitted && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-lg font-bold mb-4">Quiz Submitted</h3>
        <p>Your quiz has been submitted successfully!</p>
        <div className="mt-4 flex justify-end">
        <Link href="/Home">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  close
                </button>
              </Link>
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setQuizSubmitted(false)} // Close the modal
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  )}
    </div>
  );
};

export default Numbers;
