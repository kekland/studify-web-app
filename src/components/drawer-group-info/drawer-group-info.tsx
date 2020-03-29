import React from 'react'
import { IDrawerProps, Drawer } from '../drawer/drawer'
import { useSelectedGroup } from '../../hooks/hooks'
import { GroupHorizontal } from '../group-component/group-component'

export const DrawerGroupInfo: React.FC<IDrawerProps> = (props) => {
  const selectedGroup = useSelectedGroup()

  if (!selectedGroup) return <div />
  return (
    <Drawer {...props}>
      <GroupHorizontal selected={true} onTap={() => { }} padding='12px' group={selectedGroup} />
    </Drawer>
  )
}