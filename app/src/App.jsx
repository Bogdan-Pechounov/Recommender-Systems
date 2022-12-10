import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from 'components/navbar/Navbar'

import 'App.scss'
import 'swiper/swiper.min.css'

import Home from 'pages/Home'
import Footer from 'components/footer/Footer'
import Movie from 'pages/movie/Movie'
import Catalog from 'pages/Catalog'
import { useLayoutEffect } from 'react'

const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/movies/' element={<Catalog />} />
          <Route path='/movies/:sort' element={<Catalog />} />
        </Routes>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  )
}

export default App
