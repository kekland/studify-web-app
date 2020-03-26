import React from 'react'
import './flex.css';

type IFlexAlignment = 'flex-start' | 'center' | 'flex-end';

export interface IFlexType {
  type: 'row' | 'column';
}

export interface IFlexProps {
  mainAxisAlignment?: IFlexAlignment;
  crossAxisAlignment?: IFlexAlignment;
}

export const Flex: React.FC<IFlexProps & IFlexType> = (props) => {
  return (
    <div className={`flex ${props.type}`} style={{
      justifyContent: props.mainAxisAlignment ?? 'flex-start',
      alignItems: props.crossAxisAlignment ?? 'flex-start'
    }}>
      {props.children}
    </div>
  )
}

export const Row: React.FC<IFlexProps> = (props) => {
  return (
    <Flex type='row' mainAxisAlignment={props.mainAxisAlignment} crossAxisAlignment={props.crossAxisAlignment}>
      {props.children}
    </Flex>
  )
}

export const Column: React.FC<IFlexProps> = (props) => {
  return (
    <Flex type='column' mainAxisAlignment={props.mainAxisAlignment} crossAxisAlignment={props.crossAxisAlignment}>
      {props.children}
    </Flex>
  )
}