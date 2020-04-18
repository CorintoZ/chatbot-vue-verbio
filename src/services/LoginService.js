import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:5556`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true
  }
})

export default {
  login(user) {
    return apiClient.post('/login', user)
  }
}
