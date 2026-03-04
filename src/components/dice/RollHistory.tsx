import type { DiceType } from './Die';

export interface RollEntry {
  id: number;
  type: DiceType;
  count: number;
  results: number[];
  sum: number;
  timestamp: Date;
}

interface RollHistoryProps {
  entries: RollEntry[];
  onClear: () => void;
}

export function RollHistory({ entries, onClear }: RollHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="bg-sand-light/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(114,82,58,0.08)] border border-sand/80 text-center text-stone backdrop-blur-sm">
        <p className="italic">No rolls yet — give it a try!</p>
      </div>
    );
  }

  return (
    <div className="bg-sand-light/60 rounded-2xl shadow-[0_4px_24px_rgba(114,82,58,0.08)] border border-sand/80 overflow-hidden backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-sand">
        <h3 className="font-bold text-walnut text-lg">Roll History</h3>
        <button
          onClick={onClear}
          className="text-sm text-stone hover:text-red-600 transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>
      <div className="max-h-72 overflow-y-auto divide-y divide-sand/50">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="px-5 py-3 flex items-center gap-3 text-sm hover:bg-sand/20 transition-colors"
          >
            <span className="text-lg">🎲</span>
            <span className="font-semibold text-walnut min-w-14">
              {entry.count}{entry.type}
            </span>
            <span className="text-stone flex-1 truncate">
              {entry.results.join(' + ')}
            </span>
            {entry.count > 1 && (
              <span className="font-bold text-forest">= {entry.sum}</span>
            )}
            <span className="text-stone/60 text-xs tabular-nums">
              {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
