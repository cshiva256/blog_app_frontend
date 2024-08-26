import { render, screen, waitFor } from "@testing-library/react";
import UserSignIn from "../../components/user/UserSignIn";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setToken, userLogin } from "../../helpers/api";

jest.mock("../../helpers/api", () => {
  const originalModule = jest.requireActual("../../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    userLogin: jest.fn(),
    setToken: jest.fn(),
  };
});

beforeAll(() => {
  global.alert = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const renderComponent = () => {
  render(
    <MemoryRouter>
      <UserSignIn />
    </MemoryRouter>
  );
};

describe("UserSignIn Component", () => {
  test("Basic rendering", () => {
    renderComponent();

    expect(screen.getByLabelText("User Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });

  test("User Sign In Action", async () => {
    userLogin.mockResolvedValueOnce({
      access_token: "access",
      user_id: 1,
    });
    renderComponent();

    const userNameElement = screen.getByLabelText("User Name:");
    const passwordElement = screen.getByLabelText("Password:");
    const signInButton = screen.getByText("Log In");

    expect(userNameElement).toHaveValue("");
    expect(passwordElement).toHaveValue("");

    userEvent.type(userNameElement, "user1");
    userEvent.type(passwordElement, "password");

    expect(userNameElement).toHaveValue("user1");
    expect(passwordElement).toHaveValue("password");

    userEvent.click(signInButton);

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledTimes(1);
      expect(setToken).toHaveBeenCalledTimes(1);
    });
  });

  test("User Sign In Action, Incorrect Username or Password", async () => {
    userLogin.mockResolvedValueOnce({
      error: "Incorrect Username or Password",
    });
    renderComponent();

    const userNameElement = screen.getByLabelText("User Name:");
    const passwordElement = screen.getByLabelText("Password:");
    const signInButton = screen.getByText("Log In");

    expect(userNameElement).toHaveValue("");
    expect(passwordElement).toHaveValue("");

    userEvent.type(userNameElement, "user1");
    userEvent.type(passwordElement, "password123");

    expect(userNameElement).toHaveValue("user1");
    expect(passwordElement).toHaveValue("password123");

    userEvent.click(signInButton);

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledTimes(1);
      expect(setToken).not.toHaveBeenCalledTimes(1);
    });
  });
});
