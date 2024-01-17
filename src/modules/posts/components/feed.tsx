// "use client";

// import React from "react";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
//   Card,
//   CardHeader,
// } from "@vapi/ui";
// import { LoginModal } from "@/modules/auth/components/login-modal";
// import { CreatePostModal } from "@/modules/posts/components/create-post-modal";
// import { PostCard } from "@/modules/posts/components/post-card";

// interface FeedProps {
//   posts: any[];
// }

export const Feed = () => {
  return null
  // const { posts } = props;

  // return (
  //   <div className="container max-w-3xl space-y-4">
  //     <Card>
  //       <CardHeader>
  //         <div className="flex items-center space-x-4">
  //           <Avatar>
  //             <AvatarImage src={data?.user.image ?? undefined} alt="Image" />
  //             <AvatarFallback>
  //               {data?.user.name ? data?.user.name[0] : ""}
  //             </AvatarFallback>
  //           </Avatar>
  //           {data?.user ? (
  //             <CreatePostModal onPostAdd={addOptimisticPost}>
  //               <div className="w-full cursor-pointer rounded-full border bg-muted/50 px-6 py-2 text-muted-foreground hover:bg-muted">
  //                 Vendez quelque chose ou posez une question.
  //               </div>
  //             </CreatePostModal>
  //           ) : (
  //             <LoginModal>
  //               <div className="w-full cursor-pointer rounded-full border bg-muted/50 px-6 py-2 text-muted-foreground hover:bg-muted">
  //                 Vendez quelque chose ou posez une question.
  //               </div>
  //             </LoginModal>
  //           )}
  //         </div>
  //       </CardHeader>
  //     </Card>
  //     {optimisticPosts.map((post, index) => {
  //       if (!post.author?.name) {
  //         return null;
  //       }
  //       return <PostCard key={index} post={post} />;
  //     })}
  //   </div>
  // );
};
