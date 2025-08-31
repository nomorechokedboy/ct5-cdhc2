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

export const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/posts`);
        const data = await res.json();

        if (data) {
          setPosts(data.docs);
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
  console.log("data", posts);

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          {/* <SidebarTrigger className="-ml-1" /> */}
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">Bài viết</h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bài viết ...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
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
                      </div>
                      <Link
                        href={`/categories/post/${post.title}?id=${post.id}`}
                      >
                        <h2 className="text-xl font-semibold text-balance group-hover:text-accent transition-colors cursor-pointer">
                          {post.title}
                        </h2>
                      </Link>
                     <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <CalendarPlus className="h-4 w-4" />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                    </div>
                    </div>
                    <DropdownMenu>
                      
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-pretty leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                     
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
                Không tìm thấy bài viết nào
              </h3>
              {/* <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p> */}
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
