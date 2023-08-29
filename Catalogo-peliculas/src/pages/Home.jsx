import { useEffect, useState } from 'react'
import Pelicula from '../components/Pelicula'
import FiltroCalificacion from '../components/FiltroCalificacion'

const Home = () => {
  const [peliculaBuscar, setPeliculaBuscar] = useState('')
  // const [peliculaBuscada, setPeliculaBuscada] = useState([])
  const [peliculaBuscadaId, setPeliculaBuscadaId] = useState([])
  const [historialPeliculas, setHistorialPeliculas] = useState([])
  const [calificacionBusqueda, setCalificacionBusqueda] = useState(0)
  const [calificacionLista, setCalificacionLista] = useState(0)
  // useEffect(() => {
  //   // fetch(`http://www.omdbapi.com/?s=${peliculaBuscar}&apikey=3bd70374`)
  //   fetch(`http://www.omdbapi.com/?s=superman&apikey=3bd70374`)
  //     .then(result => result.json())
  //     .then(peliculas => {
  //       console.log(peliculas)
  //       setPeliculaBuscada(peliculas.Search)
  //       // setHistorialPeliculas(historialPeliculas.concat(peliculas.Search))
  //       return Promise.all(peliculas.Search.map((peliculaActual, index) => {
  //         return buscarPeliculaId(peliculaActual.imdbID, index)
  //       }))
  //     })
  //     .then((peliculaBuscadaId) => {
  //       setPeliculaBuscadaId(peliculaBuscadaId)
  //       // setHistorialPeliculas(historialPeliculas.concat(peliculaBuscadaId))
  //       console.log('peliculaBuscadaId', peliculaBuscadaId)
  //     })
  //     .catch(error => console.log('Ocurrió un error', error))
  // }, [peliculaBuscar])
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
    fetch(`http://www.omdbapi.com/?s=${titulo}&apikey=3bd70374`)
      .then(result => result.json())
      .then(peliculas => {
        console.log(peliculas)
        // setPeliculaBuscada(peliculas.Search)
        // setHistorialPeliculas(historialPeliculas.concat(peliculas.Search))
        return Promise.all(peliculas.Search.map((peliculaActual, index) => {
          return buscarPeliculaId(peliculaActual.imdbID, index)
        }))
      })
      .then((peliculaBuscadaId) => {
        setPeliculaBuscadaId(peliculaBuscadaId)
        // setHistorialPeliculas(historialPeliculas.concat(peliculaBuscadaId))
        console.log('peliculaBuscadaId', peliculaBuscadaId)
        localStorage.setItem('peliculasBuscadas', JSON.stringify(peliculaBuscadaId))
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
      // const historial = [...historialPeliculas]
      // localStorage.setItem('peliculasLista', JSON.stringify(historial))
      localStorage.setItem('peliculasLista', JSON.stringify(historialPeliculas.concat(peliculaBuscadaId.filter((pelicula) => pelicula.imdbID === id))))
    }
  }
  const eliminarLista = (id) => {
    setHistorialPeliculas(historialPeliculas.filter((pelicula) => pelicula.imdbID !== id))
    // const historial = [...historialPeliculas]
    // localStorage.setItem('peliculasLista', JSON.stringify(historial))
    localStorage.setItem('peliculasLista', JSON.stringify(historialPeliculas.filter((pelicula) => pelicula.imdbID !== id)))
  }
  const eliminarBusqueda = () => {
    setPeliculaBuscadaId([])
    setPeliculaBuscar('')
    localStorage.setItem('peliculasBuscadas', JSON.stringify([]))
  }
  const peliculaBuscadaArray = peliculaBuscadaId.filter((pelicula) => pelicula.imdbRating - calificacionBusqueda >= 0)
  const historialPeliculasArray = historialPeliculas.filter((pelicula) => pelicula.imdbRating - calificacionLista >= 0)
  // const filtrarPeliculas = (numLista, calificacion) => {
  //   if (numLista === 0) {
  //     peliculaBuscadaArray = peliculaBuscadaId.filter((pelicula) => pelicula.imdbRating >= calificacion)
  //   } else {
  //     historialPeliculasArray = historialPeliculas.filter((pelicula) => pelicula.imdbRating >= calificacion)
  //   }
  //   console.log('Filtrando')
  // }
  const filtrarPeliculas = (listaAModificar, calificacion) => {
    if (listaAModificar === 0) {
      setCalificacionBusqueda(calificacion)
    } else {
      setCalificacionLista(calificacion)
    }
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
      <button onClick={eliminarBusqueda}>Limpiar resultados de búsqueda</button>
      <FiltroCalificacion funcionModificadora={filtrarPeliculas} listaAModificar={0} />
      {peliculaBuscadaArray.map((pelicula, index) => {
        return <Pelicula key={index} titulo={pelicula.Title} imagen={pelicula.Poster} fecha={pelicula.Released} genero={pelicula.Genre} director={pelicula.Director} resumen={pelicula.Plot} calificacion={pelicula.imdbRating} id={pelicula.imdbID} modificarLista={agregarLista} agregar />
      })}
      <h2>Películas en Mi Lista</h2>
      <FiltroCalificacion funcionModificadora={filtrarPeliculas} listaAModificar={1} />
      {historialPeliculasArray.map((pelicula, index) => {
        return <Pelicula key={index} titulo={pelicula.Title} imagen={pelicula.Poster} fecha={pelicula.Released} genero={pelicula.Genre} director={pelicula.Director} resumen={pelicula.Plot} calificacion={pelicula.imdbRating} id={pelicula.imdbID} modificarLista={eliminarLista} agregar={false} />
      })}
    </>
  )
}

export default Home
