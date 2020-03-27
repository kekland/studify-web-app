import React from 'react'
import { IGroup } from '../../api/data/group'
import { SizedBox } from '../sized-box/sized-box'
import { Row, Column } from '../flex/flex'
import { GroupAvatar } from '../group-avatar/group-avatar'
import { StyledText } from '../text/text'
import { Loader } from '../loader/loader'

export interface IGroupHorizontalProps {
  selected: boolean;
  onTap: () => void;
  group: IGroup;
  padding?: string;
}

export const GroupHorizontal: React.FC<IGroupHorizontalProps> = (props) => {
  let className: string | undefined = (props.selected) ? 'selected' : 'tappable';
  if(!props.group.isLoaded) className = undefined
  return (
    <SizedBox className={className} padding={props.padding} onTap={props.group.isLoaded? props.onTap : undefined}>
      <Row crossAxisAlignment='center'>
        <Loader isLoading={!props.group.isLoaded} width='56px' height='56px' borderRadius='16px'>
          <GroupAvatar name={props.group.name} colorId={props.group.colorId} icon={props.group.icon} size="56px" />
        </Loader>
        <SizedBox width={props.padding} />
        <Column>
          <StyledText type='body' fontWeight={500}>{props.group.name}</StyledText>
          <StyledText type='caption'>{props.group.description}</StyledText>
        </Column>
      </Row>
    </SizedBox>
  )
}