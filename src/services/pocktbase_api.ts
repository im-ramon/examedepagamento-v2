import axios from "axios";

const pocktbase_api = axios.create({
    baseURL: 'http://localhost:8090/api',
})


export { pocktbase_api };

