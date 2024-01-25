"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as SpinnerIcon, Plus as AddIcon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputImages } from "@/components/ui/input-images";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useSession } from "@/modules/auth/hooks";
import { uploadFiles } from "@/modules/upload/services";
import { api } from "@/trpc/react";
import { CitySlect } from "./post-card/city-select";

const createPostSchema = z.object({
  content: z.string(),
  phone: z.string(),
  city: z.string(),
});

type CreatePostSchemaType = z.infer<typeof createPostSchema>;

interface CreatePostModalProps {
  children: React.ReactNode;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
  const { children } = props;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { data: userData } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<{ preview: string; file: File }[]>([]);
  const form = useForm<CreatePostSchemaType>({
    values: {
      content: "",
      phone: userData?.user?.phone ?? "",
      city: userData?.user?.city ?? "",
    },
    resolver: zodResolver(createPostSchema),
  });
  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onError: (error) => {
      setIsLoading(false);
      toast(`Une erreur est survenue lors de la publication (${error.message})`);
    },
    onSuccess: async (addedPost) => {
      form.reset();
      setOpen(false);
      setIsLoading(false);
      setImages([]);
      await utils.post.infinitePosts.cancel();
      utils.post.infinitePosts.setInfiniteData({ limit: 10, search: "" }, (data) => {
        if (!data || !userData?.user) {
          return data;
        }
        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: [
              {
                ...addedPost,
                content: addedPost.content.replace(/\n+/g, "\n"),
                comments: [],
                createdAt: new Date(),
                author: {
                  id: userData.user.id,
                  name: userData?.user.name ?? "",
                  image: userData?.user.image ?? null,
                },
                _count: {
                  comments: 0,
                  likes: 0,
                },
              },
              ...page.posts,
            ],
          })),
        };
      });
    },
  });

  const onSubmit: SubmitHandler<CreatePostSchemaType> = async (values) => {
    try {
      setIsLoading(true);
      const uploadedImages = await uploadFiles(images.map((image) => image.file));
      createPost.mutate({
        content: values.content,
        phone: values.phone.trim(),
        city: values.city,
        images: uploadedImages.filter(Boolean) as string[],
      });
    } catch (error) {
      setIsLoading(false);
      toast("Une erreur est survenue lors de l'upload des images");
    }
  };

  const handleLimitImages = (length: number) => {
    if (length + images.length > 5) {
      toast("Vous ne pouvez pas ajouter plus de 5 images");
      return false;
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-screen p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-6">
            <div className="mb-6 flex flex-col space-y-1.5 px-6">
              <DialogTitle>Créer une publication</DialogTitle>
            </div>
            <div className="mb-3 flex items-center space-x-4 px-6">
              <UserAvatar />
              <div>
                <p className="text-sm font-medium leading-none">{userData?.user.name}</p>
              </div>
            </div>
            <div className="h-[250px] overflow-y-scroll px-0 pb-6">
              <div className="px-6 pt-1">
                <div className="mb-2 flex space-x-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input type="tel" placeholder="Tel" {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <CitySlect {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
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
                            className="text-md mb-4 max-h-none resize-none border-none p-0 shadow-none focus-visible:ring-0"
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
                <InputImages
                  value={images}
                  onImagesChange={setImages}
                  onChangeFilesLength={handleLimitImages}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end px-6">
              <Button type="submit" disabled={isLoading || !open} variant="default">
                {isLoading ? (
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
