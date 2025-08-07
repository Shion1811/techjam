'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">検索</h1>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索ワード"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          検索
        </button>
      </div>

      <ul className="mt-4">
        {results.map((item) => (
          <li key={item.id} className="border-b py-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}