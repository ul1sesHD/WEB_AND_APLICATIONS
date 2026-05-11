import { useFormContext } from 'react-hook-form';
import { useCategories, type Category } from '@neighborhub/shared';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MetalPlate } from '@/components/brand/MetalPlate';
import type { FormData } from './schema';

const CategoryGrid = ({ categories, selected, onSelect }: {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
    {categories.map((c) => (
      <button key={c.id} type="button" onClick={() => onSelect(c.id)}
        className="flex flex-col items-center gap-1">
        <MetalPlate category={c.name.toLowerCase()} size="sm" selected={c.id === selected} />
        <span className="font-body text-xs text-comal truncate w-full text-center">{c.name}</span>
      </button>
    ))}
  </div>
);

export const StepBasics = ({ onNext }: { onNext: () => void }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormData>();
  const { data: categories = [] } = useCategories();
  const selected = watch('categoryId');

  return (
    <div className="flex flex-col gap-5">
      <Input label="Business name" {...register('name')} error={errors.name?.message} />
      <div>
        <p className="font-body font-bold text-comal text-sm uppercase tracking-wide mb-2">Category</p>
        <CategoryGrid categories={categories} selected={selected ?? ''} onSelect={(id) => setValue('categoryId', id)} />
        {errors.categoryId && <span className="text-toldo text-sm font-body font-bold">{errors.categoryId.message}</span>}
      </div>
      <Input label="Description" {...register('description')} />
      <Input label="Vendor name" {...register('vendorName')} hint="Who runs this business?" />
      <Input label="Vendor quote" {...register('vendorQuote')} hint="A short phrase about the business" />
      <Input label="Years in the barrio" type="number" {...register('yearsInNeighborhood')} />
      <Button onClick={onNext} fullWidth>Next</Button>
    </div>
  );
};
