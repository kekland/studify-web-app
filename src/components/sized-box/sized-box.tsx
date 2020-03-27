import React from 'react'

export interface ISizedBoxProps {
  width?: string;
  height?: string;
  className?: string;
  padding?: string;
  onTap?: () => void;
  style?: React.CSSProperties
}

export const SizedBox: React.FC<ISizedBoxProps> = (props) => {
  let style = props.style ?? {}
  return (
    <div
      className={props.className}
      style={Object.assign(style, {
        width: props.width,
        height: props.height,
        padding: props.padding,
        flex: `0 0 ${props.width}`
      })}
      onClick={props.onTap}>
      {props.children}
    </div>
  )
}