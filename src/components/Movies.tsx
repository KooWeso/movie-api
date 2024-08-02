import { Empty, Tabs } from 'antd'

import MovieDataProvider from '../context/MovieProvider'
import SessionProvider, { SessionConsumer } from '../context/SessionProvider'
import RatingProvider from '../context/RatingProvider'

import SearchTab from './tabs/SearchTab'
import RatedTab from './tabs/RatedTab'

export default function Movies() {
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
      children: (
        <SessionConsumer>
          {({ guestSessionData }) => (
            <RatingProvider guestSession={guestSessionData}>
              <RatedTab />
            </RatingProvider>
          )}
        </SessionConsumer>
      ),
    },
  ]

  return (
    <SessionProvider>
      <Tabs
        onChange={(activeKey) => {
          if (activeKey === '2') {
            tabs[1].children = (
              <SessionConsumer>
                {({ guestSessionData }) => (
                  <RatingProvider guestSession={guestSessionData}>
                    <RatedTab />
                  </RatingProvider>
                )}
              </SessionConsumer>
            )
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
