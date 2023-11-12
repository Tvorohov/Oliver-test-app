import { getSelectedComponentStyles, updateStyle } from '@/store/slices/layoutSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../Select';
import { AdditionalDimensionControl } from '../AdditionalDimensionControl';
import { Collapsible } from '../Collapsible';

const positionOptions = ['relative', 'absolute', 'fixed', 'sticky', 'static'];

export const PositionControl = () => {
  const [positon, setPosition] = useState<string>('relative');
  const dispatch = useDispatch();

  const styles = useSelector(getSelectedComponentStyles);

  useEffect(() => {
    if (styles?.position) {
      setPosition(styles.position);
    }
  }, [styles?.position]);

  const handlePositionChange = (value: string) => {
    setPosition(value);
    dispatch(updateStyle({ name: 'position', value }))
  }

  return (
    <>
      <Collapsible label='Position'
        slot={
          <Select
            options={positionOptions}
            value={positon}
            onChange={handlePositionChange}
            size='1'
          />
        }
      >
        <AdditionalDimensionControl
          options={[
            {
              name: 'left',
              position: 'left'
            },
            {
              name: 'right',
              position: 'right'
            },
            {
              name: 'top',
              position: 'top'
            },
            {
              name: 'bottom',
              position: 'bottom'
            },
          ]}
        />
      </Collapsible>
    </>
  )
}