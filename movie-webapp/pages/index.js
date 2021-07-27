import React, { useState, useEffect } from 'react'
import Router from 'next/router';
import Link from 'next/link'
import SideMenu from '../components/sideMenu'
import Carousel from '../components/Carousel'
import MovieList from '../components/MovieList'
import Footer from '../components/footer'
import { getMovies, getCategories } from '../actions'

const MAX_IMAGES = 3

const Home = (props) => {
  const { movies = [], categories = [] } = props
  const [ images, setImages ] = useState([])
  const [ filter, setFilter ] = useState('all')

  useEffect(() => {
    const { movies } = props
    const images = movies.slice(0, 3).map(m => ({cover: m.cover, id: m.id}))
    setImages(images)
  }, []);

  const changeCategory = (category) => {
    setFilter(category)
  }

  const filterMovies = (movies) => {
    if (filter === 'all') {
      return movies
    }

    return movies.filter(m => {
      return m.genre && m.genre.includes(filter)
    })
  }

  const addMovieToList = () => {
    Router.push('/')
  }

  // If passing a second argument (array), React will run the callback after the first render and every time one of the elements in the array is changed. for example when placing useEffect(() => console.log('hello'), [someVar, someOtherVar]) - the callback will run after the first render and after any render that one of someVar or someOtherVar are changed.
  // By passing the second argument an empty array, React will compare after each render the array and will see nothing was changed, thus calling the callback only after the first render.

  return (
    <div>
      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideMenu
                activeCategory={filter}
                changeCategory={changeCategory}
                addMovieToList={addMovieToList}
                categories={categories} />
            </div>
            <div className="col-lg-9">
              <Carousel items={images} />
              <h1 class="mb-4">Displaying "{filter}" movies</h1>
              <div className="row">
                <MovieList
                  movies={filterMovies(movies)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


// <style jsx global>
// </style>

Home.getInitialProps = async ({ req }) => {
  const categories = await getCategories()
  const movies = await getMovies()

  return {
    movies,
    categories
  }
}

export default Home
