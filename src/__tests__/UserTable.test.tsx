import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserTable from "../components/userList/UserTable";
import type { UserModel } from "../dto/user.dto";
import type { UserStatus } from "../dto/user.dto"; 

describe("UserTable", () => {
  it("deve renderizar os nomes, e-mails e status dos usuários", () => {
    const queryClient = new QueryClient();

    const mockUsers: UserModel[] = [
      {
        id: 1,
        name: "Chelsey Dietrich",
        email: "Lucio_Hettinger@annie.ca",
        status: "ativo" as UserStatus, 
      },
      {
        id: 2,
        name: "Clementina DuBuque",
        email: "Rey.Padberg@karina.biz",
        status: "ativo" as UserStatus, 
      },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <UserTable users={mockUsers} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Chelsey Dietrich/i)).toBeInTheDocument();
    expect(screen.getByText(/Clementina DuBuque/i)).toBeInTheDocument();
    expect(screen.getByText(/Lucio_Hettinger@annie.ca/i)).toBeInTheDocument();
    expect(screen.getByText(/Rey.Padberg@karina.biz/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ativo/i)).toHaveLength(2);
  });
});
