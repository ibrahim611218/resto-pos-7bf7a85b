
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePermissionsManagement } from "./usePermissionsManagement";
import { userService } from "@/services";
import { useDatabaseConnection } from "@/hooks/useDatabaseConnection";
import { useUserState } from "./useUserState";
import { useUserCreation } from "./useUserCreation";
import { useUserModification } from "./useUserModification";

export const useUserOperations = () => {
  const { isOwner } = useAuth();
  const { getDefaultPermissionsForRole } = usePermissionsManagement();
  const { isConnected } = useDatabaseConnection();
  const canManageAdmins = isOwner();

  const {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser
  } = useUserState();

  const { handleAddUser } = useUserCreation(
    users,
    setUsers,
    newUser,
    setNewUser,
    canManageAdmins,
    getDefaultPermissionsForRole
  );

  const { handleEditUser, handleDeleteUser } = useUserModification(
    users,
    setUsers,
    selectedUser,
    canManageAdmins
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getUsers();
        if (fetchedUsers && fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return {
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
  };
};
