import React from 'react'
import { Modal } from '../modal/modal'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { Column } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { faUsers, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { GroupAvatarSelector } from '../group-avatar-selector/group-avatar-selector'
import { RaisedButton } from '../button/button'

export const ModalCreateGroup: React.FC = (props) => {
  return (
    <Modal isOpen={true}>
      <StyledText type='heading'>Create a new group</StyledText>
      <SizedBox height='24px' />

      <Column>
        <InputField
          icon={faUsers}
          placeholder='Group name' />

        <SizedBox height='12px' />

        <InputField
          icon={faQuoteLeft}
          placeholder='Description' />

        <SizedBox height='12px' />

        <GroupAvatarSelector />

        <SizedBox height='24px' />

        <RaisedButton width="100%" label='Create' />
      </Column>

    </Modal>
  )
}