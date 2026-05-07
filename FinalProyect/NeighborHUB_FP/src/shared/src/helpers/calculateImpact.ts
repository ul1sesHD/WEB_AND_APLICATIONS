export type Impact = {
  co2Kg: number;
  trees: number;
  pesos: number;
};

const KG_PER_KM   = 0.21;
const KG_PER_TREE = 21;

export const calculateImpact = (km: number, spending: number): Impact => {
  const safeKm    = Number.isFinite(km)       && km       >= 0 ? km       : 0;
  const safeSpend = Number.isFinite(spending) && spending >= 0 ? spending : 0;
  const co2Kg     = Math.round(safeKm * KG_PER_KM * 10000) / 10000;
  return {
    co2Kg,
    trees: Math.round((co2Kg / KG_PER_TREE) * 100) / 100,
    pesos: Math.round(safeSpend * 100) / 100,
  };
};
