import { render, screen, waitFor } from "@testing-library/react";
import BlogCreate from "../../components/blog/BlogCreate";
import { createBlog } from "../../helpers/api";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../helpers/api", () => {
  const originalModule = jest.requireActual("../../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    createBlog: jest.fn(),
  };
});

beforeAll(() => {
  global.alert = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const renderComponent = () => {
  const mockOnClose = jest.fn();
  const mockOnAddBlog = jest.fn();

  render(
    <MemoryRouter>
      <BlogCreate onClose={mockOnClose} onAddBlog={mockOnAddBlog} />
    </MemoryRouter>
  );
};

describe("BlogCreate Component", () => {
  test("Basic rendering", () => {
    renderComponent();

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();
    expect(screen.getByLabelText("Is Public")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Create Blog")).toBeInTheDocument();
  });

  test("Create Blog Inteactions", () => {
    renderComponent();

    const blogTitleElement = screen.getByLabelText("Title");
    const blogContentElement = screen.getByLabelText("Body");
    const blogIsPublicElement = screen.getByLabelText("Is Public");

    userEvent.type(blogTitleElement, "New Title");
    userEvent.type(blogContentElement, "New Content");
    userEvent.click(blogIsPublicElement);

    expect(blogTitleElement.value).toBe("New Title");
    expect(blogContentElement.value).toBe("New Content");
    expect(blogIsPublicElement.checked).toBe(true);
  });

  test("Create Blog Action", async () => {
    createBlog.mockResolvedValueOnce({});
    renderComponent();
    userEvent.type(screen.getByLabelText("Title"), "New Title");
    userEvent.type(screen.getByLabelText("Body"), "New Content");
    userEvent.click(screen.getByLabelText("Is Public"));
    userEvent.click(screen.getByText("Create Blog"));

    await waitFor(() => {
      expect(createBlog).toHaveBeenCalledWith({
        title: "New Title",
        content: "New Content",
        is_public: true,
      });
      expect(global.alert).not.toHaveBeenCalled();
    });
  });

  test("Error in Create Blog Action", async () => {
    createBlog.mockResolvedValueOnce({
      error: "Error in creating blog",
    });
    renderComponent();

    userEvent.type(screen.getByLabelText("Title"), "New Title");
    userEvent.type(screen.getByLabelText("Body"), "New Content");
    userEvent.click(screen.getByText("Create Blog"));

    await waitFor(() => {
      expect(createBlog).toHaveBeenCalledWith({
        title: "New Title",
        content: "New Content",
        is_public: false,
      });
      expect(global.alert).toHaveBeenCalledWith("Error in creating blog");
    });
  });
});
