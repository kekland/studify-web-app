import React from 'react'
import { StyledText } from '../text/text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Column, Flexible } from '../flex/flex'
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
      borderRadius: '16px',
      backgroundColor: `var(--color-group-${props.colorId})`,
      padding: '6px'
    }}>
      <Column mainAxisSize='max'>
        <Flexible style={{ width: '100%' }}>
          <Center>
            <FontAwesomeIcon icon={props.icon} size='lg' color='rgba(255, 255, 255, 0.625)' />
          </Center>
        </Flexible>
        <div style={{ width: '100%' }}>
          <StyledText type='body' fontWeight={700} surface='dark' textAlign='end' unselectable>
            {GroupUtils.getShortName(props.name)}
          </StyledText>
        </div>
      </Column>
    </div >
  )
}