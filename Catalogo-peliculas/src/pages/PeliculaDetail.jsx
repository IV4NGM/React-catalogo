import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const PeliculaDetail = () => {
  const { id } = useParams()
  const [peliculaDetails, setPeliculaDetails] = useState({})
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=b4ff907e`)
      .then(response => response.json())
      .then(peliculaDetails => setPeliculaDetails(peliculaDetails))
      .catch(error => console.log('Ocurrió un error', error))
  }, [id])
  return (
    <div>
      <h2 className='head-title head-color'>{peliculaDetails?.Title}</h2>
      <img src={peliculaDetails?.Poster} alt={`Poster ${peliculaDetails?.Title}`} width={300} />
      <div className='movie-details'>
        <p><strong>Fecha de lanzamiento:</strong> {peliculaDetails?.Released}</p>
        <p><strong>Géneros:</strong> {peliculaDetails?.Genre}</p>
        <p><strong>Director:</strong> {peliculaDetails?.Director}</p>
        <p><strong>Resumen:</strong> {peliculaDetails?.Plot}</p>
        <div className='movie-row-container'>
          <p><strong>Calificación:</strong> {peliculaDetails?.imdbRating}</p>
          <img className='star-image' />
        </div>
      </div>
      <Link to='/'>Volver a la búsqueda</Link>
    </div>
  )
}

export default PeliculaDetail
