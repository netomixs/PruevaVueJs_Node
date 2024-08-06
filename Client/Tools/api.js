import axios from 'axios';
const VUE_APP_API_BASE_URL="http://localhost:3000/api/"
const token=localStorage.getItem("token")
console.log(token);

const apiClient = axios.create({
  baseURL: VUE_APP_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
       "Authorization": `Bearer ${token}`
  },
});

export default apiClient;