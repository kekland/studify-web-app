import React from 'react'

type Alignment = 'flex-start' | 'center' | 'flex-end';

export interface IAlignmentProps {
  expandWidth?: boolean;
  expandHeight?: boolean;
  alignmentHorizontal: Alignment;
  alignmentVertical: Alignment;
}

export const Alignment: React.FC<IAlignmentProps> = (props) => {
  let width = (props.expandWidth ?? true) ? '100%' : undefined
  let height = (props.expandHeight ?? true) ? '100%' : undefined

  return (
    <div style={{
      width, height, display: 'flex',
      justifyContent: props.alignmentHorizontal,
      alignItems: props.alignmentVertical
    }}>
      {props.children}
    </div>
  )
}