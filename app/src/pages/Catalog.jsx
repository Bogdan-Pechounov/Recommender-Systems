import api from 'api/api'
import recommender from 'api/recommender'
import DropdownMenu from 'components/dropdown-menu/DropdownMenu'
import GenresSelector from 'components/genres-selector/GenresSelector'
import MovieGrid from 'components/movie-grid/MovieGrid'
import PageHeader from 'components/page-header/PageHeader'
import Search from 'components/search/Search'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Catalog() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState({})

  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState(searchParams.get('sort') || '')
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get('genres')?.split('|') || []
  )

  const [title, setTitle] = useState('')
  const [page, setPage] = useState(1)

  //update search params
  useEffect(() => {
    let params = {}
    if (sort) {
      params.sort = sort
    }
    if (selectedGenres.length > 0) {
      params.genres = selectedGenres.join('|')
    }
    setSearchParams(params)
  }, [sort, selectedGenres])

  //get all genres and their count
  useEffect(() => {
    recommender.genresInfo().then(setGenres)
  }, [])

  //reset page
  useEffect(() => {
    setPage(1)
    api.getMovies(20, 1, sort, title, selectedGenres).then(setMovies)
  }, [title, sort, selectedGenres])

  //load more
  useEffect(() => {
    if (page > 1) {
      api.getMovies(20, page, sort, title, selectedGenres).then((newMovies) => {
        setMovies([...movies, ...newMovies])
      })
    }
  }, [page])

  return (
    <>
      <PageHeader title={sort || 'Movies'} />
      <div className='section mb-3'>
        <GenresSelector
          genres={genres}
          selected={selectedGenres}
          setSelected={setSelectedGenres}
        />
      </div>
      <div className='section mb-3'>
        <div className='mb-column mb-3'>
          <Search title={title} setTitle={setTitle} />
          <DropdownMenu
            selected={sort}
            setSelected={setSort}
            items={['Trending', 'Popular', 'Best', 'Top Rated', 'Recent']}
          />
        </div>
        <MovieGrid movies={movies} loadMore={() => setPage(page + 1)} />
      </div>
    </>
  )
}

export default Catalog
