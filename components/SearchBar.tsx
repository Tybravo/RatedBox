"use client";

import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    // TODO: Implement search logic
    // e.g., navigate to /search?query={query}
    // or trigger a search API call

    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Search restrooms by location/address..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2.5 pl-5 pr-12 text-gray-800 bg-white/95 backdrop-blur-sm rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 bottom-1 px-4 text-primary hover:text-secondary bg-transparent rounded-full transition-colors"
      >
        <Search size={22} />
      </button>
    </form>
  );
}
