// Result.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import data from "../db/data"; 

function Result() {
  const query = new URLSearchParams(useLocation().search);
  const branch = query.get("branch");
  const semester = query.get("semester");

  const filteredResults = data.filter((item) => {
    return (
      item.branch.toLowerCase() === branch.toLowerCase() &&
      item.year.toLowerCase().includes(semester[0]) 
    );
  });

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">
        Results for {branch} - {semester}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredResults.length > 0 ? (
          filteredResults.map((course, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.img || "https://placehold.co/150x100"}
                alt={course.title}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
              <div className="flex items-center text-yellow-500 mt-1">
                {course.star}
                <span className="text-sm text-gray-600 ml-1">
                  {course.reviews}
                </span>
              </div>
              <div className="text-sm mt-2">
                <span className="line-through text-gray-400 mr-2">
                  ₹{course.prevPrice}
                </span>
                <span className="text-green-600 font-bold">
                  ₹{course.newPrice}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No resources found for {branch} - {semester}.
          </p>
        )}
      </div>
    </div>
  );
}

export default Result;
