
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUsers } from "./hooks/useUsers";
import { useDatabaseConnection } from "@/hooks/useDatabaseConnection";
import UsersContent from "./components/UsersContent";
import UserDialogs from "./components/UserDialogs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { allPermissions } = useAuth();
  const { isConnected, errorDetails, testDatabaseConnection } = useDatabaseConnection();
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
    isLoading,
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
    <div className="container p-4 space-y-4">
      {!isConnected && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            {isArabic ? "خطأ في الاتصال" : "Connection Error"}
          </AlertTitle>
          <AlertDescription>
            {isArabic 
              ? "فشل الاتصال بقاعدة البيانات. يرجى التحقق من الإعدادات." 
              : "Failed to connect to the database. Please check your settings."}
            {errorDetails && (
              <div className="mt-2 text-xs opacity-70">
                {isArabic ? "تفاصيل الخطأ: " : "Error details: "} 
                {errorDetails}
              </div>
            )}
          </AlertDescription>
          <button 
            onClick={testDatabaseConnection} 
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {isArabic ? "إعادة الاتصال" : "Reconnect"}
          </button>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-2">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
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
              return success;
            }}
            handleEditUser={() => {
              const success = handleEditUser();
              if (success) {
                setIsEditDialogOpen(false);
                setSelectedUser(null);
              }
              return success;
            }}
            handleChangePassword={() => {
              const success = handleChangePassword();
              if (success) {
                setIsPasswordDialogOpen(false);
                setSelectedUser(null);
              }
              return success;
            }}
            handleDeleteUser={() => {
              const success = handleDeleteUser();
              if (success) {
                setIsDeleteDialogOpen(false);
                setSelectedUser(null);
              }
              return success;
            }}
            handleSavePermissions={() => {
              const success = handleSavePermissions();
              if (success) {
                setIsPermissionsDialogOpen(false);
                setSelectedUser(null);
              }
              return success;
            }}
            canManageAdmins={canManageAdmins}
            isArabic={isArabic}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;
