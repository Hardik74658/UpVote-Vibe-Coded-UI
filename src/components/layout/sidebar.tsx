import React from "react";
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
    <div className="hidden lg:flex flex-col h-screen w-64 p-4 border-r border-primary/20 sticky top-0 bg-white shadow-lg rounded-2xl">
      {/* Logo and Branding */}
      <div className="flex items-center gap-3 p-4">
        <Icon icon="lucide:message-circle" className="text-2xl text-primary" />
        <span className="font-bold text-lg font-mono">UpVote</span>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col gap-2 flex-grow">
        {menuItems.slice(0, 3).map((item) => (
          <Button
            key={item.path}
            as={RouteLink}
            to={item.path}
            variant={location.pathname === item.path ? "solid" : "light"}
            color="primary"
            className="justify-start rounded-xl transition-transform duration-200 hover:scale-105"
            startContent={<Icon icon={item.icon} className="text-lg" />}
          >
            {item.name}
          </Button>
        ))}
      </div>

      {/* Profile Section (ALWAYS AT BOTTOM) */}
      <div className="flex flex-col gap-2">
        {menuItems.slice(3).map((item) => (
          <Button
            key={item.path}
            as={RouteLink}
            to={item.path}
            variant={location.pathname === item.path ? "solid" : "light"}
            color="primary"
            className="justify-start rounded-xl transition-transform duration-200 hover:scale-105"
            startContent={<Icon icon={item.icon} className="text-lg" />}
          >
            {item.name}
          </Button>
        ))}

        {/* Profile & Logout Section */}
        <div className="flex items-center gap-3 p-4 border-t border-primary/20">
          <Avatar src="https://i.pravatar.cc/150?u=user" size="sm" radius="lg" />
          <div className="flex-1">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-default-500">@johndoe</p>
          </div>
          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:log-out" className="text-lg" />
          </Button>
        </div>
      </div>
    </div>
  );
}
