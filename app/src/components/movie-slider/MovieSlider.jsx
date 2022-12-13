import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import ReactLoading from 'react-loading'

import './movie-slider.scss'
import Button, { OutlineButton } from 'components/button/Button'
import api from 'api/api'
import { ModalContext } from 'components/modal/ModalContext'

function MovieSlider() {
  const [movies, setMovies] = useState()

  useEffect(() => {
    api.getMovies(3, 1).then((movies) => setMovies(movies))
  }, [])

  if (movies) {
    return (
      <div className='slider'>
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3800 }}
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <MovieSliderItem movie={movie} isActive={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  } else {
    return (
      <ReactLoading
        type='bubbles'
        height='100vh'
        width='30%'
        className='loading'
      />
    )
  }
}

function MovieSliderItem({ movie, isActive }) {
  const navigate = useNavigate()
  let { toggle, setContent } = React.useContext(ModalContext)

  //trailer modal
  function handleClick() {
    toggle()
    if (movie.trailers) {
      const trailer = movie.trailers[0]
      setContent(
        <>
          <p>{trailer.name}</p>
          <iframe
            width='100%'
            height='500px'
            title='trailer'
            src={`https://www.youtube.com/embed/${trailer.key}`}
          ></iframe>
        </>
      )
    }
  }

  return (
    <div
      className={`item ${isActive ? 'active' : ''}`}
      style={{
        backgroundImage: `url(${api.originalImage(movie.backdrop_path)})`,
      }}
    >
      <div className='content'>
        <div className='info'>
          <div className='title'>{movie.title}</div>
          <div className='overview'>{movie.overview}</div>
          <div className='btns'>
            <Button onClick={() => navigate('/movie/' + movie._id)}>
              Watch now
            </Button>
            <OutlineButton onClick={handleClick}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className='poster'>
          <img src={api.w500Image(movie.poster_path)} alt={movie.title} />
        </div>
      </div>
    </div>
  )
}
export default MovieSlider
