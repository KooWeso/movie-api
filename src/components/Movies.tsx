import { Component } from 'react'
import { Flex, Input, List, Pagination } from 'antd'
import debounce from 'lodash.debounce'

import { fetchMoviesData, MoviesDataType } from '../api/fetchMovies'

import ErrorMessage from './ErrorMessage'
import MovieCard from './MovieCard'
import Skelet from './Skelet'

type MoviesStateType = {
  movieData: MoviesDataType | null
  error: Error | null
  loading: boolean
  searchValue: string
  page: number
}

export default class Movies extends Component<object, MoviesStateType> {
  debouncedFetch = debounce(() => {
    const { searchValue, page } = this.state
    console.log('%c DEBOUNCE', 'color:black;')
    console.log(`%c ${searchValue}-${page}`, 'color:green;')
    this.setState(() => ({ loading: true }))
    this.fetchMoviesDataAndUpdateState(searchValue.trim(), page)
  }, 500)

  debouncedInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      searchValue: e.target.value,
    }))
  }, 1500)

  constructor(_props: object) {
    super(_props)
    this.state = {
      movieData: null,
      error: null,
      loading: true,
      searchValue: '',
      page: 1,
    }
  }

  componentDidMount(): void {
    this.fetchMoviesDataAndUpdateState('chronicl', 1)

    console.log('%c Mounted Movies^', 'color:dodgerblue;')
  }

  componentDidUpdate(_prevProps: object, prevState: Readonly<MoviesStateType>): void {
    const { searchValue, page } = this.state

    if ((prevState.searchValue !== searchValue && searchValue.trim()) || prevState.page !== page) {
      console.log('%c DEBOUNCE TRY', 'color:magenta;')
      this.debouncedFetch()
    }
  }

  fetchMoviesDataAndUpdateState = (title: string, p = 1) => {
    fetchMoviesData(title, p)
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
    const { movieData, error, loading } = this.state

    console.log('%c Render Movies', 'color:red;')

    if (error) {
      return <ErrorMessage message={error.message} />
    }

    return (
      <>
        <Flex vertical gap={16} style={{ marginBottom: '1rem' }}>
          <button type="button" onClick={() => this.setState({ loading: !loading })}>
            LOADING
          </button>
          <Input
            placeholder="Type Movie title here..."
            style={{ borderRadius: 2 }}
            onChange={(e) => {
              console.log('INPUT')
              this.debouncedInputChange(e)
            }}
          />
        </Flex>

        {!loading ? (
          <List
            itemLayout="vertical"
            grid={{ gutter: 24, column: 2, md: 2, sm: 1, xs: 1 }}
            dataSource={movieData?.results}
            renderItem={(item) => <MovieCard movie={item} />}
          />
        ) : (
          <Skelet />
        )}
        {movieData ? (
          <Pagination
            onChange={(value) => {
              this.setState(() => ({
                page: value,
              }))
            }}
            showSizeChanger={false}
            defaultCurrent={1}
            total={movieData.total_pages}
            align="center"
          />
        ) : null}
      </>
    )
  }
}
