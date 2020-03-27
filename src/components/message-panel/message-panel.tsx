import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import { AutoSizer } from 'react-virtualized'
import { CustomScrollbarsVirtualList } from '../smart-list/smart-list'
import { Message } from '../message/message'
import { useAlert } from 'react-alert'
import { api } from '../../api/api'
import { addGroupMessages } from '../../state/main'
import { Loader } from '../loader/loader'
import { Center } from '../center/center'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import { Column } from '../flex/flex'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'

export const MessagePanel: React.FC = () => {
  const alert = useAlert()
  const user = useSelector((state: RootState) => state.auth.user)
  const selectedGroup = useSelector((state: RootState) => state.main.selectedGroup)

  if (!selectedGroup) return <div />

  const messages = selectedGroup.messages

  let itemCount = messages.length + (selectedGroup.hasMore ? 1 : 0)
  const loadMessages = async (skip: number) => {
    api.use(alert, async () => {
      console.log('loading shit')
      const result = await api.messaging.loadMessages(selectedGroup, skip)
      store.dispatch(addGroupMessages(result))
    })
  }

  console.log(selectedGroup)
  const isItemLoaded = (index: number) => !selectedGroup.hasMore || index < itemCount;

  if (!selectedGroup.hasMore && itemCount === 0) {
    return (
      <Center>
        <Column crossAxisAlignment='center'>
          <FontAwesomeIcon icon={faCommentSlash} color='var(--color-text-muted' size='3x'/>
          <SizedBox flexSize='24px' />
          <StyledText fontWeight={700} color='muted'>No messages here :(</StyledText>
          <SizedBox flexSize='4px' />
          <StyledText color='muted'>Be the first person to leave a message!</StyledText>
        </Column>
      </Center>
    )
  }
  return (
    <div style={{ height: '100%' }}>
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMessages}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                outerElementType={CustomScrollbarsVirtualList}
                width={width}
                height={height}
                itemCount={itemCount}
                itemSize={80}
                onItemsRendered={onItemsRendered}
                
                ref={ref}>
                {({ index, style }) => {
                  if (!isItemLoaded(index) || !messages[index]) {
                    return (
                      <div style={style}>
                        <Loader isLoading={true} />
                      </div>
                    )
                  }
                  return (
                    <div style={style}>
                      <Message message={messages[index]} padding='12px'
                        fromSelf={messages[index].user.id === user?.id}
                      />
                    </div>
                  )
                }}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  )
}