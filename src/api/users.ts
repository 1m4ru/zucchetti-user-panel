import type { UserDTO } from "../dto/user.dto";
import { api } from "./client";

export const getUsers = async() => {
    const {data} = await api.get<UserDTO[]>('/users');
    return data;
}

export const createUser = async(user: UserDTO) => {
    const {data} = await api.post<UserDTO>('/users', user);
    return data;
}

export const updateUser = async(user: UserDTO) => {
    const {data} = await api.put<UserDTO>(`/users/${user.id}`, user);
    return data;
}

export const deleteUser = async(id: number) => {
    const {data} = await api.delete(`/users/${id}`);
    return data;
}       