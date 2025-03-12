
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import { User } from "@/features/auth/hooks/useAuth";

interface SidebarUserProfileProps {
  user: User | null;
  collapsed: boolean;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ user, collapsed }) => {
  if (!user) return null;

  return (
    <div className={cn(
      "flex items-center px-4 py-3 border-b transition-all duration-300 ease-in-out",
      collapsed ? "justify-center" : "justify-start gap-3"
    )}>
      <Avatar className="transition-all duration-300 ease-in-out">
        <AvatarFallback className="bg-primary text-primary-foreground">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      {!collapsed && (
        <AnimatedTransition animation="fade">
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">
              {user.role === "admin" ? "مدير" : 
               user.role === "cashier" ? "محاسب" : 
               user.role === "kitchen" ? "مطبخ" : "مستخدم"}
            </span>
          </div>
        </AnimatedTransition>
      )}
    </div>
  );
};

export default SidebarUserProfile;
