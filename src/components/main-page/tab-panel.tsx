import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { Column, Flexible } from '../flex/flex'
import { GroupHorizontal } from '../group-component/group-component'
import { ListItemButton } from '../list-item-button/list-item-button'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { AutoSizer, List } from 'react-virtualized'
import { selectGroup } from '../../state/main'

export interface ITabPanelProps {
  onCreateNewGroup: () => void;
}

export const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const groups = useSelector((state: RootState) => state.main.groups)
  return (
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
                  onTap={() => store.dispatch(selectGroup(groups[props.index]))} />
              }
            />
          )}
        </AutoSizer>
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
        onTap={() => {

        }} />
    </Column>
  )
}