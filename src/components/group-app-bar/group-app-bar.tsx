import React from 'react'
import { IGroupMinimal } from '../../api/data/group'
import { Row, Column, Flexible } from '../flex/flex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { IconButton } from '../button/button'
import { faInfoCircle, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

export interface IGroupAppBarProps {
  group?: IGroupMinimal;
}

export const GroupAppBar: React.FC<IGroupAppBarProps> = (props) => {
  if (props.group) {
    return (
      <Row mainAxisSize='max' crossAxisSize='max' crossAxisAlignment='center'>
        <SizedBox width='12px' />
        <FontAwesomeIcon icon={props.group.icon} color='rgba(255, 255, 255, 0.625)' size='2x' />
        <SizedBox width='18px' />
        <Column>
          <StyledText surface='dark' type='subhead'>{props.group.name}</StyledText>
          <StyledText type='caption' customColor='rgba(255, 255, 255, 0.625)'>{props.group.description}</StyledText>
        </Column>
        <Flexible />
        <IconButton
          size='48px'
          icon={faFolderOpen}
          surface='dark'
          iconSize='lg'
          onTap={() => { }} />
        <SizedBox width='12px' />
        <IconButton
          size='48px'
          icon={faInfoCircle}
          surface='dark'
          iconSize='lg'
          onTap={() => { }} />
        <SizedBox width='12px' />
      </Row>
    )
  }
  else {
    return <div />
  }
}