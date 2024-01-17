"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  const { data } = useSession();

  const initials = data?.user?.name ? data?.user?.name[0] : "";

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={data?.user?.image ?? undefined} alt={data?.user?.name ?? ""} />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  );
}
