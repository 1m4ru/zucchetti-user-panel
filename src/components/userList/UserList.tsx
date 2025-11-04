import { Box, CircularProgress } from "@mui/material";
import { useUserContext } from "../../context/useUserContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import UserTable from "./UserTable";
import UserTableCompact from "./UserTableCompact";
import UserCards from "./UserCards";

export const  UserList = () => {
  const { users, isLoading } = useUserContext()
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1023px)");

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  if (isMobile) return <UserCards users={users} />;
  if (isTablet) return <UserTableCompact users={users} />;

  return <UserTable users={users} />;
}

export default UserList;