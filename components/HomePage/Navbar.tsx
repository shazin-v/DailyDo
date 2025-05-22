"use client";
import { useState } from "react";
import { CheckCircle, LogOut, Moon, Sun, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  // Get first letter of user name for avatar
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between transition-colors duration-200 animate-fade-in">
        <div className="flex items-center">
          <CheckCircle className="h-7 w-7 mr-2 text-primary dark:text-[#3879e2]" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            DailyDo
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hover-scale"
          >
            {theme === "light" ? (
              <Moon size={20} className="text-gray-800 dark:text-gray-100" />
            ) : (
              <Sun size={20} className="text-yellow-400 dark:text-yellow-300" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover-scale"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#3879e2] text-primary-foreground">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4 text-red-500" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={openAuthModal}
              size="sm"
              className="flex gap-1 hover-scale"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default Navbar;
