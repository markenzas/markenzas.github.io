import type { ExpansionType, ConstraintOptions } from '@/types/catan';
import { EXPANSIONS } from '@/utils/constants';

interface BoardControlsProps {
  expansion: ExpansionType;
  extended: boolean;
  constraints: ConstraintOptions;
  onExpansionChange: (expansion: ExpansionType) => void;
  onExtendedChange: (extended: boolean) => void;
  onConstraintsChange: (constraints: ConstraintOptions) => void;
  onShuffle: () => void;
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5">
      <span className="text-sm text-forest-light select-none">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative cursor-pointer inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${checked ? 'bg-caramel' : 'bg-stone/40'
          }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 
            ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </label>
  );
}

export function BoardControls({
  expansion,
  extended,
  constraints,
  onExpansionChange,
  onExtendedChange,
  onConstraintsChange,
  onShuffle,
}: BoardControlsProps) {
  const updateConstraint = (key: keyof ConstraintOptions, value: boolean) => {
    onConstraintsChange({ ...constraints, [key]: value });
  };

  return (
    <div className="bg-sand-light/60 rounded-2xl shadow-[0_4px_24px_rgba(114,82,58,0.08)] p-5 space-y-5 border border-sand/80 backdrop-blur-sm">
      {/* Expansion selector */}
      <div>
        <h3 className="text-sm font-semibold text-walnut mb-2 uppercase tracking-wide">
          Expansion
        </h3>
        <div className="flex rounded-xl overflow-hidden border border-caramel/40">
          {(Object.values(EXPANSIONS).map((exp) => (
            <button
              key={exp}
              onClick={() => onExpansionChange(exp)}
              className={`flex-1 py-2 px-3 text-sm font-medium cursor-pointer transition-colors ${expansion === exp
                ? 'bg-caramel text-white'
                : 'bg-sand-light text-walnut hover:bg-sand'
                }`}
            >
              {exp === EXPANSIONS.base ? 'Base Game' : 'Seafarers'}
            </button>
          )))}
        </div>
      </div>

      {/* 5-6 Player toggle */}
      <div>
        <h3 className="text-sm font-semibold text-walnut mb-2 uppercase tracking-wide">
          Players
        </h3>
        <Toggle
          checked={extended}
          onChange={onExtendedChange}
          label="5-6 Player Extension"
        />
      </div>

      {/* Constraints */}
      <div>
        <h3 className="text-sm font-semibold text-walnut mb-2 uppercase tracking-wide">
          Allow Adjacent
        </h3>
        <div className="space-y-0.5">
          <Toggle
            checked={constraints.sixEightCanTouch}
            onChange={(v) => updateConstraint('sixEightCanTouch', v)}
            label="6 & 8 can touch"
          />
          <Toggle
            checked={constraints.twoTwelveCanTouch}
            onChange={(v) => updateConstraint('twoTwelveCanTouch', v)}
            label="2 & 12 can touch"
          />
          <Toggle
            checked={constraints.sameNumberCanTouch}
            onChange={(v) => updateConstraint('sameNumberCanTouch', v)}
            label="Same numbers can touch"
          />
          <Toggle
            checked={constraints.sameResourceCanTouch}
            onChange={(v) => updateConstraint('sameResourceCanTouch', v)}
            label="Same resource can touch"
          />
        </div>
      </div>

      <button
        onClick={onShuffle}
        className="w-full py-3 px-4 rounded-xl bg-caramel hover:bg-walnut text-white font-semibold text-base shadow-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        Shuffle Board
      </button>
    </div>
  );
}
