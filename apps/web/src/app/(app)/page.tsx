"use client";

import React from "react";
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
  Textarea,
} from "@vapotertn/ui";
import { CreatePostModal } from "@/modules/posts/components/create-post-modal";

export default function Page() {
  return (
    <div className="container max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <CreatePostModal>
              <div className="bg-accent/70 hover:bg-accent text-accent-foreground w-full cursor-pointer rounded-full px-6 py-2 text-lg">
                Exprimez-vous
              </div>
            </CreatePostModal>
          </div>
        </CardHeader>
      </Card>
      {[
        {
          id: 0,
        },
      ].map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-muted-foreground text-xs">Il y a 3 jours</p>
              </div>
            </div>
          </CardHeader>
          <div>
            <p className="p-6 pt-0">
              Chfama Fi single coil haja ndhifa W Fi MTL Famchi trio Wala precisio
            </p>
            <div className="flex justify-center border-y">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img
                          src={
                            "https://cdn.youcan.shop/stores/fdb409a17b48c52c88a09bf1518a01a9/products/5OzSBPvRbBXl0w4JBjzQMvLkdtz1N5Ltp6oO9m3Q_lg.webp"
                          }
                          alt="image"
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
          </div>
          <div className="space-y-4 p-6">
            {[{ comment: "test" }].map((comment, index) => (
              <div key={index} className="flex space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" alt="Image" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="py-2 text-sm font-medium leading-none">Sofia Davis</p>
                  <p>
                    Lorem ipsum ddzafht effz ehezf rhe efrgrze fr ergre jq fmlzf e,foz
                    bzr,gjren ger,goriengerghrgiuze ezfze f{" "}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <p className="py-2 text-sm font-medium leading-none">Sofia Davis</p>
                <Textarea
                  placeholder="Ecrivez votre commentaire"
                  className="mt-1 w-full"
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
