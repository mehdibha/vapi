"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data } = useSession();

  return <div>{data?.user.name}</div>;
}
