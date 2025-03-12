
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UsersList from "./UsersList";
import { UserWithPassword } from "../types";

interface UsersContentProps {
  users: UserWithPassword[];
  setIsAddDialogOpen: (isOpen: boolean) => void;
  onEditUser: (user: UserWithPassword) => void;
  onChangePassword: (user: UserWithPassword) => void;
  onDeleteUser: (user: UserWithPassword) => void;
  onEditPermissions: (user: UserWithPassword) => void;
  isArabic: boolean;
}

const UsersContent: React.FC<UsersContentProps> = ({
  users,
  setIsAddDialogOpen,
  onEditUser,
  onChangePassword,
  onDeleteUser,
  onEditPermissions,
  isArabic
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة المستخدمين</CardTitle>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 ml-2" />
          إضافة مستخدم
        </Button>
      </CardHeader>
      <CardContent>
        <UsersList 
          users={users}
          onEditUser={onEditUser}
          onChangePassword={onChangePassword}
          onDeleteUser={onDeleteUser}
          onEditPermissions={onEditPermissions}
          isArabic={isArabic}
        />
      </CardContent>
    </Card>
  );
};

export default UsersContent;
