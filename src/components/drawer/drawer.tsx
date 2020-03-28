import React from 'react'

export interface IDrawerProps {
  isOpen: boolean;
  width: string;
  onClose: () => void;
}

export const Drawer: React.FC<IDrawerProps> = ({ isOpen, width, children, onClose }) => {
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
        pointerEvents: isOpen ? 'all' : 'none',
      }} onClick={onClose}>
      <div style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.625)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 250ms ease-in-out',
        zIndex: 999,
      }} />
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: `calc(100vw - ${width})`,
        backgroundColor: 'var(--color-surface)',
        zIndex: 1000,
        transform: isOpen ? 'translate(0, 0)' : `translate(-${width}, 0)`,
        transition: 'transform 250ms ease-in-out',
      }}>
        {children}
      </div>
    </div>
  )
}