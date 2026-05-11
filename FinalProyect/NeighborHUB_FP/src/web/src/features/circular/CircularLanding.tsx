import { Recycle, Shirt, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const STATS = [
  { icon: Recycle, label: 'Items exchanged', value: '240+' },
  { icon: Leaf,    label: 'kg CO₂ avoided', value: '58' },
  { icon: Shirt,   label: 'Active listings',  value: '32' },
];

const HOW_IT_WORKS = [
  { step: 1, title: 'List your item',    desc: 'Photograph it, set a fair price or mark it for exchange.' },
  { step: 2, title: 'Connect locally',   desc: 'Neighbors browse, message you, and arrange pickup.' },
  { step: 3, title: 'Close the loop',    desc: 'Items stay in the barrio. Less waste, more community.' },
];

export const CircularLanding = () => (
  <div className="flex flex-col gap-8">
    {/* Hero */}
    <section className="relative bg-gradient-to-br from-bazar to-bazar/70 rounded-md overflow-hidden px-6 py-10 text-white text-center">
      <div className="relative z-10 flex flex-col items-center gap-4">
        <img src="/categories/Paca.png" alt="Paca" className="w-28 h-28 object-contain drop-shadow-lg" />
        <h2 className="font-display text-4xl tracking-wider">CIRCULAR FASHION</h2>
        <p className="font-body text-white/90 max-w-md">
          Give your clothes a second life. Buy, sell, or swap pre-loved items with your neighbors.
        </p>
        <Button className="bg-white text-bazar hover:bg-white/90 border-white">
          <Shirt size={16} className="inline mr-1" /> Browse Items
        </Button>
      </div>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    </section>

    {/* Stats */}
    <section className="grid grid-cols-3 gap-3">
      {STATS.map(({ icon: Icon, label, value }) => (
        <Card key={label} accentColor="#A64D79">
          <div className="flex flex-col items-center text-center gap-1">
            <Icon size={24} className="text-bazar" />
            <span className="font-display text-2xl tracking-wider text-comal">{value}</span>
            <span className="font-body text-xs text-adobe">{label}</span>
          </div>
        </Card>
      ))}
    </section>

    {/* How it works */}
    <section>
      <h3 className="font-display text-2xl tracking-wider text-comal mb-4">HOW IT WORKS</h3>
      <div className="flex flex-col gap-4">
        {HOW_IT_WORKS.map(({ step, title, desc }) => (
          <div key={step} className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bazar text-white font-display text-lg flex items-center justify-center">
              {step}
            </span>
            <div>
              <p className="font-body font-bold text-comal">{title}</p>
              <p className="font-body text-sm text-adobe">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-bazar/10 rounded-md px-6 py-6 text-center flex flex-col items-center gap-3">
      <p className="font-body text-comal font-bold">Ready to declutter and help the planet?</p>
      <Button variant="outline" className="border-bazar text-bazar hover:bg-bazar hover:text-white">
        Publish an Item <ArrowRight size={14} className="inline ml-1" />
      </Button>
      <p className="font-body text-xs text-adobe">Coming soon: full marketplace with messaging.</p>
    </section>
  </div>
);
