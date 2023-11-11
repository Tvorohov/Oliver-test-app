import { Select } from '@radix-ui/themes';
import { FC } from 'react';

type UnitSelectProps = {
  units: string[];
  value: string;
  onChange: (value: string) => void;
};

const UnitSelect: FC<UnitSelectProps> = ({ units, value, onChange }) => {
  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      defaultValue={units[0]}
      size="1"
    >
      <Select.Trigger>
        {value}
      </Select.Trigger>
      <Select.Content>
        {units.map((unit) => (
          <Select.Item key={unit} value={unit}>
            {unit}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default UnitSelect;
