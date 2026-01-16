"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";

export default function ExploreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  // Check auth status on mount and path change
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        const user = JSON.parse(userStr);
        setUserPhone(user.phone);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    } else {
        setIsLoggedIn(false);
        setUserPhone(null);
    }
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserPhone(null);
    setIsOpen(false);
    router.push("/auth/login");
  };

  const menuItems = [
    { label: "Home", href: "/" },
    ...(isLoggedIn ? [{ label: "My Account", href: "/account" }] : []),
    { label: "Add Restroom", href: "/restrooms/add" },
    { label: "Manage Restroom", href: "/restrooms/manage" },
    { label: "Leaders Board", href: "/leaderboard" },
    { label: "Blog", href: "/blog" },
    { label: "Donate", href: "/donate" },
    ...(!isLoggedIn ? [
        { label: "Login", href: "/auth/login" },
        { label: "Register", href: "/auth/register" }
    ] : [])
  ];

  return (
    <div className="flex items-center gap-2 md:gap-3" ref={menuRef}>
      {isLoggedIn && userPhone && (
        <span className="text-white font-medium text-xs md:text-sm whitespace-nowrap">
          {userPhone}
        </span>
      )}
      
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-white bg-accent-purple rounded-full hover:bg-accent-purple-deep transition-colors duration-300"
        >
          <span className="font-medium text-sm md:text-base">Explore</span>
          {isOpen ? <X size={16} className="md:w-5 md:h-5" /> : <ChevronDown size={16} className="md:w-5 md:h-5" />}
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
            
            {isLoggedIn && (
              <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                  Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
