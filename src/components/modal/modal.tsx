import React from 'react'
import ReactModal from 'react-modal'
import { Center } from '../center/center'
import { Surface } from '../surface/surface'
import { IconButton } from '../button/button'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './modal.css'
import { Loader } from '../loader/loader'
import { useScreenSize } from '../../hooks/hooks'
import Scrollbars from 'react-custom-scrollbars'
import AutoSizer from 'react-virtualized-auto-sizer'

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IModalLoadingProps {
  isLoading?: boolean;
}

export const Modal: React.FC<IModalProps & IModalLoadingProps> = (props) => {
  const isMobile = useScreenSize(768)

  return (<ReactModal
    ariaHideApp={false}
    isOpen={props.isOpen}
    closeTimeoutMS={150}
    onRequestClose={(_) => props.onClose()}
    parentSelector={() => document.querySelector('#app') as HTMLElement}
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        overflowX: 'hidden',
        overflowY: 'hidden',
      },
      content: {
        position: 'absolute',
        backgroundColor: 'transparent',
        border: 0,
        overflowX: 'hidden',
        overflowY: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        padding: 0,
      }
    }}>
    <Center>
      <Surface style={{
        borderRadius: isMobile ? '0px' : '24px',
        border: 0,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.16)',
        width: isMobile ? '100%' : '75vw',
        height: isMobile ? '100%' : '70vh',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}>
        <Loader isLoading={props.isLoading ?? false} borderRadius='24px' width='100%' height='100%'>
          <div style={{
            position: 'absolute',
            right: '24px',
            top: '24px',
            zIndex: 101,
          }}>
            <IconButton icon={faTimes}
              size='48px'
              onTap={props.onClose} />
          </div>
          <AutoSizer>
            {({ width, height }) =>
              (<Scrollbars autoHide style={{ width, height }}>
                <div style={{
                  padding: '36px',
                  height: '100%',
                  overflowY: 'visible',
                }}>
                  {props.isOpen ? props.children : <div />}
                </div>
              </Scrollbars>
              )}
          </AutoSizer>
        </Loader>
      </Surface>
    </Center>
  </ReactModal>)
}
