import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card";
import data from "../../db/data";

function Result() {
  const query = new URLSearchParams(useLocation().search);
  const branch = query.get("branch") || "";
  const semester = query.get("semester") || "";

  const filteredResults = React.useMemo(() => {
    if (!branch || !semester) return [];

    const semesterNumber = semester.match(/\d+/)?.[0];

    return data.filter((item) => {
      const itemBranch = item.branch?.toLowerCase() || "";
      const itemYear = item.year?.toLowerCase() || "";

      return (
        itemBranch === branch.toLowerCase() &&
        (semesterNumber ? itemYear.includes(semesterNumber) : false)
      );
    });
  }, [branch, semester, data]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        {branch && semester
          ? `Results for ${branch} - ${semester}`
          : "Please select branch and semester"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredResults.length > 0 ? (
          filteredResults.map((course, index) => (
            <Card key={index}>
              <img
                src={course.img || "https://placehold.co/300x200"}
                alt={course.title}
                className="w-full h-48 object-cover rounded mb-3"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center text-yellow-500 mb-2">
                {course.star}
                <span className="text-sm text-gray-600 ml-1">
                  ({course.reviews} reviews)
                </span>
              </div>
              <div className="text-lg">
                <span className="line-through text-gray-400 mr-2">
                  ₹{course.prevPrice}
                </span>
                <span className="text-green-600 font-bold">
                  ₹{course.newPrice}
                </span>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-500">
              {branch && semester
                ? `No resources found for ${branch} - ${semester}`
                : "Please select both branch and semester to view resources"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
