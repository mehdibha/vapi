"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classes";

interface NavItem {
  label: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

interface NavProps {
  items: NavItem[];
  direction?: "column" | "row";
  onNavItemClick?: () => void;
  itemWrapper?: React.ComponentType<{ children: React.ReactNode }>;
  className?: string;
}

export const Nav = (props: NavProps) => {
  const { items, direction = "row", onNavItemClick, itemWrapper, className } = props;
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center gap-0 sm:gap-2", className, {
        "flex-col gap-2": direction === "column",
      })}
    >
      {items?.map((item, index) => {
        if (!item.href) return null;
        const WrappedLink = itemWrapper ?? React.Fragment;

        return (
          <WrappedLink key={index}>
            <Link
              href={item.href}
              className={cn(
                "w-full rounded-full px-4 py-1 text-center text-sm font-medium transition-all hover:text-foreground",
                item.disabled && "cursor-not-allowed opacity-80",
                item.href === pathname
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/60"
              )}
              onClick={onNavItemClick}
            >
              {item.label}
            </Link>
          </WrappedLink>
        );
      })}
    </nav>
  );
};
