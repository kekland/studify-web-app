import React from 'react'
import { IModalProps, Modal } from '../modal/modal'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { setTheme } from '../../state/preferences'

export const ModalSettings: React.FC<IModalProps> = (props) => {
  const preferences = useSelector((state: RootState) => state.preferences)

  const onThemeChange = (newTheme: string) => {
    store.dispatch(setTheme(newTheme))
  }

  return (
    <Modal {...props}>
      <StyledText type='heading'>Settings</StyledText>
      <SizedBox height='24px' />
      <select placeholder='Theme' value={preferences.theme} onChange={(e) => onThemeChange(e.target.value)}>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
    </Modal>
  )
}