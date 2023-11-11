import { TextField } from '@radix-ui/themes'
import UnitSelect from '../UnitSelect'
import { ChangeEvent, useState, useEffect } from 'react'

import cls from './dimensionInput.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedComponentStyles, updateStyle } from '@/store/slices/layoutSlice';

const defaultUnits = ['px', 'em', 'rem', '%', 'vw', 'vh'];

interface DimensionInputProps {
  name: string;
  value?: string;
}

export const DimensionInput = ({
  name,
}: DimensionInputProps) => {
  const [unit, setUnit] = useState<string>('px');
  const dispatch = useDispatch();
  const styles = useSelector(getSelectedComponentStyles);

  useEffect(() => {
    const match = styles?.[name]?.match(/px|em|rem|%|vw|vh/)
    if (match) {
      setUnit(match[0]);
    }
  }, [styles, name, unit]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue) {
      if (!inputValue.match(/^\d*$/)) {
        return;
      }
      inputValue += unit;
    }

    dispatch(updateStyle({ name, value: inputValue }))
  }
  const displayValue = styles?.[name]?.replace(unit, '') ?? '';

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    dispatch(updateStyle({ name, value: `${displayValue}${newUnit}` }))
  }


  return (
    <div className={cls.wrapper}>
      <TextField.Root
      >
        <TextField.Input
          size="1"
          value={displayValue}
          onChange={handleOnChange} />
        <TextField.Slot pr="1" className={cls.slot}>
          <UnitSelect
            value={unit}
            onChange={handleUnitChange}
            units={defaultUnits}
          />
        </TextField.Slot>
      </TextField.Root>
    </div>
  )
}
