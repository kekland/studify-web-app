import React from 'react'
import { Drawer } from '../drawer/drawer'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { setDrawer } from '../../state/main'
import { Column, Flexible } from '../flex/flex'
import { TabPanel } from './tab-panel'
import { AppBarMain } from './app-bar-main'
import { UserOwnerComponent } from '../user-component/user-component'
import { IUserOwner } from '../../api/data/user'

export interface IMainPageDrawerProps {
  onCreateGroup: () => void;
  onSearchGroup: () => void;
  user: IUserOwner;
  onUserTap: () => void;
  onUserTapSettings: () => void;
}

export const MainPageDrawer: React.FC<IMainPageDrawerProps> = (props) => {
  const isOpen = useSelector((state: RootState) => state.main.isDrawerOpen)

  const close = () => {
    store.dispatch(setDrawer(false))
  }

  return (
    <Drawer isOpen={isOpen} onClose={close} width='350px'>
      <Column mainAxisSize='max' crossAxisSize='max'>
        <div style={{
          flexBasis: '64px',
          width: '100%',
          backgroundColor: 'var(--color-primary)'
        }}>
          <AppBarMain />
        </div>
        <Flexible style={{width: '100%'}}>
          <TabPanel
            onCreateNewGroup={props.onCreateGroup}
            onSearchGroups={props.onSearchGroup}
          />
        </Flexible>
        <div style={{
          flexBasis: '64px',
          width: '100%',
        }}>
          <UserOwnerComponent
            onTap={props.onUserTap}
            onTapSettings={props.onUserTapSettings}
            user={props.user}
            padding='12px' />
        </div>
      </Column>
    </Drawer>
  )
}