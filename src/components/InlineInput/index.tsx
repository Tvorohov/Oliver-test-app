import React from 'react';
import { DimensionInput } from '../DimensionInput';

import { Flex, Text } from '@radix-ui/themes';

type InlineInputProps = {
  label: string;
  name: string;

};

export const InlineInput = ({ label, name }: InlineInputProps) => {
  return (
    <Flex gap="3" align='center'>
      <Text size='2' weight='bold' className='box-width'>
        {label}:
      </Text>
      <DimensionInput
        name={name}
      />
    </Flex>
  );
};

