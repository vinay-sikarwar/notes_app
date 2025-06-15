// RequestUpload.jsx
import React, { useState, useEffect } from "react"; // Import useEffect
// Assuming useAuth is correctly imported from your project structure
// import { useAuth } from "../db/AuthContext"; // Uncomment this for your actual app

// --- MOCK useAuth for demonstration ---
// In a real application, you would uncomment the line above and ensure
// your AuthContext is properly defined and exported from "../db/AuthContext".
// For the purpose of making this component runnable and demonstrating
// the marksheet scanning functionality, we'll mock the useAuth hook.
const useAuth = () => {
  // This is a placeholder for your actual authentication context.
  const [mockUser, setMockUser] = useState(() => {
    // Initialize from local storage if available
    const storedStatus = localStorage.getItem("marksheetEligibilityStatus");
    const storedAcademicDetails = localStorage.getItem("marksheetScannedData");
    return {
      uploadApprove: storedStatus || "no", // Initial status from local storage or "no"
      academicDetails: storedAcademicDetails
        ? JSON.parse(storedAcademicDetails)
        : null, // Initial academic details
    };
  });

  // We return setUser so that it can be called externally (by handleEligibilityResult)
  return { user: mockUser, setUser: setMockUser };
};
// --- END MOCK ---

import MarksheetScanner from "./MarksheetScanner"; // Import the scanner component

/**
 * RequestUpload Component
 * This component manages the logic for requesting upload access based on marksheet scanning
 * and allows note uploading if access is granted.
 */
