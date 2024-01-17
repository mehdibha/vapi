"use client"

import { useSession } from "next-auth/react";
import React from "react";

export default function HomePage() {
  const { data} = useSession()

  return <div>{data?.user.name}</div>;
}
