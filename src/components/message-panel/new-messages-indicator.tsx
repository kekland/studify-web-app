import React from 'react'
import { Center } from '../center/center'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { StyledText } from '../text/text'
import { IconButton } from '../button/button'

export interface INewMessagesIndicatorProps {
  unreadMessages: number;
  onTap: () => void,
}

export const NewMessagesIndicator: React.FC<INewMessagesIndicatorProps> = (props) => {
  let isShown = props.unreadMessages > 0
  return (
    <div style={{
      width: '48px', height: '48px',
      borderRadius: '24px', backgroundColor: 'var(--color-surface)',
      position: 'relative',
      transition: 'transform 150ms ease-in-out, opacity 150ms ease-in-out',
      transform: isShown ? 'translate(0, 0)' : 'translate(0px, 10px)',
      opacity: isShown ? 1 : 0,
    }}>
      <div style={{
        position: 'absolute',
        right: '-8px',
        top: '-8px',
        width: '24px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: 'var(--color-group-4)'
      }}>
        <Center>
          <StyledText fontWeight={500} surface='dark' type='caption' color='primary'>{props.unreadMessages}</StyledText>
        </Center>
      </div>
      <Center>
        <IconButton icon={faAngleDown} size='36px' iconSize='lg' onTap={props.onTap} />
      </Center>
    </div>
  )
}