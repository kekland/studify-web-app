import React from 'react'

export interface ISizedBoxProps {
  width?: string;
  height?: string;
  className?: string;
  padding?: string;
  onTap?: () => void;
  style?: React.CSSProperties
  flexSize?: string;
}

export const SizedBox: React.FC<ISizedBoxProps> = (props) => {
  let style = props.style ?? {}
  return (
    <div
      className={props.className}
      style={{
        width: props.width,
        height: props.height,
        padding: props.padding,
        flex: `0 0 ${props.flexSize}`,
        ...style,
      }}
      onClick={props.onTap}>
      {props.children}
    </div>
  )
}