
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Key, ShieldAlert, ShieldCheck } from "lucide-react";
import { UserRole } from "@/types";
import { UserWithPassword } from "../types";

interface UsersListProps {
  users: UserWithPassword[];
  onEditUser: (user: UserWithPassword) => void;
  onChangePassword: (user: UserWithPassword) => void;
  onDeleteUser: (user: UserWithPassword) => void;
  isArabic: boolean;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onEditUser,
  onChangePassword,
  onDeleteUser,
  isArabic,
}) => {
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return isArabic ? "مدير" : "Admin";
      case "owner":
        return isArabic ? "مالك" : "Owner";
      case "supervisor":
        return isArabic ? "مشرف" : "Supervisor";
      case "cashier":
        return isArabic ? "كاشير" : "Cashier";
      case "kitchen":
        return isArabic ? "مطبخ" : "Kitchen";
      default:
        return role;
    }
  };
  
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "owner":
        return <ShieldAlert className="h-4 w-4 text-purple-500" />;
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "supervisor":
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? "الاسم" : "Name"}</TableHead>
            <TableHead>{isArabic ? "البريد الإلكتروني" : "Email"}</TableHead>
            <TableHead>{isArabic ? "الدور" : "Role"}</TableHead>
            <TableHead className="text-right">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="flex items-center gap-2">
                {getRoleBadge(user.role)}
                {getRoleName(user.role)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEditUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onChangePassword(user)}
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDeleteUser(user)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
