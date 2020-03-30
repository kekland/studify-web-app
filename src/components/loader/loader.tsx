import React from 'react'
import ReactLoader from 'react-loaders'
import 'loaders.css'
import { Center } from '../center/center'

export interface ILoaderProps {
  borderRadius?: string;
  isLoading: boolean;
  width?: string | number;
  height?: string;
  style?: React.CSSProperties;
}

export const Loader: React.FC<ILoaderProps> = (props) => {
  return (
    <div style={{
      width: props.width ?? '100%',
      height: props.height ?? '100%',
      position: 'relative',
      ...props.style,
    }}>
      {props.children}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: props.borderRadius ?? '0',
        position: 'absolute',
        display: props.isLoading ? 'block' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }} >
        <Center>
          <ReactLoader type='ball-scale-multiple' active />
        </Center>
      </div>
    </div>
  )
}