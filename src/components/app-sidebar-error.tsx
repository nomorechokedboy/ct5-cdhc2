"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { AlertCircle, RefreshCw } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SidebarErrorStateProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function SidebarErrorState({
  error,
  onRetry,
  isRetrying = false,
}: SidebarErrorStateProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <AlertCircle className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-destructive">
                Lỗi tải dữ liệu
              </span>
              <span className="text-xs text-muted-foreground">
                Không thể kết nối
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {isCollapsed ? (
              // Collapsed state - show minimal error indicator with tooltip
              <div className="flex flex-col items-center gap-2 p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRetry}
                  disabled={isRetrying}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  title="Thử lại"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            ) : (
              // Expanded state - show full error message and retry button
              <div className="space-y-4 p-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <div className="space-y-2">
                      <p className="font-medium">
                        Không thể tải dữ liệu sidebar
                      </p>
                      <p className="text-xs opacity-90">{error}</p>
                    </div>
                  </AlertDescription>
                </Alert>

                <Button
                  variant="outline"
                  onClick={onRetry}
                  disabled={isRetrying}
                  className="w-full gap-2 bg-transparent"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
                  />
                  {isRetrying ? "Đang thử lại..." : "Thử lại"}
                </Button>

                {/* Additional help text */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Có thể do:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Mất kết nối mạng</li>
                    <li>Lỗi server tạm thời</li>
                    <li>Phiên đăng nhập hết hạn</li>
                  </ul>
                </div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
