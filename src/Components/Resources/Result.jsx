import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card";
import data from "../../db/data";
import ProductCard from "../ProductCard";

function Result() {
  const query = new URLSearchParams(useLocation().search);
  const branch = query.get("branch") || "";
  const semester = query.get("semester") || "";

  const filteredResults = React.useMemo(() => {
    if (!branch) return [];

    const semesterNumber = semester.match(/\d+/)?.[0];

    return data.filter((item) => {
      const itemBranch = item.branch?.toLowerCase() || "";
      const itemYear = item.year?.toLowerCase() || "";

      if (branch.toLowerCase() === "1st year") {
        // Match all resources for 1st Year (typically year 1 or similar)
        return itemYear.includes("1"); // Adjust this if your data uses different labels
      }

      // Normal case: match both branch and semester
      return (
        itemBranch === branch.toLowerCase() &&
        (semesterNumber ? itemYear.includes(semesterNumber) : false)
      );
    });
  }, [branch, semester]);

  const handleAddToCart = (course) => {
    console.log("Add to cart clicked for:", course.title);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <h2 className="mt-15 text-3xl font-bold text-center mb-8">
        {branch
          ? semester
            ? `Results for ${branch} - ${semester}`
            : `Results for ${branch}`
          : "Please select branch and semester"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredResults.length > 0 ? (
          filteredResults.map((course, index) => (
            <ProductCard
              key={index}
              title={course.title}
              subject={course.subject || "General"}
              numRatings={course.reviews}
              price={course.newPrice}
              btn={"Add to Cart"}
              onAddToCart={() => handleAddToCart(course)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-500">
              {branch
                ? `No resources found for ${branch}${
                    semester ? ` - ${semester}` : ""
                  }`
                : "Please select both branch and semester to view resources"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
