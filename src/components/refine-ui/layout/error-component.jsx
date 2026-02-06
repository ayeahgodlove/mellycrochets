"use client";

import { useGo } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ErrorComponent() {
  const go = useGo();

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Something went wrong. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => go({ to: "/" })}>Go Home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
