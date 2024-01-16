"use client";

import React from "react";
import { Button, GoogleIcon } from "@vapi/ui";
import { signIn } from "next-auth/react";

interface GithubLoginButtonProps {
  className?: string;
}
export const GoogleLoginButton = (props: GithubLoginButtonProps) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      icon={GoogleIcon}
      loading={loading}
      color="secondary"
      fullWidth
      onClick={() => {
        setLoading(true);
        signIn("google");
      }}
      className={props.className}
    >
      Se connecter avec Google
    </Button>
  );
};
