import { updateUser } from "../api/users";
import { api } from "../api/client"; // importa o mesmo 'api' usado no teu service
import type { UserDTO } from "../dto/user.dto";

jest.mock("../api/client", () => ({
  api: {
    put: jest.fn(),
  },
}));

describe("Serviço: updateUser", () => {
  it("deve atualizar um usuário corretamente", async () => {
    const mockUser: UserDTO = {
      id: 1,
      name: "Alice",
      email: "alice@test.com",
      status: "ativo",
    };

    (api.put as jest.Mock).mockResolvedValue({ data: mockUser });

    const result = await updateUser(mockUser);

    expect(result).toEqual(mockUser);

    expect(api.put).toHaveBeenCalledTimes(1);
    expect(api.put).toHaveBeenCalledWith(`/users/${mockUser.id}`, mockUser);
  });
});
