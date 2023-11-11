import { useState } from 'react';
import { Maximize, Minimize } from 'react-feather';

import { Collapsible } from '../Collapsible';

import cls from './control.module.css';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import { DimensionInput } from '../DimensionInput';

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
          <div className={cls.addControls}>
            <div className={cls.gridButton}>
              <IconButton variant="ghost" color="gray" onClick={toggleAdditionalControl}>
                <Minimize size={14} />
              </IconButton>
            </div>
            <div className={cls.gridLeft}>
              <DimensionInput
                name={name + 'Left'}
              />
            </div>
            <div className={cls.gridRight}>
              <DimensionInput
                name={name + 'Right'}
              />
            </div>
            <div className={cls.gridTop}>
              <DimensionInput
                name={name + 'Top'}
              />
            </div>
            <div className={cls.gridBottom}>
              <DimensionInput
                name={name + 'Bottom'}
              />
            </div>
          </div>
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