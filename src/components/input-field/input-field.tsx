import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { Center } from '../center/center'

export interface IInputFieldProps {
  width?: string;
  height?: string;
  placeholder?: string;
  type?: string;
}

export interface IInputFieldOpaqueProps {
  icon?: IconDefinition;
  removeBorderTop?: boolean;
  removeBorderBottom?: boolean;
  iconInset?: boolean;
}

export const InputFieldTransparent: React.FC<IInputFieldProps> = (props) => {
  return (
    <input style={{
      width: props.width ?? '100%', height: props.height ?? '48px',
    }} placeholder={props.placeholder} type={props.type} >

    </input>
  )
}

export const InputField: React.FC<IInputFieldOpaqueProps & IInputFieldProps> = (props) => {
  return (
    <div className='control' style={{
      borderTopLeftRadius: props.removeBorderTop ? '0' : '12px',
      borderTopRightRadius: props.removeBorderTop ? '0' : '12px',
      borderBottomLeftRadius: props.removeBorderBottom ? '0' : '12px',
      borderBottomRightRadius: props.removeBorderBottom ? '0' : '12px',
      paddingLeft: '12px',
      paddingRight: '12px',
      width: props.width ?? '100%',
    }}>
      <Row crossAxisAlignment='center'>
        {props.icon ?
          [
            <SizedBox width='24px'>
              <Center>
                <FontAwesomeIcon icon={props.icon} color='var(--color-text-muted)' />
              </Center>
            </SizedBox>,
            <SizedBox width='12px' />
          ] : []
        }
        {(!props.icon && props.iconInset) && <SizedBox width='36px' />}
        <InputFieldTransparent width={props.width}
          height={props.height}
          placeholder={props.placeholder}
          type={props.type} />
      </Row>
    </div>
  )
}