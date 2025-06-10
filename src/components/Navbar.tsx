import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#F9FAFB] p-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          {/* Hamburger Menu Icon */}
          <button onClick={() => setSidebarOpen(true)} className="text-[#4F46E5]">
            <Menu className="w-6 h-6" />
          </button>

          {/* Restaurant Name Centered */}
          <h1 className="text-2xl font-bold text-[#4F46E5]">Tajmahal</h1>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 text-[#4F46E5]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#4F46E5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-[#4F46E5]">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-[#4F46E5]" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-[#4F46E5] text-lg font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-[#4F46E5] text-lg font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            About
          </Link>
        </div>
      </div>

      {/* Overlay (optional, for better UX) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
