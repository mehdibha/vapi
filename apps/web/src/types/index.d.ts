export interface Comment {
  author: {
    name?: string | null;
    avatar?: string | null;
  } | null;
  createdAt: Date;
  message: string;
}

export interface Post {
  postId: string | null;
  author: {
    name: string | null;
    avatar: string | null;
  };
  createdAt: Date;
  content: string;
  images: string[];
  comments: Comment[];
  pending: boolean;
}
