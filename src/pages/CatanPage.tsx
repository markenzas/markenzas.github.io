import { useState, useCallback, useMemo } from 'react';
import type { ExpansionType, ConstraintOptions, HexTile } from '../lib/catan/types';
import { DEFAULT_CONSTRAINTS } from '../lib/catan/types';
import { getConfig } from '../lib/catan/configs';
import { generateBoard } from '../lib/catan/board-generator';
import { BoardDisplay } from '../components/catan/BoardDisplay';
import { BoardControls } from '../components/catan/BoardControls';

export function CatanPage() {
  const [expansion, setExpansion] = useState<ExpansionType>('base');
  const [extended, setExtended] = useState(false);
  const [constraints, setConstraints] = useState<ConstraintOptions>({ ...DEFAULT_CONSTRAINTS });
  const [shuffleKey, setShuffleKey] = useState(0);

  const tiles: HexTile[] = useMemo(() => {
    const config = getConfig(expansion, extended);
    return generateBoard(config, constraints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expansion, extended, constraints, shuffleKey]);

  const handleShuffle = useCallback(() => {
    setShuffleKey((k) => k + 1);
  }, []);

  const handleExpansionChange = useCallback((exp: ExpansionType) => {
    setExpansion(exp);
  }, []);

  const handleExtendedChange = useCallback((ext: boolean) => {
    setExtended(ext);
  }, []);

  const handleConstraintsChange = useCallback((c: ConstraintOptions) => {
    setConstraints(c);
  }, []);

  return (
    <div className="bg-parchment min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-7xl mx-auto px-4 py-8 stagger-in">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut text-center mb-2 font-display">
          Catan Board Generator
        </h1>
        <p className="text-center text-stone text-sm mb-8">
          Generate balanced random boards for your next game night
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Controls */}
          <div className="lg:w-72 shrink-0">
            <BoardControls
              expansion={expansion}
              extended={extended}
              constraints={constraints}
              onExpansionChange={handleExpansionChange}
              onExtendedChange={handleExtendedChange}
              onConstraintsChange={handleConstraintsChange}
              onShuffle={handleShuffle}
            />
          </div>

          {/* Board */}
          <div className="flex-1 bg-sand-light/60 rounded-2xl shadow-[0_4px_24px_rgba(114,82,58,0.08)] border border-sand/80 p-4 min-h-[500px] flex items-center justify-center backdrop-blur-sm">
            <BoardDisplay tiles={tiles} />
          </div>
        </div>
      </div>
    </div>
  );
}
