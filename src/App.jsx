// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Layout from "./Components/Layout.jsx";
import Resources from "./Components/Resources/Resources.jsx";
import Sem from "./Components/Resources/Sem.jsx";
import Result from "./Components/Resources/Result.jsx";
import Profile from "./Components/Profile.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Cart from "./Components/Cart.jsx";
import Particles from "./Components/Particles.jsx"
import { AuthProvider } from "./db/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import RequestUpload from "./Components/RequestUpload.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Particles />
        <Home />,
      </div>
    ),
  },
  {
    element: <Layout />, // 👈 shared layout here
    children: [
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/sem/:branch",
        element: <Sem />,
      },
      {
        path: "/results",
        element: <Result />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <div>
        <Navbar />
        <Login />
        <Footer />
      </div>
    ),
  },
  {
    path: "profile",
    element: (
      <div>
        <Navbar />
        <Profile />
        <Footer />
      </div>
    ),
  },
  {
    path: "/cart",
    element: (
      <div>
        <Navbar />
        <Cart />
        <Footer />
      </div>
    ),
  },
  {
    path: "/sell",
    element: (
      <div>
        <Navbar />
        <RequestUpload />
        <Footer />
      </div>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
