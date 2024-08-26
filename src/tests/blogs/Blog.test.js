import { render, screen } from "@testing-library/react";
import Blog from "../../components/blog/Blog";
import { SearchProvider } from "../../context/SearchContext";
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
        <Blog />
      </SearchProvider>
    </BrowserRouter>
  );
};

describe("Blog Component", () => {
  test("Renders public blogs", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return [
          {
            title: "Test Blog",
            content: "Test Content",
            is_public: true,
          },
          {
            title: "Blog",
            content: "Content",
            is_public: true,
          },
        ];
      },
    });

    renderComponent();
    const headerElement = await screen.findByText("Public Blogs");
    expect(headerElement).toBeInTheDocument();

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });

  test("Error while rendering public blogs", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return { error: "Error in fetching public blogs" };
      },
    });

    renderComponent();
    const headerElement = await screen.findByText("Public Blogs");
    expect(headerElement).toBeInTheDocument();

    const listItemElements = screen.queryAllByRole("listitem");
    expect(listItemElements).toHaveLength(0);
  });
});
