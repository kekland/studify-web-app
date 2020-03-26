import React from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';
import { GroupHorizontal } from '../../components/group-component/group-component';
import { ListItemButton } from '../../components/list-item-button/list-item-button';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

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

      </div>
      <div className='message-panel'>

      </div>
      <div className='message-field-panel'>

      </div>
    </div>
  )
}