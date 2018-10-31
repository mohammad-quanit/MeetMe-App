import axios from "axios";

var instance = axios.create({
  baseURL: "https://api.github.com/users/",
  timeout: 1000
});

export default instance;
