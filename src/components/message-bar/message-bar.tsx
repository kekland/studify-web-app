import React, { useState, createRef } from 'react'
import { Row, Flexible } from '../flex/flex'
import { IconButton } from '../button/button'
import { faPaperclip, faShare } from '@fortawesome/free-solid-svg-icons'
import { InputFieldTransparent } from '../input-field/input-field'
import { SizedBox } from '../sized-box/sized-box'
import { useAlert } from 'react-alert'
import { api } from '../../api/api'
import { useSelectedGroup } from '../../hooks/hooks'
import { methods } from '../../api/methods/methods'

export const MessageBar: React.FC = (props) => {
  const alert = useAlert()
  const selectedGroup = useSelectedGroup()
  const inputRef = createRef<HTMLInputElement>()

  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState<number>(-1)
  const [isTyping, setTyping] = useState<boolean>(false)

  const sendTypingStatus = (status: boolean) => {
    api.use(alert, async () => {
      if (selectedGroup)
        await api.messaging.updateTypingStatus(selectedGroup.data, status)
    })
  }

  const sendMessage = () => {
    if (!selectedGroup)
      return
    if (inputRef.current)
      inputRef.current.value = ""

    methods.messaging.sendMessage(selectedGroup, { body: message })
    setMessage('')
  }

  const onMessageChanged = (body: string) => {
    setMessage(body)
    if (!isTyping) sendTypingStatus(true)
    setTyping(true)

    if (timer !== -1)
      clearTimeout(timer)

    setTimer(setTimeout(() => {
      if (isTyping) sendTypingStatus(false)
      setTyping(false)
    }, 1000))
  }

  if (selectedGroup) {
    return (
      <SizedBox width='100%' style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '12px',
      }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Row crossAxisAlignment='center'>
            <IconButton icon={faPaperclip} onTap={() => { }} size='64px' iconSize='lg' />
            <SizedBox width="6px" />
            <Flexible>
              <InputFieldTransparent
                width='100%'
                height='48px'
                ref={inputRef}
                placeholder={`Message in ${selectedGroup.data.name}`}
                onChanged={onMessageChanged} />
            </Flexible>
            <SizedBox width="6px" />
            <IconButton
              icon={faShare}
              onTap={sendMessage}
              size='64px'
              iconSize='lg'
              type='submit'
              disabled={message.length === 0} />
          </Row>
        </form>
      </SizedBox>
    )
  }
  else {
    return <div />
  }
}