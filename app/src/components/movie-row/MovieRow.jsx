import { OutlineButton } from 'components/button/Button'
import MovieCard from 'components/movie-card/MovieCard'
import React from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'

import './movie-row.scss'

function MovieRow({ movies }) {
  return (
    <div className='movie-row'>
      <div className='section mb-3'>
        <div className='header mb-2'>
          <h2>Popular Movies</h2>
          <Link to='/movies'>
            <OutlineButton className='small'>View more</OutlineButton>
          </Link>
        </div>
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
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
