import { ControlType } from '../Controls/controlsScheme'
import { DimensionControl } from '../DimensionControl';
import { DisplayControl } from '../DisplayControl';
import { InlineInput } from '../InlineInput';
import { TypographyControl } from '../TypographyControl';

interface RenderControlsProps {
  type: ControlType;
  name: string;
  label: string;
}

export const RenderControls = ({
  type,
  name,
  label,
}: RenderControlsProps) => {
  switch (type) {
    case ControlType.DISPLAY_CONTROL:
      return <DisplayControl />;
    case ControlType.DIMENSION_CONTROL:
      return <DimensionControl name={name} label={label} />;
    case ControlType.INLINE_INPUT:
      return <InlineInput name={name} label={label} />;
    case ControlType.TYPOGRAPHY_CONTROL:
      return <TypographyControl />;
    default:
      return null;
  }
}