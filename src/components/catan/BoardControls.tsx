import type { ConstraintOptions } from "@/types/catan";

interface BoardControlsProps {
  extended: boolean;
  constraints: ConstraintOptions;
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
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1.5">
      <span className="text-forest-light text-sm select-none">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
          checked ? "bg-caramel" : "bg-stone/40"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </label>
  );
}

export function BoardControls({
  extended,
  constraints,
  onExtendedChange,
  onConstraintsChange,
  onShuffle,
}: BoardControlsProps) {
  const updateConstraint = (key: keyof ConstraintOptions, value: boolean) => {
    onConstraintsChange({ ...constraints, [key]: value });
  };

  return (
    <div className="bg-sand-light/60 border-sand/80 space-y-5 rounded-2xl border p-5 shadow-[0_4px_24px_rgba(114,82,58,0.08)] backdrop-blur-sm">
      {/* 5-6 Player toggle */}
      <div>
        <h3 className="text-walnut mb-2 text-sm font-semibold tracking-wide uppercase">
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
        <h3 className="text-walnut mb-2 text-sm font-semibold tracking-wide uppercase">
          Allow Adjacent
        </h3>
        <div className="space-y-0.5">
          <Toggle
            checked={constraints.sixEightCanTouch}
            onChange={(v) => updateConstraint("sixEightCanTouch", v)}
            label="6 & 8 can touch"
          />
          <Toggle
            checked={constraints.twoTwelveCanTouch}
            onChange={(v) => updateConstraint("twoTwelveCanTouch", v)}
            label="2 & 12 can touch"
          />
          <Toggle
            checked={constraints.sameNumberCanTouch}
            onChange={(v) => updateConstraint("sameNumberCanTouch", v)}
            label="Same numbers can touch"
          />
          <Toggle
            checked={constraints.sameResourceCanTouch}
            onChange={(v) => updateConstraint("sameResourceCanTouch", v)}
            label="Same resource can touch"
          />
        </div>
      </div>

      <button
        onClick={onShuffle}
        className="bg-caramel hover:bg-walnut flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200"
      >
        Shuffle
      </button>
    </div>
  );
}
