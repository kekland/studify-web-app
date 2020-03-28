import React, { useState } from 'react'
import { IGroup, IGroupMinimal, GroupUtils } from '../../api/data/group'
import { SizedBox } from '../sized-box/sized-box'
import { Row, Column, Flexible } from '../flex/flex'
import { GroupAvatar } from '../group-avatar/group-avatar'
import { StyledText } from '../text/text'
import { Loader } from '../loader/loader'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { RaisedButton } from '../button/button'
import { api } from '../../api/api'
import { useAlert } from 'react-alert'
import { joinGroup, leaveGroup } from '../../state/main'

export interface IGroupHorizontalProps {
  selected: boolean;
  onTap: () => void;
  group: IGroup;
  padding?: string;
}

export const GroupHorizontal: React.FC<IGroupHorizontalProps> = (props) => {
  let className: string | undefined = (props.selected) ? 'selected' : 'tappable';
  if (!props.group.isLoaded) className = undefined
  return (
    <SizedBox className={className} padding={props.padding} onTap={props.group.isLoaded ? props.onTap : undefined}>
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

export interface IGroupVerticalProps {
  group: IGroupMinimal;
  padding?: string;
}

export const GroupVertical: React.FC<IGroupVerticalProps> = (props) => {
  const alert = useAlert()
  const [loading, setLoading] = useState(false)
  const user = useSelector((state: RootState) => state.auth.user)

  const isJoined = user?.groups.findIndex(group => group.id === props.group.id) !== -1
  const isAuthor = props.group.creator.id === user!.id

  const onJoin = () => {
    api.use(alert, async () => {
      setLoading(true)
      const group = await api.group.join(props.group)
      store.dispatch(joinGroup(group))
    }, () => setLoading(false))
  }

  const onLeave = () => {
    console.log('leaving')
    api.use(alert, async () => {
      setLoading(true)
      const group = await api.group.leave(props.group)
      store.dispatch(leaveGroup(group))
    }, () => setLoading(false))
  }

  return (
    <Loader isLoading={loading} borderRadius='12px' width='225px' height='100%'>
      <SizedBox padding={props.padding} width='225px' height='100%'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.075)', borderRadius: '12px' }}>
        <Column crossAxisAlignment='center' mainAxisSize='max'>
          <GroupAvatar name={props.group.name} colorId={props.group.colorId} icon={props.group.icon} size="56px" />
          <SizedBox flexSize={props.padding} />
          <StyledText type='body' fontWeight={500} textAlign='center'>{props.group.name}</StyledText>
          <SizedBox flexSize='2px' />
          <StyledText type='caption' textAlign='center'>{props.group.description}</StyledText>
          <SizedBox flexSize={props.padding} />
          <Flexible />
          <StyledText type='caption' textAlign='center' fontWeight={500}>
            {GroupUtils.getUserCountString(props.group.userCount)}
          </StyledText>
          <SizedBox flexSize={props.padding} />
          {
            isJoined ? <RaisedButton label='Leave' color='danger' width='100%' onTap={onLeave} disabled={loading || isAuthor} /> :
              <RaisedButton label='Join' color='success' width='100%' onTap={onJoin} disabled={loading} />
          }

        </Column>
      </SizedBox>
    </Loader>
  )
}