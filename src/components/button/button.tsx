import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Center } from '../center/center'
import { StyledText } from '../text/text'

export interface IButtonProps {
  onTap: () => void;
}

export interface IIconButtonProps {
  size: string;
  icon: IconDefinition;
  surface?: string;
  iconSize?: 'xs' | 'sm' | 'lg';
}

export const IconButton: React.FC<IButtonProps & IIconButtonProps> = (props) => {
  let color = 'text-muted'
  if (props.surface) {
    color = `on-${props.surface}-text-primary`
  }
  return (
    <div className='tappable' style={{
      width: props.size,
      height: props.size,
      borderRadius: '999px',
      zIndex: 1,
    }} onClick={props.onTap}>
      <Center>
        <FontAwesomeIcon icon={props.icon} color={`var(--color-${color})`} size={props.iconSize ?? 'sm'} />
      </Center>
    </div>
  )
}

export interface IRaisedButtonProps {
  label: string;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  width?: string;
  height?: string;
}

export const RaisedButton: React.FC<IButtonProps & IRaisedButtonProps> = (props) => {
  let type = props.type ?? 'primary'

  return (
    <div className='tappable' style={{
      width: props.width,
      height: props.height ?? '36px',
      borderRadius: '12px',
      backgroundColor: `var(--color-${type})`
    }}>
      <Center>
        <StyledText surface='dark' type='button'>
          {props.label}
        </StyledText>
      </Center>
    </div>
  )
}

export interface IFlatButtonProps {
  label: string;
  width?: string;
  height?: string;
}

export const FlatButton: React.FC<IButtonProps & IFlatButtonProps> = (props) => {
  return (
    <div className='tappable' style={{
      width: props.width,
      height: props.height ?? '36px',
      borderRadius: '12px',
    }}>
      <Center>
        <StyledText type='button'>
          {props.label}
        </StyledText>
      </Center>
    </div>
  )
}