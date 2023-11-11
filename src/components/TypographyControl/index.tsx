import { Flex } from '@radix-ui/themes';
import { Collapsible } from '../Collapsible'
import { ColorControl } from '../ColorControl';
import { InlineInput } from '../InlineInput';
import { Select } from '../Select';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedComponentStyles, updateStyle } from '@/store/slices/layoutSlice';
import { TypographyComponentType, typographyControlSchema } from './typographyControlSchema';

export const TypographyControl = () => {
  const dispatch = useDispatch();
  const styles = useSelector(getSelectedComponentStyles);

  const handleChangeStyle = (name: string) => (value: string) => dispatch(updateStyle({ name, value }));

  const renderControl = (control: any) => {
    switch (control.type) {
      case TypographyComponentType.COLOR_CONTROL:
        return <ColorControl key={control.name} label={control.label} name={control.name} />
      case TypographyComponentType.INLINE_INPUT:
        return <InlineInput key={control.name} label={control.label} name={control.name} />
      case TypographyComponentType.SELECT:
        return <Select
          key={control.name}
          title={control.label}
          options={control.options}
          value={styles?.[control.name] ?? control.options[0]}
          onChange={handleChangeStyle(control.name)}
          size='1' />
      default:
        return null;
    }
  }

  return (
    <Collapsible label='Typography'>
      <Flex mt='3' gap='3' direction='column' pl='3'>
        {
          typographyControlSchema.map((control) => renderControl(control))
        }
      </Flex>
    </Collapsible>
  )
}