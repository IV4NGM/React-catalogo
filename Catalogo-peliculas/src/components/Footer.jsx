import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <nav className='navbar bottom bg-body-tertiary footer' data-bs-theme='dark'>
      <div className='container-fluid footer-body'>
        <p className='bold-text'>Eagle Blade 2023</p>
        {/* <div className='attribution'>
          <img src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg' alt='TMDB logo' />
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div> */}
        <p>Designed by Iván G M</p>
        <div className='mail-footer'>
          <span className='material-symbols-outlined mail-icon-footer'>
            mail
          </span>
          <Link to='mailto:ivangm_01@hotmail.com'>
            ivangm_01@hotmail.com
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Footer
