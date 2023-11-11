import { Responsive, Select as RadixSelect, Flex, Text } from '@radix-ui/themes';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  title: string
  size?: Responsive<'1' | '2' | '3'> | undefined;
}

export const Select = ({ value, options, onChange, size = '2', title }: SelectProps) => {

  return (
    <Flex align='center' gap='3'>
      <Text size='2' weight='bold' className='box-width'>
        {title}:
      </Text>
      <RadixSelect.Root
        value={value}
        onValueChange={onChange}
        defaultValue={options[0]}
        size={size}
      >
        <RadixSelect.Trigger>
          {value}
        </RadixSelect.Trigger>
        <RadixSelect.Content>
          {options.map((options) => (
            <RadixSelect.Item key={options} value={options}>
              {options}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Root>
    </Flex>
  )
}