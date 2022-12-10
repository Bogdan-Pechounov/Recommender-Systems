import api from 'api/api'
import recommender from 'api/recommender'
import MovieRow from 'components/movie-row/MovieRow'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'

import './movie.scss'
import { useSwiper } from 'swiper/react'
//TODO average rating, rating graph, similarity graph (0.9-0.8, 0.8-0.7, ...)
//TODO latent features, sort by latent feature page, bias (and how it correlates with avg rating)

const numRowItems = 10

function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState()

  const [features, setFeatures] = useState([])
  const [bias, setBias] = useState()

  const [movieIds, setMovieIds] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [dissimilarMovies, setDissimilarMovies] = useState([])
  const [similarEnd, setSimilarEnd] = useState(0)
  const [dissimilarEnd, setDissimilarEnd] = useState(0)

  useEffect(() => {
    api.getMovie(id).then((movie) => setMovie(movie))
    recommender.similarMovies(id).then((movieIds) => setMovieIds(movieIds))
    recommender.latentFeatures(id).then((features) => setFeatures(features))
    recommender.bias(id).then((bias) => setBias(bias))
  }, [id])

  //Find movie details one by one
  useEffect(() => {
    getSimilarMovies().then(setSimilarMovies)
    getDissimilarMovies().then(setDissimilarMovies)
  }, [movieIds])

  //load more movies dynamically
  useEffect(() => {
    getSimilarMovies().then((movies) =>
      setSimilarMovies([...similarMovies, ...movies])
    )
  }, [similarEnd])

  useEffect(() => {
    getDissimilarMovies().then((movies) =>
      setDissimilarMovies([...dissimilarMovies, ...movies])
    )
  }, [dissimilarEnd])

  async function getSimilarMovies() {
    const newMovieIds = movieIds.slice(
      similarMovies.length,
      similarMovies.length + numRowItems
    )
    const movies = await api.populate(newMovieIds)
    return movies
  }

  async function getDissimilarMovies() {
    const newMovieIds = movieIds
      .slice(
        movieIds.length - dissimilarMovies.length - numRowItems,
        movieIds.length - dissimilarMovies.length
      )
      .reverse()
    const movies = await api.populate(newMovieIds)
    return movies
  }

  if (movie) {
    return (
      <div className='movie'>
        <div
          className='banner'
          style={{
            backgroundImage: `url(${api.originalImage(movie.backdrop_path)})`,
          }}
        ></div>
        <div className='content mb-3'>
          <div className='poster'>
            <img src={api.originalImage(movie.poster_path)} alt='' />
          </div>
          <div className='info'>
            <div className='title'>{movie.title}</div>
            <div className='genres'>
              {movie.genres.map((genre, i) => (
                <Link
                  key={i}
                  to={`/genres/${genre.toLowerCase()}`}
                  className='genre'
                  onClick={() => setMovie(null)}
                >
                  {genre}
                </Link>
              ))}
            </div>
            <p>{movie.release_date}</p>

            <p>
              <span style={{ fontWeight: 'bolder' }}>
                {movie.rating_avg.toFixed(3)}
              </span>
              /5 ({movie.rating_count})
            </p>
            <p>{movie.overview}</p>
            <p>Bias: {bias?.toFixed(4)}</p>
            <p>
              Latent features: [
              {features
                .map((f) => f.toFixed(3))
                .map((f, i) => (
                  <span key={i}>
                    {i > 0 ? ', ' : ''}
                    <span style={{ color: f > 0 ? 'greenyellow' : 'red' }}>
                      {f}
                    </span>
                  </span>
                ))}
              ]
            </p>
          </div>
        </div>

        <MovieRow
          title='Similar Movies'
          movies={similarMovies}
          onReachEnd={() => {
            setSimilarEnd(similarMovies.length) //in case reach event is triggered many times
          }}
        />
        <MovieRow
          title='Dissimilar Movies'
          movies={dissimilarMovies}
          onReachEnd={() => {
            setDissimilarEnd(dissimilarMovies.length)
          }}
        />
      </div>
    )
  } else {
    return (
      <ReactLoading
        type='bubbles'
        height='100vh'
        width='30%'
        className='loading'
      />
    )
  }
}

export default Movie
