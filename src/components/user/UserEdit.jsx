import React, { useState } from 'react'
import styles from './user.module.css'
import {
    setToken,
    editUser,
    getUserDetails,
    deleteUser,
    removeToken
} from '../../helpers/api'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { flash } from '../../helpers/flash'

const UserEdit = () => {
    const [userName, setUserName] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const setUser = async () => {
            const data = await getUserDetails();
            setUserName(data["user_name"]);
            setDisplayName(data["display_name"]);
        }
        setUser();
    }, [])

    const updateUserName = (e) => {
        setUserName(e.target.value)
    }

    const updateDisplayName = (e) => {
        setDisplayName(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const updateNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const updateNewPasswordConfirmation = (e) => {
        setNewPasswordConfirmation(e.target.value)
    }

    const updateUser = async (event) => {
        event.preventDefault();
        if (newPassword !== newPasswordConfirmation) {
            alert("Passwords do not match")
            setPassword("")
            return;
        }
        const user = {
            "user_name": userName,
            "display_name": displayName,
            "new_password": newPassword,
            "new_password_confirmation": newPasswordConfirmation,
            "password": password
        }
        const res = await editUser(user)
        if (res["error"]) {
            alert(res["error"])
            setPassword("")
            return;
        }
        setToken(res)
        flash("User updated successfully!!!")
        navigate("/blogs")
    }

    const removeUser = async (event) => {
        event.preventDefault();
        if (password === "") {
            alert("Please enter password to delete user")
            return;
        }
        else {
            if (!window.confirm("Are you sure you want to delete user?")) {
                flash("User deletion cancelled")
                setPassword("")
                return;
            }
        }
        const user = {
            "password": password,
            "user_name": userName
        }
        const res = await deleteUser(user)
        if (res["error"]) {
            alert(res["error"])
            return;
        }
        setToken(res)
        navigate("/blogs")
        removeToken()
    }

    return (
        <form className={styles.form} onSubmit={updateUser}>
            <div>
                <label htmlFor="user_name">User Name:</label>
                <input
                    type='text'
                    id='user_name'
                    name='user_name'
                    onChange={updateUserName}
                    value={userName}
                    required
                />
            </div>
            <div>
                <label htmlFor="display_name">Display Name:</label>
                <input
                    type='text'
                    id='display_name'
                    name='display_name'
                    onChange={updateDisplayName}
                    value={displayName}
                    required
                />
            </div>
            <div>
                <label htmlFor="new_password">New Password:</label>
                <input
                    type='password'
                    id='new_password'
                    name='new_password'
                    onChange={updateNewPassword}
                />
            </div>
            <div>
                <label htmlFor="password_confirmation">Password Confirmation:</label>
                <input
                    type='password'
                    id='password_confirmation'
                    name='password_confirmation'
                    onChange={updateNewPasswordConfirmation}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                    required
                />
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={removeUser}>Delete User</button>
                <button>Update User</button>
            </div>
        </form >
    )
}

export default UserEdit
