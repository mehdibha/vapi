"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { siteConfig } from "@/config";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useSession } from "@/modules/auth/hooks";
import { HeaderMenu } from "./menu";

export const Header = () => {
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm dark:bg-background dark:text-foreground">
      <div className="container flex h-12 items-center justify-between py-2">
        <Link
          href="/"
          className="flex w-[200px] items-center space-x-2 duration-150 hover:opacity-80"
        >
          <Image
            src={siteConfig.global.logo}
            alt={siteConfig.global.name}
            width={200}
            height={200}
            className="object-contain h-6"
          />
          {/* <span className="inline-block font-bold">{siteConfig.global.name}</span> */}
        </Link>
        <Nav items={siteConfig.header.nav.links} />
        <div className="flex w-[200px] justify-end">
          {status === "unauthenticated" && (
            <Button asChild size="sm">
              <Link href="/login">Se connecter</Link>
            </Button>
          )}
          {status === "authenticated" && (
            <HeaderMenu>
              <Button variant="ghost" size="icon">
                <UserAvatar />
              </Button>
            </HeaderMenu>
          )}
        </div>
      </div>
    </header>
  );
};

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
}

const Nav = (props: NavProps) => {
  const { items, direction = "row", onNavItemClick } = props;
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center gap-0 sm:gap-2", {
        "flex-col gap-2": direction === "column",
      })}
    >
      {items?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
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
          )
      )}
    </nav>
  );
};
