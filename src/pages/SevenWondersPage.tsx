import { ScienceCalculator } from '../components/seven-wonders/ScienceCalculator';

export function SevenWondersPage() {
  return (
    <div className="py-10 px-4 bg-parchment min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-md mx-auto text-center mb-8 stagger-in">
        <h1 className="text-3xl font-bold text-walnut mb-3 font-display">
          7 Wonders Science Calculator
        </h1>
        <p className="text-stone text-sm leading-relaxed">
          Each identical symbol scores its count squared. Each complete set of
          all 3 different symbols scores 7 bonus points.
        </p>
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <ScienceCalculator />
      </div>
    </div>
  );
}
