import Axios from "axios"

export const getToken = ()=>{
    return {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
}

export const authAxios = Axios.create({
    baseURL: "https://tqkttg5ge5.execute-api.ap-south-1.amazonaws.com/dev"
})