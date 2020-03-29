import React from 'react'
import ReactModal from 'react-modal'
import { Center } from '../center/center'
import { Surface } from '../surface/surface'
import { IconButton } from '../button/button'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './modal.css'
import { Loader } from '../loader/loader'
import { useScreenSize } from '../../hooks/hooks'

export interface IModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = (props) => {
  const isMobile = useScreenSize(1000)

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
      }
    }}>
    <Center>
      <Surface style={{
        borderRadius: '24px',
        border: 0,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.16)',
        minWidth: '35vw',
        minHeight: '30vh',
        maxWidth: isMobile ? '90vw' : '60vw',
        maxHeight: isMobile ? '90vh' : '70vh',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}>
        <Loader isLoading={props.isLoading ?? false} borderRadius='24px'>
          <div style={{
            position: 'absolute',
            right: '24px',
            top: '24px',
          }}>
            <IconButton icon={faTimes}
              size='48px'
              onTap={props.onClose} />
          </div>
          <div style={{ padding: '36px' }}>
            {props.children}
          </div>
        </Loader>
      </Surface>
    </Center>
  </ReactModal>)
}