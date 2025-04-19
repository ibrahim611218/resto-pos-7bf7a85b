
import React from "react";
import { UserWithPassword } from "../types";
import AddUserDialog from "./dialogs/AddUserDialog";
import EditUserDialog from "./dialogs/EditUserDialog";
import PasswordDialog from "./dialogs/PasswordDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import PermissionsDialog from "./PermissionsDialog";

interface UserDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  isPasswordDialogOpen: boolean;
  setIsPasswordDialogOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  isPermissionsDialogOpen: boolean;
  setIsPermissionsDialogOpen: (isOpen: boolean) => void;
  selectedUser: UserWithPassword | null;
  setSelectedUser: (user: UserWithPassword | null) => void;
  newUser: UserWithPassword;
  setNewUser: (user: UserWithPassword) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  selectedPermissions: string[];
  setSelectedPermissions: (permissions: string[]) => void;
  allPermissions: any[];
  handleAddUser: () => void;
  handleEditUser: () => void;
  handleChangePassword: () => void;
  handleDeleteUser: () => void;
  handleSavePermissions: () => void;
  canManageAdmins: boolean;
  isArabic: boolean;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isPasswordDialogOpen,
  setIsPasswordDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isPermissionsDialogOpen,
  setIsPermissionsDialogOpen,
  selectedUser,
  setSelectedUser,
  newUser,
  setNewUser,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  selectedPermissions,
  setSelectedPermissions,
  allPermissions,
  handleAddUser,
  handleEditUser,
  handleChangePassword,
  handleDeleteUser,
  handleSavePermissions,
  canManageAdmins,
  isArabic
}) => {
  return (
    <>
      <AddUserDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={handleAddUser}
        isArabic={isArabic}
        canManageAdmins={canManageAdmins}
      />
      
      <EditUserDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedUser={selectedUser}
        onUserChange={setSelectedUser}
        onEditUser={handleEditUser}
        isArabic={isArabic}
        canManageAdmins={canManageAdmins}
      />
      
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        selectedUser={selectedUser}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onChangePassword={handleChangePassword}
        isArabic={isArabic}
      />
      
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedUser={selectedUser}
        onDeleteUser={handleDeleteUser}
        isArabic={isArabic}
      />

      <PermissionsDialog
        isOpen={isPermissionsDialogOpen}
        onOpenChange={setIsPermissionsDialogOpen}
        selectedUser={selectedUser}
        permissions={allPermissions}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
        onSavePermissions={handleSavePermissions}
        isArabic={isArabic}
      />
    </>
  );
};

export default UserDialogs;
