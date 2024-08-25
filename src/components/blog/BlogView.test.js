import { render, screen } from "@testing-library/react";
import { SearchProvider } from "../../context/SearchContext";
import BlogView from "./BlogView";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
  global.alert = jest.fn();
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const renderComponent = () => {
  render(
    <BrowserRouter>
      <SearchProvider searchParam="">
        <BlogView />
      </SearchProvider>
    </BrowserRouter>
  );
};

describe("BlogView Component My Blogs", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "access_token=some_token; user_id=1",
    });
  });

  test("Display My Blogs", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return [
          {
            title: "Test Blog",
            content: "Test Content",
            is_public: true,
            user_id: 1,
          },
          {
            title: "Blog",
            content: "Content",
            is_public: false,
            user_id: 1,
          },
          {
            title: "Test Blog 3",
            content: "Test Content 2",
            is_public: false,
            user_id: 1,
          },
        ];
      },
    });
    renderComponent();

    const headerElement = screen.getByText("List of private Blogs");
    expect(headerElement).toBeInTheDocument();

    const modalElement = screen.queryByRole("dialog");
    expect(modalElement).not.toBeInTheDocument();

    const addButtonElement = screen.getByText("Add Blog");
    expect(addButtonElement).toBeInTheDocument();

    const listItemElements = await screen.findAllByRole("listitem");
    // listItemElements.forEach((el) => console.log(el.innerHTML));
    expect(listItemElements).toHaveLength(3);
  });
});
