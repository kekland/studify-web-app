import React, { useEffect } from 'react'
import { IMessageSocket } from '../../api/data/message'
import { Row, Column } from '../flex/flex'
import { UserAvatar, UserAvatarSkeleton } from '../user-avatar/user-avatar'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText, StyledTextSkeleton } from '../text/text'
import { prettifyDate } from '../../api/pretty-date'

export interface IMessageProps {
  message: IMessageSocket;
  padding: string;
  fromSelf: boolean;
  measure?: () => void;
}

export const Message: React.FC<IMessageProps> = ({ message, padding, fromSelf, measure }) => {
  let color = (fromSelf) ? 'surface-primary' : 'surface'

  useEffect(() => {
    if (measure) measure()
  }, [measure])

  if (fromSelf) {
    return (
      <SizedBox width='100%' padding={padding}>
        <Column mainAxisSize='min' crossAxisSize='max' crossAxisAlignment='flex-end'>
          <SizedBox className='transition-background' padding='12px' style={{
            backgroundColor: message.loading ?
              `var(--color-surface)` :
              `var(--color-surface-primary)`,
            borderRadius: '12px',
          }}>
            <StyledText>
              {message.body}
            </StyledText>
          </SizedBox>
          <SizedBox height='6px' />
          <StyledText type='caption'>{prettifyDate(message.created)}</StyledText>
        </Column>
      </SizedBox>
    )
  }

  return (
    <SizedBox padding={padding}>
      <Row mainAxisSize='max'>
        <UserAvatar name={message.user.username} onTap={() => { }} size='48px' />
        <SizedBox width={padding} />
        <Column mainAxisSize='min'>
          <Row crossAxisAlignment='flex-end'>
            <StyledText fontWeight={500}>{message.user.username}</StyledText>
            <SizedBox width='6px' />
            <StyledText type='caption'>Today at 12:03AM</StyledText>
          </Row>
          <SizedBox height='6px' />
          <SizedBox padding='12px' style={{
            backgroundColor: `var(--color-surface)`,
            borderRadius: '12px',
          }}>
            <StyledText>
              {message.body}
            </StyledText>
          </SizedBox>
        </Column>
      </Row>
    </SizedBox>
  )
}

export interface IMessageSkeletonProps {
  measure?: () => void;
  padding: string;
}

export const MessageSkeleton: React.FC<IMessageSkeletonProps> = ({ measure, padding }) => {
  return (
    <SizedBox padding={padding}>
      <Row mainAxisSize='max'>
        <UserAvatarSkeleton size='48px' />
        <SizedBox width={padding} />
        <Column mainAxisSize='min'>
          <Row crossAxisAlignment='flex-end'>
            <StyledTextSkeleton fontWeight={500} width='50px' skeletonColor='var(--color-surface)' />
            <SizedBox width='6px' />
            <StyledTextSkeleton type='caption' width='100px' skeletonColor='var(--color-surface)' />
          </Row>
          <SizedBox height='6px' />
          <SizedBox padding='12px' style={{
            backgroundColor: `var(--color-surface)`,
            borderRadius: '12px',
          }}>
            <StyledTextSkeleton width='100px' skeletonColor='var(--color-surface)' />
          </SizedBox>
        </Column>
      </Row>
    </SizedBox>
  )
}