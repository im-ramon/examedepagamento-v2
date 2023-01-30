import axios from "axios";

// Install dot.env after to fix it
// Development:
const pocktbase_api = axios.create({
    baseURL: 'http://127.0.0.1:8090/api',
})

// Production:
// const api = axios.create({
//     baseURL: 'http://app/api',
// })


export { pocktbase_api };

