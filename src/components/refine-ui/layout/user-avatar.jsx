"use client";

import { useGetIdentity } from "@refinedev/core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  const { data: user } = useGetIdentity();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.avatar} alt={user?.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
