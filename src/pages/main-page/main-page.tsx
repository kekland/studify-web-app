import React, { useState } from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';
import { UserOwnerComponent } from '../../components/user-component/user-component';
import { MessageBar } from '../../components/message-bar/message-bar';
import { Column, Flexible } from '../../components/flex/flex';
import { GroupAppBar } from '../../components/group-app-bar/group-app-bar';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TabPanel } from '../../components/main-page/tab-panel';
import { ModalCreateGroup } from '../../components/modal-create-group/modal-create-group';
import { useModal } from '../../components/modal/modal-hook';

export const MainPage: React.FC = ((props) => {
  const auth = useSelector((state: RootState) => state.auth)
  const createGroupModal = useModal(false)
  const selectedGroup = useSelector((state: RootState) => state.main.selectedGroup)

  if (!auth.user) return <Redirect to='/auth' />

  let appBarStyle: React.CSSProperties = {}
  if (selectedGroup) {
    appBarStyle = { backgroundColor: `var(--color-group-${selectedGroup.colorId})` }
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
          <Flexible style={{ width: '100%' }}>
          </Flexible>
          <div style={{ padding: '12px', width: '100%' }}>
            <MessageBar onSendTap={() => { }} />
          </div>
        </Column>

      </div>
    </div>
  )
})