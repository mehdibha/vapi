"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/classes";

export function UserAvatar({ className }: { className?: string }) {
  const { data } = useSession();

  const initials = data?.user?.name ? data?.user?.name[0] : "";

  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={data?.user?.image ?? undefined} alt={data?.user?.name ?? ""} />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  );
}
