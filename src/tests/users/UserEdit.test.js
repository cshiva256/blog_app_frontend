import { render, screen, waitFor } from "@testing-library/react";
import UserEdit from "../../components/user/UserEdit";
import { MemoryRouter } from "react-router-dom";
import {
  deleteUser,
  editUser,
  getUserDetails,
  setToken,
} from "../../helpers/api";
import userEvent from "@testing-library/user-event";

jest.mock("../../helpers/api", () => {
  const originalModule = jest.requireActual("../../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    editUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserDetails: jest.fn(),
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
      <UserEdit />
    </MemoryRouter>
  );
};

describe("UserEdit Component", () => {
  test("Basic rendering", () => {
    renderComponent();

    expect(screen.getByLabelText("User Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password Confirmation:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });

  test("User Edit Action", async () => {
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });

    editUser.mockResolvedValueOnce({});

    renderComponent();

    const userNameElement = await screen.findByLabelText("User Name:");
    const displayNameElement = await screen.findByLabelText("Display Name:");
    const newPasswordElement = await screen.findByLabelText("New Password:");
    const passwordConfirmationElement = await screen.findByLabelText(
      "Password Confirmation:"
    );
    const passwordElement = await screen.findByLabelText("Password:");
    const updateUserButton = screen.getByText("Update User");

    expect(userNameElement).toHaveValue("user1");
    expect(displayNameElement).toHaveValue("User 1");

    userEvent.clear(userNameElement);
    userEvent.type(userNameElement, "new user");

    userEvent.clear(displayNameElement);
    userEvent.type(displayNameElement, "New User");

    userEvent.type(newPasswordElement, "password");
    userEvent.type(passwordConfirmationElement, "password");
    userEvent.type(passwordElement, "password123");

    expect(userNameElement).toHaveValue("new user");
    expect(displayNameElement).toHaveValue("New User");
    expect(newPasswordElement).toHaveValue("password");
    expect(passwordConfirmationElement).toHaveValue("password");

    userEvent.click(updateUserButton);

    await waitFor(() => {
      expect(editUser).toHaveBeenCalledWith({
        user_name: "new user",
        display_name: "New User",
        new_password: "password",
        new_password_confirmation: "password",
        password: "password123",
      });
      expect(setToken).toHaveBeenCalledTimes(1);
    });
  });

  test("User Edit Action, editUser() error", async () => {
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });

    editUser.mockResolvedValueOnce({
      error: "Error while updating user",
    });

    renderComponent();

    const userNameElement = await screen.findByLabelText("User Name:");
    const displayNameElement = await screen.findByLabelText("Display Name:");
    const newPasswordElement = await screen.findByLabelText("New Password:");
    const passwordConfirmationElement = await screen.findByLabelText(
      "Password Confirmation:"
    );
    const passwordElement = await screen.findByLabelText("Password:");
    const updateUserButton = screen.getByText("Update User");

    expect(userNameElement).toHaveValue("user1");
    expect(displayNameElement).toHaveValue("User 1");

    userEvent.clear(userNameElement);
    userEvent.type(userNameElement, "new user");

    userEvent.clear(displayNameElement);
    userEvent.type(displayNameElement, "New User");

    userEvent.type(newPasswordElement, "password");
    userEvent.type(passwordConfirmationElement, "password");
    userEvent.type(passwordElement, "passwor");

    expect(userNameElement).toHaveValue("new user");
    expect(displayNameElement).toHaveValue("New User");
    expect(newPasswordElement).toHaveValue("password");
    expect(passwordConfirmationElement).toHaveValue("password");

    userEvent.click(updateUserButton);
    await waitFor(() => {
      expect(editUser).toHaveBeenCalledWith({
        user_name: "new user",
        display_name: "New User",
        new_password: "password",
        new_password_confirmation: "password",
        password: "passwor",
      });
      expect(setToken).not.toHaveBeenCalled();
    });
  });

  test("User Edit Action, Password Mismatch", async () => {
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });

    editUser.mockResolvedValueOnce({});

    renderComponent();

    const userNameElement = await screen.findByLabelText("User Name:");
    const displayNameElement = await screen.findByLabelText("Display Name:");
    const newPasswordElement = await screen.findByLabelText("New Password:");
    const passwordConfirmationElement = await screen.findByLabelText(
      "Password Confirmation:"
    );
    const passwordElement = await screen.findByLabelText("Password:");
    const updateUserButton = screen.getByText("Update User");

    expect(userNameElement).toHaveValue("user1");
    expect(displayNameElement).toHaveValue("User 1");

    userEvent.clear(userNameElement);
    userEvent.type(userNameElement, "new user");

    userEvent.clear(displayNameElement);
    userEvent.type(displayNameElement, "New User");

    userEvent.type(newPasswordElement, "password");
    userEvent.type(passwordConfirmationElement, "password12");
    userEvent.type(passwordElement, "passwor");

    expect(userNameElement).toHaveValue("new user");
    expect(displayNameElement).toHaveValue("New User");
    expect(newPasswordElement).toHaveValue("password");
    expect(passwordConfirmationElement).toHaveValue("password12");

    userEvent.click(updateUserButton);
    await waitFor(() => {
      expect(editUser).not.toHaveBeenCalledWith();
      expect(setToken).not.toHaveBeenCalled();
    });
  });

  test("Delete User Action", async () => {
    window.confirm = jest.fn(() => true);
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });
    deleteUser.mockResolvedValueOnce({});
    renderComponent();

    const deleteButton = await screen.findByText("Delete User");
    const passwordElement = await screen.findByLabelText("Password:");

    userEvent.type(passwordElement, "password");
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledTimes(1);
    });
  });

  test("Delete User Action, Password is empty", async () => {
    window.confirm = jest.fn(() => true);
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });
    deleteUser.mockResolvedValueOnce({});
    renderComponent();

    const deleteButton = await screen.findByText("Delete User");
    const passwordElement = await screen.findByLabelText("Password:");

    userEvent.clear(passwordElement);
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUser).not.toHaveBeenCalled();
    });
  });

  test("Delete User Action, Cancel Action", async () => {
    window.confirm = jest.fn(() => false);
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });
    deleteUser.mockResolvedValueOnce({});
    renderComponent();

    const deleteButton = await screen.findByText("Delete User");
    const passwordElement = await screen.findByLabelText("Password:");

    userEvent.type(passwordElement, "password");
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUser).not.toHaveBeenCalled();
    });
  });

  test("Delete User Action, Deletion Error", async () => {
    window.confirm = jest.fn(() => true);
    getUserDetails.mockResolvedValueOnce({
      user_name: "user1",
      display_name: "User 1",
    });
    deleteUser.mockResolvedValueOnce({
      error: "Error while deleting user",
    });
    renderComponent();

    const deleteButton = await screen.findByText("Delete User");
    const passwordElement = await screen.findByLabelText("Password:");

    userEvent.type(passwordElement, "password");
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledTimes(1);
      expect(setToken).not.toHaveBeenCalled();
    });
  });
});
