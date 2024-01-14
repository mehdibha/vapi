"use client";

import React from "react";
import { Button, GoogleIcon } from "@vapotertn/ui";
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
      fullWidth
      onClick={() => {
        setLoading(true);
        signIn("google");
      }}
      className={props.className}
    >
      Sign in with Google
    </Button>
  );
};
