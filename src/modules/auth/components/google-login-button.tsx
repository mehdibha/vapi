"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type GoogleLoginButtonProps = React.HTMLAttributes<HTMLElement>;

export const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  return (
    <Button
      variant="secondary"
      onClick={async () => {
        await signIn("google");
      }}
      className={props.className}
    >
      Se connecter avec Google
    </Button>
  );
};
