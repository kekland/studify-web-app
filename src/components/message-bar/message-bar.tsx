import React, { useState, createRef } from 'react'
import { Row, Flexible, Column } from '../flex/flex'
import { IconButton } from '../button/button'
import { faPaperclip, faShare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { InputFieldTransparent } from '../input-field/input-field'
import { SizedBox } from '../sized-box/sized-box'
import { useAlert } from 'react-alert'
import { api } from '../../api/api'
import { useSelectedGroup } from '../../hooks/hooks'
import { methods } from '../../api/methods/methods'
import { FileAttachment, ReplyAttachment } from '../message-attachments/message-attachments'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { setReplyingTo } from '../../state/messaging'

export const MessageBar: React.FC = (props) => {
  const alert = useAlert()
  const selectedGroup = useSelectedGroup()
  const inputRef = createRef<HTMLInputElement>()
  const fileRef = createRef<HTMLInputElement>()

  const user = useSelector((state: RootState) => state.auth.user)
  const replyingTo = useSelector((state: RootState) => state.messaging.replyingTo)
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState<number>(-1)
  const [isTyping, setTyping] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  const sendTypingStatus = (status: boolean) => {
    api.use(alert, async () => {
      if (selectedGroup)
        await api.messaging.updateTypingStatus(selectedGroup.data, status)
    })
  }

  const sendMessage = () => {
    if (!selectedGroup)
      return
    if (!user)
      return

    if (inputRef.current)
      inputRef.current.value = ""

    methods.messaging.sendMessage(selectedGroup, user, { body: message, attachments: { files, replyTo: replyingTo } })
    setMessage('')
    setFiles([])
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
        <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
          <Column crossAxisSize='max'>
            {replyingTo ?
              <Row style={{ padding: '12px', width: '100%' }}>
                <IconButton icon={faTimes} size='56px' onTap={() => store.dispatch(setReplyingTo(undefined))} />
                <ReplyAttachment replyingTo={replyingTo} />
              </Row> :
              <div />}
            <Row crossAxisAlignment='center' mainAxisSize='max'>
              <IconButton icon={faPaperclip} onTap={() => fileRef.current?.click()} disabled={files.length >= 5} size='64px' iconSize='lg' />
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
            {
              files.map(file =>
                <FileAttachment padding="0px 12px 12px 0px" file={file} key={file.name}
                  onDelete={() => setFiles(files.filter(f => f.name !== file.name))} />)
            }
          </Column>
        </form>
        <input type='file' style={{ display: 'none' }} ref={fileRef} disabled={files.length >= 5}
          onChange={(e) => setFiles([...files, ...Array.from(e.target.files as FileList)])} />
      </SizedBox>
    )
  }
  else {
    return <div />
  }
}