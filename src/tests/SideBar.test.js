import { render, screen, waitFor } from "@testing-library/react";
import SideBar from "../components/Sidebar/Sidebar";
import { MemoryRouter } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import userEvent from "@testing-library/user-event";
import { removeToken } from "../helpers/api";

jest.mock("../helpers/api", () => {
  const originalModule = jest.requireActual("../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    removeToken: jest.fn(),
  };
});

const renderComponent = () => {
  render(
    <MemoryRouter>
      <SearchProvider searchParam="">
        <SideBar />
      </SearchProvider>
    </MemoryRouter>
  );
};

describe("SideBar Component", () => {
  test("Render SideBar, user absent", () => {
    renderComponent();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.queryByText("My Blogs")).toBeNull();
    expect(screen.queryByText("Edit Profile")).toBeNull();
    expect(screen.queryByText("Log Out")).toBeNull();
  });

  test("Render SideBar, user present", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "access_token=some_token; user_id=1",
    });
    renderComponent();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("My Blogs")).toBeInTheDocument();
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).toBeNull();
    expect(screen.queryByText("Sign In")).toBeNull();
  });
});

describe("User Signed In", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "access_token=some_token; user_id=1",
    });
  });
  test("Loggin out action", async () => {
    removeToken.mockImplementation(() => {
      document.cookie = undefined;
    });
    renderComponent();

    const logOutButton = screen.getByText("Log Out");

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("My Blogs")).toBeInTheDocument();
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).toBeNull();
    expect(screen.queryByText("Sign In")).toBeNull();
    userEvent.click(logOutButton);

    await waitFor(() => {
      expect(removeToken).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.queryByText("My Blogs")).toBeNull();
      expect(screen.queryByText("Edit Profile")).toBeNull();
      expect(screen.queryByText("Log Out")).toBeNull();
    });
  });

  test("Search action", async () => {
    renderComponent();

    const searchButtonElement = screen.getByText("Search");
    const searchInputElement = screen.getByPlaceholderText("Search...");

    userEvent.type(searchInputElement, "Test");
    userEvent.click(searchButtonElement);

    await waitFor(() => {
      expect(searchInputElement.value).toBe("");
    });
  });
});
