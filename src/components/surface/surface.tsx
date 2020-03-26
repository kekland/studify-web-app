import React from 'react'

export interface ISurfaceProps {
  backgroundColor?: string;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  style?: React.CSSProperties;
}

export const Surface: React.FC<ISurfaceProps> = (props) => {
  let style = props.style ?? {}
  let type = props.type ?? 'surface'

  return (
    <div style={Object.assign({
      borderRadius: '12px',
      backgroundColor: props.backgroundColor ?? `var(--color-${type})`,
    }, style)}>
      {props.children}
    </div>
  )
}