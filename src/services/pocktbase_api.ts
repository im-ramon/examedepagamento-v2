import axios from "axios";

const pocktbase_api = axios.create({
    baseURL: 'pocktbase',
})


export { pocktbase_api };

