import { Empty, Tabs } from 'antd'

import MovieDataProvider from '../context/MovieProvider'
import SessionProvider, { SessionConsumer } from '../context/SessionProvider'
import RatingProvider from '../context/RatingProvider'

import SearchTab from './tabs/SearchTab'
import RatedTab from './tabs/RatedTab'

export default function Movies() {

  const ratedTab = (
    <SessionConsumer>
      {({ guestSessionData }) => (
        <RatingProvider guestSession={guestSessionData}>
          <RatedTab />
        </RatingProvider>
      )}
    </SessionConsumer>
  )

  const tabs = [
    {
      key: '1',
      label: 'Search',
      children: (
        <MovieDataProvider>
          <SearchTab />
        </MovieDataProvider>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: ratedTab,
    },
  ]

  return (
    <SessionProvider>
      <Tabs
        onChange={(activeKey) => {
          if (activeKey === '2') {
            tabs[1].children = ratedTab
          } else tabs[1].children = <Empty />
        }}
        defaultActiveKey="1"
        items={tabs}
        centered
        size="large"
      />
    </SessionProvider>
  )
}
