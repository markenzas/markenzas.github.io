import { useEffect, useRef } from 'react';
import { DiceRoller } from '../components/dice/DiceRoller';

export function DicePage() {
  const rollRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        rollRef.current?.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-parchment min-h-[calc(100vh-3.5rem)]">
      <div className="stagger-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-walnut mb-2 text-center font-display">
          Dice Roller
        </h1>
        <p className="text-center text-stone text-sm mb-8">
          Press <kbd className="px-1.5 py-0.5 bg-sand rounded text-xs font-mono border border-sand/80 shadow-sm">Space</kbd> to roll
        </p>
        <DiceRoller ref={rollRef} />
      </div>
    </div>
  );
}
