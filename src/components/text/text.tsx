import React from 'react'

type TextType = 'body' | 'heading' | 'caption' | 'button';
type TextColor = 'primary' | 'muted' | 'disabled';
type SurfaceBrightness = 'light' | 'dark';

export interface ITextProps {
  type?: TextType;

  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;

  color?: TextColor;
  surface?: SurfaceBrightness;
}

export const Text: React.FC<ITextProps> = (props) => {
  let fontSize = '16px'
  let fontWeight = 400
  let fontFamily = 'Roboto'
  let color = 'color-text-primary'

  if (props.type) {
    if (props.type === 'body') {
      fontSize = '16px'
      fontWeight = 400
    }
    else if (props.type === 'heading') {
      fontSize = '24px'
      fontWeight = 700
    }
    else if (props.type === 'button') {
      fontSize = '18px'
      fontWeight = 500
    }
    else if (props.type === 'caption') {
      fontSize = '14px'
      fontWeight = 400
      color = 'color-text-muted'
    }
  }

  fontSize = props.fontSize ?? fontSize
  fontWeight = props.fontWeight ?? fontWeight
  fontFamily = props.fontFamily ?? fontFamily

  if (props.color) {
    if (props.surface) {
      color = `color-on-${props.surface}-text-${props.color}`
    }
    else {
      color = `color-text-${props.color}`
    }
  }

  return (
    <div style={{
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
    }}>
      {props.children}
    </div>
  )
}