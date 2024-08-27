import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import userEvent from "@testing-library/user-event";
import { getPrivateBlogs } from "./helpers/api";

jest.mock("./helpers/api", () => ({
  ...jest.requireActual("./helpers/api"),
  getPrivateBlogs: jest.fn(),
}));

const setup = (initialEntries = ["/"]) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchProvider searchParam="">
        <App />
      </SearchProvider>
    </MemoryRouter>
  );
};

beforeAll(() => {
  window.alert = jest.fn();
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("User not Signed in", () => {
  test("renders learn react link", () => {
    setup();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Public Blogs")).toBeInTheDocument();
  });

  test("Render My Blogs Page", async () => {
    setup(["/blogs/view"]);

    expect(screen.getByText("Home")).toBeInTheDocument();
    const logInElement = await screen.findByText("Log In");
    expect(logInElement).toBeInTheDocument();
  });
});

describe("User Signed in", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "access_token=some_token; user_id=1",
    });

    const mockGetPrivateBlogs = jest.fn();
  });
  test("renders learn react link", () => {
    setup();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Public Blogs")).toBeInTheDocument();
  });

  test("Render My Blogs Page", async () => {
    getPrivateBlogs.mockReturnValue([
      {
        title: "Test Blog",
        content: "Test Content",
        is_public: false,
      },
      {
        title: "Blog",
        content: "Content",
        is_public: false,
      },
    ]);
    setup();

    expect(screen.getByText("Home")).toBeInTheDocument();

    userEvent.click(screen.getByText("My Blogs"));
    const myBlogsElement = await screen.findByText("List of private Blogs");
    expect(myBlogsElement).toBeInTheDocument();
  });
});
