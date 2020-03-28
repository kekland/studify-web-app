import React, { useState, useEffect } from 'react'
import { Modal } from '../modal/modal'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { Column, Row } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { faUsers, faQuoteLeft, IconName } from '@fortawesome/free-solid-svg-icons'
import { GroupAvatarSelector } from '../group-avatar-selector/group-avatar-selector'
import { RaisedButton } from '../button/button'
import { useForm } from 'react-hook-form'
import { api } from '../../api/api'
import { useAlert } from 'react-alert'
import { store } from '../../state/store'
import { addGroup, selectGroup } from '../../state/main'
import { IGroupMinimal } from '../../api/data/group'
import Scrollbars from 'react-custom-scrollbars'
import { GroupVertical } from '../group-component/group-component'

export interface IModalSearchGroupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSearchGroup: React.FC<IModalSearchGroupProps> = (props) => {
  const alert = useAlert()
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState<IGroupMinimal[]>([])

  useEffect(() => {
    api.use(alert, async () => {
      setLoading(true)
      const groups = await api.group.getAll()
      setGroups(groups)
      console.log(groups)
      setLoading(false)
    })
  }, [alert])

  return (
    <Modal isOpen={props.isOpen} isLoading={loading} onClose={props.onClose}>
      <StyledText type='heading'>Search for groups</StyledText>
      <SizedBox height='24px' />
      <SizedBox width='100%' height='275px'>
        <Scrollbars autoHide>
          <Row crossAxisSize='max'>
            {
              groups.map((group) => (
                <div
                  style={{ marginRight: '16px', height: '100%' }}
                  key={group.id}>
                  <GroupVertical
                    group={group}
                    padding='16px' />
                </div>
              ))
            }
          </Row>
        </Scrollbars>
      </SizedBox>
    </Modal>
  )
}