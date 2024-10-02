

"use client";

import React from "react";

interface QuizFooterProps {
  onBookmark: () => void;
  onClearResponse: () => void;
  onReviewNext: () => void;
  onSaveAndNext: () => void;
  isAnswered: boolean;
  isLastQuestion: boolean;
  bookmarked: boolean;
}

const QuizFooter: React.FC<QuizFooterProps> = ({
  onBookmark,
  onClearResponse,
  onReviewNext,
  onSaveAndNext,
  isAnswered,
  isLastQuestion,
  bookmarked,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 flex justify-between">
      <button
        className="bg-blue-500 px-4 py-2 rounded text-white"
        onClick={onBookmark}
      >
        {bookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
      <div className="space-x-4">
        <button
          className="bg-red-500 px-4 py-2 rounded text-white"
          onClick={onClearResponse}
        >
          Clear Response
        </button>
      </div>
      <button
        className={`bg-yellow-500 px-4 py-2 rounded text-white ${
          !isAnswered ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onReviewNext}
        disabled={!isAnswered}
      >
        Mark for Review & Next
      </button>
      <button
        className={`bg-green-500 px-4 py-2 rounded text-white ${
          !isAnswered ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onSaveAndNext}
        disabled={!isAnswered}
      >
        {isLastQuestion ? "Submit" : "Save & Next"}
      </button>
    </div>
  );
};

export default QuizFooter;
