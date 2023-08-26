import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import RouterIndex from './routes/RouterIndex'

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RouterIndex />
      </BrowserRouter>
    </>
  )
}

export default App
