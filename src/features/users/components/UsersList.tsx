
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Key, ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { UserRole } from "@/types";
import { UserWithPassword } from "../types";

interface UsersListProps {
  users: UserWithPassword[];
  onEditUser: (user: UserWithPassword) => void;
  onChangePassword: (user: UserWithPassword) => void;
  onDeleteUser: (user: UserWithPassword) => void;
  onEditPermissions: (user: UserWithPassword) => void;
  isArabic: boolean;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onEditUser,
  onChangePassword,
  onDeleteUser,
  onEditPermissions,
  isArabic,
}) => {
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "مدير";
      case "owner":
        return "مالك";
      case "supervisor":
        return "مشرف";
      case "cashier":
        return "كاشير";
      case "kitchen":
        return "مطبخ";
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
            <TableHead>الاسم</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الدور</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
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
              <TableCell className="text-left">
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
                    onClick={() => onEditPermissions(user)}
                  >
                    <Shield className="h-4 w-4" />
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
