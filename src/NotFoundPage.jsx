import React from 'react'

const NotFoundPage = ({ msg = "The page you are looking for does not exist" }) => {
    return (
        <div>
            <h1>Error Page</h1>
            <p>{msg}</p>
        </div>
    )
}

export default NotFoundPage