import React from "react";
import type { Metadata } from "next";
import { StoresView } from "@/modules/stores/components/stores-view";

export const metadata: Metadata = {
  title: {
    absolute: "Vape stores en Tunisie",
  },
};

export default function Page() {
  return <StoresView className="pt-4" />;
}
