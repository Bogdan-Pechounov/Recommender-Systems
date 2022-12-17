import api from 'api/api'
import recommender from 'api/recommender'
import Genres from 'components/genres/Genres'
import PageHeader from 'components/page-header/PageHeader'
import Pagination from 'components/pagination/Pagination'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import './features.scss'
import FeaturesChart from './FeaturesChart'

const pageSize = 20
//sort movies by their latent features in the matrix factorization model
function Features() {
  const { index } = useParams()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [numMovies, setNumMovies] = useState(1)
  const [featuresInfo, setFeaturesInfo] = useState()

  useEffect(() => {
    recommender.info().then(({ numMovies }) => setNumMovies(numMovies))
    recommender.sortByFeature(index, page, pageSize).then(setMovies)
    recommender.featuresInfo().then(setFeaturesInfo)
  }, [index, page])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <>
      <PageHeader />
      {featuresInfo && <FeaturesChart features={featuresInfo[index]} />}
      <div className='cards'>
        {movies.map(([_id, features]) => (
          <MovieItem
            key={_id}
            _id={_id}
            features={features}
            index={parseInt(index)}
          />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        numItems={numMovies}
      />
    </>
  )
}

function MovieItem({ _id, features, index }) {
  const [movie, setMovie] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    api.getMovie(_id).then(setMovie)
  }, [_id])
  if (movie) {
    return (
      <div onClick={() => navigate(`/movie/${_id}`)} className='card'>
        <div className='poster'>
          <img src={api.originalImage(movie.poster_path)} alt=''></img>
        </div>
        <div className='content'>
          <h3>{movie.title}</h3>
          <Genres movie={movie} />
          <p>
            Latent features: [
            {features
              .map((f) => f.toFixed(3))
              .map((f, i) => (
                <span key={i}>
                  {i > 0 ? ', ' : ''}
                  <span
                    className={`${i === index ? 'selected' : 'not-selected'}`}
                    style={{
                      color: f > 0 ? 'greenyellow' : 'red',
                    }}
                  >
                    {f}
                  </span>
                </span>
              ))}
            ]
          </p>
        </div>
      </div>
    )
  }
}

export default Features
