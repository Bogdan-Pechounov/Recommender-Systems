import React from 'react'
import { Link } from 'react-router-dom'

import './genres.scss'

function Genres({ movie }) {
  return (
    <div className='genres'>
      {movie.genres.map((genre, i) => (
        <Link key={i} to={`/genres/${genre.toLowerCase()}`} className='genre'>
          {genre}
        </Link>
      ))}
    </div>
  )
}

export default Genres
