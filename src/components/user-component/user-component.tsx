import React from 'react'
import { IUserOwner } from '../../api/data/user'
import { SizedBox } from '../sized-box/sized-box'
import { Row, Column, Flexible } from '../flex/flex'
import { StyledText } from '../text/text'
import { UserAvatar } from '../user-avatar/user-avatar'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '../button/button'

export interface IUserOwnerComponentProps {
  user: IUserOwner;
  onTap: () => void;
  onTapSettings: () => void;
  padding?: string;
}

export const UserOwnerComponent: React.FC<IUserOwnerComponentProps> = (props) => {
  return (
    <SizedBox padding={props.padding}>
      <Row crossAxisAlignment='center'>
        <SizedBox width='8px' />
        <UserAvatar name={props.user.username} size="40px" onTap={props.onTap} />
        <SizedBox width={props.padding} />
        <Column>
          <StyledText type='body' fontWeight={500}>{props.user.username}</StyledText>
          <StyledText type='caption'>{props.user.name}</StyledText>
        </Column>
        <Flexible />
        <IconButton onTap={props.onTapSettings} size='40px' icon={faCog} iconSize='lg' />
      </Row>
    </SizedBox>
  )
}