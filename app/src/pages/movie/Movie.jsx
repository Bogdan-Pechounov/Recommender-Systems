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

const numRowItems = 20

function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState()
  const [features, setFeatures] = useState([])
  const [bias, setBias] = useState()
  const [similarMovies, setSimilarMovies] = useState([])
  const [dissimilarMovies, setDissimilarMovies] = useState([])

  useEffect(() => {
    api.getMovie(id).then((movie) => setMovie(movie))
    recommender.similarMovies(id).then((movieIds) => {
      api
        .populate(movieIds.slice(0, numRowItems))
        .then((movies) => setSimilarMovies(movies))
      api
        .populate(
          movieIds
            .slice(movieIds.length - numRowItems, movieIds.length)
            .reverse()
        )
        .then((movies) => setDissimilarMovies(movies))
    })
    recommender.latentFeatures(id).then((features) => setFeatures(features))
    recommender.bias(id).then((bias) => setBias(bias))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (movie) {
    return (
      <div className='movie'>
        <div
          className='banner'
          style={{
            backgroundImage: `url(${api.originalImage(movie.backdrop_path)})`,
          }}
        ></div>
        <div className='mb-3 content'>
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

        <MovieRow title='Similar Movies' movies={similarMovies} />
        <MovieRow title='Dissimilar Movies' movies={dissimilarMovies} />
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
