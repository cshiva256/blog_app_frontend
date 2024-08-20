import React from 'react'
import styles from "./sidebar.module.css"
import { Link } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'
import { getToken, removeToken } from '../../helpers/api'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const { setQuery } = useSearch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.elements.search.value);
        e.target.elements.search.value = "";
    }

    const handleQueryParams = (_) => {
        setQuery("");
    }

    const logOutHandler = () => {
        removeToken();
        navigate("/blogs")
    }

    let { user_id } = getToken();

    return (
        <div className={styles.sidebar}>
            <div className={styles.top}>
                <Link to="/blogs" className={styles.links} onClick={handleQueryParams}>Home</Link>
                {user_id ?
                    <>
                        <Link to="/blogs/view" className={styles.links} >My Blogs</Link>
                        <Link to="/users/edit" className={styles.links} >Edit Profile</Link>
                        <button onClick={logOutHandler}>Log Out</button>
                    </>
                    :
                    <>
                        <Link to="/users/sign-up" className={styles.links}>Sign Up</Link>
                        <Link to="/users/sign-in" className={styles.links}>Sign In</Link>
                    </>
                }
            </div>
            <div className={styles.bottom}>
                <form onSubmit={handleSearch}>
                    <input type="text" name="search" placeholder="Search..." />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Sidebar
