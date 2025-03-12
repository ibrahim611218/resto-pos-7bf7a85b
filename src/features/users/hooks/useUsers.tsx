
import { useUserOperations } from "./useUserOperations";
import { usePasswordManagement } from "./usePasswordManagement";
import { usePermissionsManagement } from "./usePermissionsManagement";
import { useSystemAdmin } from "./useSystemAdmin";

export const useUsers = () => {
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
    handleAddUser,
    handleEditUser,
    handleChangePassword,
    handleDeleteUser,
    handleEditPermissions,
    handleSavePermissions: handleSavePermissionsWrapper
  };
};
