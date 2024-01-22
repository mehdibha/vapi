"use client";

import type { ReactNode } from "react";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config";
import { LogoutButton } from "@/modules/auth/components/logout-button";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useSession } from "@/modules/auth/hooks";
import { Nav } from "./nav";

interface HeaderMenuProps {
  children: ReactNode;
}

interface LinkWrapperProps {
  children: React.ReactNode;
}
const LinkWrapper: React.FC<LinkWrapperProps> = ({ children }) => (
  <SheetClose asChild>{children}</SheetClose>
);

const links = siteConfig.global.externalLinks;

export const HeaderMenu = (props: HeaderMenuProps) => {
  const { children } = props;
  const { status, data } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-[270px] flex-col">
        <div className="flex-1">
          {status === "unauthenticated" && (
            <div className="mt-8 flex justify-center">
              <SheetClose asChild>
                <Button asChild size="sm" className="w-[80%]">
                  <Link href="/login">Se connecter</Link>
                </Button>
              </SheetClose>
            </div>
          )}
          {status === "authenticated" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <UserAvatar />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {data.user.name?.split(" ")[0]}
                  </p>
                </div>
              </div>
              <SheetClose asChild>
                <LogoutButton className="mr-4" />
              </SheetClose>
            </div>
          )}
          <div className="mx-auto mt-6">
            <Nav
              direction="column"
              items={siteConfig.header.nav.links}
              itemWrapper={LinkWrapper}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-5 items-center space-x-1">
            {links.map((Link, index) => (
              <React.Fragment key={index}>
                <a href={Link.url} target="_blank">
                  <SheetClose asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Link.icon size={18} />
                    </Button>
                  </SheetClose>
                </a>
                {index !== links.length - 1 && <Separator orientation="vertical" />}
              </React.Fragment>
            ))}
          </div>
          <SheetClose asChild>
            <ThemeToggle />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
