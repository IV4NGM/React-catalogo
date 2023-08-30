const Carousel = () => {
  return (
    <div id='carouselExampleAutoplaying' className='carousel slide' data-bs-ride='carousel'>
      <div className='carousel-inner'>
        <div className='carousel-item active'>
          <img src='https://cdn.wallpapersafari.com/63/91/EGjUcK.jpg' className='d-block w-100' alt='Trending movies' />
        </div>
        <div className='carousel-item'>
          <img src='https://guardian.ng/wp-content/uploads/2018/12/Venom-Photo-Venom.jpg' className='d-block w-100' alt='Trending movies' />
        </div>
        <div className='carousel-item'>
          <img src='https://www.hdwallpapers.in/download/terminator_dark_fate_movie_poster_4k_8k_hd-HD.jpg' className='d-block w-100' alt='Trending movies' />
        </div>
        <div className='carousel-item'>
          <img src='https://wallpaperaccess.com/full/645141.jpg' className='d-block w-100' alt='Trending movies' />
        </div>
      </div>
      <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='prev'>
        <span className='carousel-control-prev-icon' aria-hidden='true' />
        <span className='visually-hidden'>Previous</span>
      </button>
      <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='next'>
        <span className='carousel-control-next-icon' aria-hidden='true' />
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  )
}

export default Carousel
