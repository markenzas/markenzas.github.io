import { useCallback, useMemo, useState } from "react";

import { BoardControls } from "@/components/catan/BoardControls";
import { BoardDisplay } from "@/components/catan/BoardDisplay";
import { generateBoard } from "@/lib/catan/board-generator";
import { getConfig, getPortConfig } from "@/lib/catan/configs";
import type { ConstraintOptions, HexTile, Port } from "@/types/catan";
import { DEFAULT_CONSTRAINTS } from "@/types/catan";

export default function CatanPage() {
  const [extended, setExtended] = useState(false);
  const [constraints, setConstraints] = useState<ConstraintOptions>({
    ...DEFAULT_CONSTRAINTS,
  });
  const [shuffleKey, setShuffleKey] = useState(0);

  const { tiles, ports }: { tiles: HexTile[]; ports: Port[] } = useMemo(() => {
    const config = getConfig(extended);
    return {
      tiles: generateBoard(config, constraints),
      ports: getPortConfig(extended),
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
      <div className="stagger-in mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Controls */}
          <div className="shrink-0 lg:w-72">
            <BoardControls
              extended={extended}
              constraints={constraints}
              onExtendedChange={handleExtendedChange}
              onConstraintsChange={handleConstraintsChange}
              onShuffle={handleShuffle}
            />
          </div>

          {/* Board */}
          <div className="bg-sand-light/60 border-sand/80 flex min-h-125 flex-1 items-center justify-center rounded-2xl border shadow-[0_4px_24px_rgba(114,82,58,0.08)] backdrop-blur-sm">
            <BoardDisplay tiles={tiles} ports={ports} extended={extended} />
          </div>
        </div>
      </div>
    </div>
  );
}
