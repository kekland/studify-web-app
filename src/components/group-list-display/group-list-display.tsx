import React from 'react'
import { IGroupMinimal } from '../../api/data/group'
import AutoSizer from 'react-virtualized-auto-sizer'
import { GroupVertical } from '../group-component/group-component'
import { SizedBox } from '../sized-box/sized-box'
import { Wrap } from '../flex/flex'

export interface IGroupListDisplayProps {
  groups: IGroupMinimal[];
}

export const GroupListDisplay: React.FC<IGroupListDisplayProps> = ({ groups }) => {
  return (
    <AutoSizer>
      {({ width, height }) => {
        const minGroupWidth = 200
        let columns = Math.floor(width / minGroupWidth)

        const groupWidth = ((width - 12 * (columns - 1)) / columns)
        const groupHeight = '225px'

        const items = []

        console.log(columns)

        for (let i = 0; i < groups.length; i++) {
          const group = groups[i]
          items.push((
            <div style={{ marginBottom: '12px' }} key={group.id}>
              <GroupVertical group={group}
                width={groupWidth} height={groupHeight}
                padding='12px' />
            </div>)
          )

          if ((i + 1) % columns !== 0) {
            items.push(<SizedBox flexSize='12px' key={group.id + '-spacer'} />)
          }
        }

        return (
          <Wrap style={{ width, height }}>
            {items}
          </Wrap>
        )
      }}
    </AutoSizer>
  )
}