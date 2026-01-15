"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function ExploreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "My Account", href: "/account" },
    { label: "Add Restroom", href: "/restrooms/add" },
    { label: "Manage Restroom", href: "/restrooms/manage" },
    { label: "Leaders Board", href: "/leaderboard" },
    { label: "Blog", href: "/blog" },
    { label: "Donate", href: "/donate" },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-4 py-2 text-white bg-accent-purple rounded-full hover:bg-accent-purple-deep transition-colors duration-300"
      >
        <span className="font-medium">Explore</span>
        {isOpen ? <X size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Dropdown */}
      <div
        className={clsx(
          "absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-200 origin-top-right",
          isOpen
            ? "transform opacity-100 scale-100 visible"
            : "transform opacity-0 scale-95 invisible"
        )}
      >
        <div className="py-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
             onClick={() => {
                // TODO: Implement logout
                setIsOpen(false);
                console.log("Logging out");
             }}
             className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
