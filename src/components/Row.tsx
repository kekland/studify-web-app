import React from 'react'

export const Row: React.FC = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {props.children}
    </div>
  );
}