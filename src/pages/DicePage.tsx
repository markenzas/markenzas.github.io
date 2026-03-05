import { DiceRoller } from '@/components/dice/DiceRoller';

export default function DicePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-parchment min-h-[calc(100vh-3.5rem)]">
      <div className="stagger-in">
        <DiceRoller />
      </div>
    </div>
  );
}
