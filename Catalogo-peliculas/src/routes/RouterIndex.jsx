import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default RouterIndex
