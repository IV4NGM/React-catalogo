import { Link } from 'react-router-dom'

const Pelicula = ({ titulo, imagen, fecha, genero, director, resumen, calificacion, id, modificarLista, agregar }) => {
  return (
    <div>
      <h3>{titulo}</h3>
      <img src={imagen} alt={`Poster ${titulo}`} width={200}/>
      <p>Fecha de lanzamiento: {fecha}</p>
      <p>Género: {genero}</p>
      <p>Director: {director}</p>
      <p>Resumen: {resumen}</p>
      <p>Calificación: {calificacion}</p>
      <button onClick={() => modificarLista(id)}>{agregar ? 'Agregar a la lista' : 'Eliminar de la lista'}</button>
      <Link to={`/movie/${id}`}>Más información</Link>
    </div>
  )
}

export default Pelicula
