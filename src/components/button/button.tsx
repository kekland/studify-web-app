import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Center } from '../center/center'
import { StyledText } from '../text/text'

export interface IButtonProps {
  onTap?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface IIconButtonProps {
  size: string;
  icon: IconDefinition;
  surface?: string;
  iconSize?: 'xs' | 'sm' | 'lg';
}

export const IconButton: React.FC<IButtonProps & IIconButtonProps> = (props) => {
  let className: string = props.disabled ? 'disabled' : 'tappable'
  let color = 'text-muted'
  if (props.surface) {
    color = `on-${props.surface}-text-primary`
  }
  if (props.disabled) {
    color = 'text-disabled';
  }

  return (
    <button className={className} style={{
      width: props.size,
      height: props.size,
      borderRadius: '999px',
      backgroundColor: 'transparent',
    }} disabled={props.disabled}
      onClick={props.onTap}
      type={props.type ?? 'button'}>
      <Center>
        <FontAwesomeIcon icon={props.icon} color={`var(--color-${color})`} size={props.iconSize ?? 'sm'} />
      </Center>
    </button>
  )
}

export interface IRaisedButtonProps {
  label: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  width?: string;
  height?: string;
}

export const RaisedButton: React.FC<IButtonProps & IRaisedButtonProps> = (props) => {
  let style: string = props.color ?? 'primary'
  let className: string = props.disabled ? 'disabled' : 'tappable'
  let textColor: 'primary' | 'disabled' = props.disabled ? 'disabled' : 'primary';
  if (props.disabled) style = 'control'

  return (
    <button className={className} style={{
      width: props.width,
      height: props.height ?? '36px',
      borderRadius: '12px',
      backgroundColor: `var(--color-${style})`
    }} disabled={props.disabled}
      onClick={props.onTap}
      type={props.type ?? 'button'}>
      <Center>
        <StyledText surface='dark' type='button' color={textColor}>
          {props.label}
        </StyledText>
      </Center>
    </button>
  )
}

export interface IFlatButtonProps {
  label: string;
  width?: string;
  height?: string;
}

export const FlatButton: React.FC<IButtonProps & IFlatButtonProps> = (props) => {
  let className: string = props.disabled ? 'disabled' : 'tappable'

  return (
    <button className={className} style={{
      width: props.width,
      height: props.height ?? '36px',
      borderRadius: '12px',
      backgroundColor: 'transparent',
    }} disabled={props.disabled} type={props.type ?? 'button'} onClick={props.onTap}>
      <Center>
        <StyledText type='button' color={props.disabled ? 'disabled' : 'primary'}>
          {props.label}
        </StyledText>
      </Center>
    </button>
  )
}