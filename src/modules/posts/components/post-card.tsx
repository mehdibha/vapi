"use client";

import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/date";
import { UserAvatar } from "@/modules/auth/components/user-avatar";

export const PostCard = () => {
  const post = {
    postId: "1",
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300?img=1",
    },
    createdAt: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    images: [],
    comments: [
      {
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        author: {
          name: "Jane Doe",
          avatar: "https://i.pravatar.cc/300?img=2",
        },
      },
    ],
  };

  const { author, createdAt, content, images, comments } = post;

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  function onSubmit() {
    console.log("commenting");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <UserAvatar />
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
