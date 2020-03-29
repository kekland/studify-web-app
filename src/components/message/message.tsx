import React from 'react'
import { IMessageSocket, ISentMessage } from '../../api/data/message'
import { Row, Column } from '../flex/flex'
import { UserAvatar } from '../user-avatar/user-avatar'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { prettifyDate, areDatesClose } from '../../api/pretty-date'

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
  let messageToUse = fromSelf ? nextMessage : prevMessage

  if (!messageToUse) displayTime = true
  else if (messageToUse.user.id === message.user.id &&
    areDatesClose(messageToUse.created, message.created)) displayTime = false

  if (fromSelf) {
    return (
      <SizedBox width='100%' style={{
        display: 'flex', justifyContent: 'flex-end',
        paddingLeft: padding,
        paddingRight: padding,
        paddingBottom: displayTime ? padding : smallPadding,
      }}>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end' }}>
          <Column mainAxisSize='min' crossAxisSize='max' crossAxisAlignment='flex-end'>
            <SizedBox className='transition-background' padding='12px' style={{
              backgroundColor: (message as ISentMessage).loading ?
                `var(--color-surface)` :
                `var(--color-surface-primary)`,
              borderRadius: '12px',
              wordWrap: 'break-word',
              maxWidth: '100%',
            }}>
              <StyledText>
                {message.body}
              </StyledText>
            </SizedBox>
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
      <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-start' }}>
        <Row mainAxisSize='max'>
          {displayTime ? <UserAvatar name={message.user.username} onTap={() => { }} size='48px' /> : <SizedBox flexSize='48px' />}
          <SizedBox width={padding} flexSize={padding} />
          <Column mainAxisSize='min' style={{maxWidth: '100%'}}>
            <div style={{ display: displayTime ? 'block' : 'none' }}>
              <Row crossAxisAlignment='flex-end'>
                <StyledText fontWeight={500}>{message.user.username}</StyledText>
                <SizedBox width='6px' />
                <StyledText type='caption'>{prettifyDate(message.created)}</StyledText>
              </Row>
              <SizedBox height='6px' />
            </div>
            <SizedBox padding='12px' style={{
              backgroundColor: `var(--color-surface)`,
              borderRadius: '12px',
              wordWrap: 'break-word',
              maxWidth: '100%',
            }}>
              <StyledText>
                {message.body}
              </StyledText>
            </SizedBox>
          </Column>
        </Row>
      </div>
    </SizedBox>
  )
}
