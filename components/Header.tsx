import Link from "next/link";
import SearchBar from "./SearchBar";
import ExploreMenu from "./ExploreMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-primary shadow-header">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo (Left) */}
          <div className="flex-shrink-0 w-32 md:w-48">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white tracking-tight whitespace-nowrap">
                CleanRest
              </span>
            </Link>
          </div>

          {/* Search Bar (Middle) - Centered and Wider */}
          <div className="flex-1 hidden md:flex justify-center px-4">
            <div className="w-full max-w-2xl transform transition-all duration-300">
              <SearchBar />
            </div>
          </div>

          {/* Explore Menu (Right) */}
          <div className="flex-shrink-0 flex justify-end">
            <ExploreMenu />
          </div>
        </div>

        {/* Mobile Search Bar (Visible only on small screens) */}
        <div className="mt-3 md:hidden">
            <SearchBar />
        </div>
      </div>
    </header>
  );
}
