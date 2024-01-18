"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus as PlusIcon } from "lucide-react";
import { Loader2 as SpinnerIcon, Plus as AddIcon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
import { api } from "@/trpc/react";

const createPostSchema = z.object({
  content: z.string().min(1),
  images: z.array(z.string().url()),
});

type CreatePostSchemaType = z.infer<typeof createPostSchema>;

interface CreatePostModalProps {
  children: React.ReactNode;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
  const { children } = props;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { data } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm<CreatePostSchemaType>({
    defaultValues: {
      content: "",
      images: [],
    },
    resolver: zodResolver(createPostSchema),
  });
  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onError: (error) => {
      console.log(error)
    },
    onSuccess: async (addedPost) => {
      form.reset();
      setOpen(false);
      utils.post.getLatest.setData(undefined, (oldPosts) => [
        {
          ...addedPost,
          comments: [],
          createdAt: new Date(),
          author: {
            name: data?.user.name ?? "",
            image: data?.user.image ?? null,
          },
        },
        ...(oldPosts ?? []),
      ]);
    },
  });

  const onSubmit: SubmitHandler<CreatePostSchemaType> = (values) => {
    createPost.mutate({
      content: values.content,
      images: values.images,
    });
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
                            ref={textareaRef}
                            placeholder="Ecrivez ici"
                            rows={1}
                            className="max-h-[95px] resize-none"
                            value={field.value}
                            onChange={(e) => {
                              if (!textareaRef.current) return;
                              field.onChange(e.target.value);
                              textareaRef.current.style.height = "auto";
                              textareaRef.current.style.height =
                                textareaRef.current.scrollHeight + 2 + "px";
                            }}
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
                <div className="mt-4">
                  <div className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-muted-foreground bg-transparent text-muted-foreground duration-150 hover:bg-slate-200">
                    <PlusIcon size={15} />
                    <p className="text-xs">Ajouter une image</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="mt-4 flex justify-end px-6">
              <Button type="submit" disabled={createPost.isLoading || !open} variant="default">
                {createPost.isLoading ? (
                  <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <AddIcon className="mr-2 h-4 w-4" />
                )}
                Publier
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
