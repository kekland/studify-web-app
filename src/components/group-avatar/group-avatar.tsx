import React from 'react'
import { StyledText } from '../text/text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Center } from '../center/center'
import { GroupUtils } from '../../api/data/group'

export interface IGroupAvatarProps {
  name: string;
  colorId: number;
  icon: IconName;
  size: string;
}

export const GroupAvatar: React.FC<IGroupAvatarProps> = (props) => {
  return (
    <div style={{
      width: props.size,
      height: props.size,
      flex: `0 0 ${props.size}`,
      borderRadius: '16px',
      backgroundColor: `var(--color-group-${props.colorId})`,
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}>
        <Center>
          <FontAwesomeIcon icon={props.icon} size='2x' color='rgba(255, 255, 255, 0.425)' />
        </Center>
      </div>
      <div style={{
        position: 'absolute',
        right: '4px',
        bottom: '4px',
      }}>
        <StyledText type='body' fontWeight={700} surface='dark' textAlign='end' unselectable style={{
          backgroundColor: props.name.length > 0? `var(--color-group-${props.colorId})` : 'transparent',
          padding: '2px',
          borderRadius: '6px',
        }}>
          {GroupUtils.getShortName(props.name)}
        </StyledText>
      </div>
    </div >
  )
}