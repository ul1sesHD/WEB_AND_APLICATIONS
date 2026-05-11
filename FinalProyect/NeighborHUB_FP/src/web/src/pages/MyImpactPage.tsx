import { ImpactDashboard } from '@/features/impact/ImpactDashboard';

export const MyImpactPage = () => (
  <div className="px-4 max-w-3xl mx-auto w-full py-6 flex flex-col gap-5">
    <header>
      <h1 className="font-display text-3xl tracking-wider text-comal">MY IMPACT</h1>
      <p className="font-body text-adobe text-sm">Track how your local shopping makes a difference.</p>
    </header>
    <ImpactDashboard />
  </div>
);
