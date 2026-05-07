const formatters = new Map<string, Intl.NumberFormat>();

const getFormatter = (currency: string): Intl.NumberFormat => {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat('es-MX', {
      style:                 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    formatters.set(currency, f);
  }
  return f;
};

export const formatCurrency = (amount: number, currency = 'MXN'): string => {
  const safe = Number.isFinite(amount) ? amount : 0;
  return getFormatter(currency).format(safe);
};
