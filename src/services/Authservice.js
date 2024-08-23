import axios from "../Api/axios";

const USER_URL = "users"

// méthodes des backends pour le frontend
export const signup = async(user) => {
    return await axios.post(USER_URL + "/register", user);
}

export const signin = async(user) => {
    return await axios.post(USER_URL + "/login", user);
}