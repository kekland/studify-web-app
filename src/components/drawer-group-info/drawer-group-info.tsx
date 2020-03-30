import React, { useEffect, useState } from 'react'
import { IDrawerProps, Drawer } from '../drawer/drawer'
import { useSelectedGroup } from '../../hooks/hooks'
import { GroupHorizontal } from '../group-component/group-component'
import { StyledText } from '../text/text'
import { Column, Flexible } from '../flex/flex'
import { RaisedButton } from '../button/button'
import { InfiniteLoadingList } from '../list/list'
import { methods } from '../../api/methods/methods'
import { Loader } from '../loader/loader'
import { UserComponent } from '../user-component/user-component'

export const DrawerGroupInfo: React.FC<IDrawerProps> = (props) => {
  const selectedGroup = useSelectedGroup()
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (selectedGroup && selectedGroup.hasMoreUsers && !loading && props.isOpen) {
      setLoading(true)
      await methods.group.loadMoreUsers(selectedGroup)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, props.isOpen])

  if (!selectedGroup) return <div />


  return (
    <Drawer {...props}>
      <Column mainAxisSize='max' crossAxisSize='max'>
        <div style={{ padding: '16px' }}>
          <StyledText type='heading'>Information</StyledText>
        </div>
        <div style={{ width: '100%' }}>
          <GroupHorizontal selected={true} onTap={() => { }} padding='16px' group={selectedGroup} />
        </div>
        <div style={{ padding: '16px' }}>
          <StyledText type='subhead'>Users</StyledText>
        </div>
        <Flexible style={{ width: '100%' }}>
          <InfiniteLoadingList
            isLoading={loading}
            hasMore={selectedGroup.hasMoreUsers}
            loaderBuilder={() => <Loader isLoading={true} height='88px' width='100%' />}
            onBottomReached={loadMore}
            fromBottom={false}>
            {
              selectedGroup.users.map((user) => (
                <UserComponent key={user.id} padding='16px' verticalPadding='8px' user={user} onTap={() => { }} />
              ))
            }
          </InfiniteLoadingList>
        </Flexible>
        <div style={{ padding: '16px', width: '100%' }}>
          <RaisedButton width='100%' label='Leave' color='danger' onTap={() => { }} />
        </div>
      </Column>
    </Drawer>
  )
}