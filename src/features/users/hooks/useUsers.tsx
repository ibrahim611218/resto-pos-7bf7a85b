
import { useState, useEffect, useCallback } from 'react';
import { useUserOperations } from "./useUserOperations";
import { usePasswordManagement } from "./usePasswordManagement";
import { usePermissionsManagement } from "./usePermissionsManagement";
import { useSystemAdmin } from "./useSystemAdmin";
import { useDatabaseConnection } from '@/hooks/useDatabaseConnection';
import { userService } from '@/services';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export const useUsers = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { isConnected } = useDatabaseConnection();
  const [isLoading, setIsLoading] = useState(false);

  const {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser,
    canManageAdmins,
    handleAddUser,
    handleEditUser,
    handleDeleteUser
  } = useUserOperations();

  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword
  } = usePasswordManagement(users, setUsers, selectedUser);

  const {
    selectedPermissions,
    setSelectedPermissions,
    handleEditPermissions,
    handleSavePermissions
  } = usePermissionsManagement();

  // Initialize system admin
  useSystemAdmin(users, setUsers);

  const fetchUsers = useCallback(async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      const fetchedUsers = await userService.getUsers();
      if (fetchedUsers && fetchedUsers.length > 0) {
        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Suppress toast to avoid double toasts with connection error
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, setUsers]);

  useEffect(() => {
    let isMounted = true;
    
    if (isConnected && isMounted) {
      fetchUsers();
    }
    
    return () => {
      isMounted = false;
    };
  }, [isConnected, fetchUsers]);

  const handleSavePermissionsWrapper = () => {
    if (!selectedUser) return false;
    return handleSavePermissions(selectedUser.id);
  };

  return {
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
    handleSavePermissions: handleSavePermissionsWrapper,
    fetchUsers
  };
};
