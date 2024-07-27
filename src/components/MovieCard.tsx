import { List, Avatar, Typography, Image, Flex, Rate, Progress, Tag } from 'antd'
import { format } from 'date-fns'

import { MoviesType } from '../api/fetchMovies'

import GenreTag from './GenreTag'

const { Text, Paragraph } = Typography

type MovCdPropType = {
  movie: MoviesType
}
const rateColor = (rate: number) => {
  if (rate <= 3) return '#E90000'
  if (rate <= 5) return '#E97E00'
  if (rate <= 7) return '#E9D100'
  return '#66E900'
}

const baseURLImgPath = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie }: MovCdPropType) {
  const {
    title,
    release_date: date,
    overview,
    poster_path: imgPath,
    backdrop_path: bdImgPath,
    vote_average: rate,
    genre_ids: genreIds,
  } = movie

  return (
    <List.Item
      style={{
        boxShadow: '0.1rem .2rem .6rem 0.2rem hsla(1, 1%, 70%, 0.300)',
        padding: window.innerWidth >= 768 ? 0 : '.5rem',
      }}
    >
      <Flex gap="1rem">
        <Avatar
          shape="square"
          className="avatarResponsive"
          src={<Image src={`${baseURLImgPath}${imgPath || bdImgPath}`} preview fallback="data:image/png;base64" />}
        />
        <Flex vertical gap=".5rem" style={{ paddingRight: '.5rem', paddingBottom: '1rem', minWidth: 0, flex: 1 }}>
          <Flex align="center" justify="space-between">
            <Text style={{ fontSize: '1.2rem' }}>{title}</Text>
            <Progress
              type="circle"
              percent={99.99}
              size={30}
              strokeWidth={8}
              strokeColor={rateColor(rate)}
              format={() => rate.toFixed(1)}
              style={{ paddingTop: '.5em', alignSelf: 'flex-start' }}
            />
          </Flex>

          <Text type="secondary" style={{ fontSize: '.7rem' }}>
            {date && format(new Date(date), 'MMMM d, yyyy')}
            {!date && 'No date'}
          </Text>
          <Flex wrap gap="4px 0" style={{ minWidth: 0 }}>
            {genreIds && genreIds.map((genreId) => <GenreTag genreId={genreId} key={`genre-${genreId}`} />)}
            {!!genreIds.length || <Tag>This movie has no Genres</Tag>}
          </Flex>
          <Flex vertical style={{ marginLeft: window.innerWidth >= 768 ? 0 : -75, flex: 1 }}>
            <Paragraph ellipsis={{ rows: 4 }} style={{ fontSize: '.9em' }}>
              {overview || 'This movie has no description to show...'}
            </Paragraph>
            <Rate allowHalf count={10} style={{ alignSelf: 'flex-end', fontSize: '1rem', marginTop: 'auto' }} />
          </Flex>
        </Flex>
      </Flex>
    </List.Item>
  )
}

export default MovieCard
