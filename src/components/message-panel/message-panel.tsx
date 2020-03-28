import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import './message-panel.css'
import {
  AutoSizer
} from 'react-virtualized'
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
import Infinite from 'react-infinite'
import { TypingStatusPanel } from './typing-status-panel'

export const MessagePanel: React.FC = () => {
  const alert = useAlert()
  const user = useSelector((state: RootState) => state.auth.user)
  const selectedGroup = useSelector((state: RootState) => state.main.selectedGroup)

  const [loading, setLoading] = useState(false)

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
    api.use(alert, async () => {
      console.log('loading!')
      setLoading(true)
      const result = await api.messaging.loadMessages(selectedGroup, messages.length)
      store.dispatch(addGroupMessages(result))
      setLoading(false)
    })
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
      <AutoSizer>
        {({ width, height }) => {
          if (height === 0) return <div />
          return (
            <div style={{ width, height }}>
              <Infinite
                className='infinite-scroll'
                key={selectedGroup.id}
                displayBottomUpwards
                elementHeight={88}
                containerHeight={height}
                loadingSpinnerDelegate={<Loader isLoading={true} height='88px' />}
                isInfiniteLoading={loading}
                infiniteLoadBeginEdgeOffset={selectedGroup.hasMore ? 250 : undefined}
                onInfiniteLoad={loadMessages}>
                {
                  messages.map((message) => <Message
                    key={message.id}
                    message={message}
                    padding='12px'
                    fromSelf={message.user.id === user?.id}
                  />)
                }
              </Infinite>
            </div>
          )
        }}
      </AutoSizer>
      <div style={{
        position: 'absolute',
        left: 0,
        right: '16px',
        top: 0,
      }}>
        <TypingStatusPanel typingUsers={selectedGroup.typingUsers} />
      </div>
    </div >
  )
}