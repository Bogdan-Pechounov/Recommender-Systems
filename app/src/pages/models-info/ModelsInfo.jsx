import recommender from 'api/recommender'
import DropdownMenu from 'components/dropdown-menu/DropdownMenu'
import PageHeader from 'components/page-header/PageHeader'
import React, { useEffect, useState } from 'react'
import FeaturesInfo from './FeaturesInfo'
import GenresInfo from './GenresInfo'

import './models-info.scss'

function ModelsInfo() {
  const [genresInfo, setGenresInfo] = useState({})
  const [featuresInfo, setFeaturesInfo] = useState()
  const [model, setModel] = useState(1)

  useEffect(() => {
    recommender.genresInfo(model).then(setGenresInfo)
    recommender.featuresInfo(model).then(setFeaturesInfo)
  }, [model])

  return (
    <>
      <PageHeader />
      <div style={{ padding: '0 2rem' }}>
        <div style={{ display: 'flex' }}>
          <p>
            The following values are computed by going through all the movies of
            a specific genre, and then summing over the latent features of these
            movies. This gives a measure of how much a feature correlates with
            the presence of a genre.
          </p>
          <div style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            <DropdownMenu
              selected={model}
              setSelected={setModel}
              items={[0, 1, 2]}
              title='Select model'
              displayNames={{ 0: 'K=5', 1: 'K=10', 2: 'K=20' }}
            />
          </div>
        </div>
        <br />

        <FeaturesInfo featuresInfo={featuresInfo} genresInfo={genresInfo} />
        <br />
        <GenresInfo genresInfo={genresInfo} />
      </div>
    </>
  )
}

export default ModelsInfo
