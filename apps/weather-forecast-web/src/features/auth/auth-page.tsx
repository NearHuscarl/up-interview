import { Button } from "@shared/ui-base/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui-base/card";
import { cn } from "@shared/ui-base/cn";
import { DateRangePicker } from "@shared/ui-base/date-range-picker";
import { Input } from "@shared/ui-base/input";
import { Label } from "@shared/ui-base/label";
import { FormEvent } from "react";

export function AuthPage({ className, ...props }: React.ComponentProps<"div">) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    //
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Weather Forecast</CardTitle>
          <CardDescription>Login with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" type="text" placeholder="Ho Chi Minh" required />
                </div>
                <div className="grid gap-3">
                  <DateRangePicker className="w-full" />
                </div>
                <Button type="submit" className="w-full">
                  See forecast
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
