import React from 'react'
import { StyledText } from '../text/text'
import { Center } from '../center/center'

export interface UserAvatarProps {
  size: string;
  name: string;
  onTap?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  return (
    <div className={props.onTap ? 'tappable' : undefined} onClick={props.onTap} style={{
      width: props.size, height: props.size,
      borderRadius: '999px',
      backgroundColor: 'var(--color-group-1)'
    }}>
      <Center>
        <StyledText surface='dark' fontWeight={700} textAlign='center'>
          {props.name.charAt(0).toUpperCase()}
        </StyledText>
      </Center>
    </div>
  )
}

export interface UserAvatarSkeletonProps {
  size: string;
}

export const UserAvatarSkeleton: React.FC<UserAvatarSkeletonProps> = (props) => {
  return (
    <div style={{
      width: props.size, height: props.size,
      borderRadius: '999px',
      backgroundColor: 'var(--color-surface)'
    }} />
  )
}