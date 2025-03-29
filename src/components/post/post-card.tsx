import React, { useState } from "react";
import { Card, CardBody, Button, Avatar, Chip, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../types/forum";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onUpvote, onBookmark }) => {
  const [upvoted, setUpvoted] = useState(post.isUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Handle upvote toggle: update count and color
  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigating via Link
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1);
      setUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setUpvoted(true);
    }
    onUpvote(post.id);
  };

  // Handle bookmark toggle: change icon color
  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmark(post.id);
  };

  // Toggle comment input visibility
  const handleToggleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCommentInput(!showCommentInput);
  };

  // Handle sending comment: simply hide the comment input
  const handleSendComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCommentInput(false);
  };

  return (
    <>
      <Card 
        isPressable
        as={Link}
        to={`/post/${post.id}`}
        className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow "
        radius="lg"
      >
        {/* Image: rounded on top only */}
        <div className="relative w-full h-48">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>

        <CardBody className="gap-6 p-6">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Avatar
              src={post.author.avatar}
              size="sm"
              radius="lg"
              isBordered
              color="primary"
              className="w-12 h-12"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800 font-mono">
                @{post.author.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans">
              {post.title}
            </h3>
            <p className="text-gray-600 line-clamp-3 font-sans">
              {post.content}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Button
                variant="light"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpvote(e);
                }}
                className={`hover:bg-secondary/10 ${upvoted ? "text-secondary" : "text-gray-500"}`}
              >
                <Icon 
                  icon={upvoted ? "lucide:arrow-up-circle" : "lucide:arrow-up"} 
                  className="text-lg" 
                />
                <span className="ml-1">{upvoteCount}</span>
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleToggleComment}
                className="text-gray-500 hover:bg-primary/10"
              >
                <Icon icon="lucide:message-circle" className="text-lg" />
              </Button>
              <Button
                variant="light"
                size="sm"
                isIconOnly
                onClick={handleBookmark}
                className="hover:bg-primary/10"
              >
                <Icon 
                  icon={bookmarked ? "lucide:bookmark" : "lucide:bookmark-plus"} 
                  className={`text-lg ${bookmarked ? "text-primary" : "text-gray-500"}`}
                />
              </Button>
            </div>
            <Chip
              color="primary"
              variant="flat"
              radius="full"
              size="sm"
              className="font-mono"
            >
              {post.category}
            </Chip>
          </div>
        </CardBody>
      </Card>

      {/* Compact and Materialistic Comment Input Section */}
      {showCommentInput && (
        <div className="mt-4 mx-4 bg-white rounded-full shadow border border-gray-200 flex items-center px-4 py-2">
          <Input
            placeholder="Write a comment..."
            className="flex-1 border-none focus:ring-0 bg-transparent placeholder-gray-400 text-sm"
          />
          <Button variant="solid" color="primary" onClick={handleSendComment} className="ml-2 rounded-full">
            Send
          </Button>
        </div>
      )}
    </>
  );
};
