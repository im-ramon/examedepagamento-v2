import axios from "axios";

const pocktbase_api = axios.create({
    baseURL: 'https://pocketbase.examedepagamento.com.br/api',
})


export { pocktbase_api };

