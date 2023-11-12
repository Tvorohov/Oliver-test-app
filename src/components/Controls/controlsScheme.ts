export enum ControlType {
  INLINE_INPUT = 'INLINE_INPUT',
  DIMENSION_CONTROL = 'DIMENSION_CONTROL',
  DISPLAY_CONTROL = 'DISPLAY_CONTROL',
  TYPOGRAPHY_CONTROL = 'TYPOGRAPHY_CONTROL',
  BACKGROUND_CONTROL = 'BACKGROUND_CONTROL',
  POSITION_CONTROL = 'POSITION_CONTROL'
}

export const styleControlMap = [
  {
    label: 'Width',
    name: 'width',
    type: ControlType.INLINE_INPUT,
  },
  {
    label: 'Height',
    name: 'height',
    type: ControlType.INLINE_INPUT,
  },
  {
    label: 'Padding',
    name: 'padding',
    type: ControlType.DIMENSION_CONTROL,
  },
  {
    label: 'Margin',
    name: 'margin',
    type: ControlType.DIMENSION_CONTROL,
  },
  {
    label: 'Display',
    name: 'display',
    type: ControlType.DISPLAY_CONTROL,
  },
  {
    label: 'Typography',
    name: 'typography',
    type: ControlType.TYPOGRAPHY_CONTROL,
  },
  {
    label: 'Background',
    name: 'background',
    type: ControlType.BACKGROUND_CONTROL,
  },
  {
    label: 'Position',
    name: 'position',
    type: ControlType.POSITION_CONTROL
  }
]
