import React from 'react';
import * as CollapsibleRadix from '@radix-ui/react-collapsible';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { ChevronDown } from 'react-feather';

import cls from './style.module.css';

interface CollapsibleProps {
  label: string;
  children?: React.ReactNode;
  slot?: React.ReactNode;
}

export const Collapsible = ({ label, slot, children }: CollapsibleProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const hasValidChildren = React.Children.toArray(children).some(child => child);

  return (
    <CollapsibleRadix.Root open={open} onOpenChange={setOpen}>
      <Flex gap="3" align='center'>
        <Text size='2' weight='bold' className='box-width'>
          {label}:
        </Text>
        {slot}
        {hasValidChildren && (
          <CollapsibleRadix.Trigger asChild>
            <IconButton size='1' variant="outline" color='gray' className={cls.arrow}>
              <ChevronDown size={14} />
            </IconButton>
          </CollapsibleRadix.Trigger>
        )}
      </Flex>
      <CollapsibleRadix.Content>
        {children}
      </CollapsibleRadix.Content>
    </CollapsibleRadix.Root>
  )
};
