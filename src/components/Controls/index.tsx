
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentType, addComponent, deleteComponent, getSelectedComponent, updateText } from '@/store/slices/layoutSlice';

import cls from './controls.module.css';
import { styleControlMap } from './controlsScheme';
import { RenderControls } from '../RenderControls';

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
      <div className={cls.container}>
        <div className={cls.buttonWrapper}>
          <button
            onClick={() => handleAddComponent(ComponentType.SECTION)}
            className={cls.controlButton}
          >
            Add Section
          </button>
          <button
            onClick={() => handleAddComponent(ComponentType.BUTTON)}
            className={cls.controlButton}>
            Add Button
          </button>
          {selectedComponent && (
            <button
              onClick={handleDeleteComponent}
              className={cls.controlButton}>
              Delete
            </button>
          )}
        </div>

        <div className={cls.controls}>
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
        </div>
      </div>
    </div>
  )
}