import React, { useState, useEffect } from 'react'
import { useSearch } from '../../context/SearchContext';
import BlogCreate from './BlogCreate'
import Modal from '../modal/Modal'
import ListItem from './ListItem';
import styles from './blog.module.css'
import { MdPostAdd } from "react-icons/md";
import { getPrivateBlogs } from '../../helpers/api';

const BlogView = () => {

    const { query } = useSearch();
    const [blogs, setBlogs] = useState([]);
    const [modalIsVisible, setModalVisibility] = useState(false);

    const toggleModalVisibility = (e) => {
        setModalVisibility(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPrivateBlogs(query);
            setBlogs(data)
        }
        fetchData();
    }, [query])

    let modelContent;

    if (modalIsVisible) {
        modelContent = (
            <Modal onClose={toggleModalVisibility}>
                <BlogCreate
                    onClose={toggleModalVisibility}
                />
            </Modal>
        )
    }

    return (
        <>
            <h1>List of private Blogs</h1>
            {modelContent}
            <div className={styles.actions}>
                <button type="button" onClick={toggleModalVisibility}>
                    <MdPostAdd /> Add Blog
                </button>
            </div>
            <div>
                <ul className={styles.list}>
                    {blogs.map((blog, idx) => {
                        return (
                            <li key={idx} className={styles["list-item"]}>
                                <ListItem blog={blog} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default BlogView
