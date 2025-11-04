import { useMemo } from "react";
import type { UserModel } from "../dto/user.dto";

type SortOrder = "asc" | "desc";

interface UseFilteredUsersProps {
  users?: UserModel[];
  filter: string;
  sortOrder?: SortOrder;
}

export const useFilteredUsers = ({
  users,
  filter,
  sortOrder,
}: UseFilteredUsersProps) => {
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter((u) =>
      u.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortOrder) {
      filtered = filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    return filtered;
  }, [users, filter, sortOrder]);

  return filteredUsers;
};
