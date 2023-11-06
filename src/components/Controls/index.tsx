
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentType, StyleProps, addComponent, deleteComponent, getSelecterComponent, updateStyles, updateText } from '@/store/slices/layoutSlice';
import { Control } from '../Control';
import { StyleSelect } from '../StyleSelect';
import cls from './controls.module.css';

const styleControls = [
  { label: 'Width', name: 'width', onlyNumbers: true },
  { label: 'Height', name: 'height', onlyNumbers: true },
  { label: 'Padding', name: 'padding', onlyNumbers: true },
  { label: 'Padding top', name: 'paddingTop', onlyNumbers: true },
  { label: 'Padding bottom', name: 'paddingBottom', onlyNumbers: true },
  { label: 'Padding Right', name: 'paddingRight', onlyNumbers: true },
  { label: 'Padding Left', name: 'paddingLeft', onlyNumbers: true },
  { label: 'Margin', name: 'margin', onlyNumbers: true },
  { label: 'Margin top', name: 'marginTop', onlyNumbers: true },
  { label: 'Margin bottom', name: 'marginBottom', onlyNumbers: true },
  { label: 'Margin Right', name: 'marginRight', onlyNumbers: true },
  { label: 'Margin Left', name: 'marginLeft', onlyNumbers: true },
  { label: 'Color', name: 'color', type: 'color' },
  { label: 'Background Color', name: 'backgroundColor', type: 'color' },
];


export const Controls = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const dispatch = useDispatch();
  const selectedComponent = useSelector(getSelecterComponent);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  }

  const handleAddComponent = useCallback((type: ComponentType) => {
    dispatch(addComponent({ type }));
  }, [dispatch])

  const handleUpdateStyles = useCallback(({ name, value }: { value: string, name: string }) => {
    dispatch(updateStyles({ styles: { [name]: value } }));
  }, [dispatch]);

  const handleDeleteComponent = useCallback(() => {
    if (!selectedComponent) return;
    dispatch(deleteComponent(selectedComponent?.id));
  }, [dispatch, selectedComponent]);

  const hanldeChangeButtonText = useCallback(({ value }: { value: string }) => {
    dispatch(updateText({ text: value }))
  }, [dispatch]);

  return (
    <div className={`${cls.sidebar} ${isOpen && cls.open}`}>
      <button className={cls.openButton} onClick={toggleSidebar}>
        <i className={`${cls.arrow} ${isOpen ? cls.right : cls.left}`} />
      </button>
      <div className={cls.buttonWrapper}>
        <button
          onClick={() => handleAddComponent(ComponentType.SECTION)}
          className={cls.controlButton}>
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
        {selectedComponent?.type === ComponentType.BUTTON && (
          <Control
            label='Text'
            name='text'
            type='text'
            value={selectedComponent?.text}
            onChange={hanldeChangeButtonText}
          />
        )}
        {selectedComponent && (
          <>
            {styleControls.map(({ label, name, type, onlyNumbers }) => (
              <Control
                key={name}
                label={label}
                name={name}
                type={type || 'text'}
                value={selectedComponent.styles[name as keyof StyleProps] ?? ''}
                onChange={handleUpdateStyles}
                onlyNumbers={!!onlyNumbers}
              />
            ))}

            <StyleSelect
              label='Display'
              name='display'
              options={['block', 'flex', 'grid']}
              onChange={handleUpdateStyles}
            />
          </>
        )}
      </div>
    </div>
  )
}