import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - top-left */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-purple-700 text-white rounded-md shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </button>
      )}

      {/* Sidebar */}
     <div
  className={`fixed top-0 left-0 h-full w-48 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>

        {/* Top: Centered Logo */}
        <div className="flex flex-col items-center justify-center p-4 border-b">
          <img src="/logo1.png" alt="Logo" className="h-30 w-28 mb-2" />
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black">
            <X />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="p-4 space-y-4">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-purple-700 font-semibold hover:underline"
          >
            Dashboard
          </Link>
          <Link
            to="/gest-scorecard"
            onClick={() => setIsOpen(false)}
           className="block text-purple-700 font-semibold hover:underline"
           >
          GEST Scorecard Dashboard
            </Link>
            <Link
            to="/communication-tools"
            onClick={() => setIsOpen(false)}
           className="block text-purple-700 font-semibold hover:underline"
           >
          Communication Tools
            </Link>
        </nav>
      </div>
    </>
  );
}
