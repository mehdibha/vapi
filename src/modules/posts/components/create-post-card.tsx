"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/classes";
import { LoginModal } from "@/modules/auth/components/login-modal";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useSession } from "@/modules/auth/hooks";
import { CreatePostModal } from "./create-post-modal";

export const CreatePostCard = () => {
  const { status } = useSession();
  const disabled = status === "loading";

  return (
    <Card className="px-4 py-6 xs:px-6">
      <div className="flex items-center space-x-2 md:space-x-4">
        {status === "authenticated" ? (
          <>
            <UserAvatar />
            <CreatePostModal>
              <div className="w-full cursor-pointer rounded-full border bg-muted/50 px-6 py-2 text-muted-foreground hover:bg-muted">
                Vendez quelque chose ou posez une question.
              </div>
            </CreatePostModal>
          </>
        ) : (
          <LoginModal disabled={disabled}>
            <div
              className={cn(
                "w-full cursor-pointer rounded-full border bg-muted/50 px-6 py-2 text-muted-foreground hover:bg-muted",
                {
                  "hover:bg-muted-50 cursor-default": disabled,
                }
              )}
            >
              Vendez quelque chose ou posez une question.
            </div>
          </LoginModal>
        )}
      </div>
    </Card>
  );
};