function RequestUpload() {
  // Destructure user and setUser from the useAuth hook
  const { user, setUser } = useAuth();
  // Get the current upload approval status from the user object
  const uploadApprove = user?.uploadApprove; // No default here, as useAuth already handles it

  // State for Request Upload Access form fields, populated by scanner
  const [requestSemester, setRequestSemester] = useState("");
  const [requestSgpa, setRequestSgpa] = useState("");
  // State to store the full scanned academic data
  const [scannedAcademicData, setScannedAcademicData] = useState(
    user?.academicDetails
  );

  // Form states for Upload Notes (when uploadApprove === "yes")
  const [notesFile, setNotesFile] = useState(null);
  const [notesBranch, setNotesBranch] = useState("");
  const [notesSemester, setNotesSemester] = useState("");
  const [notesSubject, setNotesSubject] = useState("");
  const [notesGrade, setNotesGrade] = useState("");

  // State for custom modal to display information or error messages
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // State to display status message directly in the UI
  const [displayStatusMessage, setDisplayStatusMessage] = useState("");

  /**
   * Initializes the display status message based on the current uploadApprove status.
   * Runs once on component mount and whenever uploadApprove changes.
   */
  useEffect(() => {
    if (uploadApprove === "yes") {
      setDisplayStatusMessage(
        "🥳 Congratulations! Your notes upload access has been granted!"
      );
    } else if (uploadApprove === "Access Denied") {
      setDisplayStatusMessage(
        "😔 Access Denied: Your CGPA is below the required 8.5. Please improve your performance and try again."
      );
    } else {
      setDisplayStatusMessage(
        "Please scan your marksheet to request notes upload access."
      );
    }
  }, [uploadApprove]); // Re-run when uploadApprove status changes

  /**
   * Displays an informational modal with a given message.
   * @param {string} message - The message to display in the modal.
   */
  const showInfoModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  /**
   * Closes the currently open modal and clears its message.
   */
  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  /**
   * Callback function passed to MarksheetScanner.
   * Receives eligibility status and extracted data from the scanner
   * and updates the component's state and mock user's approval status.
   * @param {object} result - Object containing isEligible (boolean), status (string), and data (object).
   */
  const handleEligibilityResult = ({ isEligible, status, data }) => {
    setScannedAcademicData(data); // Store the raw extracted data

    // Update the mock user's uploadApprove status and academic details
    setUser((prevUser) => ({
      ...prevUser,
      uploadApprove: status, // "yes" or "Access Denied"
      academicDetails: data, // Store the detailed academic data for the user
    }));

    // Populate the semester and CGPA fields if data is available from scan
    if (data && data.cgpa && data.semester) {
      setRequestSemester(String(data.semester));
      setRequestSgpa(String(data.cgpa));
    } else {
      setRequestSemester("");
      setRequestSgpa("");
    }
  };

  /**
   * Handles the change event for the notes file input.
   * Validates file type and size.
   * @param {Event} e - The DOM event from the file input.
   */
  const handleNotesFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        showInfoModal(
          "Only PDF or DOC/DOCX files are allowed for notes upload."
        );
        setNotesFile(null);
        return;
      }
      // Check file size
      if (file.size > maxSize) {
        showInfoModal("File size exceeds 10MB limit.");
        setNotesFile(null);
        return;
      }
      setNotesFile(file);
      showInfoModal(`File "${file.name}" selected for upload`);
    } else {
      setNotesFile(null);
    }
  };

  /**
   * Handles the submission of the Request Upload Access form.
   * This primarily confirms the status determined by the MarksheetScanner.
   * @param {Event} e - The DOM event from the form submission.
   */
  const handleSubmitRequestAccess = (e) => {
    e.preventDefault();

    // The status is already set by MarksheetScanner and reflected in user.uploadApprove.
    // This button primarily serves to acknowledge the scan result or re-initiate if needed.
    if (user.academicDetails) {
      // Only show specific messages if a scan has occurred
      if (user.uploadApprove === "yes") {
        showInfoModal(
          "Your upload access has been granted based on your marksheet scan!"
        );
      } else if (user.uploadApprove === "Access Denied") {
        showInfoModal(
          "Your upload access request was denied based on your CGPA. Please re-scan if needed."
        );
      }
    } else {
      showInfoModal(
        "Please scan your marksheet first to determine eligibility."
      );
    }

    console.log("Request Submitted:", {
      semester: requestSemester,
      sgpa: requestSgpa,
      scannedData: scannedAcademicData,
      currentUploadApproveStatus: user.uploadApprove,
    });
    // No form reset here, allowing the user to see the scanned data or re-scan immediately.
  };

  /**
   * Handles the submission of the Upload Notes form.
   * Performs basic validation and logs the notes data.
   * @param {Event} e - The DOM event from the form submission.
   */
  const handleSubmitNotes = (e) => {
    e.preventDefault();
    // Validate all notes fields are filled
    if (
      !notesFile ||
      !notesBranch ||
      !notesSemester ||
      !notesSubject ||
      !notesGrade
    ) {
      showInfoModal(
        "Please fill all fields and select a file to upload notes."
      );
      return;
    }
    console.log("Notes Uploaded:", {
      file: notesFile.name,
      branch: notesBranch,
      semester: notesSemester,
      subject: notesSubject,
      grade: notesGrade,
    });
    showInfoModal("Notes uploaded successfully!");
    // Reset notes form fields after successful upload
    setNotesFile(null);
    setNotesBranch("");
    setNotesSemester("");
    setNotesSubject("");
    setNotesGrade("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto font-inter mt-20">
      {displayStatusMessage && (
        <div
          className={`p-4 rounded-xl shadow-md mb-6 text-center text-lg font-semibold
          ${
            uploadApprove === "yes"
              ? "bg-green-100 text-green-800 border border-green-300"
              : uploadApprove === "Access Denied"
              ? "bg-red-100 text-red-800 border border-red-300"
              : "bg-blue-100 text-blue-800 border border-blue-300"
          }`}
        >
          {displayStatusMessage}
        </div>
      )}

      {uploadApprove === "yes" && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-7 h-7 mr-2 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              ></path>
            </svg>
            Upload Notes
          </h3>
          <form onSubmit={handleSubmitNotes} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Upload File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleNotesFileChange}
                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Only <strong className="text-indigo-600">PDF</strong> or{" "}
                <strong className="text-indigo-600">DOC/DOCX</strong> files
                under 10MB are allowed.
              </p>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Branch
              </label>
              <select
                required
                value={notesBranch}
                onChange={(e) => setNotesBranch(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
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

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                required
                value={notesSemester}
                onChange={(e) => setNotesSemester(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              >
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={`${i + 1}`}>
                    {i + 1} Semester
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Engineering Mathematics"
                required
                value={notesSubject}
                onChange={(e) => setNotesSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Your Grade in this Subject
              </label>
              <select
                required
                value={notesGrade}
                onChange={(e) => setNotesGrade(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
            >
              Submit Notes
            </button>
          </form>
        </div>
      )}

      {uploadApprove !== "yes" && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-7 h-7 mr-2 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Request Upload Access
          </h3>
          <p className="text-base text-gray-600 mb-6">
            Please upload your latest marksheet for verification to gain notes
            upload permission.
          </p>
          <form onSubmit={handleSubmitRequestAccess} className="space-y-6">
            <MarksheetScanner
              onEligibilityDetermined={handleEligibilityResult}
              showInfoModal={showInfoModal} 
            />

            <div className="space-y-2 hidden">
              <label
                htmlFor="request-semester"
                className="block text-sm font-medium text-gray-700"
              >
                Semester (from scan)
              </label>
              <input
                type="text"
                id="request-semester"
                value={requestSemester}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <label
                htmlFor="request-sgpa"
                className="block text-sm font-medium text-gray-700"
              >
                SGPA/CGPA (from scan)
              </label>
              <input
                type="text"
                id="request-sgpa"
                value={requestSgpa}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </form>
          <button
            type="button"
            onClick={handleSubmitRequestAccess}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300 mt-6"
          >
            Acknowledge Scan Result
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Information
            </h3>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            <div className="text-center">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestUpload;
