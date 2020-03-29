import React, { useState } from 'react'
import { Modal, IModalProps } from '../modal/modal'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { Column } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { faUsers, faQuoteLeft, IconName } from '@fortawesome/free-solid-svg-icons'
import { GroupAvatarSelector } from '../group-avatar-selector/group-avatar-selector'
import { RaisedButton } from '../button/button'
import { useForm } from 'react-hook-form'
import { methods } from '../../api/methods/methods'

export interface ICreateGroupFormData {
  name: string;
  description: string;
}

export interface ICreateGroupData {
  name: string;
  description: string;
  colorId: number;
  icon: string;
}

export const ModalCreateGroup: React.FC<IModalProps> = (props) => {
  const { handleSubmit, errors, register } = useForm<ICreateGroupFormData>()
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState<string>('')
  const [colorId, setColor] = useState<number>(1)
  const [icon, setIcon] = useState<IconName>('language')

  const onSubmit = async (data: ICreateGroupFormData) => {
    setLoading(true)
    await methods.group.create({
      ...data,
      colorId,
      icon,
    }, props.onClose)
    setLoading(false)
  }

  return (
    <Modal isOpen={props.isOpen} isLoading={loading} onClose={props.onClose}>
      <StyledText type='heading'>Create a new group</StyledText>
      <SizedBox height='24px' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Column>
          <InputField
            name='name'
            icon={faUsers}
            placeholder='Group name'
            ref={register({ required: true })}
            onChanged={setName}
            errored={errors.name != null} />
          <SizedBox height='12px' />
          <InputField
            name='description'
            icon={faQuoteLeft}
            placeholder='Description'
            ref={register({ required: true })}
            errored={errors.description != null} />
          <SizedBox height='12px' />
          <GroupAvatarSelector
            color={colorId}
            icon={icon}
            onColorChanged={setColor}
            onIconChanged={setIcon}
            groupName={name}
          />
          <SizedBox height='24px' />
          <RaisedButton
            width="100%"
            label='Create'
            type='submit'
            disabled={Object.keys(errors).length > 0} />
        </Column>
      </form>

    </Modal>
  )
}