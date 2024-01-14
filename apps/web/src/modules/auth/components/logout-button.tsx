"use client";

import React from "react";
import { Button, ButtonProps, LogOutIcon } from "@vapotertn/ui";
import { cn } from "@vapotertn/utils";
import { signOut } from "next-auth/react";

export const LogoutButton = (props: ButtonProps) => {
  const { className, ...restProps } = props;

  return (
    <Button
      size="icon"
      onClick={() => {
        signOut({ callbackUrl: `${window.location.origin}/login` });
      }}
      className={cn("", className)}
      {...restProps}
    >
      <LogOutIcon />
    </Button>
  );
};
