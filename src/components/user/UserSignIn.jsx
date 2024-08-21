import React, { useState } from 'react'
import styles from './user.module.css'
import { setToken, userLogin } from '../../helpers/api'
import { useNavigate } from 'react-router-dom'
import { flash } from '../../helpers/flash';

const UserSignIn = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const updateUserName = (e) => {
        setUserName(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const SignInUser = async (event) => {
        event.preventDefault();
        const user = {
            "user_name": userName,
            "password": password
        }
        const res = await userLogin(user)
        if (res["error"]) {
            alert(res["error"])
            setPassword("")
            return;
        }
        setToken(res)
        flash("Successfully Logged In!!!");
        navigate("/blogs")
    }

    return (
        <form className={styles.form} onSubmit={SignInUser}>
            <div>
                <label htmlFor="username">User Name:</label>
                <input
                    type='text'
                    placeholder='User Name'
                    id='username'
                    name='username'
                    onChange={updateUserName}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type='password'
                    placeholder='password'
                    id='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                    required
                    minLength={6}
                />
            </div>
            <div className={styles.actions}>
                <button>Log In</button>
            </div>
        </form>
    )
}

export default UserSignIn
