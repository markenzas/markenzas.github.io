import { useState, useCallback, useMemo } from 'react';

import type { ConstraintOptions, HexTile, Port } from '@/types/catan';
import { DEFAULT_CONSTRAINTS } from '@/types/catan';
import { getConfig, getPortConfig } from '@/lib/catan/configs';
import { generateBoard, generatePorts } from '@/lib/catan/board-generator';
import { BoardDisplay } from '@/components/catan/BoardDisplay';
import { BoardControls } from '@/components/catan/BoardControls';

export default function CatanPage() {
  const [extended, setExtended] = useState(false);
  const [constraints, setConstraints] = useState<ConstraintOptions>({ ...DEFAULT_CONSTRAINTS });
  const [shuffleKey, setShuffleKey] = useState(0);

  const { tiles, ports }: { tiles: HexTile[]; ports: Port[] } = useMemo(() => {
    const config = getConfig(extended);
    const portConfig = getPortConfig(extended);
    return {
      tiles: generateBoard(config, constraints),
      ports: generatePorts(portConfig.positions, portConfig.types),
    };
  }, [extended, constraints, shuffleKey]);

  const handleShuffle = useCallback(() => {
    setShuffleKey((k) => k + 1);
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
              extended={extended}
              constraints={constraints}
              onExtendedChange={handleExtendedChange}
              onConstraintsChange={handleConstraintsChange}
              onShuffle={handleShuffle}
            />
          </div>

          {/* Board */}
          <div className="flex-1 bg-sand-light/60 rounded-2xl shadow-[0_4px_24px_rgba(114,82,58,0.08)] border border-sand/80 p-4 min-h-[500px] flex items-center justify-center backdrop-blur-sm">
            <BoardDisplay tiles={tiles} ports={ports} extended={extended} />
          </div>
        </div>
      </div>
    </div>
  );
}
