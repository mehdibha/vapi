"use client";

import React, { useOptimistic } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  FormControl,
  FormField,
  Form,
  FormItem,
  Textarea,
  useToast,
  Button,
  Separator,
} from "@vapi/ui";
import { formatRelativeTime } from "@vapi/utils";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Comment, Post } from "@/types";
import { addCommentToPost } from "../actions";

interface PostCardProps {
  post: Post;
}

export const PostCard = (props: PostCardProps) => {
  const { post } = props;
  const { postId, author, createdAt, content, images, comments } = post;

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });
  const [_, startTransition] = React.useTransition();
  const { data, status } = useSession();
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentState: Comment[], newMessage: string) => [
      ...currentState,
      {
        author: { name: data?.user.name, avatar: data?.user.image },
        message: newMessage,
        createdAt: new Date(),
      },
    ]
  );

  function onSubmit(values: any) {
    if (status !== "authenticated" || !postId) {
      return;
    }
    startTransition(async () => {
      const message = values.message;
      addOptimisticComment(message);
      form.reset();
      const result = await addCommentToPost({
        postId,
        message: message,
      });
      if (result.error) {
        toast({ title: result?.error, variant: "destructive" });
        router.refresh();
      }
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.avatar ?? undefined} alt="Image" />
            <AvatarFallback>{author.name ? author.name[0] : ""}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{author.name}</p>
            <p className="text-muted-foreground text-xs">
              {formatRelativeTime(createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <div>
        <p className="p-6 pt-0">{content}</p>
        {images.length > 0 && (
          <div className="flex justify-center border-y">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        src={image}
                        alt="vape"
                        className="h-[300px] w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
      <div className="px-6">
        <Separator />
      </div>
      <div className="space-y-4 p-6">
        {optimisticComments.map((comment, index) => {
          if (!comment || !comment.author?.name) return null;

          return (
            <div key={index} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar ?? undefined} alt="Image" />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="py-2 text-sm font-medium leading-none">
                  {comment.author.name}
                </p>
                <p>{comment.message}</p>
              </div>
            </div>
          );
        })}
        {status === "authenticated" && (
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src={data.user.image ?? undefined} alt="Image" />
              <AvatarFallback>{data.user.name ? data.user.name[0] : ""}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Ecrivez votre commentaire"
                              className="mt-1 w-full resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button type="submit" disabled={!postId} size="sm">
                      Commenter
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
