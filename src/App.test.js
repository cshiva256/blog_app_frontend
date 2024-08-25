import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <SearchProvider searchParam="">
        <App />
      </SearchProvider>
    </BrowserRouter>
  );

  const linkElement = screen.getByText("Home");
  expect(linkElement).toBeInTheDocument();
});
