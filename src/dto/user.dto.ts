export type UserStatus = "ativo" | "inativo";

export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  status?: UserStatus;
}

export type UserModel = Omit<UserDTO, "id" | "status"> & {
  id: number;
  status: UserStatus;
};

export type UserFormData = Omit<UserDTO, "id"> & {
  status: UserStatus;
};