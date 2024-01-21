import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes";

export const LogoutButton = ({ className }: { className: string }) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={async () => {
        await signOut({ callbackUrl: window.location.origin });
      }}
      className={cn("h-8 w-8 ", className)}
    >
      <LogOutIcon size={18} />
    </Button>
  );
};
