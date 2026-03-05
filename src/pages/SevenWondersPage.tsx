import { ScienceCalculator } from '@/components/seven-wonders/ScienceCalculator';

export default function SevenWondersPage() {
  return (
    <div className="py-10 px-4 bg-parchment min-h-[calc(100vh-3.5rem)]">
      <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <ScienceCalculator />
      </div>
    </div>
  );
}
