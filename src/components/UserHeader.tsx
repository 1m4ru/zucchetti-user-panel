// src/components/UserHeader.tsx
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface UserHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
  onAddUser: () => void;
}

export const UserHeader = ({ filter, setFilter, onAddUser }: UserHeaderProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1023px)");

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
      alignItems={isMobile ? "stretch" : "center"}
      gap={isMobile ? 1.5 : 0}
      p={2}
      sx={{
        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      <TextField
        placeholder="Buscar por nome..."
        size="small"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth={isMobile}
        sx={{
          width: isMobile ? "100%" : isTablet ? "60%" : "40%",
          bgcolor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": { borderRadius: 1 },
        }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddUser}
        sx={{
          mt: isMobile ? 1.5 : 0, // 👈 espaço entre o input e o botão no mobile
          width: isMobile ? "100%" : "auto", // 👈 botão ocupa largura total no mobile
          background: "white",
          color: "#3b82f6",
          fontWeight: 600,
          px: isMobile ? 0 : 3,
          py: isMobile ? 1.2 : 0.8,
          fontSize: isMobile ? "0.9rem" : "1rem",
          "&:hover": {
            background: "#f3f4f6",
          },
        }}
      >
        Novo Usuário
      </Button>
    </Box>
  );
};
