import axios from "axios";

const local = "http://localhost:8080/v1";
const test = "https://task-management-api-test-5ef9ebfe6fb3.herokuapp.com/v1";

const http = axios.create({
    baseURL: test,
    headers: {
        "Content-Type": "application/json",
    },
});

export default http;
