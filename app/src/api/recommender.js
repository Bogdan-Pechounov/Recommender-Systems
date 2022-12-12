import axios from 'axios'

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://movie-recommender-ml.onrender.com/'
      : 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

const recommender = {
  async latentFeatures(movieId) {
    const { data } = await axiosClient.get(`/latent_features/${movieId}`)
    return data
  },
  async similarMovies(movieId) {
    const { data } = await axiosClient.get(`/similar/${movieId}`)
    return data
  },
  async bias(movieId) {
    const { data } = await axiosClient.get(`/bias/${movieId}`)
    return data
  },
}

export default recommender
