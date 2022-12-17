import { OutlineButton } from 'components/button/Button'
import MovieCard from 'components/movie-card/MovieCard'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Keyboard, Mousewheel } from 'swiper'

import './movie-row.scss'

function MovieRow({ title, movies, to, onReachEnd, resetDependencies = [] }) {
  const [swiper, setSwiper] = useState()

  useEffect(() => {
    //Reset on page change
    swiper?.slideTo(0)
  }, resetDependencies)

  return (
    <div className='movie-row'>
      <div className='section mb-3'>
        <div className='header mb-2'>
          <h2>{title}</h2>
          {to && (
            <Link to={to}>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          )}
        </div>
        <Swiper
          modules={[Keyboard, Mousewheel]}
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={'auto'}
          keyboard={{ enabled: true, onlyInViewport: true }}
          mousewheel={{ forceToAxis: true }}
          onSwiper={(swiper) => setSwiper(swiper)}
          onReachEnd={onReachEnd}
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={i}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MovieRow
