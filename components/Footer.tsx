"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">CleanRest</h2>
            <p className="text-blue-100 text-sm max-w-xs">
              Improving the availability and maintenance of clean public restrooms across Nigeria.
            </p>
            <div className="pt-2">
              <p className="text-xs text-blue-200 font-medium mb-1">Powered by</p>
              <p className="text-lg font-bold text-white tracking-wide">Skygital</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/restrooms/add" className="hover:text-white transition-colors">Add Restroom</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full py-2 pl-10 pr-4 rounded-lg bg-secondary-dark border border-secondary-light text-white placeholder-blue-300 focus:outline-none focus:border-white text-sm"
                />
              </div>
              <button 
                type="submit"
                className="bg-white text-secondary hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <Send size={16} />
              </button>
            </form>
            
            <div className="flex gap-4 pt-4">
              <a href="#" className="bg-secondary-light p-2 rounded-full hover:bg-white hover:text-secondary transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-secondary-light p-2 rounded-full hover:bg-white hover:text-secondary transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-secondary-light p-2 rounded-full hover:bg-white hover:text-secondary transition-all duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-light pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200">
          <p>&copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> CleanRest. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
