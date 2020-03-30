import React, { useState, useEffect } from 'react'
import { Modal, IModalProps } from '../modal/modal'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { api } from '../../api/api'
import { useAlert } from 'react-alert'
import { IGroupMinimal } from '../../api/data/group'
import { GroupVertical } from '../group-component/group-component'
import { Wrap, Column } from '../flex/flex'
import { InputField } from '../input-field/input-field'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Loader } from '../loader/loader'
import AutoSizer from 'react-virtualized-auto-sizer'

export const ModalSearchGroup: React.FC<IModalProps> = (props) => {
  const alert = useAlert()
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState<{ data: IGroupMinimal[], query: string }>({ data: [], query: '' })
  const [query, setQuery] = useState<string>('')
  const [timer, setTimer] = useState<number>(-1)

  const loadGroups = async () => {
    api.use(alert, async () => {
      setLoading(true)

      const skip = groups.query === query ? groups.data.length : 0

      const loadedGroups = await api.group.searchGroups(skip, query.length !== 0 ? query : undefined)

      if (groups.query === query) {
        setGroups({ query, data: [...groups.data, ...loadedGroups] })
      }
      else {
        setGroups({ query, data: loadedGroups })
      }
    }, () => setLoading(false))
  }

  useEffect(() => {
    if (props.isOpen) {
      if (timer !== -1)
        clearTimeout(timer)

      setTimer(setTimeout(loadGroups, 100))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen, query])

  return (
    <Modal isOpen={props.isOpen} isLoading={false} onClose={props.onClose}>
      <Column mainAxisSize='max' crossAxisSize='max'>
        <StyledText type='heading'>Search for groups</StyledText>
        <SizedBox height='24px' />
        <InputField placeholder='Search' width='100%' icon={faSearch} onChanged={setQuery} />
        <SizedBox height='24px' />
        <Loader borderRadius='12px' isLoading={loading} style={{ width: '100%', height: '100%' }}>
          <AutoSizer>
            {({ width, height }) => {
              const minGroupWidth = 200
              let columns = Math.floor(width / minGroupWidth)
              if (groups.data.length < columns) columns = groups.data.length

              const groupWidth = ((width - 12 * (columns - 1)) / columns)
              const groupHeight = '225px'

              const items = []

              console.log(columns)

              for (let i = 0; i < groups.data.length; i++) {
                const group = groups.data[i]
                items.push((
                  <div style={{ marginBottom: '12px' }} key={group.id}>
                    <GroupVertical group={group}
                      width={groupWidth} height={groupHeight}
                      padding='12px' />
                  </div>)
                )

                if ((i + 1) % columns !== 0) {
                  items.push(<SizedBox flexSize='12px' key={group.id + '-spacer'}/>)
                }
              }

              return (
                <Wrap style={{ width, height }}>
                  {items}
                </Wrap>
              )
            }}
          </AutoSizer>
        </Loader>
      </Column>
    </Modal >
  )
}