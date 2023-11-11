const fontWeights = ['300', '400', '500', '600', '700', '800', '900']
const fontStyles = ['normal', 'italic', 'oblique'];
const textDecorations = ['none', 'underline', 'overline', 'line-through', 'blink'];
const textTransforms = ['none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit'];
const textAligns = ['left', 'center', 'right', 'justify', 'initial', 'inherit'];
const whiteSpaces = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'initial', 'inherit'];
const wordBreaks = ['normal', 'break-all', 'keep-all', 'break-word', 'initial', 'inherit'];
const wordWraps = ['normal', 'break-word', 'initial', 'inherit'];

export enum TypographyComponentType {
  COLOR_CONTROL = 'COLOR_CONTROL',
  INLINE_INPUT = 'INLINE_INPUT',
  SELECT = 'SELECT'
}

export const typographyControlSchema = [
  {
    type: TypographyComponentType.COLOR_CONTROL,
    label: 'Color',
    name: 'color'
  },
  {
    type: TypographyComponentType.INLINE_INPUT,
    label: 'Font size',
    name: 'fontSize'
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Font weight',
    name: 'fontWeight',
    options: fontWeights
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Font style',
    name: 'fontStyle',
    options: fontStyles
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Text decoration',
    name: 'textDecoration',
    options: textDecorations
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Text transform',
    name: 'textTransform',
    options: textTransforms
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Text align',
    name: 'textAlign',
    options: textAligns
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'White space',
    name: 'whiteSpace',
    options: whiteSpaces
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Word break',
    name: 'wordBreak',
    options: wordBreaks
  },
  {
    type: TypographyComponentType.SELECT,
    label: 'Word wrap',
    name: 'wordWrap',
    options: wordWraps
  }
]
