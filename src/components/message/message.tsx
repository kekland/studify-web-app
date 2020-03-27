import React from 'react'
import { IMessage, IMessageSocket } from '../../api/data/message'
import { Row, Column } from '../flex/flex'
import { UserAvatar } from '../user-avatar/user-avatar'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { prettifyDate } from '../../api/pretty-date'

export interface IMessageProps {
  message: IMessageSocket;
  padding: string;
  fromSelf: boolean;
}

export const Message: React.FC<IMessageProps> = (props) => {
  let color = (props.fromSelf) ? 'surface-primary' : 'surface'

  if (props.fromSelf) {
    return (
      <SizedBox width='100%' padding={props.padding}>
        <Column mainAxisSize='min' crossAxisSize='max' crossAxisAlignment='flex-end'>
          <SizedBox className='transition-background' padding='12px' style={{
            backgroundColor: props.message.loading ?
              `var(--color-surface)` :
              `var(--color-surface-primary)`,
            borderRadius: '12px',
          }}>
            <StyledText>
              {props.message.body}
            </StyledText>
          </SizedBox>
          <SizedBox height='6px' />
          <StyledText type='caption'>{prettifyDate(props.message.created)}</StyledText>
        </Column>
      </SizedBox>
    )
  }

  return (
    <SizedBox padding={props.padding}>
      <Row mainAxisSize='max'>
        <UserAvatar name={props.message.user.username} onTap={() => { }} size='48px' />
        <SizedBox width={props.padding} />
        <Column mainAxisSize='min'>
          <Row crossAxisAlignment='flex-end'>
            <StyledText fontWeight={500}>{props.message.user.username}</StyledText>
            <SizedBox width='6px' />
            <StyledText type='caption'>Today at 12:03AM</StyledText>
          </Row>
          <SizedBox height='6px' />
          <SizedBox padding='12px' style={{
            backgroundColor: `var(--color-surface)`,
            borderRadius: '12px',
          }}>
            <StyledText>
              {props.message.body}
            </StyledText>
          </SizedBox>
        </Column>
      </Row>
    </SizedBox>
  )
}