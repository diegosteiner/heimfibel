import * as React from "react";
import { useEffect, useState } from "react";

type Props = {
  path: string;
  placeholder?: string;
};

export default function Search({ path, placeholder }: Props) {
  const [query, setQuery] = useState<string>();
  const [results, setResults] = useState<PagefindSearchFragment[]>([]);
  const [loading, setLoading] = useState(false);

  async function initialize() {
    if (globalThis.pagefind) return;
    globalThis.pagefind = await import(/* @vite-ignore */ path);
    globalThis.pagefind?.init();
  }

  async function onFocus() {
    await initialize();
  }

  useEffect(() => {
    const runSearch = async () => {
      if (!query) return;
      setLoading(true);
      const records = await globalThis.pagefind?.debouncedSearch(query);
      if (records?.results) {
        // Load the first 5 results
        setResults(await Promise.all(records.results.slice(0, 5).map((r) => r.data())));
      } else {
        setResults([]);
      }
      setLoading(false);
    };
    runSearch();
  }, [query]);

  return (
    <div className="bg-amber-200 border-rust-600 border-8 border-solid p-2 rounded-lg text-stiftung-900 shadow-xl">
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onFocus={onFocus}
        className="w-full bg-transparent focus:outline-none"
        onInput={(e) => setQuery(e.currentTarget.value)}
      />
      <ul>
        {results.map((r) => (
          <li key={r.url} className="mt-3 ">
            <hr className="my-5 mx-1 border-rust-600" />
            <a href={r.url}>
              <strong>{r.meta.title}</strong>
              <p dangerouslySetInnerHTML={{ __html: r.excerpt }}></p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
