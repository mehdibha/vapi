import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/classes";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center sm:px-6 lg:px-8">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </>
      </Link>
      <div className="w-full max-w-md rounded-xl border bg-card px-4 py-12 shadow-sm sm:px-12">
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
