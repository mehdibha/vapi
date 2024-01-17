import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center pt-28 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-xl border bg-card px-4 py-12 shadow-lg sm:px-12">
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
