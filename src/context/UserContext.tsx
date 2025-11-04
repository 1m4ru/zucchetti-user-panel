import { createContext } from "react";
import type { UserModel } from "../dto/user.dto";

export interface UserContextValue {
  users: UserModel[] | undefined;
  isLoading: boolean;
  refetch: () => void;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);
