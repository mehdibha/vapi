import React from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Appayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-64px)] pt-10">{children}</div>
      <Footer />
    </div>
  );
}
