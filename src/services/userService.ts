import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserDTO, UserModel } from "../dto/user.dto";
import { createUser, deleteUser, getUsers, updateUser } from "../api/users";

const USERS_KEY = ['users'];

export function useUsers() {
    return useQuery({
      queryKey: USERS_KEY,
      queryFn: async (): Promise<UserModel[]> => {
        const data = await getUsers();
  
        return data.map((u: UserDTO) => ({
          id: u.id ?? Date.now(), 
          name: u.name,
          email: u.email,
          status: Math.random() > 0.5 ? "ativo" : "inativo",
        }));
      },
    });
  }


export const useCreateUser = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: (newUser) => {
            qc.setQueryData<UserModel[]>(USERS_KEY, (old = []) => [
                ...old,
                {
                    id: newUser.id ?? Date.now(),
                    name: newUser.name,
                    email: newUser.email,
                    status: "ativo",
                },
            ]);
        },
    });
};

export const useUpdateUser = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: (updateUser) => {
            qc.setQueryData<UserModel[]>(USERS_KEY, (old = []) =>
                old.map((u) =>
                    u.id === updateUser.id ? { ...u, ...updateUser } : u
                )
            );
        },
    });

};

export const useDeleteUser = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: (_, id) => {
            qc.setQueryData<UserModel[]>(USERS_KEY, (old = []) =>
            old.filter((u) => u.id !==id)
            );
        },
    });
};