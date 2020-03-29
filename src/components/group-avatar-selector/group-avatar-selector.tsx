import React from 'react'
import { Column, Row, Wrap, Flexible } from '../flex/flex'
import { StyledText } from '../text/text'
import { GroupAvatar } from '../group-avatar/group-avatar'
import { SizedBox } from '../sized-box/sized-box'
import groupIcons from '../../icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Center } from '../center/center'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { GroupUtils } from '../../api/data/group'

interface IGroupSelector<T> {
  selected: T;
  onSelected: (item: T) => void;
}

const GroupColorSelector: React.FC<IGroupSelector<number>> = (props) => {
  const colors = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <Wrap>
      {
        colors.map(color => <div
          key={color}
          className='tappable'
          onClick={() => props.onSelected(color)}
          style={{
            backgroundColor: `var(--color-group-${color}`,
            borderRadius: '12px',
            width: '36px',
            height: '36px',
            marginLeft: '4px',
            marginRight: '4px',
            marginBottom: '4px',
            border: props.selected === color ? '4px solid rgba(255, 255, 255, 0.2)' : undefined,
          }} />)
      }
    </Wrap>)
}

const GroupIconSelector: React.FC<IGroupSelector<IconName>> = (props) => {
  return (
    <Wrap>
      {
        groupIcons.map((icon, i) => <div
          key={i}
          className='tappable'
          onClick={() => props.onSelected(icon.iconName)}
          style={{
            width: '36px', height: '36px',
            borderRadius: '6px',
            marginLeft: '4px', marginRight: '4px'
          }}>
          <Center>
            <FontAwesomeIcon
              icon={icon}
              size='lg'
              color={props.selected === icon.iconName ?
                'var(--color-text-primary)' : 'var(--color-text-muted)'} />
          </Center>
        </div>)
      }
    </Wrap>)
}

export interface IGroupAvatarSelectorProps {
  groupName: string;
  color: number;
  icon: IconName;
  onColorChanged: (color: number) => void;
  onIconChanged: (icon: IconName) => void;
}

export const GroupAvatarSelector: React.FC<IGroupAvatarSelectorProps> = (props) => {
  return (
    <div style={{ backgroundColor: 'var(--color-control)', borderRadius: '12px', padding: '16px' }}>
      <Row>
        <GroupAvatar
          size='56px'
          colorId={props.color}
          icon={props.icon}
          name={GroupUtils.getShortName(props.groupName)}
        />
        <SizedBox flexSize='16px' />
        <Flexible>
          <Column>
            <StyledText fontWeight={500} color='muted'>Create your style</StyledText>
            <SizedBox height='4px' />
            <StyledText type='caption'>Choose a color</StyledText>
            <SizedBox height='4px' />
            <GroupColorSelector selected={props.color} onSelected={props.onColorChanged} />
            <SizedBox height='8px' />
            <StyledText type='caption'>Choose an icon</StyledText>
            <GroupIconSelector selected={props.icon} onSelected={props.onIconChanged} />
          </Column>
        </Flexible>
      </Row>
    </div>
  )
}