import React, { useRef, useState } from "react";
import User from "../db/User";
import data from "../db/data";
import { AiFillCamera } from "react-icons/ai";
import RequestUpload from "./RequestUpload.jsx";

function Profile() {
  const [profilePhoto, setProfilePhoto] = useState(User.profilePhoto);
  const [activeTab, setActiveTab] = useState("resources"); // Toggle between 'resources' or 'upload'
  const fileInputRef = useRef(null);

  const accessedResources = data.filter((resource) =>
    User.resourcesAccessed.includes(resource.title)
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePhoto(imageURL);
    }
  };

  return (
    <>
      <div className="flex justify-around w-full bg-gray-400 p-4 m-0 items-center relative">
        <div className="relative">
          <img
            className="rounded-full w-[100px] h-[100px] object-cover"
            src={profilePhoto}
            alt="Profile"
          />
          <div
            className="absolute bottom-1 right-1 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200"
            onClick={() => fileInputRef.current.click()}
          >
            <AiFillCamera size={20} />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold mb-2">{User.userName}</p>
          <button className="bg-blue-500 rounded-lg p-2 cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>


      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setActiveTab("resources")}
          className={`px-4 py-2 rounded ${
            activeTab === "resources"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Accessed Resources
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded ${
            activeTab === "upload"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Upload Notes
        </button>
      </div>

      {/* Content Sections */}
      <div className="p-4">
        {activeTab === "resources" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Resources Accessed</h3>
            {accessedResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessedResources.map((resource, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow">
                    <p className="font-bold">{resource.title}</p>
                    <div className="flex items-center gap-2">
                      {resource.star}
                      <span className="text-sm text-gray-600">
                        {resource.reviews}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>
                        {resource.year} Year, {resource.semester}
                      </p>
                      <p>{resource.branch}</p>
                    </div>
                    {/* <div className="mt-2">
                      <span className="line-through text-red-500">
                        ${resource.prevPrice}
                      </span>{" "}
                      <span className="text-green-600 font-semibold">
                        ${resource.newPrice}
                      </span>
                    </div> */}
                  </div>
                ))}
              </div>
            ) : (
              <p>No resources accessed.</p>
            )}
          </div>
        )}

        {activeTab === "upload" && (
          <RequestUpload />
        )}
      </div>
    </>
  );
}

export default Profile;
