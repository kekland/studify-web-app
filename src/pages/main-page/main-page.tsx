import React, { useState } from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';
import { UserOwnerComponent } from '../../components/user-component/user-component';
import { MessageBar } from '../../components/message-bar/message-bar';
import { Column, Flexible } from '../../components/flex/flex';
import { GroupAppBar } from '../../components/group-app-bar/group-app-bar';
import { RootState, store } from '../../state/store';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TabPanel } from '../../components/main-page/tab-panel';
import { ModalCreateGroup } from '../../components/modal-create-group/modal-create-group';
import { useModal } from '../../components/modal/modal-hook';
import { api } from '../../api/api';
import { useAlert } from 'react-alert';
import { setGroupMessages, addGroupMessage, replaceGroupMessageByIdempotency } from '../../state/main';
import { IGroup } from '../../api/data/group';
import { MessagePanel } from '../../components/message-panel/message-panel';

export const MainPage: React.FC = ((props) => {
  const alert = useAlert()
  const [isLoading, setLoading] = useState(false)
  const auth = useSelector((state: RootState) => state.auth)
  const createGroupModal = useModal(false)
  const { groups, selectedGroup } = useSelector((state: RootState) => state.main)

  if (!auth.user) return <Redirect to='/auth' />

  const user = auth.user

  let appBarStyle: React.CSSProperties = {}
  if (selectedGroup) {
    appBarStyle = { backgroundColor: `var(--color-group-${selectedGroup.colorId})` }
  }

  const loadGroupMessages = async (group: IGroup) => {
    api.use(alert, async () => {
      const result = await api.messaging.loadMessages(group, 0)
      store.dispatch(setGroupMessages(result))
    })
  }

  const loadGroups = async () => {
    setLoading(true)
    for (const group of groups) {
      if (!group.isLoaded)
        await loadGroupMessages(group)
    }
    api.use(alert, async () => {
      api.messaging.attach({
        onNewGroupMessage: (message) => {
          store.dispatch(addGroupMessage(message))
        },
        onMessageSent: (message) => {
          store.dispatch(replaceGroupMessageByIdempotency(message))
        },
      })
    })
  }

  const sendMessage = async (body: string) => {
    api.use(alert, async () => {
      const message = await api.messaging.sendMessage(user, {
        groupId: selectedGroup?.id as string,
        body: body,
        attachments: undefined,
      })

      console.log('Sent message, dispatched')

      store.dispatch(addGroupMessage(message))
    })
  }

  if (!isLoading) {
    loadGroups()
  }

  return (
    <div className='main-page'>
      <ModalCreateGroup
        isOpen={createGroupModal.isOpen}
        onClose={createGroupModal.close} />
      <div className='app-bar app-bar-main' style={appBarStyle}>
        <AppBarMain />
      </div>
      <div className='app-bar app-bar-group' style={appBarStyle}>
        <GroupAppBar />
      </div>
      <div className='tab-panel'>
        <TabPanel
          onCreateNewGroup={createGroupModal.open}
        />
      </div>
      <div className='user-panel'>
        <UserOwnerComponent
          onTap={() => { }}
          onTapSettings={() => { }}
          user={auth.user}
          padding='12px' />
      </div>
      <div className='message-panel'>
        <Column mainAxisSize='max'>
          <Flexible style={{ width: '100%', height: '100%' }}>
            <MessagePanel />
          </Flexible>
          <div style={{ padding: '12px', width: '100%' }}>
            <MessageBar onSend={sendMessage} />
          </div>
        </Column>

      </div>
    </div>
  )
})