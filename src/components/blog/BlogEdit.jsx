import React, { useState, useRef } from "react";
import { editBlog } from "../../helpers/api";
import styles from "./blog.module.css";
import { flash } from "../../helpers/flash";

const BlogEdit = ({ onClose, onUpdateBlog, blog }) => {
  const [title, setTitle] = useState(blog["title"]);
  const [content, setContent] = useState(blog["content"]);
  const isPublic = useRef(blog["is_public"]);
  const id = blog["id"];

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const updateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      content: content,
      is_public: isPublic.current.checked,
    };
    const res = await editBlog(id, blog);
    if (res["error"]) {
      alert(res["error"]);
      return;
    }
    onClose();
    flash("Blog updated successfully!!!");
    onUpdateBlog(id);
  };

  return (
    <form className={styles.form} onSubmit={updateBlog}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          id="title"
          name="title"
          required
          onChange={titleChangeHandler}
          value={title}
        />
      </div>
      <div>
        <label htmlFor="content">Body</label>
        <textarea
          placeholder="Enter Blog"
          id="content"
          name="content"
          rows={10}
          onChange={contentChangeHandler}
          value={content}
          required
        />
      </div>
      <div className={styles.checkbox}>
        <label htmlFor="isPublic">Is Public</label>
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          ref={isPublic}
          defaultChecked={isPublic.current}
        />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button>Update Blog</button>
      </div>
    </form>
  );
};

export default BlogEdit;
