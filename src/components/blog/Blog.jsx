import React from "react";
import styles from "./blog.module.css";
import { useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { getPublicBlogs } from "../../helpers/api";
import ListItem from "./ListItem";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { query } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublicBlogs(query);
      if (data["error"]) {
        alert(data["error"]);
        return;
      }
      setBlogs(data);
    };
    fetchData();
  }, [query]);

  return (
    <div>
      <h1>Public Blogs</h1>
      <ul className={styles.list}>
        {blogs.map((blog, idx) => {
          return (
            <li key={idx} className={styles["list-item"]}>
              <ListItem blog={blog} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;
