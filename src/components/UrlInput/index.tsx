import { Flex, TextField, Text } from '@radix-ui/themes'
import { ChangeEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getSelectedComponentStyles, updateStyle } from '@/store/slices/layoutSlice';

import cls from './styles.module.css';

interface UrlInputProps {
  name: string;
  label: string;
}

export const UrlInput = ({
  name,
  label
}: UrlInputProps) => {
  const dispatch = useDispatch();
  const styles = useSelector(getSelectedComponentStyles);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    const styleValue = inputValue ? `url(${inputValue})` : '';
    dispatch(updateStyle({ name, value: styleValue }))
  }
  const extractUrl = (styleValue: string) => {
    const match = styleValue.match(/url\((.*?)\)/);
    return match ? match[1] : '';
  }

  const displayValue = styles?.[name] ? extractUrl(styles[name] as string) : '';

  return (
    <Flex gap="3" align='center'>
      <Text size='2' weight='bold' className="box-width" >
        {label}
      </Text>
      <TextField.Root
        className={cls.wrapper}
      >
        <TextField.Input
          size="1"
          value={displayValue}
          onChange={handleOnChange} />
      </TextField.Root>
    </Flex>
  )
}
