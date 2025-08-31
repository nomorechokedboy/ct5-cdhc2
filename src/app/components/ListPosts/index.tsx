"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Tag,
  Settings,
  Search,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Heart,
  CalendarPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import "./globals.css";
import { useParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: [{}];
  createdAt: Date;
}

// Sample posts data
// const posts = [
//   {
//     id: 1,
//     title: "Getting Started with Next.js 15",
//     excerpt:
//       "Learn about the latest features and improvements in Next.js 15, including the new App Router and enhanced performance optimizations.",
//     author: "Sarah Chen",
//     date: "2024-01-15",
//     category: "Development",
//     tags: ["Next.js", "React", "Web Development"],
//     views: 1250,
//     comments: 23,
//     likes: 89,
//     status: "published",
//   },
//   {
//     id: 2,
//     title: "Modern CSS Grid Layouts",
//     excerpt:
//       "Explore advanced CSS Grid techniques for creating responsive and flexible layouts that work across all devices.",
//     author: "Mike Rodriguez",
//     date: "2024-01-12",
//     category: "Design",
//     tags: ["CSS", "Grid", "Responsive Design"],
//     views: 892,
//     comments: 15,
//     likes: 67,
//     status: "published",
//   },
//   {
//     id: 3,
//     title: "TypeScript Best Practices",
//     excerpt:
//       "Discover essential TypeScript patterns and practices that will help you write more maintainable and type-safe code.",
//     author: "Alex Johnson",
//     date: "2024-01-10",
//     category: "Development",
//     tags: ["TypeScript", "JavaScript", "Best Practices"],
//     views: 2100,
//     comments: 41,
//     likes: 156,
//     status: "published",
//   },
//   {
//     id: 4,
//     title: "Building Accessible Web Components",
//     excerpt:
//       "Learn how to create web components that are accessible to all users, including those using assistive technologies.",
//     author: "Emma Davis",
//     date: "2024-01-08",
//     category: "Accessibility",
//     tags: ["Accessibility", "Web Components", "ARIA"],
//     views: 743,
//     comments: 19,
//     likes: 92,
//     status: "draft",
//   },
//   {
//     id: 5,
//     title: "Performance Optimization Strategies",
//     excerpt:
//       "Comprehensive guide to optimizing web application performance, from bundle size reduction to runtime optimizations.",
//     author: "David Kim",
//     date: "2024-01-05",
//     category: "Performance",
//     tags: ["Performance", "Optimization", "Web Vitals"],
//     views: 1567,
//     comments: 34,
//     likes: 128,
//     status: "published",
//   },
// ];

// const sidebarItems = [
//   {
//     title: "All Posts",
//     icon: FileText,
//     isActive: true,
//   },
//   {
//     title: "Categories",
//     icon: Tag,
//     isActive: false,
//   },
//   {
//     title: "Calendar",
//     icon: Calendar,
//     isActive: false,
//   },
//   {
//     title: "Settings",
//     icon: Settings,
//     isActive: false,
//   },
// ]

export const ListPosts = () => {
  const { slug } = useParams();
  const [post, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = post.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {
    // if (!slug) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/posts`);
        const data = await res.json();

        // Lọc bài viết theo slug
        const filteredPosts = data.docs.filter((post: { categories: any[] }) =>
          post.categories.some((category) => category.slug === slug),
        );
        if (filteredPosts) {
          setPosts(filteredPosts);
        } else {
          console.log("error get posts");
        }
      } catch (err) {
        console.error("Lỗi khi load posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  console.log("data", post);

  return (
    <SidebarProvider>
      {/* <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">Content Hub</span>
              <span className="text-xs text-sidebar-foreground/70">Manage your posts</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar> */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          {/* <SidebarTrigger className="-ml-1" /> */}
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">Bài viết</h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {/* <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Lọc theo loại bài viết:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div> */}

          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {/* {post.category} */}
                        </Badge>
                        {/* <Badge variant={post.status === "published" ? "default" : "outline"} className="text-xs">
                          {post.status}
                        </Badge> */}
                      </div>
                      <Link
                        href={`/categories/post/${post.title}?id=${post.id}`}
                      >
                        <h2 className="text-xl font-semibold text-balance group-hover:text-accent transition-colors cursor-pointer">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <CalendarPlus className="h-4 w-4" />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </p>
                    </div>
                    <DropdownMenu>
                      {/* <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger> */}
                      {/* <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent> */}
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-pretty leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    {/* <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div> */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {/* <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div> */}
                      {/* <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
