import _axios from 'axios'

const API_URL = 'http://46.101.216.31:3000'
// const API_URL = 'http://localhost:3000'

const axios = _axios.create({
  headers: { 'Authorization': localStorage.getItem('jwt_token') }
})

const createAxios = () => {
  return _axios.create({
    headers: { 'Authorization': localStorage.getItem('jwt_token') }
  })
}

export { API_URL, axios, createAxios }
