"use client";

import type { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "@/modules/auth/components/logout-button";

interface HeaderMenuProps {
  children: ReactNode;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
  const { children } = props;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col w-[300px]">
        <div className="flex-1"></div>
        <SheetFooter>
          <SheetClose asChild>
            <LogoutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
