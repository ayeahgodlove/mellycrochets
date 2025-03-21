// components/SearchBar.tsx
import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "../../hooks/debounce.hook";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Call backend API whenever debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setLoading(true);
      fetch(`/api/after_cares/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error("Search error:", err))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search crochets..."
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-md"
        />
        <SearchOutlined className="absolute right-4 top-3.5 text-gray-400 text-lg" />
      </div>

      {/* Results */}
      <div className="mt-4">
        {loading && <p className="text-sm text-gray-500">Searching...</p>}
        {!loading && results.length > 0 && (
          <ul className="mt-2 space-y-2">
            {results.map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer p-3 bg-white border text-lg text-red-950 border-gray-200 rounded-lg shadow-sm hover:bg-orange-50 transition"
              >
                <Link href={`/after_cares/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}
        {!loading && debouncedQuery && results.length === 0 && (
          <p className="text-sm text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
