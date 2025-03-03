/**
 * Tremor utility functions and hooks
 * This file contains helper functions and custom hooks for Tremor components
 */

import { useState, useEffect } from "react";
import { chartColors } from "./theme";

/**
 * Generate a random color from the chart colors palette
 */
export const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * chartColors.length);
  return chartColors[randomIndex];
};

/**
 * Generate a deterministic color based on a string (e.g., category name)
 * This ensures the same string always gets the same color
 */
export const getColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % chartColors.length;
  return chartColors[index];
};

/**
 * Custom hook for responsive chart dimensions
 * Adjusts chart dimensions based on container width
 */
export const useResponsiveChartDimensions = (
  containerRef: React.RefObject<HTMLElement>
) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Calculate height based on aspect ratio (16:9)
        const height = width * 0.5625;
        setDimensions({ width, height });
      }
    };

    // Initial calculation
    updateDimensions();

    // Update on resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [containerRef]);

  return dimensions;
};

/**
 * Custom hook for loading chart data with a loading state
 */
export const useChartData = <T>(initialData: T[] = []) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (fetchFn: () => Promise<T[]>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, setData, isLoading, error, loadData };
};

/**
 * Generate dummy data for charts (useful for development/testing)
 */
export const generateDummyTimeSeriesData = (
  days = 30,
  categories: string[] = ["Category A", "Category B"]
) => {
  const result = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i - 1));
    
    const entry: Record<string, any> = {
      date: date.toISOString().split("T")[0],
    };
    
    categories.forEach((category) => {
      // Generate random value between 100 and 1000
      entry[category] = Math.floor(Math.random() * 900) + 100;
    });
    
    result.push(entry);
  }

  return result;
};

/**
 * Format data for Tremor charts
 */
export const formatDataForBarChart = <T extends Record<string, any>>(
  data: T[],
  categoryKey: string,
  valueKey: string
) => {
  return data.map((item) => ({
    name: item[categoryKey],
    value: item[valueKey],
    color: getColorFromString(item[categoryKey]),
  }));
};

/**
 * Calculate percentage change between two values
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};