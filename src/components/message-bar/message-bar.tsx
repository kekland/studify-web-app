import React from 'react'
import { Row, Flexible } from '../flex/flex'
import { IconButton } from '../button/button'
import { faPaperclip, faPaperPlane, faShare, faGrin, faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import { InputFieldTransparent } from '../input-field/input-field'
import { SizedBox } from '../sized-box/sized-box'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

export interface IMessageBarProps {
  onSendTap: (message: string) => void;
}

export const MessageBar: React.FC<IMessageBarProps> = (props) => {
  const selectedGroup = useSelector((state: RootState) => state.main.selectedGroup)
  if (selectedGroup) {
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
  else {
    return <div />
  }
}