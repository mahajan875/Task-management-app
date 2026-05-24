import axios from "axios";

const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        "Cache-Control": "public,max-age=300"
    }
});

export default API;