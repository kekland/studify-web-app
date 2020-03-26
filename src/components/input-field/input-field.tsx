import React, { useState } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Flexible } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { Center } from '../center/center'
import { IconButton } from '../button/button'
import { faEye, faEyeSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Alignment } from '../alignment/alignment'

export interface IInputFieldProps {
  width?: string;
  height?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export interface IInputFieldOpaqueProps {
  icon?: IconDefinition;
  removeBorderTop?: boolean;
  removeBorderBottom?: boolean;
  iconInset?: boolean;
  toggleable?: boolean;
  errored?: boolean;
}

export const InputFieldTransparent: React.ForwardRefExoticComponent<IInputFieldProps> =
  React.forwardRef<HTMLInputElement, IInputFieldProps>((props, ref) => {
    return (
      <input style={{
        width: props.width ?? '100%', height: props.height ?? '48px',
      }} placeholder={props.placeholder} type={props.type} name={props.name} ref={ref} />
    )
  })

export const InputField: React.ForwardRefExoticComponent<IInputFieldOpaqueProps & IInputFieldProps> =
  React.forwardRef<HTMLInputElement, IInputFieldOpaqueProps & IInputFieldProps>((props, ref) => {
    const [type, setType] = useState(props.type ?? 'text')

    const isHidden = type === 'password'
    const toggleType = () => {
      setType(isHidden ? 'text' : 'password')
    }

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
          {props.icon &&
            <SizedBox width='32px'>
              <Alignment alignmentHorizontal='flex-start' alignmentVertical='center'>
                <FontAwesomeIcon icon={props.icon} color='var(--color-text-muted)' />
              </Alignment>
            </SizedBox>
          }
          {(!props.icon && props.iconInset) && <SizedBox width='36px' />}
          <Flexible>
            <input style={{
              width: '100%', height: props.height ?? '48px',
            }} placeholder={props.placeholder} type={type} name={props.name} ref={ref} />
          </Flexible>

          {
            props.toggleable &&
            <IconButton size='36px'
              onTap={() => toggleType()}
              icon={isHidden ? faEyeSlash : faEye} />
          }
          {
            props.errored &&
            <SizedBox width='32px'>
              <Alignment alignmentHorizontal='flex-end' alignmentVertical='center'>
                <FontAwesomeIcon icon={faExclamationTriangle} color='var(--color-danger-light)' />
              </Alignment>
            </SizedBox>
          }
        </Row>
      </div >
    )
  })