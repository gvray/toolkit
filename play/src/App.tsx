import { useState, useMemo } from 'react';
import manifest from 'virtual:kit-manifest';
import KitSidebar from './components/KitSidebar';
import FunctionCard from './components/FunctionCard';
import Playground from './components/Playground';
import type { FunctionMeta } from './types';

export default function App() {
  const [selectedKitId, setSelectedKitId] = useState(manifest[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [playgroundFn, setPlaygroundFn] = useState<FunctionMeta | null>(null);
  const [lang, setLang] = useState<'zh' | 'en'>(
    () => (localStorage.getItem('lang') as 'zh' | 'en') ?? 'en'
  );
  const toggleLang = () =>
    setLang((l) => {
      const next = l === 'zh' ? 'en' : 'zh';
      localStorage.setItem('lang', next);
      return next;
    });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return (
      saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const toggleDark = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  const selectedKit = useMemo(() => manifest.find((k) => k.id === selectedKitId), [selectedKitId]);
  const filteredFns = useMemo(() => {
    if (!selectedKit) return [];
    const q = search.toLowerCase();
    if (!q) return selectedKit.functions;
    return selectedKit.functions.filter(
      (fn: FunctionMeta) =>
        fn.name.toLowerCase().includes(q) ||
        fn.description.toLowerCase().includes(q) ||
        (fn.descriptionEn ?? '').toLowerCase().includes(q)
    );
  }, [selectedKit, search]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, FunctionMeta[]>();
    for (const fn of filteredFns) {
      const cat = fn.category || 'misc';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(fn);
    }
    return map;
  }, [filteredFns]);

  const totalFns = manifest.reduce((s, k) => s + k.functions.length, 0);

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header
        className={`shrink-0 flex items-center justify-between px-6 py-3 border-b ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">Gvray Toolkit</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {manifest.length} packages · {totalFns} functions
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Global search */}
          <input
            type="text"
            placeholder="Search functions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-56 text-sm px-3 py-1.5 rounded-lg border outline-none transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:border-blue-500'
                : 'bg-gray-100 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-500'
            }`}
          />

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className={`w-10 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Switch language"
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <KitSidebar
          kits={manifest}
          selectedId={selectedKitId}
          onSelect={(id) => {
            setSelectedKitId(id);
            setSearch('');
          }}
          isDark={isDark}
        />

        {/* Main content */}
        <main className={`flex-1 overflow-y-auto ${playgroundFn ? 'pb-[42vh]' : ''}`}>
          {selectedKit ? (
            <div className="p-6">
              {/* Kit header */}
              <div className="flex items-baseline gap-3 mb-5">
                <h1 className="text-2xl font-bold">{selectedKit.packageName}</h1>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {filteredFns.length}
                  {search ? ` of ${selectedKit.functions.length}` : ''} functions
                </span>
              </div>

              {/* Function groups */}
              {grouped.size === 0 ? (
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  No functions match "{search}"
                </p>
              ) : (
                Array.from(grouped.entries()).map(([category, fns]) => (
                  <section
                    key={category}
                    className="mb-8"
                  >
                    <h2
                      className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {category}
                      <span className="ml-2 normal-case font-normal">({fns.length})</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {fns.map((fn) => (
                        <FunctionCard
                          key={fn.name}
                          fn={fn}
                          isDark={isDark}
                          lang={lang}
                          onTryIt={setPlaygroundFn}
                        />
                      ))}
                    </div>
                  </section>
                ))
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>Select a package</p>
            </div>
          )}
        </main>
      </div>

      {/* Playground panel */}
      {playgroundFn && (
        <Playground
          fn={playgroundFn}
          kitId={selectedKitId}
          isDark={isDark}
          onClose={() => setPlaygroundFn(null)}
        />
      )}
    </div>
  );
}
