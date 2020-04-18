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
  sendMessage(message) {
    const session_id = sessionStorage.getItem('session_id')
    return apiClient.post('/sendMessage', message, {
      headers: { Authorization: session_id }
    })
  },
  getWelcomeMessage() {
    const session_id = sessionStorage.getItem('session_id')
    return apiClient.get('/getWelcomeMessage', {
      headers: { Authorization: session_id }
    })
  }
}
