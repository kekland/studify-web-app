import React from 'react'
import ReactModal from 'react-modal'
import { Center } from '../center/center'
import { Surface } from '../surface/surface'
import { IconButton } from '../button/button'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './modal.css'

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = (props) => {
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
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        backgroundColor: 'transparent',
        border: 0,
        padding: '20px',
      }
    }}>
    <Center>
      <Surface style={{
        borderRadius: '24px',
        padding: '36px',
        border: 0,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.16)',
        minWidth: '35vw',
        minHeight: '30vh',
        maxWidth: '60vw',
        maxHeight: '70vh',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          right: '24px',
          top: '24px',
        }}>
          <IconButton icon={faTimes}
            size='48px'
            onTap={props.onClose} />
        </div>
        {props.children}
      </Surface>
    </Center>
  </ReactModal>)
}