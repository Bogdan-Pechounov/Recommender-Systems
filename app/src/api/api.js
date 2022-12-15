import axios from 'axios'

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://movie-recommender-api.onrender.com/'
      : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

const api = {
  w500Image(path) {
    if (!path) return '/no-image-icon.png'
    return `https://image.tmdb.org/t/p/w500${path}`
  },
  originalImage(imgPath) {
    if (!imgPath) return '/no-image-icon.png'
    return `https://image.tmdb.org/t/p/original${imgPath}`
  },
  async getMovies(limit, page, sort = '', search = '') {
    const { data } = await axiosClient.get(
      `/movies/?limit=${limit}&page=${page}&sort=${sort}&search=${search}`
    )
    return data
  },
  async getPromotedMovies() {
    const { data } = await axiosClient.get('/movies/promoted')
    return data
  },
  async getMovie(id) {
    const { data } = await axiosClient.get(`/movies/${id}`)
    return data
  },
  async populate(similarMovieIds) {
    const promises = []
    for (const [movieId, similarity] of similarMovieIds) {
      promises.push(
        (async () => {
          const movie = await api.getMovie(movieId)
          movie.similarity = similarity
          return movie
        })()
      )
    }
    return Promise.all(promises)
  },
}

export default api
