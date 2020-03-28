import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { Column, Flexible } from '../flex/flex'
import { GroupHorizontal } from '../group-component/group-component'
import { ListItemButton } from '../list-item-button/list-item-button'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { selectGroup } from '../../state/main'
import { FixedSizeList } from 'react-window'
import { AutoSizer } from 'react-virtualized'
import { CustomScrollbarsVirtualList } from '../smart-list/smart-list'
import { useSelectedGroup } from '../../hooks/hooks'

export interface ITabPanelProps {
  onCreateNewGroup: () => void;
  onSearchGroups: () => void;
}

export const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const { groups } = useSelector((state: RootState) => state.groups)
  const selectedGroup = useSelectedGroup()

  const ids = Object.keys(groups)

  return (
    <Column mainAxisSize='max' crossAxisSize='max'>
      <Flexible style={{ width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              outerElementType={CustomScrollbarsVirtualList}
              itemCount={ids.length}
              itemSize={80}
              width={width}
              height={height}
            >
              {({ style, index }) =>
                <div
                  style={style}>
                  <GroupHorizontal
                    group={groups[ids[index]]}
                    selected={groups[ids[index]].data.id === selectedGroup?.data.id}
                    padding='12px'
                    onTap={() => store.dispatch(selectGroup(groups[ids[index]].data))} />
                </div>
              }
            </FixedSizeList>
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
        onTap={props.onSearchGroups} />
    </Column>
  )
}