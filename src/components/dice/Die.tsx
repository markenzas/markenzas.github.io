import { useState, useEffect, useRef } from 'react';

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

interface DieProps {
  type: DiceType;
  value: number;
  rolling: boolean;
  delay: number;
}

const DICE_MAX: Record<DiceType, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
};

const DICE_ACCENT: Record<DiceType, string> = {
  d4: 'border-red-500 shadow-red-400/30',
  d6: 'border-stone shadow-stone/30',
  d8: 'border-blue-500 shadow-blue-400/30',
  d10: 'border-green-500 shadow-green-400/30',
  d12: 'border-purple-500 shadow-purple-400/30',
  d20: 'border-yellow-500 shadow-yellow-400/30',
};

const DICE_BG: Record<DiceType, string> = {
  d4: 'bg-red-50',
  d6: 'bg-sand-light',
  d8: 'bg-blue-50',
  d10: 'bg-green-50',
  d12: 'bg-purple-50',
  d20: 'bg-yellow-50',
};

export function Die({ type, value, rolling, delay }: DieProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rolling) {
      const startTimeout = setTimeout(() => {
        setAnimating(true);
        const max = DICE_MAX[type];

        intervalRef.current = setInterval(() => {
          setDisplayValue(Math.floor(Math.random() * max) + 1);
        }, 50);

        // Stop after animation duration
        setTimeout(() => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayValue(value);
          setAnimating(false);
        }, 800);
      }, delay);

      return () => {
        clearTimeout(startTimeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      setDisplayValue(value);
      setAnimating(false);
    }
  }, [rolling, value, type, delay]);

  return (
    <div
      className={`
        inline-flex items-center justify-center
        w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24
        rounded-xl border-3
        font-bold text-2xl sm:text-3xl md:text-4xl
        text-forest select-none
        transition-transform
        ${DICE_ACCENT[type]}
        ${DICE_BG[type]}
        ${animating ? 'animate-dice-tumble' : ''}
        shadow-lg
      `}
      style={{ perspective: '600px', animationDelay: `${delay}ms` }}
    >
      {displayValue}
    </div>
  );
}
