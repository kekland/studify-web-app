import React from 'react'
import { IModalProps, Modal } from '../modal/modal'
import { Column } from '../flex/flex'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'

export const ModalUser: React.FC<IModalProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Column>
        <StyledText type='heading'>User information</StyledText>
        <SizedBox height='24px' />
      </Column>
    </Modal>
  )
}