"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  PlusIcon,
  ScrollArea,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@vapi/ui";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Post } from "@/types";
import { createPost } from "../actions";

interface CreatePostModalProps {
  onPostAdd: (post: Post) => void;
  children: React.ReactNode;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
  const { onPostAdd, children } = props;

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      content: "",
      images: [],
    },
  });
  const [pending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const { status, data } = useSession();

  function onSubmit(values: any) {
    if (status !== "authenticated") {
      return;
    }
    const postToAdd = values;
    form.reset();
    setOpen(false);
    startTransition(async () => {
      onPostAdd(postToAdd);
      const result = await createPost({
        content: values.content,
        images: [],
      });
      if (result.error) {
        toast({ title: result?.error, variant: "destructive" });
      }
      if (result.success) {
        router.refresh();
      }
    });
  }

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
              <Avatar>
                <AvatarImage src={data?.user.image ?? undefined} alt="Image" />
                <AvatarFallback>
                  {data?.user.name ? data.user.name[0] : ""}
                </AvatarFallback>
              </Avatar>
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
            <div className="mt-4 px-6">
              <Button type="submit" loading={pending} fullWidth color="primary">
                Publier
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
