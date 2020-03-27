import React from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';
import { GroupHorizontal } from '../../components/group-component/group-component';
import { ListItemButton } from '../../components/list-item-button/list-item-button';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserOwnerComponent } from '../../components/user-component/user-component';
import { MessageBar } from '../../components/message-bar/message-bar';
import { Column, Flexible } from '../../components/flex/flex';
import { Message } from '../../components/message/message';
import { GroupAppBar } from '../../components/group-app-bar/group-app-bar';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { List, AutoSizer } from 'react-virtualized'

export const MainPage: React.FC = ((props) => {
  const auth = useSelector((state: RootState) => state.auth)
  // const [selectedGroup, setSelectedGroup] = useState(-1)

  if (!auth.user) return <Redirect to='/auth' />
  const groups = auth.user.groups

  return (
    <div className='main-page'>
      <div className='app-bar-main'>
        <AppBarMain />
      </div>
      <div className='app-bar-group'>
        <GroupAppBar group={groups[0]} />
      </div>
      <div className='tab-panel'>
        <Column mainAxisSize='max' crossAxisSize='max'>
          <Flexible style={{ width: '100%' }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  rowCount={groups.length}
                  rowHeight={80}
                  width={width}
                  height={height}
                  rowRenderer={props =>
                    <GroupHorizontal
                      key={props.key}
                      group={groups[props.index]}
                      selected={false}
                      padding='12px'
                      onTap={() => { }} />
                  }
                />
              )}
            </AutoSizer>
          </Flexible>
          <ListItemButton icon={faPlus} label='Create a new group' onTap={() => { }} padding='12px' iconWidth='56px' />
          <ListItemButton icon={faSearch} label='Search for groups' onTap={() => { }} padding='12px' iconWidth='56px' />
        </Column>
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
            <Column mainAxisSize='max' crossAxisSize='max' mainAxisAlignment='flex-end'>
              <Message padding='12px' message={{
                body: 'Hello, world!',
                created: new Date(),
                user: {
                  username: 'kekland',
                  name: 'Erzhan',
                  email: 'kk.erzhan@gmail.com',
                  id: 'aa'
                },
                groupId: 'aaa',
                id: 'aaa',
                attachments: [],
              }} fromSelf={false} />
              <Message padding='12px' message={{
                body: 'Hello, world!',
                created: new Date(),
                user: {
                  username: 'kekland',
                  name: 'Erzhan',
                  email: 'kk.erzhan@gmail.com',
                  id: 'aa'
                },
                groupId: 'aaa',
                id: 'aaa',
                attachments: [],
              }} fromSelf />
            </Column>
          </Flexible>
          <div style={{ padding: '12px', width: '100%' }}>
            <MessageBar />
          </div>
        </Column>

      </div>
    </div>
  )
})