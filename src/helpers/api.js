import Cookies from 'js-cookie';

export const setToken = ({ access_token, user_id }) => {
    Cookies.set("access_token", access_token);
    Cookies.set("user_id", user_id)
}

export const removeToken = () => {
    Cookies.remove("access_token");
    Cookies.remove("user_id");
}

export const getToken = () => {
    const access_token = Cookies.get("access_token");
    const user_id = Cookies.get("user_id");
    return { access_token: access_token, user_id: user_id };
}

export const getPublicBlogs = async (query) => {
    let URL = process.env.REACT_APP_API + "blogs"
    if (query.trim().length > 0) {
        URL += `?search=${query.trim()}`
    }

    try {
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        return res.json();
    } catch (error) {
        console.log(error, "error in fetching public blogs");
    }
}

export const getPrivateBlogs = async (query) => {
    let URL = process.env.REACT_APP_API + "blogs/view"
    if (query.trim().length > 0) {
        URL += `?search=${query.trim()}`
    }

    try {
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': getToken()["access_token"]
            },
            credentials: 'include'
        });
        return res.json();
    } catch (error) {
        console.log(error, "error in fetching private blogs");
    }
}

export const getBlog = async (id) => {
    const URL = process.env.REACT_APP_API + `blogs/${id}`
    try {
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': getToken()["access_token"]
            },
            credentials: 'include'
        });
        return res.json();
    } catch (error) {
        console.log("error in getting blog");
    }
}

export const createBlog = async (blogData) => {
    const URL = process.env.REACT_APP_API + `blogs`
    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': getToken()["access_token"]
            },
            body: JSON.stringify(blogData),
            credentials: 'include'
        });
        return res.json();
    } catch (error) {
        console.log("error while creating blog");
    }
}

export const editBlog = async (id, blogData) => {
    const URL = process.env.REACT_APP_API + `blogs/${id}`
    try {
        const res = await fetch(URL, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': getToken()["access_token"]
            },
            body: JSON.stringify(blogData),
            credentials: 'include'
        });
        return res.json();
    } catch (error) {
        console.log("error while editing blog");
    }
}

export const deleteBlog = async (id) => {
    const URL = process.env.REACT_APP_API + `blogs/${id}`
    try {
        const res = await fetch(URL, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': getToken()["access_token"]
            },
            credentials: 'include'
        });
        return res.json();
    } catch (error) {
        console.log("error while deleting blog");
    }
}

export const userLogin = async (userData) => {
    const URL = process.env.REACT_APP_API + "users/sign_in"
    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        return res.json();
    }
    catch (error) {
        console.log("error while logging in!!")
    }
}

export const userSignUp = async (userData) => {
    const URL = process.env.REACT_APP_API + "users/sign_up"
    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        return res.json();
    }
    catch (error) {
        console.log("error while Signing up!!")
    }
}
