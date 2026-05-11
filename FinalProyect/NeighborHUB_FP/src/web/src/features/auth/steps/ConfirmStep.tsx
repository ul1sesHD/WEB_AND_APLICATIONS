import { useFormContext } from 'react-hook-form';
import type { RegisterValues } from '../schemas';

type Row = { label: string; value: string };

export const ConfirmStep = () => {
  const { getValues } = useFormContext<RegisterValues>();
  const v = getValues();

  const rows: Row[] = [
    { label: 'Name',         value: v.name         || '—' },
    { label: 'Email',        value: v.email        || '—' },
    { label: 'Neighborhood', value: v.neighborhood || '—' },
  ];

  return (
    <div className="bg-paper border border-comal/20 rounded-md overflow-hidden">
      <div className="bg-comal/5 px-4 py-3 border-b border-comal/15">
        <h3 className="font-display tracking-wider text-comal text-lg">REVIEW</h3>
      </div>
      <dl className="divide-y divide-comal/10">
        {rows.map((row) => (
          <div key={row.label} className="px-4 py-3 flex justify-between gap-4">
            <dt className="font-body text-adobe text-sm uppercase tracking-wide">{row.label}</dt>
            <dd className="font-body text-comal text-sm font-bold">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
