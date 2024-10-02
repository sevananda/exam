"use client";

import React from "react";

interface QuizHeaderProps {
  timeLeft: number;
  title: string;
}


const QuizHeader: React.FC<QuizHeaderProps> = ({ timeLeft, title }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className="bg-blue-600 text-white py-2 px-4 flex justify-between">
      <span>Time Left: {formatTime(timeLeft)} mins</span>
      <span className="font-bold">{title}</span>
      <h1 className="bg-orange-500 px-4 py-2 rounded">Mock Exam</h1>
    </div>
  );
};

export default QuizHeader;
