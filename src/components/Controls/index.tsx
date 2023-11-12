
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, IconButton } from '@radix-ui/themes';
import { Trash2 } from 'react-feather';
import {
  ComponentType,
  addComponent,
  deleteComponent,
  getSelectedComponent
} from '@/store/slices/layoutSlice';


import { styleControlMap } from './controlsScheme';
import { RenderControls } from '../RenderControls';

import cls from './controls.module.css';

export const Controls = () => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(getSelectedComponent);

  const handleAddComponent = useCallback((type: ComponentType) => {
    dispatch(addComponent({ type }));
  }, [dispatch])


  const handleDeleteComponent = useCallback(() => {
    if (!selectedComponent) return;
    dispatch(deleteComponent(selectedComponent?.id));
  }, [dispatch, selectedComponent]);

  return (
    <div className={cls.sidebar}>
      <Box height='100%' p='4' className={cls.container}>
        <Flex align='center' gap='3'>
          <Button size="1" variant="solid" onClick={() => handleAddComponent(ComponentType.SECTION)}>
            Add Section
          </Button>
          <Button size="1" variant="solid" onClick={() => handleAddComponent(ComponentType.BUTTON)}>
            Add Button
          </Button>
          <IconButton size='1' variant='ghost' onClick={handleDeleteComponent}>
            <Trash2 width={14} height={14} />
          </IconButton>
        </Flex>
        <Flex direction='column' gap='3' mt='4'>
          {selectedComponent && (
            <>
              {styleControlMap.map(({ name, label, type }) => {
                return <RenderControls
                  key={name}
                  name={name}
                  label={label}
                  type={type} />
              })}
            </>
          )}
        </Flex>
      </Box>
    </div>
  )
}