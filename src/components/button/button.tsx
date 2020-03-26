import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Center } from '../center/center'

export interface IIconButtonProps {
  size: string;
  icon: IconDefinition;
  onTap: () => void;
  surface?: string;
  iconSize?: 'xs' | 'sm' | 'lg';
}

export const IconButton: React.FC<IIconButtonProps> = (props) => {
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