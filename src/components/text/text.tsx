import React from 'react'

type TextType = 'body' | 'heading' | 'subhead' | 'caption' | 'button';
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

  customColor?: string;

  style?: React.CSSProperties;
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
    else if (props.type === 'subhead') {
      fontSize = '20px'
      fontWeight = 500
    }
    else if (props.type === 'button') {
      fontSize = '16px'
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
    <span style={Object.assign({
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: props.customColor ?? `var(--color-${color})`,
      textAlign: props.textAlign,
      userSelect: props.unselectable ? 'none' : undefined,
    }, props.style ?? {})}>
      {props.children}
    </span>
  )
}

export const StyledTextSkeleton: React.FC<ITextProps & { width: string, skeletonColor?: string }> = (props) => {
  let fontSize = '16px'

  if (props.type) {
    if (props.type === 'body') {
      fontSize = '16px'
    }
    else if (props.type === 'heading') {
      fontSize = '24px'
    }
    else if (props.type === 'subhead') {
      fontSize = '20px'
    }
    else if (props.type === 'button') {
      fontSize = '16px'
    }
    else if (props.type === 'caption') {
      fontSize = '14px'
    }
  }

  fontSize = props.fontSize ?? fontSize

  return (
    <div style={{
      height: fontSize,
      width: props.width,
      borderRadius: '4px',
      backgroundColor: props.skeletonColor ?? 'var(--color-text-disabled)'
    }} />
  )
}