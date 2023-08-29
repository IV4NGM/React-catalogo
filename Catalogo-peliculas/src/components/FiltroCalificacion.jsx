import { useState } from 'react'

const FiltroCalificacion = ({ funcionModificadora, listaAModificar }) => {
  const [calificacion, setCalificacion] = useState(0)
  return (
    <div>
      <h4>Filtro de calificación</h4>
      <input
        type='range' className='form-range' min='0' max='10' value={calificacion} onChange={(event) => {
          setCalificacion(event.target.value)
          funcionModificadora(listaAModificar, event.target.value)
        }}
      />
      <p>{calificacion}</p>
    </div>
  )
}

export default FiltroCalificacion
