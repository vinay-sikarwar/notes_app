import React, { useState } from "react";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-gray-900 text-white">
      <div className="border w-96 p-5 rounded-2xl bg-gray-800 shadow-lg">
        <h1 className="text-2xl text-center font-bold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h1>
        <form className="flex flex-col gap-3">
          <label htmlFor="email" className="text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-700 p-2 rounded text-white"
            placeholder="abc@gmail.com"
          />

          <label htmlFor="passw" className="text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="passw"
            className="bg-gray-700 p-2 rounded text-white"
            placeholder="password"
          />

          {isSignUp && (
            <>
              <label htmlFor="confirmPass" className="text-gray-300">
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPass"
                className="bg-gray-700 p-2 rounded text-white"
                placeholder="confirm password"
              />
            </>
          )}

          <button
            type="submit"
            className="bg-blue-600 mt-4 rounded-lg hover:bg-blue-700 transition p-2"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          {isSignUp ? "Already a member?" : "Not a member?"}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 underline cursor-pointer ml-1"
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
