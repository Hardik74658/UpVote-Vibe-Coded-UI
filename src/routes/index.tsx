// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../components/layout/navbar";
import Sidebar from "../components/layout/sidebar";

// Lazy-loaded pages
const Posts = React.lazy(() => import("../pages/posts"));
const Categories = React.lazy(() => import("../pages/categories"));
const MyThreads = React.lazy(() => import("../pages/my-threads"));
const Profile = React.lazy(() => import("../pages/profile"));
const Login = React.lazy(() => import("../pages/auth/login"));
const Signup = React.lazy(() => import("../pages/auth/signup"));
// IMPORTANT: Rename your [id].tsx to PostPage.tsx and adjust path accordingly
const PostPage = React.lazy(() => import("../pages/posts/PostPage"));

export const AppRoutes = () => {
  // Mock authentication state
  const [isAuthenticated] = React.useState(true);

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className={`flex-1 ${isAuthenticated ? "ml-0 lg:ml-64" : ""}`}>
          {isAuthenticated && <Navigation />}
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/my-threads" element={<MyThreads />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </Router>
  );
};
