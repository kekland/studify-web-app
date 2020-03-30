import React from 'react'

export interface IDrawerProps {
  isOpen: boolean;
  width: string;
  left?: boolean;
  onClose: () => void;
}

export const Drawer: React.FC<IDrawerProps> = ({ isOpen, width, children, onClose, left }) => {
  const onLeft = left ?? true
  return (
    <div
      key='drawer'
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        pointerEvents: 'none',
      }}>
      <div style={{
        width: '100vw',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.625)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 250ms ease-in-out',
        zIndex: 999,
        pointerEvents: isOpen ? 'auto' : 'none',
      }} onClick={onClose}>
        <div style={{
          position: 'absolute',
          left: onLeft ? 0 : `calc(100vw - ${width})`,
          top: 0,
          bottom: 0,
          right: onLeft ? `calc(100vw - ${width})` : 0,
          backgroundColor: 'var(--color-surface)',
          zIndex: 1000,
          transform: isOpen ? 'translate(0, 0)' : `translate(${onLeft ? '-' : ''}${width}, 0)`,
          transition: 'transform 250ms ease-in-out',
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}