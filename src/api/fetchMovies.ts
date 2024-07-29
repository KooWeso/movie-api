type ParamsType = {
  query?: string
  page: string
}

export type MoviesType = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MoviesDataType = {
  page: number
  results: MoviesType[]
  total_pages: number
  total_results: number
}
const baseURL = new URL('https://api.themoviedb.org/3/search/movie')
const baseTrendURL = new URL('https://api.themoviedb.org/3/trending/movie/week')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'Cache-Control': 'public, max-age=3600',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDcyNWNkY2NhN2ViMTA0NWQ1MmM2ZWNkMzBlOTVlNiIsIm5iZiI6MTcyMTY0ODQxMS4wMzY2MTQsInN1YiI6IjY2OWU0MjJmNzk0ZDFkZjgwYzUwMjI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.99FKbHo8O4WuTdBGB2C8kdFJS5T9PzMXxJNCZRLlZ-E',
  },
}

const newParams = (prms: ParamsType, bURL: URL) => {
  const search = new URLSearchParams(prms)
  const newURL = new URL(bURL)
  newURL.search = search.toString()
  return newURL
}

const handleThrowError = async (res: Response): Promise<Error> => {
  const errorResponce = (await res.json()) as { status_message: string }
  throw new Error(`${errorResponce.status_message} ${res.status}`)
}

const fetchMoviesData = async (query: string, page = 1): Promise<MoviesDataType> => {
  const params: ParamsType = {
    query,
    page: page.toString(),
  }

  const newURL = newParams(params, baseURL)

  const res = await fetch(newURL, options)

  if (!res.ok) {
    throw await handleThrowError(res)
  } else return res.json() as Promise<MoviesDataType>
}

const fetchTrendMovies = async (page = 1): Promise<MoviesDataType> => {
  const params = {
    page: page.toString(),
  }

  const newURL = newParams(params, baseTrendURL)

  const res = await fetch(newURL, options)

  if (!res.ok) {
    throw await handleThrowError(res)
  } else return res.json() as Promise<MoviesDataType>
}

export { fetchMoviesData, fetchTrendMovies }
