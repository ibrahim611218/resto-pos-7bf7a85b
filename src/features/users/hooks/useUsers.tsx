
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
        console.log("Fetched users:", fetchedUsers);
        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Don't show toast here to avoid duplicate error messages
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, setUsers]);

  useEffect(() => {
    let isMounted = true;
    
    const loadUsers = async () => {
      if (isConnected && isMounted) {
        await fetchUsers();
      }
    };
    
    loadUsers();
    
    return () => {
      isMounted = false;
    };
  }, [isConnected, fetchUsers]);

  const handleSavePermissionsWrapper = async () => {
    if (!selectedUser) return false;
    return await handleSavePermissions(selectedUser.id);
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
