import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001',
})

const api = {
  w500Image(path) {
    return `https://image.tmdb.org/t/p/w500${path}`
  },
  originalImage(imgPath) {
    return `https://image.tmdb.org/t/p/original${imgPath}`
  },
  async getMovies(limit, page) {
    const { data } = await axiosClient.get(
      `/movies/?limit=${limit}&page=${page}`
    )
    return data
  },
  async getMovie(id) {
    const { data } = await axiosClient.get(`/movies/${id}`)
    return data
  },
}

export default api
