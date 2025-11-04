"use client"

import type React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Avatar } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDeleteUser} from "../services/userService"
import toast from "react-hot-toast"
import type { UserModel } from "../dto/user.dto"

interface DeleteConfirmDialogProps {
  open: boolean
  onClose: () => void
  user?: UserModel | null;
}

export const DeleteConfirmDialog = ({ open, onClose, user }: DeleteConfirmDialogProps): React.ReactElement => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleConfirmDelete = () => {
    if (!user?.id) return
    
    deleteUser(user?.id, {
        onSuccess: () => {
            toast.success(`Usuario ${user.name} deletado com sucesso!`);
            onClose();
        },
        onError: () => {
            toast.error("Falha ao deletar usuário.")
        },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogContent sx={{ pt: 3, textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              mx: "auto",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
            }}
          >
            <DeleteIcon />
          </Avatar>
        </Box>
        <DialogTitle sx={{ p: 0, mb: 1, fontWeight: 600, fontSize: "1.25rem" }}>Deletar Usuário?</DialogTitle>
        <Typography sx={{ color: "#64748b", mb: 2 }}>
          Tem certeza que deseja deletar <strong>{user?.name}</strong>? Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          sx={{
            backgroundColor: "#dc2626",
            "&:hover": { backgroundColor: "#b91c1c" },
          }}
          disabled={isPending}
        >
          {isPending ? "Deletando..." : "Deletar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog;