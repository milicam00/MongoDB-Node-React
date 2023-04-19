import  axios  from "axios";
export default {
    axios: axios.create({
        baseURL: "http://localhost:8800/api/",
    
      })
}

axios.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});