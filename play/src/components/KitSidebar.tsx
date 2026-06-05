import clsx from 'clsx';
import type { KitMeta } from '../types';

interface Props {
  kits: KitMeta[];
  selectedId: string;
  onSelect: (id: string) => void;
  isDark: boolean;
}

export default function KitSidebar({ kits, selectedId, onSelect, isDark }: Props) {
  return (
    <nav
      aria-label="Packages"
      className={clsx(
        'w-52 shrink-0 h-full overflow-y-auto border-r py-4',
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      )}
    >
      <p
        className={clsx(
          'px-4 pb-2 text-xs font-semibold uppercase tracking-wider',
          isDark ? 'text-gray-500' : 'text-gray-400'
        )}
      >
        Packages
      </p>

      <ul className="space-y-0.5 px-2">
        {kits.map((kit) => {
          const active = kit.id === selectedId;

          return (
            <li key={kit.id}>
              <button
                type="button"
                onClick={() => onSelect(kit.id)}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-blue-600 text-white'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <span className="truncate">@gvray/{kit.id}</span>

                <span
                  className={clsx(
                    'text-xs px-1.5 py-0.5 rounded-full font-normal',
                    active
                      ? 'bg-white/20 text-white'
                      : isDark
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {kit.functions.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
