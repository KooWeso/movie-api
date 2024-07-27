import { Component } from 'react'
import { List } from 'antd'

import fetchMoviesData, { MoviesDataType } from '../api/fetchMovies'

import ErrorMessage from './ErrorMessage'
import MovieCard from './MovieCard'

type MoviesStateType = {
  movieData: MoviesDataType | null
  error: Error | null
}

export default class Movies extends Component<object, MoviesStateType> {
  constructor(props: object) {
    super(props)
    this.state = {
      movieData: null,
      error: null,
    }
  }

  componentDidMount(): void {
    fetchMoviesData('Adventure time', 1)
      .then((data) => {
        this.setState(() => ({
          movieData: data,
          error: null,
        }))
      })
      .catch((err) => {
        if (err instanceof Error)
          this.setState(() => ({
            error: err,
          }))
      })

    console.log('%c Mounted Movies^', 'color:dodgerblue;')
  }

  render() {
    const { movieData, error } = this.state

    console.log('%c Render Movies', 'color:red;')

    if (error) {
      return <ErrorMessage message={error.message} />
    }

    return (
      <List
        itemLayout="vertical"
        grid={{ gutter: 24, column: 2, md: 2, sm: 1, xs: 1 }}
        dataSource={movieData?.results}
        renderItem={(item) => <MovieCard movie={item} />}
      />
    )
  }
}

//     const [movies, setMovies] = useState<MoviesType[]>([])

//   useEffect(() => {
//     fetchMoviesData('new world', 1)
//       .then((data) => setMovies(data.results))
//       .catch((err) => console.error(err))
//   }, [])

// movies.length &&
// movies.map(({ poster_path: imgPath, id, title }) => {
//   return (
//     <div key={id}>
//       <img src={`${baseURLImgPath}${imgPath}`} alt={`${title}❌`} />
//       <p>{title}</p>
//     </div>
//   )
// })
