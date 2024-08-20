import React, { useState } from 'react'
import styles from './blog.module.css'
import { createBlog } from '../../helpers/api';

const BlogCreate = ({ onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const titleChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    const contentChangeHandler = (e) => {
        setContent(e.target.value);
    }

    const isPublicChangeHandler = (e) => {
        setIsPublic(e.target.checked);
    }

    const addBlog = async (event) => {
        event.preventDefault();
        const blog = {
            title: title,
            content: content,
            is_public: isPublic
        }
        const res = await createBlog(blog)
        console.log(res)

    }

    return (
        <form className={styles.form} onSubmit={addBlog}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type='text'
                    placeholder='Enter Title'
                    id='title'
                    name='title'
                    required
                    onChange={titleChangeHandler}
                    value={title}
                />
            </div>
            <div>
                <label htmlFor="content">Body</label>
                <textarea
                    placeholder='Enter Blog'
                    id='content'
                    name='content'
                    required
                    rows={5}
                    onChange={contentChangeHandler}
                    value={content}
                />
            </div>
            <div className={styles.checkbox}>
                <label htmlFor="isPublic">Is Public</label>
                <input
                    type="checkbox"
                    id='isPublic'
                    name='isPublic'
                    onChange={isPublicChangeHandler}
                />
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={onClose}>Cancel</button>
                <button>Create Blog</button>
            </div>
        </form>
    )
}

export default BlogCreate
