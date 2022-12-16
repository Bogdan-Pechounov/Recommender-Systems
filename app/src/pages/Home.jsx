import api from 'api/api'
import MovieRow from 'components/movie-row/MovieRow'
import MovieSlider from 'components/movie-slider/MovieSlider'
import React, { useEffect, useState } from 'react'

function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [bestMovies, setBestMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [recentMovies, setRecentMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])

  useEffect(() => {
    api.getMovies(20, 1, 'popular').then((movies) => setPopularMovies(movies))
    api.getMovies(20, 1, 'best').then((movies) => setBestMovies(movies))
    api.getMovies(20, 1, 'top').then((movies) => setTopMovies(movies))
    api.getMovies(20, 1, 'recent').then((movies) => setRecentMovies(movies))
    api.getMovies(20, 1, 'trending').then((movies) => setTrendingMovies(movies))
  }, [])
  return (
    <>
      <MovieSlider />
      <MovieRow
        title='Trending'
        movies={trendingMovies}
        to='/movies?sort=trending'
      />
      <MovieRow
        title='Popular'
        movies={popularMovies}
        to='/movies?sort=popular'
      />
      <MovieRow title='Best' movies={bestMovies} to='/movies?sort=best' />
      <MovieRow title='Top Rated' movies={topMovies} to='/movies?sort=top' />
      <MovieRow title='Recent' movies={recentMovies} to='/movies?sort=recent' />
    </>
  )
}

export default Home
