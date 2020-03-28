import React from 'react'
import { Column } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { RaisedButton } from '../button/button'
import { useForm } from 'react-hook-form'

export interface ISignInFormData {
  username: string;
  password: string;
}

export interface ISignInFormProps {
  onSubmit: (data: ISignInFormData) => void;
}

export const SignInForm: React.FC<ISignInFormProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<ISignInFormData>()
  const onSubmit = (data: any) => props.onSubmit(data)

  return (
    <Column crossAxisSize='max'>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <StyledText type='heading'>Sign in</StyledText>
        <SizedBox height='24px' />

        <InputField
          name="username"
          ref={register({ required: true })}
          placeholder="Username"
          icon={faUser}
          type='text'
          errored={errors.username != null}
          removeBorderBottom />
        <InputField
          name='password'
          ref={register({ required: true })}
          placeholder="Password"
          icon={faLock}
          type='password'
          errored={errors.password != null}
          removeBorderTop
          toggleable />

        <SizedBox height='24px' />
        <RaisedButton
          width='100%'
          label='Sign in'
          type='submit'
          disabled={Object.keys(errors).length > 0} />
      </form>
    </Column >
  )
}