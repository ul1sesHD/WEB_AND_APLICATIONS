export type CO2Display = { value: string; equivalence: string };

const KG_PER_TREE = 21;

export const formatCO2 = (kg: number): CO2Display => {
  const safeKg = Number.isFinite(kg) && kg >= 0 ? kg : 0;
  const trees  = safeKg / KG_PER_TREE;
  return {
    value:       `${safeKg.toFixed(1)} kg`,
    equivalence: `≈ ${trees.toFixed(1)} trees planted`,
  };
};
