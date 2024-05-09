import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 10000,
})

export { CanceledError }