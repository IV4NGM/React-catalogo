import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Pelicula = ({ titulo, imagen, fecha, genero, director, resumen, calificacion, id, modificarLista, agregar }) => {
  return (
    <div className='card movie-card'>
      <div className='card-body card-body-movie'>
        <h5 className='card-title'>{titulo}</h5>
        <img src={imagen} className='card-img-top card-img-movie' alt='Poster' />
        <div className='movie-row-container'>
          <p className='card-text bold-text'>Calificación:</p>
          <p className='card-text'>{calificacion}</p>
          <img className='star-image' />
        </div>
        <div className='movie-row-container'>
          <p className='card-text bold-text'>Estreno:</p>
          <p className='card-text'>{fecha}</p>
        </div>
        <button className={`btn btn-${agregar ? 'success' : 'danger'} btn-movie`} onClick={() => modificarLista(id)}>{agregar ? 'Agregar a la lista' : 'Eliminar de la lista'}</button>
        <Link to={`/movie/${id}`} className='space-up'>Más información</Link>
      </div>
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
  calificacion: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modificarLista: PropTypes.func.isRequired,
  agregar: PropTypes.bool.isRequired
}

export default Pelicula
