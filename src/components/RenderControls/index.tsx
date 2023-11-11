import { ColorControl } from '../ColorControl';
import { ControlType } from '../Controls/controlsScheme'
import { DimensionControl } from '../DimensionControl';
import { DisplayControl } from '../DisplayControl';
import { InlineInput } from '../InlineInput';

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
    case ControlType.COLOR_CONTROL:
      return <ColorControl name={name} label={label} />;
    case ControlType.DISPLAY_CONTROL:
      return <DisplayControl />;
    case ControlType.DIMENSION_CONTROL:
      return <DimensionControl name={name} label={label} />;
    case ControlType.INLINE_INPUT:
      return <InlineInput name={name} label={label} />;
    default:
      return null;
  }
}