import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
      <h3>{peliculaDetails?.Title}</h3>
      <img src={peliculaDetails?.Poster} alt={`Poster ${peliculaDetails?.Title}`} width={200} />
      <p>Fecha de lanzamiento: {peliculaDetails?.Released}</p>
      <p>Género: {peliculaDetails?.Genre}</p>
      <p>Director: {peliculaDetails?.Director}</p>
      <p>Resumen: {peliculaDetails?.Plot}</p>
      <p>Calificación: {peliculaDetails?.imdbRating}</p>
    </div>
  )
}

export default PeliculaDetail
