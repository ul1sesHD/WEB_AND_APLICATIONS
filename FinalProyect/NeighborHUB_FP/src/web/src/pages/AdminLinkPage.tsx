import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/routes';

export const AdminLinkPage = () => (
  <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-12 bg-paper">
    <Card className="w-full max-w-md">
      <p className="font-body text-xs uppercase tracking-widest text-adobe">SCR-11</p>
      <h1 className="font-display text-3xl tracking-wider text-comal mt-1 mb-3">ADMIN PANEL</h1>
      <p className="font-body text-adobe mb-6">
        You are about to enter the admin panel. The Angular bundle is mounted at <code>{ROUTES.admin}</code>.
      </p>
      <a href={ROUTES.admin}>
        <Button fullWidth>Continue to /admin</Button>
      </a>
    </Card>
  </section>
);
