import { OutlineButton } from 'components/button/Button'
import Input from 'components/input/Input'
import MovieCard from 'components/movie-card/MovieCard'
import React, { useState } from 'react'

import './movie-grid.scss'

function MovieGrid({ movies, loadMore }) {
  return (
    <>
      <div className='movie-grid'>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className='load-more'>
        <OutlineButton className='small' onClick={loadMore}>
          Load more
        </OutlineButton>
      </div>
    </>
  )
}

export default MovieGrid
