import { authAxios, getToken } from "../../authAxios"
import { SET_AUTH } from "./actionTypes"

export const checkAuth = () => {
    return async dispatch => {
        try {
            const response = await authAxios.get("/private", {
                headers: {
                    ...getToken()
                }
            })
            console.log(response)
            return dispatch({type: SET_AUTH, user: response.data})    
        } catch (error) {
            return dispatch({type: SET_AUTH, user: null})
        }
    }
}

export const login = (data) => {
    return async dispatch => {
        try {
            const response = await authAxios.post("/login", data)
            console.log(response)
            localStorage.setItem("token", response.data.token)
            return dispatch(checkAuth())
        } catch (error) {
            console.log(error)
        }
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.clear()
        return dispatch(checkAuth())
    }
}