const setUserToken = (token) => {
    localStorage.setItem("USER_TOKEN", token)
}

const getUserToken = () => {
    return localStorage.getItem("USER_TOKEN")
}

const removeUserToken = () => {
    localStorage.removeItem("USER_TOKEN")
}

const setAdminToken = (token) => {
    localStorage.setItem("ADMIN_TOKEN", token)
}

const getAdminToken = () => {
    return localStorage.getItem("ADMIN_TOKEN")
}

const removeAdminToken = () => {
    localStorage.removeItem("ADMIN_TOKEN")
}

const setRole = (role) => {
    localStorage.setItem("ROLE",role)
}

const getRole = () => {
    if(localStorage.getItem("ROLE") === "user") {
        return "user"
    } else if (localStorage.getItem("ROLE") === "admin") {
        return "admin"
    } else {
        return "guest"
    }
}

const removeRole = () => {
    localStorage.removeItem("ROLE")
}

export default {
    setUserToken,
    getUserToken,
    removeUserToken,
    setAdminToken,
    getAdminToken,
    removeAdminToken,
    setRole,
    removeRole,
    getRole
}