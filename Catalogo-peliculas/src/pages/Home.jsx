import { useEffect, useState } from 'react'
import Pelicula from '../components/Pelicula'
import FiltroCalificacion from '../components/FiltroCalificacion'
import Carousel from '../components/Carousel'

const Home = () => {
  const [peliculaBuscar, setPeliculaBuscar] = useState('')
  const [peliculaBuscadaId, setPeliculaBuscadaId] = useState([])
  const [historialPeliculas, setHistorialPeliculas] = useState([])
  const [calificacionBusqueda, setCalificacionBusqueda] = useState(0)
  const [calificacionLista, setCalificacionLista] = useState(0)
  const [textoBusqueda, setTextoBusqueda] = useState('')
  useEffect(() => {
    if (localStorage.getItem('peliculasBuscadas')) {
      setPeliculaBuscadaId(JSON.parse(localStorage.getItem('peliculasBuscadas')))
    }
    if (localStorage.getItem('peliculasLista')) {
      setHistorialPeliculas(JSON.parse(localStorage.getItem('peliculasLista')))
    }
  }, [])

  const inputKeyDown = (event) => {
    if (event.key === 'Enter') {
      setPeliculaBuscar(peliculaBuscar)
      buscarPeliculaTitulo(peliculaBuscar)
    }
  }
  const buscarPeliculaTitulo = (titulo) => {
    fetch(`http://www.omdbapi.com/?s=${titulo.toLowerCase()}&apikey=3bd70374`)
      .then(result => result.json())
      .then(peliculas => {
        return Promise.all(peliculas.Search.map((peliculaActual, index) => {
          return buscarPeliculaId(peliculaActual.imdbID, index)
        }))
      })
      .then((peliculaBuscadaId) => {
        setPeliculaBuscadaId(peliculaBuscadaId)
        localStorage.setItem('peliculasBuscadas', JSON.stringify(peliculaBuscadaId))
        setTextoBusqueda('')
      })
      .catch(() => {
        setTextoBusqueda('Ups, parece que no hay nada por aquí. Intenta nuevamente con otros parámetros...')
        setPeliculaBuscadaId([])
        setPeliculaBuscar('')
        localStorage.setItem('peliculasBuscadas', JSON.stringify([]))
      })
  }
  const buscarPeliculaId = async (id, index) => {
    const result = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=b4ff907e`)
    const pelicula = await result.json()
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
      localStorage.setItem('peliculasLista', JSON.stringify(historialPeliculas.concat(peliculaBuscadaId.filter((pelicula) => pelicula.imdbID === id))))
    }
  }
  const eliminarLista = (id) => {
    setHistorialPeliculas(historialPeliculas.filter((pelicula) => pelicula.imdbID !== id))
    localStorage.setItem('peliculasLista', JSON.stringify(historialPeliculas.filter((pelicula) => pelicula.imdbID !== id)))
  }
  const eliminarBusqueda = () => {
    setPeliculaBuscadaId([])
    setPeliculaBuscar('')
    localStorage.setItem('peliculasBuscadas', JSON.stringify([]))
    setTextoBusqueda('')
  }
  const peliculaBuscadaArray = peliculaBuscadaId.filter((pelicula) => pelicula.imdbRating - calificacionBusqueda >= 0)
  const historialPeliculasArray = historialPeliculas.filter((pelicula) => pelicula.imdbRating - calificacionLista >= 0)
  const filtrarPeliculas = (listaAModificar, calificacion) => {
    if (listaAModificar === 0) {
      setCalificacionBusqueda(calificacion)
    } else {
      setCalificacionLista(calificacion)
    }
  }
  return (
    <>
      <h1>Eagle Blade</h1>
      <h3 className='head-title'>Las películas y series más taquilleras</h3>
      <Carousel />
      <div className='buscador-container'>
        <h2 className='head-title'>Consulta nuestro catálogo</h2>
        <div className='row-container'>
          <input
            type='text'
            value={peliculaBuscar}
            onChange={(event) => {
              setPeliculaBuscar(event.target.value)
            }}
            onKeyDown={inputKeyDown}
            className='form-control consulta-input'
            placeholder='Busca el nombre de una película'
          />
        </div>

      </div>
      <h2 className='head-title head-color'>Resultados de mi búsqueda</h2>
      <FiltroCalificacion funcionModificadora={filtrarPeliculas} listaAModificar={0} eliminarBusqueda={eliminarBusqueda} eliminar />
      <p>{textoBusqueda}</p>
      <div className='movies-container-grid'>
        {peliculaBuscadaArray.map((pelicula, index) => {
          return <Pelicula key={index} titulo={pelicula.Title} imagen={pelicula.Poster} fecha={pelicula.Released} genero={pelicula.Genre} director={pelicula.Director} resumen={pelicula.Plot} calificacion={pelicula.imdbRating} id={pelicula.imdbID} modificarLista={agregarLista} agregar />
        })}
      </div>
      <h2 className='head-title head-color'>Mi Lista</h2>
      <FiltroCalificacion funcionModificadora={filtrarPeliculas} listaAModificar={1} eliminarBusqueda={eliminarBusqueda} eliminar={false} />
      <div className='movies-container-grid'>
        {historialPeliculasArray.map((pelicula, index) => {
          return <Pelicula key={index} titulo={pelicula.Title} imagen={pelicula.Poster} fecha={pelicula.Released} genero={pelicula.Genre} director={pelicula.Director} resumen={pelicula.Plot} calificacion={pelicula.imdbRating} id={pelicula.imdbID} modificarLista={eliminarLista} agregar={false} />
        })}
      </div>
    </>
  )
}

export default Home
