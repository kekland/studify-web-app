import React, { useState, useEffect } from 'react'
import { IModalProps, Modal } from '../modal/modal'
import { Column, Row, Flexible } from '../flex/flex'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { UserComponent } from '../user-component/user-component'
import { RootState } from '../../state/store'
import { useSelector } from 'react-redux'
import { IconButton } from '../button/button'
import { faUserPlus, faPaperPlane, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { IUserOwner } from '../../api/data/user'
import { useAlert } from 'react-alert'
import { api } from '../../api/api'
import { Loader } from '../loader/loader'
import { GroupListDisplay } from '../group-list-display/group-list-display'

export const ModalUser: React.FC<IModalProps> = (props) => {
  const alert = useAlert()
  const selectedUser = useSelector((state: RootState) => state.main.selectedUser)
  const [userData, setUserData] = useState<IUserOwner | undefined>(undefined)

  useEffect(() => {
    api.use(alert, async () => {
      if (!selectedUser) return

      const data = await api.user.getUserData(selectedUser.id)
      setUserData(data)
    })
  }, [selectedUser, alert])

  if (!selectedUser) return <div />
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Column crossAxisSize='max' mainAxisSize='max'>
        <StyledText type='heading'>User information</StyledText>
        <SizedBox height='24px' />
        <Row mainAxisSize='max' crossAxisAlignment='center'>
          <Flexible>
            <UserComponent user={selectedUser} verticalPadding='12px' />
          </Flexible>
          <IconButton icon={faPaperPlane} size='48px' iconSize='lg' />
          <IconButton icon={faEnvelope} size='48px' iconSize='lg' />
          <IconButton icon={faUserPlus} size='48px' iconSize='lg' />
        </Row>
        <SizedBox height='24px' />
        <StyledText type='subhead' color='muted'>Active in these groups</StyledText>
        <SizedBox height='24px' />
        <Loader isLoading={userData == null} borderRadius='12px' style={{ width: '100%', height: '100%' }}>
          <GroupListDisplay groups={userData?.groups ?? []} />
        </Loader>
      </Column>
    </Modal>
  )
}