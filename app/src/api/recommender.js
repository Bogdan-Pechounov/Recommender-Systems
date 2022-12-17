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
  async latentFeatures(movieId, model) {
    const { data } = await axiosClient.get(
      `/latent_features/${movieId}?model=${model}`
    )
    return data
  },
  async similarMovies(movieId, model) {
    const { data } = await axiosClient.get(`/similar/${movieId}?model=${model}`)
    return data
  },
  async bias(movieId, model) {
    const { data } = await axiosClient.get(`/bias/${movieId}?model=${model}`)
    return data
  },
  async sortByFeature(index, page, limit) {
    const { data } = await axiosClient.get(
      `/sort/${index}?page=${page}&limit=${limit}`
    )
    return data
  },
  async info() {
    const { data } = await axiosClient.get('/info')
    return data
  },
  async genresInfo(model) {
    const { data } = await axiosClient.get(`/info/genres?model=${model}`)
    return data
  },
  async featuresInfo(model) {
    const { data } = await axiosClient.get(`/info/features?model=${model}`)
    return data
  },
}

export default recommender
