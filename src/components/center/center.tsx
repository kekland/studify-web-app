import React from 'react'

export const Center: React.FC = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {props.children}
    </div>
  )
}