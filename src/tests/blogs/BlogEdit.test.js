import { render, screen, waitFor } from "@testing-library/react";
import BlogEdit from "../../components/blog/BlogEdit";
import userEvent from "@testing-library/user-event";
import { editBlog } from "../../helpers/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../helpers/api", () => {
  const originalModule = jest.requireActual("../../helpers/api");
  return {
    __esModule: true,
    ...originalModule,
    editBlog: jest.fn(),
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
  const mockOnUpdateBlog = jest.fn();
  const blog = {
    id: 1,
    title: "Test Blog",
    content: "Test Content",
    is_public: false,
    user_id: "1",
  };
  render(
    <MemoryRouter>
      <BlogEdit
        onClose={mockOnClose}
        onUpdateBlog={mockOnUpdateBlog}
        blog={blog}
      />
    </MemoryRouter>
  );
};

describe("Blog Edit Component", () => {
  test("Basic rendering", () => {
    renderComponent();

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();
    expect(screen.getByLabelText("Is Public")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Update Blog")).toBeInTheDocument();
  });

  test("Edit Blog Component Inteactions", async () => {
    renderComponent();

    const blogTitleElement = screen.getByLabelText("Title");
    const blogContentElement = screen.getByLabelText("Body");
    const blogIsPublicElement = screen.getByLabelText("Is Public");

    userEvent.clear(blogTitleElement);
    userEvent.type(blogTitleElement, "New Title");

    userEvent.clear(blogContentElement);
    userEvent.type(blogContentElement, "New Content");
    userEvent.click(blogIsPublicElement);

    expect(blogTitleElement.value).toBe("New Title");
    expect(blogContentElement.value).toBe("New Content");
    expect(blogIsPublicElement.checked).toBe(true);
  });

  test("Update Blog Action", async () => {
    editBlog.mockResolvedValueOnce({});
    const user_id = 1;
    renderComponent();

    const blogTitleElement = screen.getByLabelText("Title");
    const blogContentElement = screen.getByLabelText("Body");
    const blogIsPublicElement = screen.getByLabelText("Is Public");

    userEvent.clear(blogTitleElement);
    userEvent.type(blogTitleElement, "New Title");

    userEvent.clear(blogContentElement);
    userEvent.type(blogContentElement, "New Content");
    userEvent.click(blogIsPublicElement);

    expect(blogTitleElement.value).toBe("New Title");
    expect(blogContentElement.value).toBe("New Content");
    expect(blogIsPublicElement.checked).toBe(true);

    const editBlogButton = screen.getByText("Update Blog");
    userEvent.click(editBlogButton);

    await waitFor(() => {
      expect(editBlog).toHaveBeenCalledWith(user_id, {
        title: "New Title",
        content: "New Content",
        is_public: true,
      });
      expect(global.alert).not.toHaveBeenCalled();
    });
  });

  test("Error in Update Blog Action", async () => {
    editBlog.mockResolvedValueOnce({
      error: "Error in updating blog",
    });
    const user_id = 1;
    renderComponent();

    const blogTitleElement = screen.getByLabelText("Title");
    const blogContentElement = screen.getByLabelText("Body");
    const blogIsPublicElement = screen.getByLabelText("Is Public");

    userEvent.clear(blogTitleElement);
    userEvent.type(blogTitleElement, "New Title");

    userEvent.clear(blogContentElement);
    userEvent.type(blogContentElement, "New Content");
    userEvent.click(blogIsPublicElement);

    expect(blogTitleElement.value).toBe("New Title");
    expect(blogContentElement.value).toBe("New Content");
    expect(blogIsPublicElement.checked).toBe(true);

    const editBlogButton = screen.getByText("Update Blog");
    userEvent.click(editBlogButton);

    await waitFor(() => {
      expect(editBlog).toHaveBeenCalledWith(user_id, {
        title: "New Title",
        content: "New Content",
        is_public: true,
      });
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
