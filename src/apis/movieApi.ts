import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "6de482bc8c5768aa3648618b9c3cc98a"
  }
})