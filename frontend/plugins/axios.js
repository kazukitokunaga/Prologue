import axios from 'axios'

const isProduction = window.location.hostname !== 'localhost'

export default axios.create({
  baseURL: isProduction ? '/' : 'http://localhost:3000',
  headers: {
    Accept: 'application/json'
  }
})
