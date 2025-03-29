import React from "react";
import { 
  Card, 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure, 
  Input 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { PostCard } from "../../components/post/post-card";
import { Post } from "../../types/forum";

const mockThreads: Post[] = [
  {
    id: "1",
    title: "My Experience with React 18",
    content: "After using React 18 for several months, here are my thoughts...",
    image: "https://picsum.photos/seed/react3/800/400",
    author: { id: "1", username: "currentuser", avatar: "https://i.pravatar.cc/150?u=currentuser" },
    createdAt: new Date(2024, 2, 1).toISOString(),
    upvotes: 25,
    isUpvoted: false,
    category: "React",
    comments: 10,
    isBookmarked: false,
  },
  {
    id: "2",
    title: "TypeScript Best Practices 2024",
    content: "Here are some TypeScript best practices I've learned...",
    image: "https://picsum.photos/seed/typescript1/800/400",
    author: { id: "1", username: "currentuser", avatar: "https://i.pravatar.cc/150?u=currentuser" },
    createdAt: new Date(2024, 2, 2).toISOString(),
    upvotes: 18,
    isUpvoted: false,
    category: "TypeScript",
    comments: 5,
    isBookmarked: false,
  },
];

export default function MyThreads() {
  const [threads, setThreads] = React.useState<Post[]>(mockThreads);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateOpenChange,
  } = useDisclosure();
  const [selectedThread, setSelectedThread] = React.useState<Post | null>(null);

  // Local state for edit form
  const [editTitle, setEditTitle] = React.useState("");
  const [editContent, setEditContent] = React.useState("");
  const [editImage, setEditImage] = React.useState("");

  // Local state for create form
  const [createTitle, setCreateTitle] = React.useState("");
  const [createContent, setCreateContent] = React.useState("");
  const [createImage, setCreateImage] = React.useState("");

  // Refs for file inputs
  const editImageInputRef = React.useRef<HTMLInputElement>(null);
  const createImageInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpvote = (threadId: string) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, isUpvoted: !thread.isUpvoted, upvotes: thread.isUpvoted ? thread.upvotes - 1 : thread.upvotes + 1 }
        : thread
    ));
  };

  const handleBookmark = (threadId: string) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, isBookmarked: !thread.isBookmarked }
        : thread
    ));
  };

  // When edit button is clicked, prepopulate the edit fields and open modal
  const handleEdit = (thread: Post) => {
    setSelectedThread(thread);
    setEditTitle(thread.title);
    setEditContent(thread.content);
    setEditImage(thread.image);
    onEditOpen();
  };

  const handleSaveEdit = () => {
    if (selectedThread) {
      setThreads(threads.map(thread => 
        thread.id === selectedThread.id 
          ? { ...thread, title: editTitle, content: editContent, image: editImage }
          : thread
      ));
      onEditOpenChange(false);
    }
  };

  const handleCreate = () => {
    const newThread: Post = {
      id: (threads.length + 1).toString(),
      title: createTitle,
      content: createContent,
      image: createImage || "https://picsum.photos/seed/default/800/400",
      author: { id: "current", username: "currentuser", avatar: "https://i.pravatar.cc/150?u=currentuser" },
      createdAt: new Date().toISOString(),
      upvotes: 0,
      isUpvoted: false,
      category: "General",
      comments: 0,
      isBookmarked: false,
    };
    setThreads([...threads, newThread]);
    setCreateTitle("");
    setCreateContent("");
    setCreateImage("");
    onCreateOpenChange(false);
  };

  // Trigger file input for edit image upload
  const handleEditImageClick = () => {
    if (editImageInputRef.current) {
      editImageInputRef.current.click();
    }
  };

  // Trigger file input for create image upload
  const handleCreateImageClick = () => {
    if (createImageInputRef.current) {
      createImageInputRef.current.click();
    }
  };

  return (
    <div className="container  rounded-2xl mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">My Threads</h1>
        <Button color="success" endContent={<Icon icon="lucide:plus" />} radius="lg" onPress={onCreateOpen}>
          Create Thread
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {threads.map(thread => (
          <div key={thread.id} className="relative">
            {/* Overlay edit button */}
            <div className="absolute top-2 right-2 z-20">
              <Button 
                size="sm"
                color="primary"
                variant="light"
                radius="full"
                onPress={() => handleEdit(thread)}
              >
                <Icon icon="lucide:edit" />
              </Button>
            </div>
            <PostCard
              post={thread}
              onUpvote={handleUpvote}
              onBookmark={handleBookmark}
            />
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-blue-600">Edit Thread</ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  {editImage ? (
                    <img 
                      src={editImage} 
                      alt="Preview" 
                      className="mt-2 max-h-60 rounded-2xl cursor-pointer"
                      onClick={handleEditImageClick}
                    />
                  ) : (
                    <div 
                      onClick={handleEditImageClick} 
                      className="mt-2 p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer text-sm text-gray-500"
                    >
                      Click to upload image
                    </div>
                  )}
                  <input
                    type="file"
                    ref={editImageInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={handleSaveEdit}>Save Changes</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Create Modal */}
      <Modal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-blue-600">Create Thread</ModalHeader>
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
                  <label className="block text-sm font-medium mb-1">Image</label>
                  {createImage ? (
                    <img 
                      src={createImage} 
                      alt="Preview" 
                      className="mt-2 max-h-60 rounded-2xl cursor-pointer"
                      onClick={handleCreateImageClick}
                    />
                  ) : (
                    <div 
                      onClick={handleCreateImageClick} 
                      className="mt-2 p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer text-sm text-gray-500"
                    >
                      Click to upload image
                    </div>
                  )}
                  <input
                    type="file"
                    ref={createImageInputRef}
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
                    className="hidden"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={handleCreate}>Save Thread</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
