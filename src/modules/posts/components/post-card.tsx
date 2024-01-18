"use client";

import React, { type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/date";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useSession } from "@/modules/auth/hooks";
import { api } from "@/trpc/react";

interface PostCardProps {
  postId: string | null;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  content: string;
  images: string[];
  comments: {
    message: string;
    author: {
      name: string;
      avatar?: string;
    };
  }[];
}

const addCommentSchema = z.object({
  message: z.string().min(1),
});

type AddCommentSchemaType = z.infer<typeof addCommentSchema>;

export const PostCard = (props: PostCardProps) => {
  const { postId, author, createdAt, content, images, comments } = props;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { status, data } = useSession();

  const form = useForm<AddCommentSchemaType>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(addCommentSchema),
  });

  const utils = api.useUtils();
  const addComment = api.comments.add.useMutation({
    onMutate: async (newComment) => {
      await utils.post.getLatest.cancel();
      const previousComents = utils.post.getLatest
        .getData()
        ?.find((post) => post.id === postId)?.comments;
      // @ts-expect-error no id in newComment because it's an optimistic update
      utils.post.getLatest.setData({}, (oldPosts) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  message: newComment.message,
                  author: {
                    name: data?.user.name,
                    image: data?.user.image,
                  },
                },
              ],
            };
          }
          return post;
        });
      });
      form.reset();
      return { previousComents };
    },
    onError: () => {
      utils.post.getLatest.setData({}, (oldPosts) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter((comment) => !!comment.id),
            };
          }
          return post;
        });
      });
    },
    onSettled: async () => {
      // TODO: optimize later
      await utils.post.getLatest.invalidate();
    },
  });

  const onSubmit: SubmitHandler<AddCommentSchemaType> = (values) => {
    if (!postId) return;
    addComment.mutate({
      message: values.message,
      postId: postId,
    });
  };

  const handleKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    if (event.key === "Enter") {
      event.preventDefault();
      await form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={`${author.name}'s profile picture`} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{author.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatRelativeTime(createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <div>
        <p className="p-6 pt-0">{content}</p>
        {images.length > 0 && (
          <div className="flex justify-center border-y">images here</div>
        )}
      </div>
      <div className="px-6">
        <Separator />
      </div>
      <div className="space-y-4 p-6">
        {comments.map((comment, index) => {
          return (
            <div key={index} className="flex space-x-4">
              <Avatar>
                <AvatarImage
                  src={comment.author.avatar}
                  alt={`${comment.author.name}'s profile picture`}
                />
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
            <UserAvatar />
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
                              ref={textareaRef}
                              placeholder="Ecrivez votre commentaire"
                              rows={1}
                              className="mt-1 min-h-0 w-full resize-none"
                              value={field.value}
                              onKeyDown={handleKeyDown}
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
                  <div className="mt-2 flex justify-end">
                    <Button type="submit" size="sm">
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
