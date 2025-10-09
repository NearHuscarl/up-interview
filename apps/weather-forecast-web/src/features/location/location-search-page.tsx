import { FormEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";

import { useLocations } from "./use-locations";
import { LocationBanner } from "./components/location-banner";
import { ListItemSkeleton } from "./components/list-item-skeleton";
import { stringifyError } from "../../lib/error";
import { toast } from "sonner";
import { cn } from "@shared/ui-base/cn";
import { Card, CardContent } from "@shared/ui-base/card";
import { Label } from "@shared/ui-base/label";
import { Input } from "@shared/ui-base/input";
import { Button } from "@shared/ui-base/button";
import { ScrollArea } from "@shared/ui-base/scroll-area";
import { Separator } from "@shared/ui-base/separator";

type TDisplayLocation = {
  id: number;
  name: string;
  address: string;
  flagUrl: string;
};

export function LocationSearchPage({ className, ...props }: React.ComponentProps<"div">) {
  const [query, setQuery] = useState("");
  const { data, isLoading, error, refetch } = useLocations(query);

  const [locations, setLocations] = useState<TDisplayLocation[]>([]);

  useEffect(() => {
    setLocations(
      (data?.results || []).map((entry) => ({
        id: entry.id,
        name: entry.name,
        address: entry.fullName,
        flagUrl: `https://open-meteo.com/images/country-flags/${entry.countryCode?.toLowerCase() ?? "united_nations"}.svg`,
      })),
    );
  }, [data]);

  useEffect(() => {
    toast("Couldn't get locations", {
      description: stringifyError(error),
      cancel: {
        label: "Retry",
        onClick: refetch,
      },
    });
  }, [error]);

  return (
    <div className={cn("flex flex-col gap-6 w-1/2 max-w-3xl", className)} {...props}>
      <LocationBanner />
      <Card className="">
        <CardContent>
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              const query = (document.getElementById("location") as HTMLInputElement).value;
              setQuery(query);
            }}
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-3">
                <Input id="location" type="text" placeholder="Ho Chi Minh" required />
                <Button type="submit" size="icon">
                  <Search />
                </Button>
              </div>
              <ScrollArea className="h-72 rounded-md border">
                <div className="p-4">
                  {isLoading && <ListItemSkeleton />}
                  {!isLoading &&
                    locations.map((location, i) => (
                      <>
                        <Button
                          variant="ghost"
                          className="p-0 w-full"
                          size="sm"
                          onClick={() => (window.location.href = "/forecast/" + location.id)}
                        >
                          <img src={location.flagUrl} className="w-6 h-6" alt={`Flag for ${location.name}`} />
                          <div className="text-sm w-full text-left">{location.name}</div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">{location.address}</div>
                        </Button>
                        {i !== locations.length - 1 && <Separator className="my-2" />}
                      </>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
