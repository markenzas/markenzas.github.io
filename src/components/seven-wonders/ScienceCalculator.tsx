import { useCallback, useState } from "react";

interface SymbolCounter {
  image: string;
  label: string;
  count: number;
}

const INITIAL_SYMBOLS: SymbolCounter[] = [
  { image: "7-wonders/science-mason.webp", label: "Mason", count: 0 },
  { image: "7-wonders/science-gear.webp", label: "Gear", count: 0 },
  { image: "7-wonders/science-script.webp", label: "Script", count: 0 },
];

const IMAGE_SIZE = 48;

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

  const [mason, gear, script] = symbols.map((s) => s.count);
  const masonPts = mason * mason;
  const gearPts = gear * gear;
  const scriptPts = script * script;
  const completeSets = Math.min(mason, gear, script);
  const setPts = completeSets * 7;
  const total = masonPts + gearPts + scriptPts + setPts;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="bg-sand/70 border-caramel/20 overflow-hidden rounded-2xl border shadow-[0_4px_24px_rgba(114,82,58,0.1)] backdrop-blur-sm">
        {/* Symbol Counters */}
        <div className="space-y-4 p-6">
          {symbols.map((symbol, index) => (
            <div
              key={symbol.label}
              className="bg-sand-light flex flex-col items-center justify-between gap-4 rounded-xl p-4 md:flex-row md:gap-0"
            >
              <div className="flex min-w-25 items-center gap-3">
                {/* Resource icon */}
                {symbol.image && (
                  <img
                    src={symbol.image}
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                  />
                )}

                <span className="text-walnut text-md font-semibold">
                  {symbol.label}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount(index, -1)}
                  disabled={symbol.count === 0}
                  className="bg-caramel hover:bg-walnut flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-xl font-bold text-white transition-all duration-150 select-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Decrease ${symbol.label}`}
                >
                  −
                </button>

                <span className="text-forest w-8 text-center text-2xl font-bold tabular-nums">
                  {symbol.count}
                </span>

                <button
                  type="button"
                  onClick={() => updateCount(index, 1)}
                  className="bg-caramel hover:bg-walnut flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-xl font-bold text-white transition-all duration-150 select-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
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
        <div className="border-caramel/30 mx-6 border-t" />

        {/* Score Breakdown */}
        <div className="space-y-3 p-6">
          <h3 className="text-walnut text-md mb-3 font-bold tracking-wider uppercase">
            Score Breakdown
          </h3>

          <ScoreLine
            imgSrc={INITIAL_SYMBOLS[0].image}
            label="Mason"
            count={mason}
            points={masonPts}
          />
          <ScoreLine
            imgSrc={INITIAL_SYMBOLS[1].image}
            label="Gear"
            count={gear}
            points={gearPts}
          />
          <ScoreLine
            imgSrc={INITIAL_SYMBOLS[2].image}
            label="Script"
            count={script}
            points={scriptPts}
          />

          <div className="text-stone text-md flex items-center justify-between">
            <span>Complete sets: {completeSets} × 7</span>
            <span className="text-forest font-semibold transition-all duration-300">
              {setPts} pts
            </span>
          </div>

          {/* Total */}
          <div className="border-caramel/30 mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-walnut text-lg font-bold">Total</span>
            <span
              key={total}
              className="text-forest animate-score-pop text-3xl font-extrabold"
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
            className="bg-forest-light hover:bg-forest w-full cursor-pointer rounded-xl py-3 font-semibold text-gray-100 transition-all duration-150 select-none active:scale-[0.98]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreLine({
  imgSrc,
  label,
  count,
  points,
}: {
  imgSrc: string;
  label: string;
  count: number;
  points: number;
}) {
  return (
    <div className="text-stone text-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={imgSrc} height={IMAGE_SIZE / 2} width={IMAGE_SIZE / 2} />
        <span>
          {label}: {count}²
        </span>
      </div>

      <span className="text-forest font-semibold transition-all duration-300">
        {points} pts
      </span>
    </div>
  );
}
