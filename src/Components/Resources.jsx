// Resources.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Resources() {
  const navigate = useNavigate();
  const branches = [
    "Electrical Engineering",
    "Information Technology",
    "Computer Science",
    "Civil Engineering",
  ];

  const handleBranchClick = (branch) => {
    navigate(`/sem/${encodeURIComponent(branch)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="grid grid-cols-2 gap-6">
        {branches.map((branch, index) => (
          <div
            key={index}
            onClick={() => handleBranchClick(branch)}
            className="cursor-pointer flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src="https://img.freepik.com/premium-vector/electrical-engineering-logo-design-creative-modern-concept-with-construction-safety-cap-vector_556845-963.jpg?semt=ais_hybrid&w=740"
              alt={branch}
              className="w-20 rounded-full"
            />
            <p>{branch}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
