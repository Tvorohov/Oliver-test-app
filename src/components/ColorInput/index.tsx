import { Popover, TextField } from '@radix-ui/themes'
import { ChangeEvent, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import cls from './colorInput.module.css';

const defaultColor = '#000';

interface ColorInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const ColorInput = ({ value = defaultColor, onChange }: ColorInputProps) => {
  const [color, setColor] = useState(value);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onChange && onChange(e.target.value);
  }
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange && onChange(newColor);
  }

  return (
    <div className={cls.container}>
      <TextField.Root>
        <TextField.Slot pr="1" >
          <Popover.Root>
            <Popover.Trigger>
              <button
                className={cls.colorButton}
                style={{ backgroundColor: value }} />
            </Popover.Trigger>
            <Popover.Content>
              <HexColorPicker color={value} onChange={handleColorChange} />
            </Popover.Content>
          </Popover.Root>
        </TextField.Slot>
        <TextField.Input
          size="1"
          value={color}
          onChange={handleOnChange}
        />
      </TextField.Root>
    </div>
  )
}