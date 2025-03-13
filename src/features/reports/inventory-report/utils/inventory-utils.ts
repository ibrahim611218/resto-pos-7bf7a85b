
/**
 * Calculates the inventory percentage based on current and original quantities
 */
export const calculateInventoryPercentage = (current: number, original: number | undefined): number => {
  if (!original || original === 0) return 100;
  return Math.round((current / original) * 100);
};

/**
 * Returns the appropriate color for the inventory status based on percentage
 */
export const getInventoryStatusColor = (percentage: number): string => {
  if (percentage < 20) return "text-red-600";
  if (percentage < 50) return "text-yellow-600";
  return "text-green-600";
};
