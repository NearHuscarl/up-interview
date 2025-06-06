import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui-base/card";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useLocations } from "../location/use-location";
import { useWeatherForecast } from "./use-weather-forecast";
import { TemperatureChart, TTemperatureChartData } from "./temperature-chart";
import { toast } from "sonner";
import { stringifyError } from "@/lib/error";
import { GalleryVerticalEnd } from "lucide-react";
import { RainChart } from "./rain-chart";
import { ForecastSettings } from "./forecast-settings";
import { useSelector } from "@/store/use-selector";

export function ForecastDetailsPage({ className, ...props }: React.ComponentProps<"div">) {
  const params = useParams();
  const [id, setId] = useState<number | undefined>(undefined);

  const temperatureUnit = useSelector((state) => state.forecast.filter.temperatureUnit);

  useEffect(() => {
    setId(Number(params.id));
  }, [params]);

  const { error: error1, isLoading: isLoading1, data } = useLocations(id);
  const {
    error: error2,
    isLoading: isLoading2,
    data: forecast,
    fetchData,
  } = useWeatherForecast(data?.longitude, data?.latitude, temperatureUnit);

  const isLoading = isLoading1 || isLoading2;

  const temperatureData = useMemo<TTemperatureChartData>(() => {
    const hourlyForecast = (forecast?.hourly.time ?? []).map((date, i) => ({
      date,
      temperature: forecast?.hourly.temperature_2m[i] ?? 0,
    }));
    return hourlyForecast;
  }, [forecast]);

  useEffect(() => {
    if (error1 || error2) {
      toast("Couldn't get forecast data", {
        description: stringifyError(error1 || error2),
        cancel: {
          label: "Retry",

          onClick: fetchData,
        },
      });
    }
  }, [error1, error2, fetchData]);

  return (
    <div className={cn("flex gap-6 w-full flex-col items-center", className)} {...props}>
      <div className="flex items-center gap-2 self-center font-medium mt-20">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <span className="text-xl">{data?.name} forecast in the next 5 days</span>
      </div>
      <Card className="w-7xl">
        <CardContent>
          <ForecastSettings />
        </CardContent>
      </Card>
      <div className="flex flex-1 gap-6 w-full max-w-7xl min-h-96">
        <Card className="flex-1">
          <CardHeader className="text-center">
            <CardTitle className="text-l">Temperature forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <TemperatureChart isLoading={isLoading} data={temperatureData} />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="text-center">
            <CardTitle className="text-l">Rain forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <RainChart isLoading={isLoading} forecast={forecast} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
