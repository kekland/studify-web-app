import React, { useState, useEffect } from 'react'
import { Modal } from '../modal/modal'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { api } from '../../api/api'
import { useAlert } from 'react-alert'
import { IGroupMinimal } from '../../api/data/group'
import Scrollbars from 'react-custom-scrollbars'
import { GroupVertical } from '../group-component/group-component'
import { Row, Wrap } from '../flex/flex'
import { InputField } from '../input-field/input-field'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
      setLoading(false)
    })
  }, [alert])

  return (
    <Modal isOpen={props.isOpen} isLoading={loading} onClose={props.onClose}>
      <StyledText type='heading'>Search for groups</StyledText>
      <SizedBox height='24px' />
      <InputField placeholder='Search' width='100%' icon={faSearch} />
      <SizedBox height='24px' />
      <Wrap style={{justifyContent: 'space-between', minWidth: '225px'}}>
        {
          groups.map((group) => <div style={{ marginBottom: '16px' }}>
            <GroupVertical group={group} padding='12px' height='220px' />
          </div>)
        }
      </Wrap>
    </Modal>
  )
}