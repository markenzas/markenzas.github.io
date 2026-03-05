import { useState, useCallback } from 'react';

import { Die } from './Die';
import { RollHistory } from './RollHistory';
import type { DiceType } from './Die';
import type { RollEntry } from './RollHistory';

const DICE_TYPES: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
const DICE_COUNTS = [1, 2, 3, 4, 5, 6];

const DICE_MAX: Record<DiceType, number> = {
  d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20,
};

export const DiceRoller = () => {
  const [diceType, setDiceType] = useState<DiceType>('d6');
  const [diceCount, setDiceCount] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<RollEntry[]>([]);
  const [rollKey, setRollKey] = useState(0);

  const roll = useCallback(() => {
    if (rolling) return;

    const max = DICE_MAX[diceType];
    const newResults = Array.from({ length: diceCount }, () =>
      Math.floor(Math.random() * max) + 1
    );
    const sum = newResults.reduce((a, b) => a + b, 0);

    setRolling(true);
    setRollKey((k) => k + 1);
    setResults(newResults);

    setHistory((prev) => [
      { id: Date.now(), type: diceType, count: diceCount, results: newResults, sum, timestamp: new Date() },
      ...prev,
    ].slice(0, 20));

    setTimeout(() => setRolling(false), 900 + diceCount * 80);
  }, [diceType, diceCount, rolling]);

  const sum = results.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-sand-light/60 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(114,82,58,0.08)] border border-sand/80 space-y-5 backdrop-blur-sm">
        {/* Dice type selector */}
        <div>
          <label className="block text-sm font-semibold text-stone mb-2">Dice Type</label>
          <div className="flex flex-wrap gap-1.5">
            {DICE_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setDiceType(t)}
                className={`
                  px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer
                  ${t === diceType
                    ? 'bg-caramel text-white shadow-md scale-105'
                    : 'bg-sand/60 text-walnut hover:bg-sand'}
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Dice count selector */}
        <div>
          <label className="block text-sm font-semibold text-stone mb-2">Number of Dice</label>
          <div className="flex flex-wrap gap-1.5">
            {DICE_COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => setDiceCount(n)}
                className={`
                  w-10 h-10 rounded-full text-sm font-semibold transition-all cursor-pointer
                  ${n === diceCount
                    ? 'bg-caramel text-white shadow-md scale-105'
                    : 'bg-sand/60 text-walnut hover:bg-sand'}
                `}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Roll button */}
        <button
          onClick={roll}
          disabled={rolling}
          className={`
            w-full py-4 rounded-xl text-xl font-bold transition-all cursor-pointer
            flex items-center justify-center gap-2
            ${rolling
              ? 'bg-caramel/60 text-white/80 cursor-wait'
              : 'bg-caramel text-white hover:bg-walnut hover:shadow-lg active:scale-95 shadow-md'}
          `}
        >
          <span className="text-2xl">🎲</span>
          {rolling ? 'Rolling...' : `Roll ${diceCount}${diceType}`}
        </button>
      </div>

      {/* Dice display */}
      {results.length > 0 && (
        <div className="bg-sand-light/60 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(114,82,58,0.08)] border border-sand/80 text-center space-y-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {results.map((val, i) => (
              <Die
                key={`${rollKey}-${i}`}
                type={diceType}
                value={val}
                rolling={rolling}
                delay={i * 80}
              />
            ))}
          </div>
          {results.length > 1 && (
            <div className="text-2xl font-bold text-walnut">
              Total: <span className="text-caramel">{sum}</span>
            </div>
          )}
        </div>
      )}

      {/* Roll history */}
      <RollHistory entries={history} onClear={() => setHistory([])} />
    </div>
  );
}
