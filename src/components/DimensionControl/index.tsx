import { useState } from 'react';
import { Maximize } from 'react-feather';

import { Collapsible } from '../Collapsible';

import { Flex, IconButton } from '@radix-ui/themes';
import { DimensionInput } from '../DimensionInput';
import { AdditionalDimensionControl } from '../AdditionalDimensionControl';

interface DimensionControlProps {
  label: string;
  name: string;
}

export const DimensionControl = ({ label, name }: DimensionControlProps) => {
  const [showAdditionalControl, setShowAdditionalControl] = useState<boolean>(false);

  const toggleAdditionalControl = () => {
    setShowAdditionalControl((prev) => !prev);
  }
  return (
    <Collapsible label={label}>
      {
        showAdditionalControl ? (
          <AdditionalDimensionControl
            onClick={toggleAdditionalControl}
            options={[
              {
                name: name + 'Left',
                position: 'left'
              },
              {
                name: name + 'Right',
                position: 'right'
              },
              {
                name: name + 'Top',
                position: 'top'
              },
              {
                name: name + 'Bottom',
                position: 'bottom'
              },
            ]}
          />
        ) : (
          <Flex mt='2' align='center' gap='2'>
            <IconButton variant="ghost" color='gray' onClick={toggleAdditionalControl}>
              <Maximize size={14} />
            </IconButton>
            <DimensionInput
              name={name}
            />
          </Flex>
        )
      }
    </Collapsible>
  )
}
