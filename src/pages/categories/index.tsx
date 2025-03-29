import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  Button, 
  Chip, 
  Input, 
  Select,
  SelectItem 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Category, Post } from "../../types/forum";
import { PostCard } from "../../components/post/post-card";

// Define a mapping for category title colors
const categoryTitleColors: { [key: string]: string } = {
  "Programming": "text-red-600",
  "Web Development": "text-green-600",
  "UI/UX Design": "text-purple-600",
  "Mobile Development": "text-orange-600",
};

const mockCategories: Category[] = [
  { id: "1", name: "Programming", description: "Discuss programming languages, frameworks, and best practices", threadCount: 150, isTrending: true },
  { id: "2", name: "Web Development", description: "Everything about web development and modern web technologies", threadCount: 120, isTrending: true },
  { id: "3", name: "UI/UX Design", description: "Share and discuss UI/UX design principles and trends", threadCount: 85, isTrending: true },
  { id: "4", name: "Mobile Development", description: "Mobile app development for iOS, Android, and cross-platform", threadCount: 95, isTrending: false },
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
    category: "UI/UX Design",
    comments: 8,
    isBookmarked: true,
  },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const trendingCategories = mockCategories.filter(cat => cat.isTrending);

  const handleUpvote = (postId: string) => {
    console.log(`Upvoted post ${postId}`);
  };

  const handleBookmark = (postId: string) => {
    console.log(`Bookmarked post ${postId}`);
  };

  const filteredPosts = selectedCategory
    ? mockPosts.filter(post => 
        post.category === mockCategories.find(cat => cat.id === selectedCategory)?.name
      )
    : [];

  // Sort posts by latest or popular (upvotes)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popular") {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Search categories if no category is selected
  const searchedCategories = mockCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {selectedCategory ? (
          <>
            {/* Posts View */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                color="light" 
                variant="flat"
                radius="lg"
                onPress={() => setSelectedCategory(null)}
                className="transition-all duration-300 hover:opacity-80 text-base"
              >
                <Icon icon="lucide:arrow-left" className="mr-1" /> Back to Categories
              </Button>
              <div className="flex gap-4">
                <Input 
                  placeholder="Search posts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 rounded-full border border-gray-200 bg-white shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
                <Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)} // Fixed event type
                  className="w-32 rounded-md border border-gray-200 bg-white shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                >
                  <SelectItem value="latest">Latest</SelectItem> // Fixed value type
                  <SelectItem value="popular">Popular</SelectItem> // Fixed value type
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {sortedPosts.map((post) => (
                // Wrapping each post card in a relative container to allow scaling without clipping.
                <div key={post.id} className="relative mx-auto w-full max-w-lg transition-transform duration-300 hover:scale-105 hover:z-10">
                  <PostCard
                    post={post}
                    onUpvote={handleUpvote}
                    onBookmark={handleBookmark}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Categories Grid with Search */}
            <h1 className="text-4xl font-bold text-[#4169E1] text-center mb-6" style={{ fontFamily: '"Poppins", sans-serif' }}>
              Explore Categories
            </h1>
            <div className="flex justify-center mb-6">
              <Input 
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 rounded-full border border-gray-200 bg-white shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedCategories.map((category) => (
                <div key={category.id} className="relative transition-transform duration-300 hover:scale-105 hover:z-10">
                  <Card
                    className="border border-gray-100 rounded-3xl shadow-lg"
                    radius="3xl"
                    isPressable
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <CardBody className="p-6">
                      <h3 className={`text-2xl font-semibold mb-2 flex items-center ${categoryTitleColors[category.name] || "text-indigo-700"}`} style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {category.name}
                        {category.isTrending && (
                          <Icon 
                            icon="lucide:trending-up" 
                            className="inline-block ml-2 text-orange-400" 
                          />
                        )}
                      </h3>
                      <p className="text-base text-gray-600 mb-4" style={{ fontFamily: '"Roboto", sans-serif' }}>
                        {category.description}
                      </p>
                      <p className="text-base text-green-600 font-semibold">
                        {category.threadCount} threads
                      </p>
                      <Chip
                        color={category.color}
                        variant={selectedCategory === category.id ? "solid" : "outlined"}
                        radius="full"
                      />
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
            {/* Trending Categories Section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-[#4169E1] mb-4 text-center" style={{ fontFamily: '"Poppins", sans-serif' }}>
                Trending Categories
              </h2>
              <div className="flex gap-4 justify-center overflow-x-auto pb-2 hide-scrollbar">
                {trendingCategories.map((category, index) => (
                  <Button
                    key={category.id}
                    color={index % 3 === 0 ? "warning" : index % 3 === 1 ? "success" : "danger"}
                    variant="solid"
                    radius="full"
                    onPress={() => setSelectedCategory(category.id)}
                    className="min-w-fit transition-transform duration-300 hover:scale-105 text-sm"
                  >
                    <Icon icon="lucide:trending-up" className="mr-1" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
