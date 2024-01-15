"use server";

import { prisma } from "@vapotertn/database";
import { getSession } from "@/modules/auth/services";

interface CreatePostData {
  content: string;
  images: string[];
}

export const createPost = async (data: CreatePostData) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.create({
    data: {
      content: data.content,
      images: data.images,
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return post;
};
