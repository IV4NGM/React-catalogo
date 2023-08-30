import { useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const FiltroCalificacion = ({ funcionModificadora, listaAModificar, eliminarBusqueda, eliminar }) => {
  const [calificacion, setCalificacion] = useState(0)
  return (
    <div className='buscador-container card filtro-container'>
      <h4>Filtrar por calificación mínima</h4>
      <div className='row-container row-filtro'>
        <input
          type='range' className='form-range' min='0' max='10' value={calificacion} onChange={(event) => {
            setCalificacion(event.target.value)
            funcionModificadora(listaAModificar, event.target.value)
          }}
        />
        <p className='range-number'>{calificacion}</p>
      </div>
      {eliminar ? <button onClick={eliminarBusqueda} className='btn btn-danger form-control btn-limpiar'>Limpiar resultados de búsqueda</button> : ''}
    </div>
  )
}

FiltroCalificacion.propTypes = {
  funcionModificadora: PropTypes.func.isRequired,
  listaAModificar: PropTypes.number.isRequired,
  eliminarBusqueda: PropTypes.func,
  eliminar: PropTypes.bool
}

export default FiltroCalificacion
