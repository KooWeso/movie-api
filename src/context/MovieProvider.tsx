import { Component, createContext, ReactElement } from 'react'

import { fetchMoviesData, fetchTrendMovies, MoviesDataType } from '../api/fetchMovies'

type MoviesStateType = {
  movieData: MoviesDataType | null
  error: Error | null
  loading: boolean
  searchValue: string
  page: number
}

const initState: MoviesStateType = {
  movieData: null,
  error: null,
  loading: true,
  searchValue: '',
  page: 1,
}

type MovieContextType = {
  movieContext: MoviesStateType
}

const MovieContext = createContext<MovieContextType>({ movieContext: initState })

type ChildrenType = { children: ReactElement | ReactElement[] | undefined }

export class MovieDataProvider extends Component<ChildrenType, MoviesStateType> {
  constructor(props: ChildrenType) {
    super(props)

    this.state = initState
  }

  componentDidMount(): void {
    this.updateTrendMovies()

    console.log('%c Mounted Movie PROVIDER^', 'color:dodgerblue;')
  }

  componentDidUpdate(_prevProps: object, prevState: Readonly<MoviesStateType>): void {
    const { searchValue, page } = this.state

    console.log('%c UPDATE MOVIE provider', 'color:cyan;')
    if (prevState.searchValue !== searchValue && searchValue.trim() && prevState.page !== page) {
      console.log('%c UPDATE MOVIE provider', 'color:teal;')
      this.updateFoundMovies(searchValue, page)
    }

    if (!searchValue.trim() && prevState.page !== page) {
      this.updateTrendMovies(page)
    }
  }

  updateTrendMovies(p?: number) {
    fetchTrendMovies(p)
      .then((data) => {
        this.setState(() => ({
          movieData: data,
          error: null,
          loading: false,
        }))
      })
      .catch((err) => {
        if (err instanceof Error)
          this.setState(() => ({
            error: err,
            loading: false,
          }))
      })
  }

  updateFoundMovies(q: string, p: number) {
    fetchMoviesData(q, p)
      .then((data) => {
        this.setState(() => ({
          movieData: data,
          error: null,
          loading: false,
        }))
      })
      .catch((err) => {
        if (err instanceof Error)
          this.setState(() => ({
            error: err,
            loading: false,
          }))
      })
  }

  render() {
    const { children } = this.props
    const { movieData, loading, error, page, searchValue } = this.state

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <MovieContext.Provider value={{ movieContext: { movieData, loading, error, page, searchValue } }}>
        {children}
      </MovieContext.Provider>
    )
  }
}

export default MovieDataProvider
