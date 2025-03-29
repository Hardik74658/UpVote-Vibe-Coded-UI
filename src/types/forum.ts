export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string; // Optional image URL for the post
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  upvotes: number;
  isUpvoted: boolean;
  category: string;
  comments: number; // Number of comments on the post
  isBookmarked: boolean;
  commentsList?: Array<{
    id: string;
    author: { username: string; avatar: string };
    content: string;
    createdAt: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  isTrending: boolean;
}

export interface User {
  id: string;
  username: string;
  email?: string; // Made optional
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  totalUpvotes: number;
  threadsCreated: number;
  socialLinks?: { // Made optional
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}