import React from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';
import { GroupHorizontal } from '../../components/group-component/group-component';

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
          userCount: 3,
        }}
          selected={true}
          onTap={() => console.log('alih')}
          padding='12px' />
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 2,
          name: 'AP Science 2',
          description: 'Discussion of AP Science',
          userCount: 3,
        }}
          selected={false}
          onTap={() => console.log('alih')}
          padding='12px' />
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 3,
          name: 'AP Science 2',
          description: 'Discussion of AP Science',
          userCount: 3,
        }}
          selected={false}
          onTap={() => console.log('alih')}
          padding='12px' />
        <GroupHorizontal group={{
          id: 'aaaaaa',
          colorId: 4,
          name: 'AP Science 2',
          description: 'Discussion of AP Science',
          userCount: 3,
        }}
          selected={false}
          onTap={() => console.log('alih')}
          padding='12px' />
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