import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserFormModal from "../components/UseFormModal";
import type { UserModel } from "../dto/user.dto"; // <- importa o tipo

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("../services/userService", () => ({
  useCreateUser: () => ({
    mutate: jest.fn((data, { onSuccess }) => onSuccess && onSuccess()),
    isPending: false,
  }),
  useUpdateUser: () => ({
    mutate: jest.fn((data, { onSuccess }) => onSuccess && onSuccess()),
    isPending: false,
  }),
}));

describe("UserFormModal", () => {
  const queryClient = new QueryClient();

  const setup = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <UserFormModal open={true} onClose={jest.fn()} />
      </QueryClientProvider>
    );

  it("deve renderizar corretamente os campos do formulário", () => {
    setup();

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /criar/i })).toBeInTheDocument();
  });

  it("deve permitir preencher os campos e submeter o formulário", async () => {
    setup();
  
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Novo Usuário" },
    });
  
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "teste@teste.com" },
    });
  
    fireEvent.mouseDown(screen.getByLabelText(/status/i));
    const option = await screen.findByRole("option", { name: "Ativo" });
    fireEvent.click(option);
  
    fireEvent.click(screen.getByRole("button", { name: /criar/i }));
  
    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toHaveValue("Novo Usuário");
    });
  });

  it("deve exibir o texto 'Atualizar' se estiver em modo de edição", () => {
    const user: UserModel = {
      id: 1,
      name: "John",
      email: "john@test.com",
      status: "ativo", // agora tá no tipo certo
    };

    render(
      <QueryClientProvider client={queryClient}>
        <UserFormModal open={true} onClose={jest.fn()} editingUser={user} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/atualizar/i)).toBeInTheDocument();
  });
});
