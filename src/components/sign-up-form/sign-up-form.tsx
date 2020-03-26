import React from 'react'
import { Column, Row } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { faAt, faLock, faAngleLeft, faSmile, faUser } from '@fortawesome/free-solid-svg-icons'
import { RaisedButton, IconButton } from '../button/button'
import { useForm } from 'react-hook-form'

export interface ISignUpFormData {
  username: string;
  name: string;
  email: string;

  password: string;
}

export interface ISignUpFormProps {
  onBackTap: () => void;
  onSubmit: (data: ISignUpFormData) => void;
}

export const SignUpForm: React.FC<ISignUpFormProps> = (props) => {
  const { register, errors, handleSubmit } = useForm<ISignUpFormData>()
const onSubmit = (data: any) => props.onSubmit(data)

return (
  <Column crossAxisSize='max'>
    <Row crossAxisAlignment='center'>
      <IconButton size='36px' icon={faAngleLeft} iconSize='lg' onTap={props.onBackTap} />
      <SizedBox width='8px' />
      <StyledText type='heading'>Sign up</StyledText>
    </Row>
    <SizedBox height='24px' />

    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name='username'
        placeholder="Username"
        icon={faUser}
        type='text'
        ref={register({ required: true, minLength: 6 })}
        errored={errors.username != null} />

      <SizedBox height='12px' />

      <InputField
        name='name'
        placeholder="Name"
        icon={faSmile}
        type='text'
        ref={register({ required: true })}
        errored={errors.name != null} />

      <SizedBox height='12px' />

      <InputField
        name='email'
        placeholder="Email"
        icon={faAt}
        type='email'
        ref={register({ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        errored={errors.email != null} />

      <SizedBox height='12px' />

      <InputField
        name='password'
        placeholder="Password"
        icon={faLock}
        type='password'
        toggleable
        ref={register({ required: true, minLength: 8 })}
        errored={errors.password != null} />

      <SizedBox height='24px' />
      <RaisedButton width='100%'
        label='Register'
        style='primary'
        type='submit'
        disabled={Object.keys(errors).length > 0} />
    </form>
  </Column>
)
}