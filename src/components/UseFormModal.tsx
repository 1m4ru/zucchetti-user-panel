import type React from "react"
import {  useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem } from "@mui/material"
import type {  UserModel } from "../dto/user.dto"
import { useCreateUser, useUpdateUser } from "../services/userService";
import toast from "react-hot-toast";
import { useFormValidation } from "../hooks/useFormValidation";
import { userSchema, type UserFormSchema } from "../validations/userSchemas";
interface UserFormModalProps {
    open: boolean
    onClose: () => void
    editingUser?: UserModel
}

export default function UserFormModal({ open, onClose, editingUser }: UserFormModalProps): React.ReactElement {
    const { mutate: createUser, isPending: creating } = useCreateUser();
    const { mutate: updateUser, isPending: updating } = useUpdateUser();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useFormValidation<UserFormSchema>(userSchema);
      

    useEffect(() => {
        if (editingUser) {
            reset(editingUser)
        } else {
            reset({ name: "", email: "", status: "ativo" })
        }
    }, [editingUser, register, open]);


    const onSubmit = (data: UserFormSchema) => {
        if (editingUser?.id) {
            updateUser(
                { id: editingUser.id, ...data },
                {
                    onSuccess() {
                        toast.success("Usuário editado com sucesso!");
                        onClose()
                    },
                    onError: () => toast.error("Erro ao editar o usuário!"),
                }
            );
        } else {
            createUser(data, {
                onSuccess: () => {
                    toast.success("Usuário criado com sucesso!");
                    onClose();
                },
                onError: () => toast.error("Falha ao criar o usuário."),
            });
        }
    };



    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
          <DialogTitle>{editingUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <TextField
                label="Nome"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="E-mail"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                select
                label="Status"
                fullWidth
                {...register("status")}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="ativo">Ativo</MenuItem>
                <MenuItem value="inativo">Inativo</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={onClose} variant="outlined" disabled={creating || updating}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              disabled={creating || updating}
              sx={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
            >
              {creating || updating ? "Salvando..." : editingUser ? "Atualizar" : "Criar"}
            </Button>
          </DialogActions>
        </Dialog>
      );
}