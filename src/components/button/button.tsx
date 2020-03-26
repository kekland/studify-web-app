import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Center } from '../center/center'

export interface IIconButtonProps {
  size: string;
  icon: IconDefinition;
  onTap: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = (props) => {
  return (
    <div className='tappable' style={{
      width: props.size,
      height: props.size,
      borderRadius: '999px',
      zIndex: 1,
    }} onClick={props.onTap}>
      <Center>
        <FontAwesomeIcon icon={props.icon} color='var(--color-text-muted)' />
      </Center>
    </div>
  )
}