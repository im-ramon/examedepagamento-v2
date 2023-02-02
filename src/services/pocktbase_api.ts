import axios from "axios";

const pocktbase_api = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://app/api' : 'http://127.0.0.1:8090/api',
})


export { pocktbase_api };

