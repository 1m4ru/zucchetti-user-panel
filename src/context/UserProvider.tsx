import type { ReactNode } from "react";
import { useUsers } from "../services/userService";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: users, isLoading, refetch } = useUsers();

  return (
    <UserContext.Provider value={{ users, isLoading, refetch }}>
      {children}
    </UserContext.Provider>
  );
};
