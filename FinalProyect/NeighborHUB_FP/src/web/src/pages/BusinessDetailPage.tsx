import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Phone, MessageCircle, ShieldCheck, Footprints } from 'lucide-react';
import {
  parseBusinessHours, verificationService,
  useBusiness, type BusinessDirectoryRow,
} from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { BadgeChip } from '@/components/brand/BadgeChip';
import { BusinessHero } from '@/components/business/BusinessHero';
import { HoursWidget } from '@/components/business/HoursWidget';
import { VisitForm } from '@/features/business/VisitForm';
import { ReviewsSection } from '@/features/business/ReviewsSection';
import { useAuthStore } from '@/stores/authStore';

const useVerify = (businessId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (verifierId: string) => {
      const r = await verificationService.createVerification(getSupabase(), {
        business_id: businessId,
        verifier_id: verifierId,
        confirms:    true,
        note:        null,
      });
      if (r.error) throw r.error;
      return r.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses', 'detail', businessId] }),
  });
};

const StorySection = ({ business }: { business: BusinessDirectoryRow }) => (
  <section className="bg-paper px-5 py-6 max-w-3xl mx-auto w-full">
    {business.vendor_quote && (
      <blockquote className="font-quote italic text-2xl text-comal leading-snug">
        &ldquo;{business.vendor_quote}&rdquo;
      </blockquote>
    )}
    {business.vendor_name && (
      <p className="font-body text-sm text-adobe mt-2">
        — {business.vendor_name}
        {business.years_in_neighborhood ? `, ${business.years_in_neighborhood} years in the barrio` : ''}
      </p>
    )}
    {business.story && (
      <p className="font-body text-comal mt-4 whitespace-pre-line">{business.story}</p>
    )}
    <div className="flex items-center gap-2 mt-4 font-body text-sm text-quellite">
      <ShieldCheck size={16} />
      Verified by {business.total_verifications} neighbors
    </div>
    {business.badges.length > 0 && (
      <div className="flex flex-wrap gap-1 mt-3">
        {business.badges.map((b) => <BadgeChip key={b.type} type={b.type} />)}
      </div>
    )}
  </section>
);

const ContactBar = ({ business }: { business: BusinessDirectoryRow }) => {
  const wa = business.whatsapp?.replace(/\D/g, '');
  return (
    <div className="flex gap-2 text-sm">
      {business.phone && (
        <a href={`tel:${business.phone}`} className="flex-1 inline-flex items-center justify-center gap-1 border border-comal/20 rounded-sharp py-2 hover:bg-comal/5">
          <Phone size={14} /> Call
        </a>
      )}
      {wa && (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"
           className="flex-1 inline-flex items-center justify-center gap-1 border border-comal/20 rounded-sharp py-2 hover:bg-comal/5">
          <MessageCircle size={14} /> WhatsApp
        </a>
      )}
    </div>
  );
};

const ActionBar = ({ business, onVisit }: { business: BusinessDirectoryRow; onVisit: () => void }) => {
  const { profile }  = useAuthStore();
  const verify       = useVerify(business.id);

  return (
    <div className="sticky bottom-0 bg-paper/95 backdrop-blur border-t border-comal/15 px-5 py-3">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        <div className="flex gap-2">
          <Button onClick={onVisit} fullWidth>
            <Footprints size={16} className="inline mr-1" /> Visited here
          </Button>
          <Button
            variant="outline"
            disabled={!profile || verify.isPending}
            onClick={() => profile && verify.mutate(profile.id)}
          >
            {verify.isPending ? '…' : 'Verify'}
          </Button>
        </div>
        <ContactBar business={business} />
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="px-5 py-6 max-w-3xl mx-auto w-full flex flex-col gap-4">
    <Skeleton className="h-[55vh] min-h-[320px]" />
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-24 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
);

export const BusinessDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: business, isLoading } = useBusiness(id);
  const [visitOpen, setVisitOpen] = useState(false);

  if (isLoading || !business) return <Loader />;

  const hours = business.hours ? parseBusinessHours(business.hours) : null;

  return (
    <div className="flex flex-col">
      <BusinessHero business={business} />
      <StorySection business={business} />

      {hours && (
        <section className="px-5 max-w-3xl mx-auto w-full">
          <HoursWidget hours={hours} />
        </section>
      )}

      <ReviewsSection businessId={business.id} />

      <ActionBar business={business} onVisit={() => setVisitOpen(true)} />

      <Modal open={visitOpen} onClose={() => setVisitOpen(false)} title="REGISTER A VISIT">
        <VisitForm businessId={business.id} onDone={() => setVisitOpen(false)} />
      </Modal>
    </div>
  );
};
