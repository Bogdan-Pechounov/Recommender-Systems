import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from 'components/navbar/Navbar'

import 'App.scss'
import 'swiper/swiper.min.css'

import Home from 'pages/Home'
import Footer from 'components/footer/Footer'
import Movie from 'pages/movie/Movie'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<Movie />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
