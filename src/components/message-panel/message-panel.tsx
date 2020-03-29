import React, { useState, useEffect, createRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import './message-panel.css'
import { Center } from '../center/center'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import { Column } from '../flex/flex'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { TypingStatusPanel } from './typing-status-panel'
import { useSelectedGroup } from '../../hooks/hooks'
import { methods } from '../../api/methods/methods'
import { InfiniteLoadingList } from '../list/list'
import { Message } from '../message/message'
import { Loader } from '../loader/loader'
import { NewMessagesIndicator } from './new-messages-indicator'
import Scrollbars from 'react-custom-scrollbars'

export const MessagePanel: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const selectedGroupId = useSelector((state: RootState) => state.main.selectedGroupId)
  const selectedGroup = useSelectedGroup()
  const scrollRef = createRef<Scrollbars>()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedGroupId)
      methods.notification.setGroupAsRead(selectedGroupId)
  }, [selectedGroupId])

  if (!selectedGroup) {
    return (
      <Center>
        <Column crossAxisAlignment='center'>
          <FontAwesomeIcon icon={faCommentSlash} color='var(--color-text-muted' size='3x' />
          <SizedBox flexSize='24px' />
          <StyledText fontWeight={700} color='muted'>No group selected</StyledText>
          <SizedBox flexSize='4px' />
          <StyledText color='muted'>Select a group in the drawer</StyledText>
        </Column>
      </Center>
    )
  }

  const loadMessages = async () => {
    if (selectedGroup.hasMore && !loading) {
      setLoading(true)
      await methods.messaging.loadMoreMessages(selectedGroup)
      setLoading(false)
    }
  }

  const handleOnScrollBottom = async () => {
    if (selectedGroupId && selectedGroup.unreadMessages > 0)
      methods.notification.setGroupAsRead(selectedGroupId)
  }

  const messages = selectedGroup.messages

  let itemCount = messages.length

  if (!selectedGroup.hasMore && itemCount === 0) {
    return (
      <Center>
        <Column crossAxisAlignment='center'>
          <FontAwesomeIcon icon={faCommentSlash} color='var(--color-text-muted' size='3x' />
          <SizedBox flexSize='24px' />
          <StyledText fontWeight={700} color='muted'>No messages here :(</StyledText>
          <SizedBox flexSize='4px' />
          <StyledText color='muted'>Be the first person to leave a message!</StyledText>
        </Column>
      </Center>
    )
  }
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ width: '100%', height: '100%' }}>
        <InfiniteLoadingList
          isLoading={false}
          loaderBuilder={() => <Loader key='loader' isLoading={true} height='88px' width='100%' />}
          onTopReached={loadMessages}
          onBottomReached={handleOnScrollBottom}
          fromBottom={true}
          scrollRef={scrollRef}
          hasMore={selectedGroup.hasMore}
        >
          {
            messages.map((message, i) => <Message
              key={message.id}
              message={message}
              padding='12px'
              smallPadding='6px'
              prevMessage={i === 0 ? undefined : messages[i - 1]}
              nextMessage={i === (messages.length - 1) ? undefined : messages[i + 1]}
              fromSelf={message.user.id === user?.id} />)
          }
        </InfiniteLoadingList>
      </div>
      <div style={{
        position: 'absolute',
        left: 0,
        right: '16px',
        top: 0,
      }}>
        <TypingStatusPanel typingUsers={selectedGroup.typingUsers} />
      </div>
      <div style={{
        position: 'absolute',
        right: '16px',
        bottom: '16px',
      }}>
        <NewMessagesIndicator unreadMessages={selectedGroup.unreadMessages} onTap={() => {
          if (scrollRef.current)
            scrollRef.current.scrollToBottom()
        }} />
      </div>
    </div >
  )
}