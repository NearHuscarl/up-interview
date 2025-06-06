import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroup, ToggleGroupItem } from "@/ui-base/toggle-group";
import { setTemperatureUnit } from "./forecast.slice";
import { cn } from "@/lib/utils";
import { Button } from "@/ui-base/button";

export function ForecastSettings(props: React.ComponentProps<"form">) {
  const schema = z.object({
    temperatureUnit: z.enum(["celsius", "fahrenheit"]),
  });

  const form = useForm<any>({
    resolver: zodResolver(schema),

    defaultValues: { temperatureUnit: "celsius" },
  });
  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    dispatch(setTemperatureUnit(data.temperatureUnit));
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex items-baseline gap-4", props.className)}
      {...props}
    >
      <div className="text-sm text-muted-foreground mb-2">Temperature Unit</div>
      <Controller
        name="temperatureUnit"
        control={form.control}
        render={({ field }) => (
          <ToggleGroup variant="outline" type="single" {...field} onValueChange={field.onChange}>
            <ToggleGroupItem value="celsius" name="Celsius °C">
              °C
            </ToggleGroupItem>
            <ToggleGroupItem value="fahrenheit" name="Fahrenheit °F">
              °F
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      />
      <Button variant="secondary">Save</Button>
    </form>
  );
}
