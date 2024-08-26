import { render, screen, waitFor } from "@testing-library/react";
import UserSignUp from "../../components/user/UserSignUp";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setToken, userSignUp } from "../../helpers/api";

jest.mock("../../helpers/api", () => {
  const originalModule = jest.requireActual("../../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    userSignUp: jest.fn(),
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
      <UserSignUp />
    </MemoryRouter>
  );
};

describe("UserSignUp Component", () => {
  test("Basic rendering", () => {
    renderComponent();

    expect(screen.getByLabelText("User Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("User Sign Up Action", async () => {
    userSignUp.mockResolvedValueOnce({
      access_token: "access",
      user_id: 1,
    });
    renderComponent();

    const userNameElement = screen.getByLabelText("User Name:");
    const displayNameElement = screen.getByLabelText("Display Name:");
    const passwordElement = screen.getByLabelText("Password:");
    const confirmPasswordElement = screen.getByLabelText("Confirm Password:");
    const signUpButton = screen.getByText("Sign Up");

    userEvent.type(userNameElement, "user1");
    userEvent.type(displayNameElement, "User 1");
    userEvent.type(passwordElement, "password");
    userEvent.type(confirmPasswordElement, "password");

    expect(userNameElement.value).toBe("user1");
    expect(displayNameElement.value).toBe("User 1");
    expect(passwordElement.value).toBe("password");
    expect(confirmPasswordElement.value).toBe("password");

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(userSignUp).toHaveBeenCalledTimes(1);
      expect(setToken).toHaveBeenCalledTimes(1);
    });
  });

  test("User Sign Up Action, Password Mismatch", async () => {
    userSignUp.mockResolvedValueOnce({});
    renderComponent();

    const userNameElement = screen.getByLabelText("User Name:");
    const displayNameElement = screen.getByLabelText("Display Name:");
    const passwordElement = screen.getByLabelText("Password:");
    const confirmPasswordElement = screen.getByLabelText("Confirm Password:");
    const signUpButton = screen.getByText("Sign Up");

    userEvent.type(userNameElement, "user1");
    userEvent.type(displayNameElement, "User 1");
    userEvent.type(passwordElement, "password");
    userEvent.type(confirmPasswordElement, "password123");

    expect(userNameElement.value).toBe("user1");
    expect(displayNameElement.value).toBe("User 1");
    expect(passwordElement.value).toBe("password");
    expect(confirmPasswordElement.value).toBe("password123");

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(userSignUp).not.toHaveBeenCalled();
      expect(setToken).not.toHaveBeenCalled();
    });
  });

  test("User Sign Up Action, Error in Sign Up (username already taken)", async () => {
    userSignUp.mockResolvedValueOnce({
      error: "Error in Sign Up!!",
    });
    renderComponent();

    const userNameElement = screen.getByLabelText("User Name:");
    const displayNameElement = screen.getByLabelText("Display Name:");
    const passwordElement = screen.getByLabelText("Password:");
    const confirmPasswordElement = screen.getByLabelText("Confirm Password:");
    const signUpButton = screen.getByText("Sign Up");

    userEvent.type(userNameElement, "user1");
    userEvent.type(displayNameElement, "User 1");
    userEvent.type(passwordElement, "password");
    userEvent.type(confirmPasswordElement, "password");

    expect(userNameElement.value).toBe("user1");
    expect(displayNameElement.value).toBe("User 1");
    expect(passwordElement.value).toBe("password");
    expect(confirmPasswordElement.value).toBe("password");

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(userSignUp).toHaveBeenCalled();
      expect(setToken).not.toHaveBeenCalled();
    });
  });
});
