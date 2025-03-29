// src/pages/posts/PostPage.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { PostDetail } from "../../components/post/post-detail";
import { Post } from "../../types/forum";

// Mock posts data for demonstration.
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "A detailed guide to setting up React with TypeScript...",
    image: "https://picsum.photos/seed/react1/1200/600",
    author: { id: "1", username: "techie", avatar: "https://i.pravatar.cc/150?u=techie" },
    createdAt: new Date(2024, 2, 1).toISOString(),
    upvotes: 42,
    isUpvoted: false,
    category: "Programming",
    comments: 15,
    isBookmarked: false,
    commentsList: [],
  },
  {
    id: "2",
    title: "UI Design Trends 2024",
    content: "Explore the latest UI design trends in detail...",
    image: "https://picsum.photos/seed/design1/1200/600",
    author: { id: "2", username: "designpro", avatar: "https://i.pravatar.cc/150?u=designpro" },
    createdAt: new Date(2024, 2, 2).toISOString(),
    upvotes: 35,
    isUpvoted: true,
    category: "Design",
    comments: 8,
    isBookmarked: true,
    commentsList: [],
  },
];

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = React.useState<Post | null>(null);

  // Simulate fetching the post from our mock data
  React.useEffect(() => {
    const foundPost = mockPosts.find((p) => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  // Handlers for UI-only simulation (local state updates)
  const handleUpvote = () => {
    if (!post) return;
    setPost({
      ...post,
      isUpvoted: !post.isUpvoted,
      upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1,
    });
  };

  const handleBookmark = (postId: string) => {
    if (!post) return;
    setPost({
      ...post,
      isBookmarked: !post.isBookmarked,
    });
  };

  const handleLike = () => {
    console.log(`Liked post`);
  };

  const handleComment = (postId: string, comment: string) => {
    if (!post) return;
    setPost({
      ...post,
      commentsList: [
        ...(post.commentsList || []),
        {
          id: String(Date.now()),
          author: { username: "currentuser", avatar: "https://i.pravatar.cc/150?u=currentuser" },
          content: comment,
          createdAt: new Date().toISOString(),
        },
      ],
      comments: (post.comments || 0) + 1,
    });
  };

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Post not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white">
      <PostDetail
        post={post}
        onUpvote={handleUpvote}
        onBookmark={handleBookmark}
        onLike={handleLike}
        onComment={handleComment}
      />
    </div>
  );
}
