import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return (
    <Button
      size="sm"
      onClick={async () => {
        await signOut({ callbackUrl: window.location.origin });
      }}
    >
      Logout
    </Button>
  );
};
