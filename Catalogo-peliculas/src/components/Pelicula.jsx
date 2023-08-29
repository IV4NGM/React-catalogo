import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Pelicula = ({ titulo, imagen, fecha, genero, director, resumen, calificacion, id, modificarLista, agregar }) => {
  return (
    <div>
      <h4>{titulo}</h4>
      <img src={imagen} alt={`Poster ${titulo}`} width={200} />
      <p>Fecha de lanzamiento: {fecha}</p>
      {/* <p>Género: {genero}</p>
      <p>Director: {director}</p>
      <p>Resumen: {resumen}</p> */}
      <p>Calificación: {calificacion}</p>
      <button onClick={() => modificarLista(id)}>{agregar ? 'Agregar a la lista' : 'Eliminar de la lista'}</button>
      <Link to={`/movie/${id}`}>Más información</Link>
    </div>
  )
}

Pelicula.propTypes = {
  titulo: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  genero: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  resumen: PropTypes.string.isRequired,
  calificacion: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  modificarLista: PropTypes.func.isRequired,
  agregar: PropTypes.bool.isRequired
}

export default Pelicula
