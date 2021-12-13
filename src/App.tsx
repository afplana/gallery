import { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
import { PhotoInfo } from './types'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [newImages, setNewImages] = useState(false)
  const mounted = useRef(false)

  const fetchImgs = async () => {
    setLoading(true)
    let urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    let url = query ? ` ${searchUrl}${clientID}${urlPage}${urlQuery}` : ` ${mainUrl}${clientID}${urlPage}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((prev) => query && page === 1 ? data.results : query ? [...prev, ...data.results] : [...prev, ...data])
      setNewImages(false)
      setLoading(false)
    } catch (err) {
      setNewImages(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImgs()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return
    if (loading) return
    setPage((prev) => prev + 1)
    // eslint-disable-next-line
  }, [newImages])

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
      setNewImages(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (!query) return

    if (page === 1) {
      fetchImgs()
      return
    }

    setPage(1)
  }

  return <main>
    <section className="search">
      <form className="search-form">
        <input type="text" placeholder="search" className="form-input" onChange={(e) => { setQuery(e.target.value) }} />
        <button type="submit" className="submit-btn" onClick={handleSubmit}><FaSearch /></button>
      </form>
    </section>
    <section className="photos">
      <div className="photos-center">
        {photos.map((photo) => {
          return <Photo key={photo.id} {...photo} />
        })}
      </div>
      {loading && <h2 className="loading">Loading...</h2>}
    </section>
  </main>
}

export default App
