import api from 'api/api'
import recommender from 'api/recommender'
import { OutlineButton } from 'components/button/Button'
import Collapse from 'components/collapse/Collapse'
import DropdownMenu from 'components/dropdown-menu/DropdownMenu'
import Genres from 'components/genres/Genres'
import PageHeader from 'components/page-header/PageHeader'
import Pagination from 'components/pagination/Pagination'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import './features.scss'
import FeaturesChart from './FeaturesChart'

const pageSize = 20
function range(length) {
  return Array.from({ length }, (_, i) => i)
}
const numFeatures = [5, 10, 20]

//sort movies by their latent features in the matrix factorization model
function Features() {
  const [feature, setFeature] = useState(0)
  const [model, setModel] = useState(1)

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [numMovies, setNumMovies] = useState(1)
  const [featuresInfo, setFeaturesInfo] = useState()

  const [showChart, setShowChart] = useState(false)

  useEffect(() => {
    recommender.info().then(({ numMovies }) => setNumMovies(numMovies))
    recommender.sortByFeature(feature, page, pageSize).then(setMovies)
    recommender.featuresInfo().then(setFeaturesInfo)
  }, [model, feature, page])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <>
      <PageHeader />

      <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        <DropdownMenu
          selected={model}
          setSelected={setModel}
          items={[0, 1, 2]}
          title={`Model ${model}`}
          displayNames={{ 0: 'K=5', 1: 'K=10', 2: 'K=20' }}
        />
        <DropdownMenu
          selected={feature}
          setSelected={setFeature}
          items={range(numFeatures[model])}
          title={`Feature ${feature}`}
          displayNames={range(numFeatures[model]).map((f) => `Feature ${f}`)}
        />
        <OutlineButton
          className={'small'}
          onClick={() => setShowChart((showChart) => !showChart)}
        >
          Show Chart
        </OutlineButton>
      </div>
      <Collapse show={showChart}>
        <div style={{ width: '50%', height: '50%' }}>
          {featuresInfo && <FeaturesChart features={featuresInfo[feature]} />}
        </div>
      </Collapse>

      <div className='cards'>
        {movies.map(([_id, features]) => (
          <MovieItem key={_id} _id={_id} features={features} index={feature} />
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
