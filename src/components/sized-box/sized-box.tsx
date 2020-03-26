import React from 'react'

export interface ISizedBoxProps {
  width?: string;
  height?: string;
}

export const SizedBox: React.FC<ISizedBoxProps> = (props) => {
  return (
    <div style={{ width: props.width ?? '0px', height: props.height ?? '0px' }} />
  )
}