import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteBlog, getBlog, getToken } from '../../helpers/api';
import styles from "./blog.module.css"
import NotFoundPage from '../../NotFoundPage';
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal'
import BlogEdit from './BlogEdit';

const BlogCard = () => {

    const [blog, setBlog] = useState("")
    const [modalIsVisible, setModalVisibility] = useState(false);

    const toggleModalVisibility = (e) => {
        setModalVisibility(prev => !prev)
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlog(id);
            setBlog(data);
        }
        fetchData()
    }, [id])

    if (blog["error"]) {
        return <NotFoundPage msg={blog["error"]} />
    }

    const removeBlog = async (event) => {
        event.preventDefault();
        const res = await deleteBlog(id);
        console.log(res);
        navigate("/blogs/view");
    }

    let { access_token, user_id } = getToken();

    let modelContent;

    if (modalIsVisible) {
        modelContent = (
            <Modal onClose={toggleModalVisibility}>
                <BlogEdit
                    onClose={toggleModalVisibility}
                    blog={blog}
                />
            </Modal>
        )
    }

    return (
        <>
            {modelContent}
            <div className={styles.card}>
                <h1 className={styles.title}>{blog.title}</h1>
                <p className={styles.body} dangerouslySetInnerHTML={{ __html: blog.content }} />
                {access_token && user_id == blog["user_id"] &&
                    <div>
                        <button type='button' onClick={toggleModalVisibility}>Edit Blog</button>
                        <button onClick={removeBlog}>Delete</button>
                    </div>
                }
            </div>
        </>
    )
}

export default BlogCard
