import React from 'react'
import { IGroupMinimal, IGroup } from '../../api/data/group'
import { SizedBox } from '../sized-box/sized-box'
import { Row, Column } from '../flex/flex'
import { GroupAvatar } from '../group-avatar/group-avatar'
import { StyledText } from '../text/text'

export interface IGroupHorizontalProps {
  selected: boolean;
  onTap: () => void;
  group: IGroupMinimal;
  padding?: string;
}

export const GroupHorizontal: React.FC<IGroupHorizontalProps> = (props) => {
  const className = (props.selected) ? 'selected' : 'tappable';
  return (
    <SizedBox className={className} padding={props.padding} onTap={props.onTap}>
      <Row crossAxisAlignment='center'>
        <GroupAvatar name={props.group.name} colorId={props.group.colorId} icon={props.group.icon} size="56px" />
        <SizedBox width={props.padding} />
        <Column>
          <StyledText type='body' fontWeight={500}>{props.group.name}</StyledText>
          <StyledText type='caption'>{props.group.description}</StyledText>
        </Column>
      </Row>
    </SizedBox>
  )
}