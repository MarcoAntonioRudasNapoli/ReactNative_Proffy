import axios from 'axios'

const api = axios.create({
    baseURL: 'https://proffy.polijrinternal.com'
})

export default api;