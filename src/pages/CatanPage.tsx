import { useState, useCallback, useMemo } from 'react';

import type { ExpansionType, ConstraintOptions, HexTile } from '@/types/catan';
import { DEFAULT_CONSTRAINTS } from '@/types/catan';
import { getConfig } from '@/lib/catan/configs';
import { generateBoard } from '@/lib/catan/board-generator';
import { BoardDisplay } from '@/components/catan/BoardDisplay';
import { BoardControls } from '@/components/catan/BoardControls';
import { EXPANSIONS } from '@/utils/constants';

export default function CatanPage() {
  const [expansion, setExpansion] = useState<ExpansionType>(EXPANSIONS.base);
  const [extended, setExtended] = useState(false);
  const [constraints, setConstraints] = useState<ConstraintOptions>({ ...DEFAULT_CONSTRAINTS });
  const [shuffleKey, setShuffleKey] = useState(0);

  const tiles: HexTile[] = useMemo(() => {
    const config = getConfig(expansion, extended);
    return generateBoard(config, constraints);
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
