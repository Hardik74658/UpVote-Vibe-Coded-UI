// src/components/layout/sidebar.tsx
import { Link as RouteLink, useLocation } from "react-router-dom";
import { Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

const menuItems = [
  { name: "Posts", path: "/", icon: "lucide:home" },
  { name: "Categories", path: "/categories", icon: "lucide:grid" },
  { name: "My Threads", path: "/my-threads", icon: "lucide:file-text" },
  { name: "Profile", path: "/profile", icon: "lucide:user" },
  { name: "Login", path: "/login", icon: "lucide:log-in" },
  { name: "Signup", path: "/signup", icon: "lucide:user-plus" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 p-4 border-r border-gray-200 fixed top-0 left-0 h-screen bg-white shadow-lg rounded-2xl">
        {/* Branding */}
        <div className="flex items-center gap-3 p-4">
          <Icon icon="lucide:message-circle" className="text-2xl text-primary" />
          <span className="font-bold text-lg">UPVote</span>
        </div>

        {/* Main Navigation Items */}
        <div className="flex flex-col gap-2 flex-grow">
          {menuItems.slice(0, 3).map((item) => (
            <Button
              key={item.path}
              as={RouteLink}
              to={item.path}
              variant={location.pathname === item.path ? "solid" : "light"}
              color="primary"
              className="justify-start rounded-xl transition-all duration-150 hover:scale-105"
              startContent={<Icon icon={item.icon} className="text-lg" />}
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Profile & Auth Items */}
        <div className="flex flex-col gap-2">
          {menuItems.slice(3).map((item) => (
            <Button
              key={item.path}
              as={RouteLink}
              to={item.path}
              variant={location.pathname === item.path ? "solid" : "light"}
              color="primary"
              className="justify-start rounded-xl transition-all duration-150 hover:scale-105"
              startContent={<Icon icon={item.icon} className="text-lg" />}
            >
              {item.name}
            </Button>
          ))}

          {/* Profile & Logout Section */}
          <div className="flex items-center gap-3 p-4 border-t border-gray-200">
            <Avatar src="https://i.pravatar.cc/150?u=user" size="sm" radius="lg" />
            <div className="flex-1">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-gray-500">@johndoe</p>
            </div>
            <Button isIconOnly variant="light" size="sm" className="rounded-xl">
              <Icon icon="lucide:log-out" className="text-lg" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-grow lg:ml-64">
        {/* Add your main content here */}
        {/* ...existing code for other components... */}
      </div>
    </div>
  );
}
