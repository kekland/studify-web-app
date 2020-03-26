import React from 'react'

export interface ICenterProps {
  expandWidth?: boolean;
  expandHeight?: boolean;
}

export const Center: React.FC<ICenterProps> = (props) => {
  let width = (props.expandWidth ?? true) ? '100%' : undefined
  let height = (props.expandHeight ?? true) ? '100%' : undefined

  return (
    <div style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {props.children}
    </div>
  )
}