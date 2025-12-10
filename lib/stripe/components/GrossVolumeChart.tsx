'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useEffect, useState, useMemo } from 'react';
import { getDailyVolumeData } from '../api/client';
import { TimePeriod, VolumeData } from '../types';

interface GrossVolumeChartProps {
  apiKey: string;
  period?: TimePeriod;
  accountName?: string;
  currency?: string;
}

export function GrossVolumeChart({
  apiKey,
  period = '30d',
  accountName = 'Stripe',
  currency = 'USD',
}: GrossVolumeChartProps) {
  const [data, setData] = useState<VolumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalVolume, setTotalVolume] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const volumeData = await getDailyVolumeData(apiKey, period);
        setData(volumeData);

        // Calculate total net volume
        const total = volumeData.reduce((sum, item) => sum + item.amount, 0);
        setTotalVolume(total);
      } catch (err) {
        setError('Failed to load volume data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiKey, period]);

  // Sort data and prepare for visualization
  const { sortedData, highestValue, lowestValue } = useMemo(() => {
    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));

    // Find highest and lowest values for scaling
    const highest = Math.max(...sorted.map(item => item.amount), 0);
    const lowest = Math.min(...sorted.map(item => item.amount), 0);

    return {
      sortedData: sorted,
      highestValue: highest,
      lowestValue: lowest,
    };
  }, [data]);

  // Calculate SVG dimensions
  const svgHeight = 240;
  const svgWidth = 600;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartHeight = svgHeight - padding.top - padding.bottom;
  const chartWidth = svgWidth - padding.left - padding.right;

  // Generate SVG path from data
  const generatePath = useMemo(() => {
    if (sortedData.length === 0) return '';

    // Calculate range from lowest to highest for proper scaling
    const valueRange = Math.abs(highestValue - lowestValue) || 1;
    // Use 0 as the baseline, unless all values are negative
    const baseline = lowestValue >= 0 ? 0 : lowestValue;

    // Scale point values to fit chart height
    const scaleY = (value: number) => {
      // Invert Y axis (SVG 0 is at top)
      return chartHeight - ((value - baseline) / valueRange) * chartHeight;
    };

    // Scale X axis points evenly across width
    const stepX =
      sortedData.length <= 1 ? 0 : chartWidth / (sortedData.length - 1);

    // Generate path
    let path = '';

    // Start at the first point
    if (sortedData.length > 0) {
      const firstY = scaleY(sortedData[0].amount);
      path = `M${padding.left},${padding.top + firstY}`;

      // Add line segments to each point
      sortedData.forEach((point, index) => {
        const x = padding.left + index * stepX;
        const y = padding.top + scaleY(point.amount);
        path += ` L${x},${y}`;
      });
    }

    return path;
  }, [sortedData, highestValue, lowestValue, chartHeight, chartWidth]);

  // Format period for display
  const periodDisplay =
    {
      '7d': 'Last 7 days',
      '30d': 'Last 30 days',
      '90d': 'Last 90 days',
      ytd: 'Year to date',
      all: 'All time',
    }[period] || period;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume ({accountName})</CardTitle>
        <CardDescription>{periodDisplay}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[260px] items-center justify-center">
            <p>Loading volume data...</p>
          </div>
        ) : error ? (
          <div className="flex h-[260px] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h3
                className="text-2xl font-bold"
                style={{ color: totalVolume < 0 ? '#ef4444' : '#22c55e' }}
              >
                {formatCurrency(totalVolume, currency)}
              </h3>
              <p className="text-sm text-gray-500">Net volume</p>
            </div>

            {sortedData.length > 0 ? (
              <div className="h-[260px] w-full overflow-x-auto">
                <svg
                  width="100%"
                  height={svgHeight}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="overflow-visible"
                  style={{ minWidth: '500px' }}
                >
                  {/* Horizontal zero line (if there are negative values) */}
                  {lowestValue < 0 && (
                    <line
                      x1={padding.left}
                      y1={
                        padding.top +
                        chartHeight *
                          (1 -
                            Math.abs(0 - lowestValue) /
                              Math.abs(highestValue - lowestValue))
                      }
                      x2={padding.left + chartWidth}
                      y2={
                        padding.top +
                        chartHeight *
                          (1 -
                            Math.abs(0 - lowestValue) /
                              Math.abs(highestValue - lowestValue))
                      }
                      stroke="#888"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                  )}

                  {/* Line chart */}
                  <path
                    d={generatePath}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />

                  {/* Data points */}
                  {sortedData.map((point, i) => {
                    const stepX =
                      sortedData.length <= 1
                        ? 0
                        : chartWidth / (sortedData.length - 1);
                    const x = padding.left + i * stepX;
                    const valueRange =
                      Math.abs(highestValue - lowestValue) || 1;
                    const baseline = lowestValue >= 0 ? 0 : lowestValue;
                    const y =
                      padding.top +
                      (chartHeight -
                        ((point.amount - baseline) / valueRange) * chartHeight);

                    return (
                      <circle
                        key={point.date}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={point.amount >= 0 ? '#0284c7' : '#ef4444'}
                      >
                        <title>
                          {point.date}: {formatCurrency(point.amount, currency)}
                        </title>
                      </circle>
                    );
                  })}

                  {/* Date labels (show first, last, and every ~4th point) */}
                  {sortedData.map((point, i) => {
                    // Only show a few date labels to avoid overcrowding
                    if (i === 0 || i === sortedData.length - 1 || i % 4 === 0) {
                      const stepX =
                        sortedData.length <= 1
                          ? 0
                          : chartWidth / (sortedData.length - 1);
                      const x = padding.left + i * stepX;

                      return (
                        <text
                          key={`label-${point.date}`}
                          x={x}
                          y={svgHeight - 10}
                          textAnchor={
                            i === 0
                              ? 'start'
                              : i === sortedData.length - 1
                                ? 'end'
                                : 'middle'
                          }
                          fontSize="10"
                          fill="#888"
                        >
                          {new Date(point.date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </text>
                      );
                    }
                    return null;
                  })}
                </svg>
              </div>
            ) : (
              <div className="flex h-[260px] items-center justify-center text-gray-500">
                No data available for this period
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
