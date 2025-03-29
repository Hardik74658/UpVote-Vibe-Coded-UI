import { useState, useEffect } from "react";
import { 
  Button, 
  Chip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Post } from "../../types/forum";
import { PostCard } from "../../components/post/post-card";

const categories = [
  { id: "all", name: "All Posts", color: "primary" },
  { id: "programming", name: "Programming", color: "secondary" },
  { id: "webdev", name: "Web Development", color: "success" },
  { id: "design", name: "Design", color: "warning" },
  { id: "mobile", name: "Mobile Dev", color: "danger" },
];

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    content: "TypeScript is a powerful tool for React development. Here's how to get started with setting up your first project...",
    image: "https://picsum.photos/seed/react1/800/400",
    author: { id: "1", username: "techie", avatar: "https://i.pravatar.cc/150?u=techie" },
    createdAt: new Date(2024, 2, 1).toISOString(),
    upvotes: 42,
    isUpvoted: false,
    category: "Programming",
    comments: 15,
    isBookmarked: false,
  },
  {
    id: "2",
    title: "Modern UI Design Trends 2024",
    content: "Explore the latest UI design trends that are shaping the web in 2024...",
    image: "https://picsum.photos/seed/design1/800/400",
    author: { id: "2", username: "designpro", avatar: "https://i.pravatar.cc/150?u=designpro" },
    createdAt: new Date(2024, 2, 2).toISOString(),
    upvotes: 35,
    isUpvoted: true,
    category: "Design",
    comments: 8,
    isBookmarked: true,
  },
];

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { isOpen, onOpen, onClose } = useDisclosure(); // For sidebar
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateOpenChange,
  } = useDisclosure(); // For create modal

  // Create form state
  const [createTitle, setCreateTitle] = useState("");
  const [createContent, setCreateContent] = useState("");
  const [createImage, setCreateImage] = useState("");

  // Debug log to verify filtering
  useEffect(() => {
    console.log("Filtered posts:", selectedCategory === "all" ? posts : posts.filter(post => post.category.toLowerCase() === selectedCategory));
  }, [selectedCategory, posts]);

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1,
          isUpvoted: !post.isUpvoted,
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isBookmarked: !post.isBookmarked };
      }
      return post;
    }));
  };

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === selectedCategory);

  const handleCreatePost = () => {
    const newPost: Post = {
      id: (posts.length + 1).toString(),
      title: createTitle,
      content: createContent,
      image: createImage || "https://picsum.photos/seed/default/800/400",
      author: { id: "current", username: "currentuser", avatar: "https://i.pravatar.cc/150?u=currentuser" },
      createdAt: new Date().toISOString(),
      upvotes: 0,
      isUpvoted: false,
      category: "all",
      comments: 0,
      isBookmarked: false,
    };
    setPosts([...posts, newPost]);
    setCreateTitle("");
    setCreateContent("");
    setCreateImage("");
    onCreateOpenChange();
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent>
          <DrawerHeader className="text-2xl font-bold">Categories</DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  color={category.color as "primary" | "secondary" | "success" | "warning" | "danger"}
                  variant={selectedCategory === category.id ? "solid" : "light"}
                  className="justify-start transition-all duration-300"
                  onPress={() => {
                    setSelectedCategory(category.id);
                    onClose();
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 max-w-4xl mx-auto flex flex-col">
        {/* Header with Create Post Button */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="light"
            isIconOnly
            onPress={onOpen}
            className="sm:hidden transition-all duration-300"
          >
            <Icon icon="lucide:menu" className="text-2xl" />
          </Button>
          <Button 
            color="primary"
            endContent={<Icon icon="lucide:plus" />}
            radius="full"
            className="transition-all duration-300"
            onPress={onCreateOpen}
          >
            Create Post
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar justify-center mb-4">
          {categories.map((category) => (
            <Chip
              key={category.id}
              color={category.color as "primary" | "secondary" | "success" | "warning" | "danger"}
              variant={selectedCategory === category.id ? "solid" : "bordered"}
              radius="full"
              className="cursor-pointer text-lg transition-all duration-300"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Chip>
          ))}
        </div>

        {/* Posts - Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-8 items-center">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="w-full max-w-md mx-auto transition-all duration-300">
                  <PostCard
                    post={post}
                    onUpvote={handleUpvote}
                    onBookmark={handleBookmark}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found</p>
            )}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-blue-600">Create Post</ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    value={createContent}
                    onChange={(e) => setCreateContent(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Image</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setCreateImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full"
                  />
                  {createImage && (
                    <img src={createImage} alt="Preview" className="mt-2 max-h-60" />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={handleCreatePost}>Save Post</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
