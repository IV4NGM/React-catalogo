import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import RouterIndex from './routes/RouterIndex'
import Footer from './components/Footer'

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RouterIndex />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
