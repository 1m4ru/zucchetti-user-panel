import {
    Card, CardContent, Typography, Chip, IconButton, Box, Button, Tooltip, TextField, Collapse
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddIcon from "@mui/icons-material/Add";
  import SearchIcon from "@mui/icons-material/Search";
  import CloseIcon from "@mui/icons-material/Close";
  import { useState, useMemo, useRef, useEffect } from "react";
  import type { UserModel } from "../../dto/user.dto";
  import { usePagination } from "../../hooks/usePagination";
  import UserFormModal from "../UseFormModal";
  import DeleteConfirmDialog from "../DeleteConfirmDialog";

  interface UserCardsProps {
    users?: UserModel[];
  }
  
  export default function UserCards({users = []} : UserCardsProps) {
    const [filter, setFilter] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<UserModel | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (searchOpen) inputRef.current?.focus();
    }, [searchOpen]);
  
    const filtered = useMemo(() => {
      if (!users) return [];
      return users.filter((u) =>
        u.name.toLowerCase().includes(filter.toLowerCase())
      );
    }, [users, filter]);
  
    const {
      currentPage,
      totalPages,
      paginatedData,
      nextPage,
      prevPage,
      isFirstPage,
      isLastPage,
    } = usePagination({
      data: filtered,
      itemsPerPage: 5,
    });
  
    return (
      <Box sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            {!searchOpen ? (
              <Tooltip title="Buscar usuário">
                <IconButton onClick={() => setSearchOpen(true)}>
                  <SearchIcon color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Fechar busca">
                <IconButton onClick={() => {
                  setSearchOpen(false);
                  setFilter("");
                }}>
                  <CloseIcon color="error" />
                </IconButton>
              </Tooltip>
            )}
  
            <Collapse in={searchOpen} orientation="horizontal">
              <TextField
                inputRef={inputRef}
                placeholder="Buscar por nome..."
                size="small"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  width: 180,
                  "& .MuiOutlinedInput-root": { borderRadius: 1 },
                }}
              />
            </Collapse>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedUser(null);
              setIsFormOpen(true);
            }}
            sx={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            }}
          >
            Novo Usuário
          </Button>
        </Box>
        {paginatedData.map((user) => (
          <Card key={user.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Chip
                label={user.status === "ativo" ? "Ativo" : "Inativo"}
                color={user.status === "ativo" ? "success" : "default"}
                size="small"
                sx={{ mt: 1 }}
              />
              <Box display="flex" gap={1} mt={1}>
                <Tooltip title="Editar Usuário" arrow>
                  <IconButton onClick={() => { setSelectedUser(user); setIsFormOpen(true); }}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir Usuário" arrow>
                  <IconButton onClick={() => setDeleteTarget(user)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
          <Button onClick={prevPage} disabled={isFirstPage}>
            Anterior
          </Button>
          <Typography>
            Página {currentPage} de {totalPages}
          </Typography>
          <Button onClick={nextPage} disabled={isLastPage}>
            Próximo
          </Button>
        </Box>
        <UserFormModal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          editingUser={selectedUser ?? undefined}
        />
  
        <DeleteConfirmDialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          user={deleteTarget}
        />
      </Box>
    );
  }
  