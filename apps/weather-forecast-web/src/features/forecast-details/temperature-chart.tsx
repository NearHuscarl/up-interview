import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@shared/ui-base/chart";
import { CircularProgress } from "@shared/ui-base/circular-progress";
import { useSelector } from "../../store/use-selector";

const chartConfig = {
  temperature: {
    label: "Temperature",
  },
} satisfies ChartConfig;

export type TTemperatureChartData = {
  date: string;
  temperature: number;
}[];

type TTemperatureChartProps = {
  isLoading?: boolean;
  data: TTemperatureChartData;
};

export function TemperatureChart(props: TTemperatureChartProps) {
  const { isLoading, data } = props;

  const filter = useSelector((state) => state.forecast.filter);
  const tempUnit = {
    celsius: "°C",
    fahrenheit: "°F",
  }[filter.temperatureUnit];

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">{isLoading && <CircularProgress />}</div>
      <ChartContainer config={chartConfig} className="min-h-[100px] max-w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <YAxis tickFormatter={(value) => `${value}${tempUnit}`} />
          <XAxis
            dataKey="date"
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            axisLine={false}
            interval={23} // Show one tick per day
            tickFormatter={(value) => format(new Date(value), "MMM d")}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(date) => {
                  if (date === "Temperature") return "None";
                  return format(new Date(date), "MMM d, HH:mm");
                }}
                formatter={(value, _name) => {
                  return `Temperature: ${value}${tempUnit}`;
                }}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent nameKey="temperature" />} />
          <Bar dataKey="temperature" fill="var(--chart-2)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
