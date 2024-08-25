import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogCard from "./BlogCard";
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
      <BlogCard />
    </BrowserRouter>
  );
};

describe("Blog Card Component Public blogs", () => {
  test("Renders Blog Card", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return {
          title: "Test Blog",
          content: "Test Content",
        };
      },
    });
    renderComponent();

    const blogTitleElement = await screen.findByText("Test Blog");
    expect(blogTitleElement).not.toBeNull();

    const blogContentElement = await screen.findByText("Test Content");
    expect(blogContentElement).not.toBeNull();

    const modalElement = screen.queryByRole("dialog");
    expect(modalElement).not.toBeInTheDocument();

    const editButtonElement = screen.queryByText("Edit Blog");
    expect(editButtonElement).not.toBeInTheDocument();
  });
});

describe("BlogCard Component Private Blogs", () => {
  // Setting the cookie before each test
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "access_token=some_token; user_id=1",
    });
  });

  test("Checking the Edit button", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return {
          title: "Test Blog",
          content: "Test Content",
          user_id: 1,
        };
      },
    });

    renderComponent();

    const editButtonElement = await screen.findByText("Edit Blog");
    userEvent.click(editButtonElement);

    const modalElement = await screen.findByRole("dialog");
    expect(modalElement).toBeInTheDocument();
  });

  //   test("Checking the Delete button", async () => {
  //     global.fetch.mockResolvedValueOnce({
  //       json: async () => {
  //         return {
  //           title: "Test Blog",
  //           content: "Test Content",
  //           user_id: 1,
  //         };
  //       },
  //     });

  //     renderComponent();

  //     const deleteButtonElement = await screen.findByText("Delete");
  //     userEvent.click(deleteButtonElement);

  //     const modalElement = await screen.findByRole("dialog");
  //     expect(modalElement).toBeInTheDocument();
  //   });
});
