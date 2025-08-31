"use client";

import { Button, useAuth } from "@payloadcms/ui";

export default function LogoutButton() {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect to login page or refresh
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button onClick={handleLogout} buttonStyle="secondary" size="large">
      Đăng xuất
    </Button>
  );
}
