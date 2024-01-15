import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogContent,
} from "@vapotertn/ui";
import { GoogleLoginButton } from "./google-login-button";

interface LoginModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const LoginModal = (props: LoginModalProps) => {
  const { open, onOpenChange, children } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm pt-10">
        <DialogHeader>
          <DialogTitle className="text-center">Se connecter</DialogTitle>
          <DialogDescription className="text-center">
            Vous devez vous connecter pour pouvoir publier.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <GoogleLoginButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};
