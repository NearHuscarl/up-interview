import { useMemo } from "react";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { CircularProgress } from "@shared/ui-base/circular-progress";
import { TForecastResponse } from "../../api/forecast";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@shared/ui-base/chart";

const chartConfig = {
  rain: {
    label: "Rain",
  },
  showers: {
    label: "Showers",
  },
} as ChartConfig;

export type TRainChartData = {
  date: string;
  rain: number;
  showers: number;
}[];

type TRainChartProps = {
  isLoading?: boolean;

  forecast?: TForecastResponse;
};

export function RainChart(props: TRainChartProps) {
  const { isLoading, forecast } = props;

  const rainData = useMemo<TRainChartData>(() => {
    const hourly = forecast?.hourly ?? { time: [], rain: [], showers: [] };
    const hourlyForecast = (hourly.time ?? []).map((date, i) => ({
      date,
      rain: hourly.rain[i] ?? 0,
      showers: hourly.showers[i] ?? 0,
    }));
    const forecastByDay = Object.groupBy(hourlyForecast, (item) => item.date.slice(0, 10)) as Record<
      string,
      TRainChartData
    >;
    const results: TRainChartData = [];

    for (const [day, forecastThatDay] of Object.entries(forecastByDay)) {
      const rain = forecastThatDay.reduce((acc, item) => acc + item.rain, 0);
      const showers = forecastThatDay.reduce((acc, item) => acc + item.showers, 0);
      results.push({ date: day, rain, showers });
    }
    return results;
  }, [forecast]);

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">{isLoading && <CircularProgress />}</div>
      <ChartContainer config={chartConfig} className="min-h-[100px] max-w-full">
        <LineChart accessibilityLayer data={rainData}>
          <CartesianGrid vertical={false} />
          <YAxis tickFormatter={(value) => `${value}mm`} />
          <XAxis
            dataKey="date"
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => format(new Date(value), "MMM d")}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(date) => {
                  if (date === "Rain" || date === "Showers") return "None";
                  return format(new Date(date), "MMM d, HH:mm");
                }}
                formatter={(value, name) => `${chartConfig[name].label}: ${value}mm`}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line dataKey="rain" stroke="var(--chart-1)" radius={4} type="monotone" />
          <Line dataKey="showers" stroke="var(--chart-3)" radius={4} type="monotone" />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
