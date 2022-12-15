import api from 'api/api'
import Button from 'components/button/Button'
import React from 'react'
import { Link } from 'react-router-dom'

import './movie-card.scss'

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie._id}`}>
      {movie.poster_path ? (
        <div
          className='movie-card'
          style={{
            backgroundImage: `url(${api.w500Image(movie.poster_path)})`,
          }}
        >
          <Button>
            <i className='bx bx-play'></i>
          </Button>
        </div>
      ) : (
        <div
          className='movie-card'
          style={{
            outline: 'white 5px solid',
            outlineOffset: '-5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i
            className='bx bx-image-alt'
            style={{
              position: 'absolute',
              paddingBottom: '160%',
              fontSize: '100px',
            }}
          ></i>
        </div>
      )}
      <div className='movie-card-info'>
        <h3>{movie.title}</h3>
        {movie.similarity && (
          <p>
            <i>Similarity:</i> {movie.similarity.toFixed(4)}
          </p>
        )}
      </div>
    </Link>
  )
}

export default MovieCard
