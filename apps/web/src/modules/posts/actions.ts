"use server";

import { prisma } from "@vapi/database";
import { getSession } from "@/modules/auth/services";

interface CreatePostData {
  content: string;
  images: string[];
}

export const createPost = async (data: CreatePostData) => {
  const session = await getSession();

  if (!session) {
    return {
      error: "You must be logged in to create a post",
    };
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

  return { post, success: true };
};

interface AddCommentToPostData {
  message: string;
  postId: string;
}

export const addCommentToPost = async (data: AddCommentToPostData) => {
  const session = await getSession();

  if (!session) {
    return {
      error: "You must be logged in to create a post",
    };
  }

  const post = await prisma.comment.create({
    data: {
      message: data.message,
      author: {
        connect: {
          id: session.user.id,
        },
      },
      post: {
        connect: {
          id: data.postId,
        },
      },
    },
  });

  return { post, success: true };
};
