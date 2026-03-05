import { useState, useCallback } from 'react';

interface SymbolCounter {
  emoji: string;
  label: string;
  count: number;
}

const INITIAL_SYMBOLS: SymbolCounter[] = [
  { emoji: '🧭', label: 'Compass', count: 0 },
  { emoji: '⚙️', label: 'Gear', count: 0 },
  { emoji: '📜', label: 'Tablet', count: 0 },
];

const MAX_SINGLE_CARD_AMOUNT = 6;

export function ScienceCalculator() {
  const [symbols, setSymbols] = useState<SymbolCounter[]>(INITIAL_SYMBOLS);

  const updateCount = useCallback((index: number, delta: number) => {
    setSymbols((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, count: Math.max(0, s.count + delta) } : s,
      ),
    );
  }, []);

  const reset = useCallback(() => {
    setSymbols(INITIAL_SYMBOLS);
  }, []);

  const [compass, gear, tablet] = symbols.map((s) => s.count);
  const compassPts = compass * compass;
  const gearPts = gear * gear;
  const tabletPts = tablet * tablet;
  const completeSets = Math.min(compass, gear, tablet);
  const setPts = completeSets * 7;
  const total = compassPts + gearPts + tabletPts + setPts;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-sand/70 rounded-2xl shadow-[0_4px_24px_rgba(114,82,58,0.1)] border border-caramel/20 overflow-hidden backdrop-blur-sm">
        {/* Symbol Counters */}
        <div className="p-6 space-y-4">
          {symbols.map((symbol, index) => (
            <div
              key={symbol.label}
              className="flex items-center justify-between bg-sand-light rounded-xl p-4"
            >
              <div className="flex items-center gap-3 min-w-25">
                <span className="text-4xl" role="img" aria-label={symbol.label}>
                  {symbol.emoji}
                </span>

                <span className="text-walnut font-semibold text-sm">
                  {symbol.label}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount(index, -1)}
                  disabled={symbol.count === 0}
                  className="w-11 h-11 rounded-full bg-caramel text-white font-bold text-xl
                    flex items-center justify-center
                    active:scale-95 transition-all duration-150
                    disabled:opacity-30 disabled:cursor-not-allowed
                    hover:bg-walnut cursor-pointer"
                  aria-label={`Decrease ${symbol.label}`}
                >
                  −
                </button>

                <span className="text-2xl font-bold text-forest w-8 text-center tabular-nums">
                  {symbol.count}
                </span>

                <button
                  type="button"
                  onClick={() => updateCount(index, 1)}
                  className="w-11 h-11 rounded-full bg-caramel text-white font-bold text-xl
                    flex items-center justify-center
                    active:scale-95 transition-all duration-150
                    disabled:opacity-30 disabled:cursor-not-allowed
                    hover:bg-walnut cursor-pointer"
                  aria-label={`Increase ${symbol.label}`}
                  disabled={symbol.count >= MAX_SINGLE_CARD_AMOUNT}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-caramel/30" />

        {/* Score Breakdown */}
        <div className="p-6 space-y-3">
          <h3 className="text-walnut font-bold text-sm uppercase tracking-wider mb-3">
            Score Breakdown
          </h3>

          <ScoreLine
            emoji="🧭"
            label="Compass"
            count={compass}
            points={compassPts}
          />
          <ScoreLine
            emoji="⚙️"
            label="Gear"
            count={gear}
            points={gearPts}
          />
          <ScoreLine
            emoji="📜"
            label="Tablet"
            count={tablet}
            points={tabletPts}
          />

          <div className="flex justify-between items-center text-sm text-stone">
            <span>
              Complete sets: {completeSets} × 7
            </span>
            <span className="font-semibold text-forest transition-all duration-300">
              {setPts} pts
            </span>
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-caramel/30 flex justify-between items-center">
            <span className="text-walnut font-bold text-lg">Total</span>
            <span
              key={total}
              className="text-3xl font-extrabold text-forest animate-score-pop"
            >
              {total} pts
            </span>
          </div>
        </div>

        {/* Reset */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={reset}
            className="w-full py-3 rounded-xl bg-forest-light text-sand font-semibold
              hover:bg-forest active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreLine({
  emoji,
  label,
  count,
  points,
}: {
  emoji: string;
  label: string;
  count: number;
  points: number;
}) {
  return (
    <div className="flex justify-between items-center text-sm text-stone">
      <span>
        {emoji} {label}: {count}²
      </span>

      <span className="font-semibold text-forest transition-all duration-300">
        {points} pts
      </span>
    </div>
  );
}
