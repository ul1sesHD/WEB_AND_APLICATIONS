import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Map, Store } from 'lucide-react';
import { categoryAssets, type CategorySlug, formatCO2 } from '@neighborhub/shared';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';
import { MetalPlate } from '@/components/brand/MetalPlate';
import { ImpactCounter } from '@/components/impact/ImpactCounter';
import { getSupabase } from '@/lib/supabase';
import { ROUTES } from '@/routes';

const fetchCommunityImpact = async (): Promise<number> => {
  const { data, error } = await getSupabase()
    .from('v_user_impact')
    .select('total_co2_saved_kg');
  if (error || !data) return 0;
  return data.reduce((sum, row) => sum + (row.total_co2_saved_kg ?? 0), 0);
};

const SLUGS = Object.keys(categoryAssets) as CategorySlug[];

export const LandingPage = () => {
  const { data: totalCO2 = 0 } = useQuery({
    queryKey: ['landing', 'community-impact'],
    queryFn:  fetchCommunityImpact,
    staleTime: 5 * 60_000,
  });

  const co2 = formatCO2(totalCO2);

  return (
    <div className="flex flex-col">
      <section className="relative px-6 py-16 md:py-24 text-paper text-center bg-gradient-to-br from-chili via-toldo to-toldo/70">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Logo size="lg" className="drop-shadow-lg" />
          <p className="font-body font-bold text-xl md:text-2xl">Local trade, global impact.</p>

          <div className="bg-paper/10 backdrop-blur-sm border border-paper/30 rounded-md px-6 py-4">
            <ImpactCounter
              value={Math.round(totalCO2)}
              label={`kg of CO₂ saved · ${co2.equivalence}`}
              suffix=" kg"
              color="white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link to={ROUTES.home}>
              <Button variant="primary" size="lg" className="bg-paper text-comal border-comal">
                <Map size={18} className="inline mr-2" /> Explore map
              </Button>
            </Link>
            <Link to={ROUTES.registerBusiness}>
              <Button variant="outline" size="lg" className="border-paper text-paper hover:bg-paper hover:text-toldo">
                <Store size={18} className="inline mr-2" /> Register business
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16 max-w-6xl mx-auto w-full">
        <h2 className="font-display text-3xl md:text-4xl tracking-wider text-comal text-center mb-8">
          WHAT&apos;S NEAR YOU?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center">
          {SLUGS.map((slug) => (
            <Link
              key={slug}
              to={`${ROUTES.explore}?cat=${slug}`}
              className="flex flex-col items-center gap-2 group"
            >
              <MetalPlate category={slug} size="lg" />
              <span className="font-body font-bold text-sm uppercase tracking-wide text-comal group-hover:text-toldo">
                {slug}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-comal text-paper px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ImpactCounter value={Math.round(totalCO2)} label="kg CO₂ saved" suffix=" kg" color="white" />
          <ImpactCounter value={500}  label="local businesses"            color="white" />
          <ImpactCounter value={2000} label="conscious neighbors"          color="white" />
        </div>
        <div className="text-center mt-6">
          <Link to={ROUTES.whyLocal} className="font-body font-bold uppercase tracking-wider underline">
            Learn more →
          </Link>
        </div>
      </section>
    </div>
  );
};
