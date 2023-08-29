import { useEffect, useState } from 'react'
import Pelicula from '../components/Pelicula'

const Home = () => {
  const [peliculaBuscar, setPeliculaBuscar] = useState('')
  const [peliculaBuscada, setPeliculaBuscada] = useState([])
  const [peliculaBuscadaId, setPeliculaBuscadaId] = useState([])
  const [historialPeliculas, setHistorialPeliculas] = useState([])
  useEffect(() => {

  }, [])
  const inputKeyDown = (event) => {
    if (event.key === 'Enter') {
      buscarPeliculaTitulo(peliculaBuscar)
    }
  }
  const buscarPeliculaTitulo = (titulo) => {
    fetch(`http://www.omdbapi.com/?s=${titulo}&apikey=3bd70374`)
      .then(result => result.json())
      .then(peliculas => {
        console.log(peliculas)
        setPeliculaBuscada(peliculas.Search)
        // setHistorialPeliculas(historialPeliculas.concat(peliculas.Search))
        return Promise.all(peliculas.Search.map((peliculaActual, index) => {
          return buscarPeliculaId(peliculaActual.imdbID, index)
        }))
      })
      .then((peliculaBuscadaId) => {
        setPeliculaBuscadaId(peliculaBuscadaId)
        // setHistorialPeliculas(historialPeliculas.concat(peliculaBuscadaId))
        console.log('peliculaBuscadaId', peliculaBuscadaId)
      })
      .catch(error => console.log('Ocurrió un error', error))
  }
  const buscarPeliculaId = async (id, index) => {
    const result = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=b4ff907e`)
    const pelicula = await result.json()
    // console.log(pelicula)
    return pelicula
  }
  const agregarLista = (id) => {
    let agregar = true
    for (const element of historialPeliculas) {
      if (element.imdbID === id) {
        agregar = false
        break
      }
    }
    if (agregar) {
      setHistorialPeliculas(historialPeliculas.concat(peliculaBuscadaId.filter((pelicula) => pelicula.imdbID === id)))
    }
  }
  const eliminarLista = (id) => {
    setHistorialPeliculas(historialPeliculas.filter((pelicula) => pelicula.imdbID !== id))
  }
  return (
    <>
      <h1>Catálogo de películas</h1>
      <input
        type='text'
        value={peliculaBuscar}
        onChange={(event) => {
          setPeliculaBuscar(event.target.value)
        }}
        onKeyDown={inputKeyDown}
      />
      <h2>Tu búsqueda actual</h2>
      {peliculaBuscadaId.map((pelicula, index) => {
        return <Pelicula key={index} titulo={pelicula.Title} imagen={pelicula.Poster} fecha={pelicula.Released} genero={pelicula.Genre} director={pelicula.Director} resumen={pelicula.Plot} calificacion={pelicula.imdbRating} id={pelicula.imdbID} modificarLista={agregarLista} agregar />
      })}
      <h2>Películas en Mi Lista</h2>
      {historialPeliculas.map((pelicula, index) => {
        return <Pelicula key={index} titulo={pelicula.Title} imagen={pelicula.Poster} fecha={pelicula.Released} genero={pelicula.Genre} director={pelicula.Director} resumen={pelicula.Plot} calificacion={pelicula.imdbRating} id={pelicula.imdbID} modificarLista={eliminarLista} agregar={false} />
      })}
    </>
  )
}

export default Home
