import "./App.css";
import { Route, Routes } from "react-router-dom";
import Blog from "./components/blog/Blog";
import Sidebar from "./components/Sidebar/Sidebar";
import { SearchProvider } from "./context/SearchContext";
import BlogCard from "./components/blog/BlogCard";
import NotFoundPage from "./NotFoundPage";
import UserSignUp from "./components/user/UserSignUp";
import UserSignIn from "./components/user/UserSignIn";
import BlogView from "./components/blog/BlogView";
import UserEdit from "./components/user/UserEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SearchProvider>
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/view" element={<BlogView />} />
            <Route path="/blogs/:id" element={<BlogCard />} />

            <Route path="/users/sign-up" element={<UserSignUp />} />
            <Route path="/users/sign-in" element={<UserSignIn />} />
            <Route path="/users/edit" element={<UserEdit />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <ToastContainer position="top-right" autoClose={5000} closeOnClick />
      </SearchProvider>
    </>
  );
}

export default App;
