import React from 'react'
import { Link } from "react-router-dom"
import styles from "./blog.module.css"

const ListItem = ({ blog }) => {
    return (
        <Link to={`/blogs/${blog.id}`} className={styles.link}>
            <h4>{blog.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <h6>by, {blog["display_name"]}</h6>
        </Link>
    )
}

export default ListItem;