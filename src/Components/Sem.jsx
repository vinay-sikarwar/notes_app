// Sem.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Sem() {
  const { branch } = useParams();
  const navigate = useNavigate();

  const semesters = [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
  ];

  const handleSemClick = (semester) => {
    
    navigate(
      `/results?branch=${encodeURIComponent(
        branch
      )}&semester=${encodeURIComponent(semester)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Branch: {branch}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {semesters.map((sem, index) => (
          <div
            key={index}
            onClick={() => handleSemClick(sem)}
            className="cursor-pointer flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`https://placehold.co/100x100?text=${sem.split(" ")[0]}`}
              alt={sem}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
            />
            <p className="mt-3 text-center text-gray-700 font-semibold">
              {sem}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sem;
