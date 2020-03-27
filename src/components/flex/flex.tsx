import React from 'react'
import './flex.css';

type IFlexAlignment = 'flex-start' | 'center' | 'flex-end';
type IFlexSize = 'min' | 'max';

export interface IFlexType {
  type: 'row' | 'column';
}

export interface IFlexProps {
  mainAxisAlignment?: IFlexAlignment;
  crossAxisAlignment?: IFlexAlignment;
  mainAxisSize?: IFlexSize;
  crossAxisSize?: IFlexSize;
}

export const Flex: React.FC<IFlexProps & IFlexType> = (props) => {
  let width = 'auto'
  let height = 'auto'
  if (props.type === 'row') {
    width = (props.mainAxisSize === 'max') ? '100%' : 'auto'
    height = (props.crossAxisSize === 'max') ? '100%' : 'auto'
  }
  else {
    width = (props.crossAxisSize === 'max') ? '100%' : 'auto'
    height = (props.mainAxisSize === 'max') ? '100%' : 'auto'
  }

  return (
    <div className={`flex ${props.type}`} style={{
      justifyContent: props.mainAxisAlignment ?? 'flex-start',
      alignItems: props.crossAxisAlignment ?? 'flex-start',
      width,
      height,
    }}>
      {props.children}
    </div>
  )
}

export const Row: React.FC<IFlexProps> = (props) => {
  return (
    <Flex type='row'
      mainAxisAlignment={props.mainAxisAlignment}
      crossAxisAlignment={props.crossAxisAlignment}
      mainAxisSize={props.mainAxisSize ?? 'min'}
      crossAxisSize={props.crossAxisSize ?? 'min'}>
      {props.children}
    </Flex>
  )
}

export const Column: React.FC<IFlexProps> = (props) => {
  return (
    <Flex type='column'
      mainAxisAlignment={props.mainAxisAlignment}
      crossAxisAlignment={props.crossAxisAlignment}
      mainAxisSize={props.mainAxisSize ?? 'min'}
      crossAxisSize={props.crossAxisSize ?? 'min'}>
      {props.children}
    </Flex >
  )
}

export const Wrap: React.FC = (props) => {
  return (
    <div className='wrap'>
      {props.children}
    </div>
  )
}

export interface IFlexibleProps {
  flex?: number;
  style?: React.CSSProperties;
}

export const Flexible: React.FC<IFlexibleProps> = (props) => {
  let style = props.style ?? {}
  return (
    <div style={Object.assign(style, { flexGrow: props.flex ?? 1 })}>
      {props.children}
    </div >
  )
}