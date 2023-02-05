import axios from 'axios'
// import { config } from 'dotenv';
// config();

export const api = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: "https://pandora-monorepo-api.onrender.com"
})
