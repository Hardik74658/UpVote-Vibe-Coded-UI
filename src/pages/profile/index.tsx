import React from "react";
import { 
  Card, 
  CardBody, 
  Button, 
  Avatar, 
  Tabs, 
  Tab, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import MyThreads from "../my-threads"; // Reuse your MyThreads component
import { User } from "../../types/forum";

const mockUser: User = {
  id: "1",
  username: "johndoe",
  avatar: "https://i.pravatar.cc/150?u=johndoe",
  bio: "Web developer passionate about UI/UX",
  followers: 245,
  following: 180,
  totalUpvotes: 1250,
  threadsCreated: 45,
};

export default function Profile() {
  const [user, setUser] = React.useState<User>(mockUser);
  const {
    isOpen: isEditProfileOpen,
    onOpen: onOpenEditProfile,
    onOpenChange: onEditProfileOpenChange,
  } = useDisclosure();

  // Local state for edit profile form
  const [editUsername, setEditUsername] = React.useState(user.username);
  const [editBio, setEditBio] = React.useState(user.bio);
  const [editAvatar, setEditAvatar] = React.useState(user.avatar);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleSaveProfile = () => {
    setUser({
      ...user,
      username: editUsername,
      bio: editBio,
      avatar: editAvatar,
    });
    onEditProfileOpenChange(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Profile Header */}
      <Card className="mb-8 shadow-xl rounded-3xl border border-gray-200" radius="3xl">
        <CardBody className="gap-8 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <RouteLink to={`/profile/${user.id}`}>
              <Avatar
                src={user.avatar}
                className="w-32 h-32 cursor-pointer hover:scale-105 transition-transform shadow-2xl"
                radius="full"
                isBordered
                color="primary"
              />
            </RouteLink>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-indigo-600 mb-2">
                <RouteLink to={`/profile/${user.id}`} className="hover:underline">
                  @{user.username}
                </RouteLink>
              </h1>
              <p className="text-lg text-gray-600 mb-4">{user.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div>
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="font-semibold text-indigo-600">{user.followers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Following</p>
                  <p className="font-semibold text-indigo-600">{user.following}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upvotes</p>
                  <p className="font-semibold text-indigo-600">{user.totalUpvotes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Threads</p>
                  <p className="font-semibold text-indigo-600">{user.threadsCreated}</p>
                </div>
              </div>
            </div>
            <Button 
              color="primary" 
              variant="bordered" 
              radius="lg" 
              startContent={<Icon icon="lucide:edit" />}
              onPress={onOpenEditProfile}
              className="transition-all duration-300 hover:shadow-lg"
            >
              Edit Profile
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Profile Tabs */}
      <Tabs aria-label="Profile sections" radius="lg" color="primary" className="shadow-md  rounded-2xl">
        <Tab key="threads" title="My Threads">
          <div className="mt-6">
            <MyThreads />
          </div>
        </Tab>
        <Tab key="replies" title="Replies">
          <p className="p-8 text-gray-500 text-center ">No replies yet.</p>
        </Tab>
      </Tabs>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditProfileOpen} onOpenChange={onEditProfileOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-indigo-600">Edit Profile</ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Avatar</label>
                  {editAvatar ? (
                    <img 
                      src={editAvatar} 
                      alt="Avatar Preview" 
                      className="mt-2 w-24 h-24 rounded-full cursor-pointer"
                      onClick={handleAvatarClick}
                    />
                  ) : (
                    <div 
                      onClick={handleAvatarClick} 
                      className="mt-2 p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer text-sm text-gray-500"
                    >
                      Click to upload avatar
                    </div>
                  )}
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditAvatar(reader.result as string);
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
                <Button color="primary" onPress={handleSaveProfile}>Save Changes</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
