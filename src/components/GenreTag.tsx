import { Tag } from 'antd'

import { genres, pickColor } from '../api/movieGenres'

type GnrTagPropType = { genreId: number }
function GenreTag({ genreId }: GnrTagPropType) {
  const findGenreName = (): string | undefined => genres.find(({ id }) => id === genreId)?.name

  return (
    <Tag color={pickColor(`${findGenreName()}`) || 'default'} style={{ fontSize: '.7rem' }}>
      {findGenreName() || 'ERROR'}
    </Tag>
  )
}

export default GenreTag
