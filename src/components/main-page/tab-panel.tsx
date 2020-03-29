import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { Column, Flexible } from '../flex/flex'
import { GroupHorizontal } from '../group-component/group-component'
import { ListItemButton } from '../list-item-button/list-item-button'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { selectGroup } from '../../state/main'
import { useSelectedGroup } from '../../hooks/hooks'
import { List } from '../list/list'

export interface ITabPanelProps {
  onCreateNewGroup: () => void;
  onSearchGroups: () => void;
}

export const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const selector = useSelector((state: RootState) => state.groups)
  const selectedGroup = useSelectedGroup()

  const entries = Object.entries(selector.groups)

  return (
    <Column mainAxisSize='max' crossAxisSize='max'>
      <Flexible style={{ width: '100%' }}>
        <List>
          {
            entries.map(([id, group]) => (
              <GroupHorizontal
                key={id}
                group={group}
                selected={group.data.id === selectedGroup?.data.id}
                padding='12px'
                onTap={() => store.dispatch(selectGroup(group.data))} />
            ))
          }
        </List>
      </Flexible>
      <ListItemButton
        icon={faPlus}
        padding='12px'
        iconWidth='56px'
        label='Create a new group'
        onTap={props.onCreateNewGroup} />
      <ListItemButton
        icon={faSearch}
        padding='12px'
        iconWidth='56px'
        label='Search for groups'
        onTap={props.onSearchGroups} />
    </Column>
  )
}