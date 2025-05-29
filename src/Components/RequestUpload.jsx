import React from "react";
import User from "../db/User";

function RequestUpload() {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File "${file.name}" selected for upload`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Request submitted for upload access.");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {User.uploadApprove === "yes" && (
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-semibold mb-4">Upload Notes</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Notes uploaded successfully.");
            }}
            className="space-y-4"
          >
            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">Upload File</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleUpload}
                className="w-full border border-gray-300 rounded p-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Only <strong>PDF</strong> or <strong>DOC</strong> files under
                10MB are allowed.
              </p>
            </div>

            {/* Branch */}
            <div>
              <label className="block font-medium mb-1">Branch</label>
              <select
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Branch</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics and Communication</option>
                <option value="EE">Electrical Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="CE">Civil Engineering</option>
                <option value="ME">Mechanical Engineering</option>
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block font-medium mb-1">Semester</label>
              <select
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={`${i + 1}`}>
                    {i + 1} Semester
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Engineering Mathematics"
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block font-medium mb-1">
                Your Grade in this Subject
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Grade</option>
                <option value="O">O (Outstanding)</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="F">F (Fail)</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Submit Notes
            </button>
          </form>
        </div>
      )}

      {User.uploadApprove === "no" && (
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-semibold mb-2">Request Upload Access</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please submit your details to request upload permission.
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="marksheet" className="block font-medium">
                Marksheet{" "}
                <span className="text-gray-500">
                  (of the semester whose notes you want to upload)
                </span>
              </label>
              <input
                type="file"
                id="marksheet"
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label htmlFor="semester" className="block font-medium">
                Semester
              </label>
              <select
                id="semester"
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>

            <div>
              <label htmlFor="cgpa" className="block font-medium">
                SGPA{" "}
                <span className="text-gray-500">(of the same semester)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                id="cgpa"
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                placeholder="e.g. 8.4"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}

      {User.uploadApprove === "Access Denied" && (
        <div className="bg-red-100 text-red-800 p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p>
            Sorry, your request to upload notes was denied. Please work on
            improving your academic performance and try again next semester.
          </p>
        </div>
      )}
    </div>
  );
}

export default RequestUpload;
