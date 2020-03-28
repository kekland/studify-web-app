import React, { useEffect } from 'react'
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
import { MessagePanel } from '../../components/message-panel/message-panel';
import { ModalSearchGroup } from '../../components/modal-search-group/modal-search-group';
import { useScreenSize, useSelectedGroup } from '../../hooks/hooks';
import { MainPageDrawer } from '../../components/main-page/main-page-drawer';
import { methods } from '../../api/methods/methods';

export const MainPage: React.FC = ((props) => {
  const isMobile = useScreenSize(768)

  const auth = useSelector((state: RootState) => state.auth)
  const selectedGroup = useSelectedGroup()

  const createGroupModal = useModal(false)
  const searchGroupModal = useModal(false)

  useEffect(() => {
    methods.initializeSocket()
    return methods.closeSocket
  }, [])

  if (!auth.user) return <Redirect to='/auth' />

  let appBarStyle: React.CSSProperties = {}
  if (selectedGroup) {
    appBarStyle = { backgroundColor: `var(--color-group-${selectedGroup.data.colorId})` }
  }
  return (
    <div className={isMobile ? 'main-page-mobile' : 'main-page-desktop'}>
      <MainPageDrawer
        onCreateGroup={createGroupModal.open}
        onSearchGroup={searchGroupModal.open}
        onUserTap={() => { }}
        onUserTapSettings={() => { }}
        user={auth.user} />
      <ModalCreateGroup
        isOpen={createGroupModal.isOpen}
        onClose={createGroupModal.close} />
      <ModalSearchGroup
        isOpen={searchGroupModal.isOpen}
        onClose={searchGroupModal.close} />
      <div className='app-bar app-bar-main hidden-on-mobile' style={appBarStyle}>
        {
          isMobile ? <div /> :
            <AppBarMain />
        }
      </div>
      <div className='app-bar app-bar-group' style={appBarStyle}>
        <GroupAppBar />
      </div>
      <div className='tab-panel hidden-on-mobile'>
        {
          isMobile ? <div /> :
            <TabPanel
              onCreateNewGroup={createGroupModal.open}
              onSearchGroups={searchGroupModal.open}
            />
        }
      </div>
      <div className='user-panel hidden-on-mobile'>
        {
          isMobile ? <div /> :
            <UserOwnerComponent
              onTap={() => { }}
              onTapSettings={() => { }}
              user={auth.user}
              padding='12px' />
        }
      </div>
      <div className='message-panel'>
        <Column mainAxisSize='max'>
          <Flexible style={{ width: '100%', height: '100%' }}>
            <MessagePanel />
          </Flexible>
          <div style={{ padding: '12px', width: '100%' }}>
            <MessageBar />
          </div>
        </Column>

      </div>
    </div>
  )
})