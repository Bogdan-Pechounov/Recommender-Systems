import api from 'api/api'
import recommender from 'api/recommender'
import MovieRow from 'components/movie-row/MovieRow'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'

import './movie.scss'
import Button, { OutlineButton } from 'components/button/Button'
import { ModalContext } from 'components/modal/ModalContext'
import Genres from 'components/genres/Genres'
import DropdownMenu from 'components/dropdown-menu/DropdownMenu'

//TODO average rating, rating graph, similarity graph (0.9-0.8, 0.8-0.7, ...)
//TODO latent features, bias (and how it correlates with avg rating)

const numRowItems = 10

function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState()

  const [features, setFeatures] = useState([])
  const [bias, setBias] = useState()

  const [movieIds, setMovieIds] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [dissimilarMovies, setDissimilarMovies] = useState([])

  const [model, setModel] = useState(1)

  useEffect(() => {
    api.getMovie(id).then(setMovie)
    recommender.similarMovies(id, model).then(setMovieIds)
    recommender.latentFeatures(id, model).then(setFeatures)
    recommender.bias(id, model).then(setBias)
  }, [id, model])

  //Find movie details one by one
  useEffect(() => {
    initSimilarMovies()
    initDissimilarMovies()
  }, [movieIds])

  //#region Helper methods to append and set movies
  async function getSimilarMovies(start) {
    const newMovieIds = movieIds.slice(start, start + numRowItems)
    const movies = await api.populate(newMovieIds)
    return movies
  }

  async function getDissimilarMovies(start) {
    const newMovieIds = movieIds
      .slice(movieIds.length - start - numRowItems, movieIds.length - start)
      .reverse()
    const movies = await api.populate(newMovieIds)
    return movies
  }

  async function initSimilarMovies() {
    setSimilarMovies(await getSimilarMovies(0))
  }

  async function initDissimilarMovies() {
    setDissimilarMovies(await getDissimilarMovies(0))
  }

  async function appendSimilarMovies() {
    setSimilarMovies([
      ...similarMovies,
      ...(await getSimilarMovies(similarMovies.length)),
    ])
  }

  async function appendDissimilarMovies() {
    setDissimilarMovies([
      ...dissimilarMovies,
      ...(await getDissimilarMovies(dissimilarMovies.length)),
    ])
  }
  //#endregion

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
            <Genres movie={movie} />
            <p>{movie.release_date}</p>
            <p>
              <span style={{ fontWeight: 'bolder' }}>
                {movie.rating_avg.toFixed(3)}
              </span>
              /5 ({movie.rating_count})
            </p>
            <p>{movie.overview}</p>
            <Trailer movie={movie} />
          </div>
        </div>

        <div
          className='section'
          style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}
        >
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
          <div style={{ marginLeft: 'auto' }}>
            <DropdownMenu
              selected={model}
              setSelected={setModel}
              items={[0, 1, 2]}
              title='Select model'
              displayNames={{ 0: 'K=5', 1: 'K=10', 2: 'K=20' }}
            />
          </div>
        </div>

        <MovieRow
          title='Similar Movies'
          movies={similarMovies}
          onReachEnd={() => {
            //load more movies dynamically
            appendSimilarMovies()
          }}
          resetDependencies={[id, model]}
        />
        <MovieRow
          title='Dissimilar Movies'
          movies={dissimilarMovies}
          onReachEnd={() => {
            appendDissimilarMovies()
          }}
          resetDependencies={[id, model]}
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

function Trailer({ movie }) {
  let { toggle, setContent } = React.useContext(ModalContext)

  //trailer modal
  function handleClick() {
    toggle()
    if (movie.trailers) {
      setContent(
        <div style={{ overflowY: 'auto', height: '600px' }}>
          {movie.trailers.map((trailer) => (
            <div key={trailer.key}>
              <h1>{trailer.name}</h1>
              <iframe
                width='100%'
                height='500px'
                title='trailer'
                src={`https://www.youtube.com/embed/${trailer.key}`}
                style={{ marginBottom: '10px' }}
              ></iframe>
            </div>
          ))}
        </div>
      )
    }
  }
  return (
    movie.trailers?.length > 0 && (
      <Button onClick={handleClick}>Watch trailer</Button>
    )
  )
}

export default Movie
