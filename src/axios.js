import Axios from "axios"
import { getToken } from "./authAxios";

export const auctionAxios = Axios.create({
    baseURL: "https://8f9gf9hvpa.execute-api.ap-south-1.amazonaws.com/dev"
})

auctionAxios.interceptors.request.use(function (config) {
    config = {
        ...config,
        headers: {
            ...config.headers,
            ...getToken()
        }
    }
    return config;
}, function(error) {
    return Promise.reject(error)
})


