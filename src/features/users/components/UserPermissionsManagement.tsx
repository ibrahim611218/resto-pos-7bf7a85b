import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface UserPermissionsManagementProps {
  users: UserWithPassword[];
  onEditPermissions: (user: UserWithPassword) => void;
  isArabic: boolean;
}

const UserPermissionsManagement: React.FC<UserPermissionsManagementProps> = ({
  users,
  onEditPermissions,
  isArabic
}) => {
  const { getUserPermissions } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      owner: isArabic ? "مالك" : "Owner",
      admin: isArabic ? "مدير عام" : "Admin", 
      manager: isArabic ? "مدير فرع" : "Branch Manager",
      supervisor: isArabic ? "مشرف" : "Supervisor",
      accountant: isArabic ? "محاسب" : "Accountant",
      cashier: isArabic ? "كاشير" : "Cashier",
      waiter: isArabic ? "نادل" : "Waiter",
      kitchen: isArabic ? "مطبخ" : "Kitchen",
      delivery: isArabic ? "توصيل" : "Delivery"
    };
    return roleLabels[role] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      owner: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      manager: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      supervisor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      accountant: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      cashier: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      waiter: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      kitchen: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      delivery: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
    };
    return colors[role] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {isArabic ? "إدارة صلاحيات الموظفين" : "Employee Permissions Management"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={isArabic ? "البحث عن موظف..." : "Search employee..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-input bg-background text-foreground rounded-md"
            >
              <option value="all">{isArabic ? "كل الأدوار" : "All Roles"}</option>
              <option value="cashier">{isArabic ? "كاشير" : "Cashier"}</option>
              <option value="waiter">{isArabic ? "نادل" : "Waiter"}</option>
              <option value="kitchen">{isArabic ? "مطبخ" : "Kitchen"}</option>
              <option value="delivery">{isArabic ? "توصيل" : "Delivery"}</option>
              <option value="supervisor">{isArabic ? "مشرف" : "Supervisor"}</option>
              <option value="manager">{isArabic ? "مدير فرع" : "Branch Manager"}</option>
              <option value="accountant">{isArabic ? "محاسب" : "Accountant"}</option>
              <option value="admin">{isArabic ? "مدير عام" : "Admin"}</option>
              <option value="owner">{isArabic ? "مالك" : "Owner"}</option>
            </select>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {isArabic ? "إدارة الصلاحيات" : "Manage Permissions"}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditPermissions(user)}
                      className="h-8"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      {isArabic ? "صلاحيات" : "Permissions"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {isArabic ? "لم يتم العثور على موظفين" : "No employees found"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPermissionsManagement;