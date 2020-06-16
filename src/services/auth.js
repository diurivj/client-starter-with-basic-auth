import axios from 'axios'

const baseURL = 'http://localhost:3001/api' // this should change in production

const service = axios.create({
  baseURL,
  withCredentials: true // this line helps us with cors
})

export const signup = userData => {
  return service.post('/signup', userData)
}

export const login = userData => {
  return service.post('/login', userData)
}

export const logout = () => {
  return service.post('/logout')
}

export const getUser = () => {
  return service.get('/isLoggedIn')
}
