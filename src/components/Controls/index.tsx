
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentType, addComponent, deleteComponent, getSelectedComponent, updateText } from '@/store/slices/layoutSlice';

import cls from './controls.module.css';
import { styleControlMap } from './controlsScheme';
import { RenderControls } from '../RenderControls';

export const Controls = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const dispatch = useDispatch();
  const selectedComponent = useSelector(getSelectedComponent);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  }

  const handleAddComponent = useCallback((type: ComponentType) => {
    dispatch(addComponent({ type }));
  }, [dispatch])


  const handleDeleteComponent = useCallback(() => {
    if (!selectedComponent) return;
    dispatch(deleteComponent(selectedComponent?.id));
  }, [dispatch, selectedComponent]);

  const hanldeChangeButtonText = useCallback(({ value }: { value: string }) => {
    dispatch(updateText({ text: value }))
  }, [dispatch]);

  return (
    <div className={`${cls.sidebar} ${isOpen && cls.open}`}>
      {/* <button className={cls.openButton} onClick={toggleSidebar}>
        <i className={`${cls.arrow} ${isOpen ? cls.right : cls.left}`} />
      </button> */}
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