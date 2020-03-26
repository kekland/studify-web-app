import React from 'react'
import { Row, Flexible } from '../flex/flex'
import { IconButton } from '../button/button'
import { faPaperclip, faPaperPlane, faShare, faGrin, faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import { InputFieldTransparent } from '../input-field/input-field'
import { SizedBox } from '../sized-box/sized-box'

export interface IMessageBarProps {
  onSendTap: (message: string) => void;
}

export const MessageBar: React.FC = (props) => {
  return (
    <SizedBox width='100%' style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: '12px',
    }}>
      <Row crossAxisAlignment='center'>
        <IconButton icon={faPaperclip} onTap={() => { }} size='64px' iconSize='lg' />
        <SizedBox width="6px" />
        <Flexible>
          <InputFieldTransparent width='100%' height='48px' placeholder='Message in AP Science 2' />
        </Flexible>
        <SizedBox width="6px" />
        <IconButton icon={faShare} onTap={() => { }} size='64px' iconSize='lg' />
      </Row>
    </SizedBox>
  )
}