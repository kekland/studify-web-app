import React from 'react'

export interface IInputFieldTransparentProps {
  width?: string;
  height?: string;
  placeholder: string;
}

export const InputFieldTransparent: React.FC<IInputFieldTransparentProps> = (props) => {
  return (
    <input style={{
      width: props.width, height: props.height,
    }} placeholder={props.placeholder} >

    </input>
  )
}