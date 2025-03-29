// src/components/layout/navbar.tsx
import React from "react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const notifications = 3; // Mock notifications count

  // Determine if current route is an auth page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const menuItems = [
    { name: "Posts", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "My Threads", path: "/my-threads" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className={`${isAuthPage ? "bg-transparent" : "bg-white"} shadow-md rounded-2xl mx-4 my-2`}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* Brand */}
      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Icon icon="lucide:message-circle" className="text-2xl text-primary" />
          <p className="font-bold text-2xl text-primary ml-2">UPVote</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu Items */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={location.pathname === item.path}>
            <Link 
              as={RouteLink} 
              to={item.path}
              color={location.pathname === item.path ? "primary" : "foreground"}
              className="rounded-2xl transition-colors duration-150 hover:underline cursor-pointer"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right-side Items */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" isIconOnly className="relative rounded-2xl">
                <Icon icon="lucide:bell" className="text-xl" />
                {notifications > 0 && (
                  <Badge 
                    color="secondary"
                    size="sm"
                    className="absolute -top-1 -right-1"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Notifications">
              <DropdownItem key="reply">New reply to your thread</DropdownItem>
              <DropdownItem key="upvote">Your post was upvoted</DropdownItem>
              <DropdownItem key="follower">New follower</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform rounded-2xl"
                color="primary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">user@example.com</p>
              </DropdownItem>
              <DropdownItem
                key="profile-link"
                onClick={() => window.location.href = "/profile"}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key="settings-link"
                onClick={() => window.location.href = "/settings"}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Items */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.path}-${index}`}>
            <Link
              as={RouteLink}
              to={item.path}
              color={location.pathname === item.path ? "primary" : "foreground"}
              size="lg"
              className="rounded-2xl transition-colors duration-150 hover:underline cursor-pointer"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
