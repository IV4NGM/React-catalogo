import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import PeliculaDetail from '../pages/PeliculaDetail'

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movie/:id' element={<PeliculaDetail />} />
    </Routes>
  )
}

export default RouterIndex
