import React from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';
import { GroupHorizontal } from '../../components/group-component/group-component';
import { ListItemButton } from '../../components/list-item-button/list-item-button';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserAvatar } from '../../components/user-avatar/user-avatar';
import { UserOwnerComponent } from '../../components/user-component/user-component';
import { MessageBar } from '../../components/message-bar/message-bar';
import { Column, Flexible } from '../../components/flex/flex';
import { Message } from '../../components/message/message';

export const MainPage: React.FC = (props) => {
  return (
    <div className='host'>
      <div className='app-bar-main'>
        <AppBarMain />
      </div>
      <div className='app-bar-group'>
      </div>
      <div className='tab-panel'>
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 1,
          name: 'AP Science 2',
          description: 'Discussion of AP Science',
          icon: 'atom',
          userCount: 3,
        }}
          selected={true}
          onTap={() => console.log('alih')}
          padding='12px' />
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 2,
          name: 'Geometry',
          description: 'All about geometry',
          icon: 'shapes',
          userCount: 3,
        }}
          selected={false}
          onTap={() => console.log('alih')}
          padding='12px' />
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 3,
          name: 'Science Basics',
          description: 'Basics of Science',
          icon: 'frog',
          userCount: 3,
        }}
          selected={false}
          onTap={() => console.log('alih')}
          padding='12px' />
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 4,
          name: 'World History',
          description: 'History of the world',
          icon: 'chess',
          userCount: 3,
        }}
          selected={false}
          onTap={() => console.log('alih')}
          padding='12px' />
        <ListItemButton icon={faPlus} label='Create a new group' onTap={() => { }} padding='12px' iconWidth='56px' />
        <ListItemButton icon={faSearch} label='Search groups' onTap={() => { }} padding='12px' iconWidth='56px' />
      </div>
      <div className='user-panel'>
        <UserOwnerComponent onTap={() => { }} onTapSettings={() => { }} user={{
          id: 'aaa',
          username: 'kekland',
          name: 'Erzhan',
          email: 'kk.erzhan@gmail.com',
          created: new Date(),
          updated: new Date(),
          createdGroups: [],
          groups: [],
        }} padding='12px'>
        </UserOwnerComponent>
      </div>
      <div className='message-panel'>
        <Column mainAxisSize='max'>
          <Flexible>
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
            }} />
          </Flexible>
          <div style={{ padding: '12px', width: '100%' }}>
            <MessageBar />
          </div>
        </Column>

      </div>
    </div>
  )
}