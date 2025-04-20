
import { useState } from "react";
import { UserWithPassword } from "../types";

export const useUserState = () => {
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [newUser, setNewUser] = useState<UserWithPassword>({
    id: "",
    name: "",
    email: "",
    role: "cashier",
    password: "",
    isActive: true
  });

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser,
  };
};
