// src/components/post/post-detail.tsx

import React from "react";
import { Card, CardBody, Button, Avatar, Input, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../types/forum";

interface PostDetailProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  onUpvote,
  onBookmark,
  onLike,
  onComment,
}) => {
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(post.commentsList || []);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComments([
        ...comments,
        {
          id: String(comments.length + 1),
          author: { username: "currentuser", avatar: "https://i.pravatar.cc/150?u=currentuser" },
          content: comment,
          createdAt: new Date().toISOString(),
        },
      ]);
      setComment("");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  return (
    <Card className="border border-primary/20 overflow-hidden rounded-3xl shadow-xl" radius="3xl">
      {/* Full width image with rounded top corners */}
      <div className="relative w-full h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover rounded-t-3xl"
        />
      </div>

      <CardBody className="gap-6 p-6">
        {/* Author Info */}
        <div className="flex items-center gap-4">
          <Avatar
            src={post.author.avatar}
            size="lg"
            radius="full"
            isBordered
            color="primary"
          />
          <div>
            <p className="text-lg font-semibold text-indigo-600">
              @{post.author.username}
            </p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="light"
            startContent={<Icon icon={isLiked ? "lucide:heart" : "lucide:heart-off"} className="text-xl" />}
            onPress={handleLike}
            className={isLiked ? "text-secondary" : "text-gray-600"}
          >
            Like
          </Button>
          <Button
            variant="light"
            startContent={<Icon icon={post.isUpvoted ? "lucide:arrow-up-circle" : "lucide:arrow-up"} className="text-xl" />}
            onPress={() => onUpvote(post.id)}
            className={post.isUpvoted ? "text-secondary" : "text-gray-600"}
          >
            {post.upvotes} Upvotes
          </Button>
          <Button
            variant="light"
            startContent={<Icon icon="lucide:message-circle" className="text-xl" />}
          >
            {comments.length} Comments
          </Button>
          <Button variant="light" isIconOnly onPress={() => onBookmark(post.id)}>
            <Icon icon={post.isBookmarked ? "lucide:bookmark" : "lucide:bookmark-plus"} className={`text-xl ${post.isBookmarked ? "text-primary" : "text-gray-600"}`} />
          </Button>
          <Button variant="light" isIconOnly>
            <Icon icon="lucide:share" className="text-xl" />
          </Button>
        </div>

        <Divider className="my-4" />

        {/* Comments Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-indigo-600">Comments</h3>
          
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onValueChange={setComment}
              variant="bordered"
              radius="lg"
              className="flex-1"
            />
            <Button color="primary" isDisabled={!comment.trim()}>
              Post
            </Button>
          </form>

          {/* Comments List */}
          <div className="flex flex-col gap-4 mt-4">
            {comments.map((cmt) => (
              <Card key={cmt.id} className="border border-gray-200 rounded-lg shadow-md">
                <CardBody>
                  <div className="flex items-start gap-3">
                    <Avatar src={cmt.author.avatar} size="sm" radius="full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-indigo-600">
                          @{cmt.author.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(cmt.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="text-gray-700 mt-1">{cmt.content}</p>
                      <Button variant="light" size="sm" className="mt-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
