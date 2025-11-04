import * as yup from "yup"

export const userSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
    .string()
    .trim()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
    status: yup
    .mixed<"ativo" | "inativo">()
    .oneOf(["ativo", "inativo"], "Status inválido"),
});

export type UserFormSchema = yup.InferType<typeof userSchema>;