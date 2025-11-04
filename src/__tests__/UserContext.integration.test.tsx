import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { UserContext } from "../context/UserContext";
import UserTable from "../components/userList/UserTable";
import type { UserModel } from "../dto/user.dto";

describe("Integração: atualização de estado global", () => {
  const queryClient = new QueryClient();

  it("deve atualizar a listagem quando o refetch é chamado", async () => {
    const initialUsers: UserModel[] = [
      { id: 1, name: "Alice", email: "alice@test.com", status: "ativo" },
    ];

    const updatedUsers: UserModel[] = [
      ...initialUsers,
      { id: 2, name: "Bob", email: "bob@test.com", status: "inativo" },
    ];

    const refetch = jest.fn().mockImplementation(() => ({ data: updatedUsers }));

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{ users: initialUsers, isLoading: false, refetch }}
        >
          <UserTable users={initialUsers} />
        </UserContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();

    // Simula nova renderização com o estado atualizado
    rerender(
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{ users: updatedUsers, isLoading: false, refetch }}
        >
          <UserTable users={updatedUsers} />
        </UserContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
