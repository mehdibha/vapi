"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  CameraIcon,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PlusCircleIcon,
  PlusIcon,
  ScrollArea,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@vapotertn/ui";

interface CreatePostModalProps {
  children: React.ReactNode;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
  const { children } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="px-6">
          <DialogTitle>Créer une publication</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4 px-6">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="Image" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-muted-foreground text-xs">Il y a 3 jours</p>
          </div>
        </div>

        <ScrollArea className="max-h-[200px] px-0">
          <div className="px-6 pt-1">
            <Textarea placeholder="Ecrivez ici" />
            <div className="mt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="border-muted-foreground text-muted-foreground flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border bg-transparent duration-150 hover:bg-slate-200">
                      <PlusIcon size={15} />
                      <p className="text-xs">Ajouter une image</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ajouter une image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="px-6">
          <Button fullWidth color="primary">
            Publier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
