import api from 'api'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import './movie.scss'
//TODO average rating, rating graph
function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    api.getMovie(id).then((movie) => setMovie(movie))
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
                >
                  {genre}
                </Link>
              ))}
            </div>
            <p className='overview'>{movie.overview}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
