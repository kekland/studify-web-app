import React from 'react'

type TextType = 'body' | 'heading' | 'caption' | 'button';
type TextColor = 'primary' | 'muted' | 'disabled';
type SurfaceBrightness = 'light' | 'dark';
type TextAlign = 'start' | 'center' | 'end'

export interface ITextProps {
  type?: TextType;

  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;

  color?: TextColor;
  surface?: SurfaceBrightness;

  textAlign?: TextAlign;

  unselectable?: boolean;
}

export const StyledText: React.FC<ITextProps> = (props) => {
  let fontSize = '16px'
  let fontWeight = 400
  let fontFamily = 'Roboto'
  let surface = props.surface
  let color = 'primary'

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
      color = 'muted'
    }
  }

  color = props.color ?? color
  fontSize = props.fontSize ?? fontSize
  fontWeight = props.fontWeight ?? fontWeight
  fontFamily = props.fontFamily ?? fontFamily

  if (surface) {
    color = `on-${props.surface}-text-${color}`
  }
  else {
    color = `text-${color}`
  }

  return (
    <div style={{
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: `var(--color-${color})`,
      textAlign: props.textAlign,
      userSelect: props.unselectable? 'none' : undefined,
    }}>
      {props.children}
    </div>
  )
}