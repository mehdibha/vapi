"use client";

import React from "react";
import { Plus as PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useSession } from "@/modules/auth/hooks";

interface CreatePostModalProps {
  children: React.ReactNode;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
  const { children } = props;

  const { data } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      content: "",
      images: [],
    },
  });

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-6">
            <div className="mb-6 flex flex-col space-y-1.5 px-6">
              <DialogTitle>Créer une publication</DialogTitle>
            </div>
            <div className="mb-3 flex items-center space-x-4 px-6">
              <UserAvatar />
              <div>
                <p className="text-sm font-medium leading-none">{data?.user.name}</p>
              </div>
            </div>
            <ScrollArea className="max-h-[200px] px-0">
              <div className="px-6 pt-1">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Ecrivez ici"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <div className="mt-4">
                  <div className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-muted-foreground bg-transparent text-muted-foreground duration-150 hover:bg-slate-200">
                    <PlusIcon size={15} />
                    <p className="text-xs">Ajouter une image</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="mt-4 px-6">
              <Button type="submit" variant="default">
                Publier
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
