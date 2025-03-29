import React from "react";
import { Card, CardBody, Button, Avatar, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../types/forum";
import { Link } from "react-router-dom";

interface UniversalPostCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export const UniversalPostCard: React.FC<UniversalPostCardProps> = ({ 
  post, 
  onUpvote, 
  onBookmark 
}) => {
  return (
    <Card 
      isPressable
      as={Link}
      to={`/post/${post.id}`}
      className="border border-primary/20 overflow-hidden hover:shadow-lg transition-shadow"
      radius="lg" // Fixed radius type
    >
      {/* Image with rounded top corners only */}
      <div className="relative w-full h-48">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>

      <CardBody className="gap-4 p-4">
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
            <p className="text-sm font-semibold text-primary font-mono">
              @{post.author.username}
            </p>
            <p className="text-xs text-default-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-2 font-sans">
            {post.title}
          </h3>
          <p className="text-default-600 line-clamp-3 font-sans">
            {post.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="light"
              size="sm"
              startContent={<Icon 
                icon={post.isUpvoted ? "lucide:arrow-up-circle" : "lucide:arrow-up"} 
                className="text-lg"
              />}
              onPress={() => {
                onUpvote(post.id);
              }}
              className={post.isUpvoted ? "text-secondary" : "text-default-500"}
            >
              {post.upvotes}
            </Button>
            <Button
              variant="light"
              size="sm"
              startContent={<Icon icon="lucide:message-circle" className="text-lg" />}
            >
              {post.comments} Comments
            </Button>
            <Button
              variant="light"
              size="sm"
              isIconOnly
              onPress={() => {
                onBookmark(post.id);
              }}
            >
              <Icon 
                icon={post.isBookmarked ? "lucide:bookmark" : "lucide:bookmark-plus"} 
                className={`text-lg ${post.isBookmarked ? "text-primary" : "text-default-500"}`}
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
  );
};
