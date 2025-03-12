
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUsers } from "./hooks/useUsers";
import UsersContent from "./components/UsersContent";
import UserDialogs from "./components/UserDialogs";

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { allPermissions } = useAuth();
  const {
    users,
    selectedUser,
    setSelectedUser,
    selectedPermissions,
    setSelectedPermissions,
    newUser,
    setNewUser,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    canManageAdmins,
    handleAddUser,
    handleEditUser,
    handleChangePassword,
    handleDeleteUser,
    handleEditPermissions,
    handleSavePermissions
  } = useUsers();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  
  return (
    <div className="container p-4">
      <UsersContent 
        users={users}
        setIsAddDialogOpen={setIsAddDialogOpen}
        onEditUser={(user) => {
          setSelectedUser(user);
          setIsEditDialogOpen(true);
        }}
        onChangePassword={(user) => {
          setSelectedUser(user);
          setIsPasswordDialogOpen(true);
        }}
        onDeleteUser={(user) => {
          setSelectedUser(user);
          setIsDeleteDialogOpen(true);
        }}
        onEditPermissions={(user) => {
          if (handleEditPermissions(user)) {
            setIsPermissionsDialogOpen(true);
          }
        }}
        isArabic={isArabic}
      />
      
      <UserDialogs 
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isPasswordDialogOpen={isPasswordDialogOpen}
        setIsPasswordDialogOpen={setIsPasswordDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isPermissionsDialogOpen={isPermissionsDialogOpen}
        setIsPermissionsDialogOpen={setIsPermissionsDialogOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        newUser={newUser}
        setNewUser={setNewUser}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
        allPermissions={allPermissions}
        handleAddUser={() => {
          const success = handleAddUser();
          if (success) {
            setIsAddDialogOpen(false);
          }
        }}
        handleEditUser={() => {
          const success = handleEditUser();
          if (success) {
            setIsEditDialogOpen(false);
            setSelectedUser(null);
          }
        }}
        handleChangePassword={() => {
          const success = handleChangePassword();
          if (success) {
            setIsPasswordDialogOpen(false);
            setSelectedUser(null);
          }
        }}
        handleDeleteUser={() => {
          const success = handleDeleteUser();
          if (success) {
            setIsDeleteDialogOpen(false);
            setSelectedUser(null);
          }
        }}
        handleSavePermissions={() => {
          const success = handleSavePermissions();
          if (success) {
            setIsPermissionsDialogOpen(false);
            setSelectedUser(null);
          }
        }}
        canManageAdmins={canManageAdmins}
        isArabic={isArabic}
      />
    </div>
  );
};

export default UserManagement;
