import React from 'react'
import { StyledText } from '../text/text'

export interface IGroupAvatarProps {
  name: string;
  colorId: number;
  size: string;
}

export const GroupAvatar: React.FC<IGroupAvatarProps> = (props) => {
  return (
    <div style={{
      width: props.size,
      height: props.size,
      borderRadius: '16px',
      backgroundColor: `var(--color-group-${props.colorId})`,
      position: 'relative',
      padding: '8px'
    }}>
      <div style={{ position: 'absolute', bottom: '6px', right: '6px' }}>
        <StyledText type='body' fontWeight={700} surface='dark' textAlign='end'>AP</StyledText>
      </div>
    </div >
  )
}