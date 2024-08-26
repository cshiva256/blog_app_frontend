import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { getToken, removeToken } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { CiLogout, CiLogin } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { SiSparkpost } from "react-icons/si";
import { IoPeople } from "react-icons/io5";
import { flash } from "../../helpers/flash";

const Sidebar = () => {
  const { setQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
    e.target.elements.search.value = "";
  };

  const handleQueryParams = (_) => {
    setQuery("");
  };

  const logOutHandler = () => {
    removeToken();
    flash("Logged out successfully!!!");
    navigate("/blogs");
  };

  let { user_id } = getToken();

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link to="/blogs" className={styles.links} onClick={handleQueryParams}>
          Home <IoPeople className={styles.icon} />
        </Link>
        {user_id ? (
          <>
            <Link
              to="/blogs/view"
              className={styles.links}
              onClick={handleQueryParams}
            >
              My Blogs <SiSparkpost className={styles.icon} />
            </Link>
            <Link to="/users/edit" className={styles.links}>
              Edit Profile <FaUserEdit className={styles.icon} />
            </Link>
            <button onClick={logOutHandler} className={styles.btn}>
              Log Out <CiLogout className={styles.icon} />
            </button>
          </>
        ) : (
          <>
            <Link to="/users/sign-up" className={styles.links}>
              Sign Up <TiUserAdd className={styles.icon} />
            </Link>
            <Link to="/users/sign-in" className={styles.links}>
              Sign In <CiLogin className={styles.icon} />
            </Link>
          </>
        )}
      </div>
      <div className={styles.bottom}>
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search..." />
          <button type="submit" className={styles["search-btn"]}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
