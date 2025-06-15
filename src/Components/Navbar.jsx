import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../db/AuthContext"; // ✅ import auth hook
import { useCart } from "../contexts/CartContext"; // 👈 Add this

import Logo from "../assets/logo.png";
import Cart from "../assets/cart2.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loggedIn } = useAuth(); // ✅ get user and auth state
  const { cartItems } = useCart();
  const cartCount = cartItems.length;


  return (
    <>
      <nav className="bg-black/90 text-white backdrop-blur-md fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] rounded-2xl shadow-lg px-4 py-2 z-50">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center space-x-2">
              <img src={Logo} alt="Logo" className="h-8 w-8 rounded" />
              <span className="font-semibold text-lg">CollabeNote</span>
            </div>
          </NavLink>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="relative group">
              <button className="hover:underline flex items-center gap-1">
                Notes ▾
              </button>
              <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-black text-white rounded shadow-md min-w-[100px] z-50 h-25 my-auto">
                <NavLink
                  to="/resources"
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  Buy
                </NavLink>
                <NavLink
                  to="/sell"
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  Sell
                </NavLink>
              </div>
            </div>

            <NavLink to="/cart" className="relative hover:underline">
              <img className="h-8" src={Cart} alt="cart" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <button className="text-xl hover:scale-110 transition">🌙</button>

            {loggedIn ? (
              <NavLink to="/profile">
                <img
                  src={user?.profilePhoto || "https://placehold.co/32x32"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md font-medium"
              >
                Login
              </NavLink>
            )}
          </div>

          <button
            className="sm:hidden text-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden flex flex-col justify-between p-6 pt-6`}
      >
        <div className="flex justify-end">
          <button
            className="text-2xl mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="flex-grow space-y-4">
          <NavLink
            to="/resources"
            className="block text-lg hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Notes
          </NavLink>
          <NavLink
            to="/resources"
            className="block text-lg hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Sell
          </NavLink>
          <NavLink
            to="/cart"
            className="block text-lg hover:underline relative"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-4 bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        <div className="space-y-4">
          <button
            className="text-xl hover:scale-110 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            🌙
          </button>

          {loggedIn ? (
            <NavLink to="/profile">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.profilePhoto || "https://placehold.co/32x32"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                />
                <span>{user.userName}</span>
              </div>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
