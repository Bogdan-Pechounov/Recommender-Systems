import api from 'api'
import Button from 'components/button/Button'
import React from 'react'
import { Link } from 'react-router-dom'

import './movie-card.scss'

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.movieId}`}>
      <div
        className='movie-card'
        style={{ backgroundImage: `url(${api.w500Image(movie.poster_path)})` }}
      >
        <Button>
          <i className='bx bx-play'></i>
        </Button>
      </div>
      <h3>{movie.title}</h3>
    </Link>
  )
}

export default MovieCard
