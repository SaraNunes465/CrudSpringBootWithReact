import axios from "axios";

export default axios.create({
  baseURL: "https://aw-client-api.herokuapp.com",
  //baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});