import { useState } from 'react'
import Pelicula from '../components/Pelicula'

const Home = () => {
  const [peliculaBuscar, setPeliculaBuscar] = useState('')
  const [peliculaBuscada, setPeliculaBuscada] = useState([])
  const [historialPeliculas, setHistorialPeliculas] = useState([])
  const inputKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Buscando la película', peliculaBuscar)
      buscarPeliculaTitulo(peliculaBuscar)
    }
  }
  const buscarPeliculaTitulo = (titulo) => {
    fetch(`http://www.omdbapi.com/?s=${titulo}&apikey=3bd70374`)
      .then(result => result.json())
      .then(peliculas => {
        console.log(peliculas)
        setPeliculaBuscada(peliculas.Search)
        setHistorialPeliculas(historialPeliculas.concat(peliculas.Search))
      })
      .catch(error => console.log('Ocurrió un error', error))
  }
  return (
    <>
      <h1>Catálogo de películas</h1>
      <input
        type='text'
        value={peliculaBuscar}
        onChange={(event) => {
          setPeliculaBuscar(event.target.value)
          console.log(peliculaBuscar)
        }}
        onKeyDown={inputKeyDown}
      />
      <h2>Tu búsqueda actual</h2>
      {peliculaBuscada.map((pelicula, index) => {
        return <Pelicula key={index} titulo={pelicula.Title}/>
      })}
      <h2>Películas buscadas anteriormente</h2>
      {historialPeliculas.map((pelicula, index) => {
        return <Pelicula key={index} titulo={pelicula.Title}/>
      })}
    </>
  )
}

export default Home
