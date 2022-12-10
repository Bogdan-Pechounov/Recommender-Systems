import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
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
