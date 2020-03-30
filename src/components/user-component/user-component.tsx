import React from 'react'
import { IUserOwner, IUserMinimal } from '../../api/data/user'
import { SizedBox } from '../sized-box/sized-box'
import { Row, Column, Flexible } from '../flex/flex'
import { StyledText } from '../text/text'
import { UserAvatar } from '../user-avatar/user-avatar'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '../button/button'
import { store } from '../../state/store'
import { setSelectedUser } from '../../state/main'

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

export interface IUserComponentProps {
  user: IUserMinimal;
  padding?: string;
  verticalPadding?: string;
}

export const UserComponent: React.FC<IUserComponentProps> = (props) => {
  return (
    <SizedBox style={{
      paddingTop: props.verticalPadding ?? props.padding,
      paddingBottom: props.verticalPadding ?? props.padding,
      paddingLeft: props.padding,
      paddingRight: props.padding,
    }} className='tappable' onTap={() => store.dispatch(setSelectedUser(props.user))}>
      <Row crossAxisAlignment='center'>
        <UserAvatar name={props.user.username} size="48px" />
        <SizedBox width={props.padding ?? props.verticalPadding} />
        <Column>
          <StyledText type='body' fontWeight={500}>{props.user.username}</StyledText>
          <StyledText type='caption'>{props.user.name}</StyledText>
        </Column>
      </Row>
    </SizedBox>
  )
}