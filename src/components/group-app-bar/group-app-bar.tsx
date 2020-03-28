import React from 'react'
import { Row, Column, Flexible } from '../flex/flex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { IconButton } from '../button/button'
import { faInfoCircle, faFolderOpen, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../state/store'
import { GroupUtils } from '../../api/data/group'
import { useScreenSize } from '../../hooks/hooks'
import { AppLogoHorizontal } from '../app-logo/app-logo'
import { setDrawer } from '../../state/main'

export const GroupAppBar: React.FC = () => {
  const isMobile = useScreenSize(768)
  const selectedGroup = useSelector((state: RootState) => state.main.selectedGroup)

  const openDrawer = () => {
    store.dispatch(setDrawer(true))
  }

  if (selectedGroup) {
    return (
      <Row mainAxisSize='max' crossAxisSize='max' crossAxisAlignment='center'>
        <SizedBox width='12px' />
        {
          isMobile &&
          <SizedBox width='56px'>
            <IconButton icon={faBars} iconSize='lg' size='48px' surface='dark' onTap={openDrawer} />
          </SizedBox>
        }
        <FontAwesomeIcon icon={selectedGroup.icon} color='rgba(255, 255, 255, 0.625)' size='2x' />
        <SizedBox width='18px' />
        <Column>
          <StyledText surface='dark' type='subhead'>{selectedGroup.name}</StyledText>
          <StyledText type='caption' customColor='rgba(255, 255, 255, 0.625)'>{
            GroupUtils.getUserCountString(selectedGroup.userCount)
          }</StyledText>
        </Column>
        <Flexible />
        <IconButton
          size='48px'
          icon={faFolderOpen}
          surface='dark'
          iconSize='lg'
          onTap={() => { }} />
        <SizedBox width='12px' />
        <IconButton
          size='48px'
          icon={faInfoCircle}
          surface='dark'
          iconSize='lg'
          onTap={() => { }} />
        <SizedBox width='12px' />
      </Row>
    )
  }
  else {
    return isMobile? (<Row mainAxisSize='max' crossAxisSize='max' crossAxisAlignment='center'>
      <SizedBox width='12px' />
      <SizedBox width='56px'>
        <IconButton icon={faBars} iconSize='lg' size='48px' surface='dark' onTap={openDrawer} />
      </SizedBox>
      <AppLogoHorizontal surface='dark' logoType='transparent' />
    </Row>) : (<div />)
  }
}