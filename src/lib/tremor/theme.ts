/**
 * Tremor theme configuration
 * This file contains theme-related utilities and configurations for Tremor components
 */

// Color palette for Tremor charts and visualizations
export const chartColors = [
  "#0ea5e9", // sky-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#f59e0b", // amber-500
  "#84cc16", // lime-500
  "#10b981", // emerald-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
];

// Default color for Tremor charts
export const defaultChartColor = "#0ea5e9"; // sky-500

// Custom formatter for currency values (COP - Colombian Peso)
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Custom formatter for percentage values
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat("en", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

// Custom formatter for large numbers (with K, M, B suffixes)
export const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
};

// Date formatter for charts
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Common chart options
export const commonChartOptions = {
  showLegend: true,
  showXAxis: true,
  showYAxis: true,
  showGridLines: true,
  showAnimation: true,
};