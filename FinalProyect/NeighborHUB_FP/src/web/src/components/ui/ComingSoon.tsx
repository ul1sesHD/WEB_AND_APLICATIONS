import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/routes';

type Props = {
  screen: string;
  title:  string;
  description: string;
};

export const ComingSoon = ({ screen, title, description }: Props) => (
  <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-12 bg-paper">
    <div className="max-w-md text-center flex flex-col items-center gap-4">
      <Construction size={48} className="text-toldo" />
      <p className="font-body text-xs uppercase tracking-widest text-adobe">{screen}</p>
      <h1 className="font-display text-4xl tracking-wider text-comal">{title}</h1>
      <p className="font-body text-adobe">{description}</p>
      <Link to={ROUTES.landing}>
        <Button variant="outline">Back to landing</Button>
      </Link>
    </div>
  </section>
);
