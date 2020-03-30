import React, { useEffect } from 'react'
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
import { MessagePanel } from '../../components/message-panel/message-panel';
import { ModalSearchGroup } from '../../components/modal-search-group/modal-search-group';
import { useScreenSize, useSelectedGroup } from '../../hooks/hooks';
import { MainPageDrawer } from '../../components/main-page/main-page-drawer';
import { ModalSettings } from '../../components/modal-settings/modal-settings'
import { methods } from '../../api/methods/methods';
import { useAlert } from 'react-alert';
import { DrawerGroupInfo } from '../../components/drawer-group-info/drawer-group-info';
import { ModalUser } from '../../components/modal-user/modal-user';
import { openUserTab } from '../../state/main';

export const MainPage: React.FC = ((props) => {
  const alert = useAlert()
  const isMobile = useScreenSize(768)

  const user = useSelector((state: RootState) => state.auth.user)
  const selectedUser = useSelector((state: RootState) => state.main.selectedUser)
  const selectedGroup = useSelectedGroup()

  const createGroupModal = useModal(false)
  const searchGroupModal = useModal(false)
  const userModal = useModal(false)
  const settingsModal = useModal(false)
  const groupInfoDrawer = useModal(false)

  useEffect(() => {
    const loadGroups = async () => {
      await methods.group.setInitializationData()
      await methods.group.loadDataOnInitialization()
    }

    if (user && !methods.api.socket) {
      methods.initializeSocket()
      loadGroups()
      return () => methods.closeSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedUser)
      console.log(selectedUser)
    userModal.open()
    return () => userModal.close()
  }, [selectedUser, userModal])

  useEffect(() => {
    methods.initialize(alert)
  }, [alert])

  if (!user) return <Redirect to='/' />

  let appBarStyle: React.CSSProperties = {}
  if (selectedGroup) {
    appBarStyle = { backgroundColor: `var(--color-group-${selectedGroup.data.colorId})` }
  }
  return (
    <div className={isMobile ? 'main-page-mobile' : 'main-page-desktop'}>
      <MainPageDrawer
        onCreateGroup={createGroupModal.open}
        onSearchGroup={searchGroupModal.open}
        onUserTap={() => store.dispatch(openUserTab(user))}
        onUserTapSettings={settingsModal.open}
        user={user} />
      <ModalCreateGroup {...createGroupModal} />
      <ModalSearchGroup {...searchGroupModal} />
      <ModalSettings {...settingsModal} />
      <ModalUser {...userModal} />
      <DrawerGroupInfo {...groupInfoDrawer} width='320px' left={false} />
      <div className='app-bar app-bar-main hidden-on-mobile' style={appBarStyle}>
        {
          isMobile ? <div /> :
            <AppBarMain />
        }
      </div>
      <div className='app-bar app-bar-group' style={appBarStyle}>
        <GroupAppBar
          onTapInfo={groupInfoDrawer.open}
          onTapFiles={() => { }} />
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
              onTap={() => store.dispatch(openUserTab(user))}
              onTapSettings={settingsModal.open}
              user={user}
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