export const formatTemperature = (value: number): string => {
  return value.toFixed(1);
};

export const formatRateOfChange = (value: number): string => {
  const formatted = value.toFixed(2);
  return value > 0 ? `+${formatted}` : formatted;
};