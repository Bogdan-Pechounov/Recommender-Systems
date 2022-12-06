import api from 'api'
import MovieRow from 'components/movie-row/MovieRow'
import MovieSlider from 'components/movie-slider/MovieSlider'
import React, { useEffect, useState } from 'react'

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    api.getMovies(10, 1).then((movies) => setMovies(movies))
  }, [])
  return (
    <>
      <MovieSlider />
      <MovieRow movies={movies} />
    </>
  )
}

export default Home
