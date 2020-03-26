import React from 'react'
import { Column } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import { RaisedButton } from '../button/button'
import { useForm } from 'react-hook-form'

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignInFormProps {
  onSubmit: (data: ISignInData) => void;
}

export const SignInForm: React.FC<ISignInFormProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<ISignInData>()
  const onSubmit = (data: any) => props.onSubmit(data)

  return (
    <Column crossAxisSize='max'>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <StyledText type='heading'>Sign in</StyledText>
        <SizedBox height='24px' />

        <InputField
          name="email"
          ref={register({ required: true })}
          placeholder="Email"
          icon={faAt}
          type='email'
          errored={errors.email != null}
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