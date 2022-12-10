import api from 'api/api'
import MovieGrid from 'components/movie-grid/MovieGrid'
import PageHeader from 'components/page-header/PageHeader'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Catalog() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const { sort } = useParams()
  useEffect(() => {
    api
      .getMovies(20, page, sort)
      .then((newMovies) => setMovies([...movies, ...newMovies]))
  }, [page])

  return (
    <>
      <PageHeader title={sort ? sort : 'Movies'} />
      <div className='section mb-3'>
        <MovieGrid movies={movies} loadMore={() => setPage(page + 1)} />
      </div>
    </>
  )
}

export default Catalog
