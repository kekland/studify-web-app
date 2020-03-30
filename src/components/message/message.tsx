import React, { useState } from 'react'
import { IMessageSocket, ISentMessage } from '../../api/data/message'
import { Row, Column } from '../flex/flex'
import { UserAvatar } from '../user-avatar/user-avatar'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { prettifyDate, areDatesClose } from '../../api/pretty-date'
import { FileAttachmentMessage, ReplyAttachment } from '../message-attachments/message-attachments'
import { IconButton } from '../button/button'
import { faReply, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../state/store'
import { setReplyingTo } from '../../state/messaging'
import { setSelectedUser } from '../../state/main'

export interface IMessageProps {
  message: IMessageSocket | ISentMessage;
  prevMessage?: IMessageSocket;
  nextMessage?: IMessageSocket;
  padding: string;
  smallPadding: string;
  fromSelf: boolean;
}

export const Message: React.FC<IMessageProps> = ({ message, prevMessage, nextMessage, padding, smallPadding, fromSelf }) => {
  let displayTime = true
  let messageToUse = fromSelf ? prevMessage : nextMessage
  const [hovering, setHovering] = useState(false)

  if (!messageToUse) displayTime = true
  else if (messageToUse.user.id === message.user.id &&
    areDatesClose(messageToUse.created, message.created)) displayTime = false

  const replyAttachments = message.attachments.filter(attachment => attachment.type === 'reply')
  const fileAttachments = message.attachments.filter(attachment => attachment.type === 'file')
  const messageContainer = (
    <Column>
      {
        replyAttachments.map((attachment) => (<ReplyAttachment key={attachment.rel} replyingTo={attachment.additional} />))
      }
      {
        replyAttachments.length !== 0 ? <SizedBox flexSize='12px' /> : <div />
      }
      <StyledText>
        {message.body}
      </StyledText>
      {
        fileAttachments.length !== 0 ? <SizedBox flexSize='12px' /> : <div />
      }
      {
        fileAttachments.map((attachment, i) => (<FileAttachmentMessage
          key={`attachment-${i}`}
          padding='6px 0px 6px 0px'
          url={attachment.rel}
          name={attachment.additional?.name} />))
      }
    </Column>
  )


  const actionsContainer = (
    <div style={{ opacity: hovering ? 1 : 0, transition: 'opacity 150ms ease-in-out', pointerEvents: hovering ? 'auto' : 'none' }}>
      <IconButton icon={faReply} size='32px' iconSize='sm' onTap={() => store.dispatch(setReplyingTo(message))} />
      <IconButton icon={faBookmark} size='32px' iconSize='sm' />
    </div>
  )

  if (fromSelf) {
    return (
      <SizedBox width='100%' style={{
        display: 'flex', justifyContent: 'flex-end',
        paddingLeft: padding,
        paddingRight: padding,
        paddingBottom: displayTime ? padding : smallPadding,
      }}>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end' }}
          onMouseLeave={() => setHovering(false)}
          onMouseOver={() => setHovering(true)}>
          <Column mainAxisSize='min' crossAxisSize='max' crossAxisAlignment='flex-end'>
            <Row crossAxisAlignment='flex-end'>
              {actionsContainer}
              <SizedBox className='transition-background' padding='12px' style={{
                backgroundColor: (message as ISentMessage).loading ?
                  `var(--color-surface)` :
                  `var(--color-surface-primary)`,
                borderRadius: '12px',
                wordWrap: 'break-word',
                maxWidth: '100%',
              }}>
                {messageContainer}
              </SizedBox>
            </Row>
            <div style={{ display: displayTime ? 'block' : 'none' }}>
              <SizedBox height='6px' />
              <StyledText type='caption'>{prettifyDate(message.created)}</StyledText>
            </div>
          </Column>
        </div>
      </SizedBox>
    )
  }

  return (
    <SizedBox style={{
      display: 'flex', justifyContent: 'flex-start',
      width: '100%',
      paddingLeft: padding,
      paddingRight: padding,
      paddingBottom: smallPadding,
      paddingTop: displayTime ? padding : '0px',
    }}>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-start' }}
        onMouseLeave={() => setHovering(false)}
        onMouseOver={() => setHovering(true)}>
        <Row mainAxisSize='max'>
          {displayTime ? <UserAvatar name={message.user.username} onTap={() => store.dispatch(setSelectedUser(message.user))} size='48px' /> : <SizedBox flexSize='48px' />}
          <SizedBox width={padding} flexSize={padding} />
          <Column mainAxisSize='min' style={{ maxWidth: '100%' }}>
            <div style={{ display: displayTime ? 'block' : 'none' }}>
              <Row crossAxisAlignment='flex-end'>
                <StyledText fontWeight={500}>{message.user.username}</StyledText>
                <SizedBox width='6px' />
                <StyledText type='caption'>{prettifyDate(message.created)}</StyledText>
              </Row>
              <SizedBox height='6px' />
            </div>
            <Row crossAxisAlignment='flex-end'>
              <SizedBox padding='12px' style={{
                backgroundColor: `var(--color-surface)`,
                borderRadius: '12px',
                wordWrap: 'break-word',
                maxWidth: '100%',
              }}>
                {messageContainer}
              </SizedBox>
              {actionsContainer}
            </Row>
          </Column>
        </Row>
      </div>
    </SizedBox>
  )
}
