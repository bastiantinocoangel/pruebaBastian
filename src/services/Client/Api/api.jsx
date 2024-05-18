import axios from 'axios'

const API_GET_CLIENT  = "https://venues-anti-permitted-karen.trycloudflare.com/api/v1/cliente/"
const API_POST_CLIENT  = "https://venues-anti-permitted-karen.trycloudflare.com/api/v1/cliente/"

export const fetchGetClient = async () => {
    try {
        const response = await axios.get(API_GET_CLIENT);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const fetchPostClient = async (data) => {
    try {
        const response = await axios.post(API_POST_CLIENT, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
