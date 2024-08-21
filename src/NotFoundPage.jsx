import React from 'react'

const main = {
    color: "red",
    fontSize: "2rem",
    textAlign: "center",
    marginTop: "2rem"
}

const para = {
    backgroundColor: '#ff4d6d',
    maxWidth: "50%",
    padding: "10rem",
    borderRadius: "20px",
    margin: "auto",
    color: "black"
}


const NotFoundPage = ({ msg = "The page you are looking for does not exist" }) => {
    return (
        <div style={main}>
            <h1>Error Page</h1>
            <p style={para}>{msg}</p>
        </div>
    )
}

export default NotFoundPage