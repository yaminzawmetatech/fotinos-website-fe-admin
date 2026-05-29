/**
 * Formats a number or string into a currency/thousands separated format without decimals.
 * e.g., 50000.00 -> "50,000"
 */
export const currencyFormat = (value: string | number | null | undefined): string => {
    if (value === undefined || value === null) return "-";
    
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
  
    if (isNaN(numericValue)) return "-";
  
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };