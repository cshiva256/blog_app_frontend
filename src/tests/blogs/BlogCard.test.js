import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogCard from "../../components/blog/BlogCard";
import { MemoryRouter } from "react-router-dom";
import { deleteBlog } from "../../helpers/api";

import * as router from "react-router";

const navigate = jest.fn();

jest.mock("../../helpers/api", () => {
  const originalModule = jest.requireActual("../../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    deleteBlog: jest.fn(),
  };
});

beforeAll(() => {
  global.alert = jest.fn();
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const renderComponent = () => {
  render(
    <MemoryRouter>
      <BlogCard />
    </MemoryRouter>
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

    const deleteButtonElement = screen.queryByText("Delete");
    expect(deleteButtonElement).not.toBeInTheDocument();
  });
});

describe("BlogCard Component Private Blogs", () => {
  // Setting the cookie before each test
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "access_token=some_token; user_id=1",
    });

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  test("Checking the Edit button, Render BlogEdit", async () => {
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

  test("Blog delete action", async () => {
    window.confirm = jest.fn(() => true);
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return {
          title: "Test Blog",
          content: "Test Content",
          user_id: 1,
        };
      },
    });
    deleteBlog.mockResolvedValueOnce({
      success: "Blog deleted successfully",
    });

    renderComponent();

    const deleteButtonElement = await screen.findByText("Delete");
    userEvent.click(deleteButtonElement);
    expect(window.confirm).toHaveBeenCalled();

    expect(deleteBlog).toHaveBeenCalledTimes(1);
  });

  test("Error in blog delete action", async () => {
    window.confirm = jest.fn(() => true);
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        return {
          title: "Test Blog",
          content: "Test Content",
          user_id: 1,
        };
      },
    });
    deleteBlog.mockResolvedValueOnce({
      error: "Error while deleting blog",
    });

    renderComponent();

    const deleteButtonElement = await screen.findByText("Delete");
    userEvent.click(deleteButtonElement);
    expect(window.confirm).toHaveBeenCalled();

    const editButtonElement = await screen.findByText("Edit Blog");
    expect(editButtonElement).toBeInTheDocument();
  });

  test("Stopping blog delete action", async () => {
    window.confirm = jest.fn(() => false);
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

    const deleteButtonElement = await screen.findByText("Delete");
    userEvent.click(deleteButtonElement);

    expect(window.confirm).toHaveBeenCalled();

    const editButtonElement = await screen.findByText("Edit Blog");
    expect(editButtonElement).toBeInTheDocument();
  });
});
