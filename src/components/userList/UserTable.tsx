import { useState} from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Chip, Box,
    Typography, Button, TableFooter,
    Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import type { UserModel } from "../../dto/user.dto";
import UserFormModal from "../UseFormModal";
import { usePagination } from "../../hooks/usePagination";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { UserHeader } from "../UserHeader";
import { useFilteredUsers } from "../../hooks/useFilteredUsers";

interface UserTableProps {
    users?: UserModel[]
}

export default function UserTable({ users = []}: UserTableProps) {
    const [filter, setFilter] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<UserModel | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const filteredUsers = useFilteredUsers({
        users,
        filter,
        sortOrder,
      });

    const {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
        isFirstPage,
        isLastPage,
    } = usePagination({
        data: filteredUsers,
        itemsPerPage: 10,
    });

    
    return (
        <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 6, p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <UserHeader
          filter={filter}
          setFilter={setFilter}
          onAddUser={() => {
            setSelectedUser(null);
            setIsFormOpen(true);
          }}
        />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
                                <TableCell
                                    sx={{
                                        cursor: "pointer",
                                        userSelect: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5, 
                                      }}
                                    onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                                >
                                    <strong>Nome</strong>
                                    {sortOrder === "asc" ? (
                                        <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                        <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </TableCell>
                                <TableCell><strong>E-mail</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell align="right"><strong>Ações</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status === "ativo" ? "Ativo" : "Inativo"}
                                                color={user.status === "ativo" ? "success" : "default"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Editar Usuário" arrow>
                                                <IconButton
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsFormOpen(true);
                                                    }}
                                                >
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Deletar Usuário" arrow>
                                                <IconButton onClick={() => setDeleteTarget(user)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        Nenhum usuário encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Box
                                        display="flex"
                                        justifyContent="end"
                                        alignItems="center"
                                        gap={2}
                                        py={2}
                                    >
                                        <Button onClick={prevPage} disabled={isFirstPage}>
                                            Anterior
                                        </Button>
                                        <Typography variant="body2">
                                            Página {currentPage} de {totalPages}
                                        </Typography>
                                        <Button onClick={nextPage} disabled={isLastPage}>
                                            Próximo
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>

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
