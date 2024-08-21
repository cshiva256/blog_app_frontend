import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteBlog, getBlog, getToken } from '../../helpers/api';
import styles from "./blog.module.css"
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal'
import BlogEdit from './BlogEdit';
import NotFoundPage from '../../NotFoundPage';
import { flash } from '../../helpers/flash';

const BlogCard = () => {

    const [blog, setBlog] = useState("")
    const [modalIsVisible, setModalVisibility] = useState(false);

    const toggleModalVisibility = (e) => {
        setModalVisibility(prev => !prev)
    }

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchData = async (id) => {
        const data = await getBlog(id);
        setBlog(data);
    }

    useEffect(() => {
        fetchData(id)
    }, [id])

    const removeBlog = async (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const res = await deleteBlog(id);
            if (res["error"]) {
                alert(res["error"]);
                return;
            }
            flash("Blog deleted successfully!!!");
        }
        navigate("/blogs/view");
    }

    let { access_token, user_id } = getToken();

    let modelContent;

    if (modalIsVisible) {
        modelContent = (
            <Modal onClose={toggleModalVisibility}>
                <BlogEdit
                    onClose={toggleModalVisibility}
                    onUpdateBlog={fetchData}
                    blog={blog}
                />
            </Modal>
        )
    }


    if (blog["error"]) {
        flash(blog["error"], "error");
        return <NotFoundPage msg={blog["error"]} />;
    }

    return (
        <>
            {modelContent}
            <div className={styles.card}>
                <h1 className={styles.title}>{blog.title}</h1>
                <p className={styles.body} dangerouslySetInnerHTML={{ __html: blog.content }} />
                {access_token && user_id == blog["user_id"] &&
                    <div className={styles.actions}>
                        <button type='button' onClick={toggleModalVisibility}>Edit Blog</button>
                        <button onClick={removeBlog}>Delete</button>
                    </div>
                }
            </div>
        </>
    )
}

export default BlogCard
