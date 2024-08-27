import React, { useState } from "react";
import styles from "./user.module.css";
import { setToken, userLogin } from "../../helpers/api";
import { useNavigate, useLocation } from "react-router-dom";
import { flash } from "../../helpers/flash";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

const UserSignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const updateUserName = (e) => {
    setUserName(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const SignInUser = async (event) => {
    event.preventDefault();
    const user = {
      user_name: userName,
      password: password,
    };
    const res = await userLogin(user);
    if (res["error"]) {
      alert(res["error"]);
      setPassword("");
      return;
    }
    setToken(res);
    flash("Successfully Logged In!!!");
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/blogs");
    }
  };

  return (
    <form className={styles.form} onSubmit={SignInUser}>
      <div>
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          placeholder="User Name"
          id="username"
          name="username"
          onChange={updateUserName}
          required
        />
      </div>
      <div>
        <label htmlFor="password">
          Password:
          {showPassword ? (
            <IoEyeSharp onClick={togglePassword} className={styles.icons} />
          ) : (
            <IoEyeOffSharp onClick={togglePassword} className={styles.icons} />
          )}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          id="password"
          name="password"
          onChange={updatePassword}
          value={password}
          minLength={6}
          required
        />
      </div>
      <div className={styles.actions}>
        <button>Log In</button>
      </div>
    </form>
  );
};

export default UserSignIn;
