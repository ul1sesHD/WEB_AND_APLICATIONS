import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateImpact, formatCO2 } from '@neighborhub/shared';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ImpactCounter } from '@/components/impact/ImpactCounter';
import { ROUTES } from '@/routes';

const TESTIMONIALS = [
  { quote: 'I started buying my tortillas from Doña María and never looked back.', author: 'Ana, Coyoacán' },
  { quote: 'Three new neighbors found my fonda this month thanks to NeighborHub.', author: 'Sra. Lupita, Roma Norte' },
  { quote: 'It feels good to know exactly where my pesos end up.',                  author: 'Carlos, Del Valle' },
] as const;

export const WhyLocalPage = () => {
  const [km,    setKm]    = useState(2);
  const [pesos, setPesos] = useState(150);
  const impact = calculateImpact(km, pesos);
  const co2    = formatCO2(impact.co2Kg);

  return (
    <div className="flex flex-col">
      <section className="bg-comal text-paper px-6 py-16 text-center">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-4">WHY LOCAL?</h1>
        <p className="font-body font-bold text-lg max-w-xl mx-auto">
          Every visit you make to a neighborhood business is an act of climate, of culture, and of community.
        </p>
      </section>

      <section className="px-6 py-12 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-comal">
          <ImpactCounter value={1247}  label="kg CO₂ saved"      suffix=" kg" color="#1A7A4A" />
          <ImpactCounter value={32000} label="pesos kept local"  suffix=" $"  color="#C0392B" />
          <ImpactCounter value={500}   label="vendors visible"               color="#1565C0" />
        </div>
      </section>

      <section className="bg-paper border-y border-comal/10 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl tracking-wider text-comal text-center mb-6">
            CALCULATE YOUR IMPACT
          </h2>
          <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Kilometers not driven"
                type="number" min={0} step="0.1"
                value={km}
                onChange={(e) => setKm(Number(e.target.value))}
              />
              <Input
                label="Pesos spent locally"
                type="number" min={0} step="1"
                value={pesos}
                onChange={(e) => setPesos(Number(e.target.value))}
              />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-display text-3xl tracking-wider text-quellite">{co2.value}</p>
                <p className="font-body text-xs uppercase tracking-widest">CO₂ saved</p>
              </div>
              <div>
                <p className="font-display text-3xl tracking-wider text-toldo">${impact.pesos}</p>
                <p className="font-body text-xs uppercase tracking-widest">stays in barrio</p>
              </div>
              <div>
                <p className="font-display text-3xl tracking-wider text-sign">{impact.trees}</p>
                <p className="font-body text-xs uppercase tracking-widest">trees equivalent</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <h2 className="font-display text-3xl tracking-wider text-comal text-center mb-8">VOICES FROM THE BARRIO</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card key={t.author} accentColor="#F4C430">
              <p className="font-quote italic text-comal text-lg leading-snug">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-body text-adobe text-sm mt-3">— {t.author}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-toldo text-paper px-6 py-12 text-center">
        <h2 className="font-display text-3xl tracking-wider mb-4">JOIN THE NEIGHBORHOOD</h2>
        <Link to={ROUTES.register}>
          <Button variant="primary" size="lg" className="bg-paper text-toldo border-paper">
            Create an account
          </Button>
        </Link>
      </section>
    </div>
  );
};
