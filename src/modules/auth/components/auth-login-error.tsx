"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

// import { Alert, AlertDescription } from "@vapi/ui";

interface AuthLoginProps {
  className: string;
}

export const AuthLoginError = (props: AuthLoginProps) => {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const errorMessage: string | null = Array.isArray(error) ? error.pop() : error;

  if (!errorMessage) {
    return null;
  }

  return (
    <Alert variant="destructive" {...props}>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};
