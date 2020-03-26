import React from 'react'

export interface ISizedBoxProps {
  width?: string;
  height?: string;
  className?: string;
  padding?: string;
  onTap?: () => void;
}

export const SizedBox: React.FC<ISizedBoxProps> = (props) => {
  return (
    <div
      className={props.className}
      style={{ width: props.width, height: props.height, padding: props.padding }}
      onClick={props.onTap}>
      {props.children}
    </div>
  )
}