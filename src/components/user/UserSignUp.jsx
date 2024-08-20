import React, { useState } from 'react'
import styles from './user.module.css'
import { setToken, userSignUp } from '../../helpers/api'
import { useNavigate } from 'react-router-dom'

const UserSignUp = () => {

    const [userName, setUserName] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const navigate = useNavigate()

    const updateUserName = (e) => {
        setUserName(e.target.value)
    }

    const updateDisplayName = (e) => {
        setDisplayName(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const updatePasswordConfiramtion = (e) => {
        setPasswordConfirmation(e.target.value)
    }

    const SignUpUser = async (event) => {
        event.preventDefault();
        const user = {
            "user_name": userName,
            "display_name": displayName,
            "password": password,
            "password_confirmation": passwordConfirmation
        }
        const res = await userSignUp(user)
        setToken(res)
        navigate("/blogs")
    }

    return (
        <form className={styles.form} onSubmit={SignUpUser}>
            <div>
                <label htmlFor="user_name">User Name:</label>
                <input
                    type='text'
                    id='user_name'
                    name='user_name'
                    onChange={updateUserName}
                />
            </div>
            <div>
                <label htmlFor="display_name">Display Name:</label>
                <input
                    type='text'
                    id='display_name'
                    name='display_name'
                    onChange={updateDisplayName}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type='password' id='password' name='password' onChange={updatePassword} />
            </div>
            <div>
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input type='password' id='password_confirmation' name='password' onChange={updatePasswordConfiramtion} />
            </div>
            <div className={styles.actions}>
                <button>Sign Up</button>
            </div>
        </form >
    )
}

export default UserSignUp
