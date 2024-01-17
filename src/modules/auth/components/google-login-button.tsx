"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface GithubLoginButtonProps {
  className?: string;
}
export const GoogleLoginButton = (props: GithubLoginButtonProps) => {
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
