// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Resources from "./Components/Resources/Resources.jsx";
import Sem from "./Components/Resources/Sem.jsx";
import Result from "./Components/Resources/Result.jsx";
import Profile from "./Components/Profile.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/resources",
    element: (
      <div>
        <Resources />
        <Sem />
        <Result />
      </div>
    ),
  },
  {
    path: "/login",
    element:
    <div>
      <Navbar/>
      <Login />
      <Footer />
    </div>
  },
  {
    path: "profile",
    element: 
    <div>
      <Navbar />
      <Profile />
      <Footer />
    </div>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
