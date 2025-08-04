
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUsers } from "./hooks/useUsers";
import { useDatabaseConnection } from "@/hooks/useDatabaseConnection";
import UsersContent from "./components/UsersContent";
import UserDialogs from "./components/UserDialogs";
import RolePermissionsManager from "./components/RolePermissionsManager";
import UserPermissionsManagement from "./components/UserPermissionsManagement";
import ConnectionError from "./components/ConnectionError";
import LoadingState from "./components/LoadingState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { allPermissions } = useAuth();
  const { 
    isConnected, 
    errorDetails, 
    testDatabaseConnection, 
    isLoading: connectionLoading, 
    connectionAttempted 
  } = useDatabaseConnection();
  
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
    isLoading: usersLoading,
    handleAddUser,
    handleEditUser,
    handleChangePassword,
    handleDeleteUser,
    handleEditPermissions,
    handleSavePermissions,
    fetchUsers
  } = useUsers();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [showConnectionError, setShowConnectionError] = useState(false);
  
  const isLoading = usersLoading || connectionLoading;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isConnected && connectionAttempted) {
      timer = setTimeout(() => {
        setShowConnectionError(true);
      }, 2000);
    } else {
      setShowConnectionError(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isConnected, connectionAttempted]);

  const handleReconnect = async () => {
    setShowConnectionError(false);
    const success = await testDatabaseConnection();
    if (success) {
      await fetchUsers();
    } else {
      setShowConnectionError(true);
    }
  };
  
  return (
    <div className="container p-4 space-y-4">
      {!isConnected && showConnectionError && (
        <ConnectionError
          isArabic={isArabic}
          errorDetails={errorDetails}
          connectionLoading={connectionLoading}
          handleReconnect={handleReconnect}
        />
      )}

      {isLoading ? (
        <LoadingState />
      ) : (
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              {isArabic ? "إدارة المستخدمين" : "User Management"}
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              {isArabic ? "قوالب الصلاحيات" : "Permission Templates"}
            </TabsTrigger>
            <TabsTrigger value="employee-permissions" className="flex items-center gap-2">
              {isArabic ? "صلاحيات الموظفين" : "Employee Permissions"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="permissions" className="mt-4">
            <RolePermissionsManager isArabic={isArabic} />
          </TabsContent>
          
          <TabsContent value="employee-permissions" className="mt-4">
            <UserPermissionsManagement 
              users={users}
              onEditPermissions={(user) => {
                if (handleEditPermissions(user)) {
                  setIsPermissionsDialogOpen(true);
                }
              }}
              isArabic={isArabic}
            />
          </TabsContent>
          
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
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
            handleChangePassword={handleChangePassword}
            handleDeleteUser={handleDeleteUser}
            handleSavePermissions={handleSavePermissions}
            canManageAdmins={canManageAdmins}
            isArabic={isArabic}
          />
        </Tabs>
      )}
    </div>
  );
};

export default UserManagement;
