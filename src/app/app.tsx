"use client"
import React from 'react';
import Section from '@/components/Section';
import Button from '@/components/Button';
import {  useDispatch, useSelector } from 'react-redux';
import { ComponentProps, ComponentType, selectComponent, selectComponents } from '@/store/slices/layoutSlice';
import { RootState } from '@/store/store';
import { Controls } from '@/components/Controls';

import style from  './app.module.css';

// const loadLayoutFromLocalStorage = (): ComponentProps[] => {
//   const savedLayout = localStorage.getItem('layout');
//   return savedLayout ? JSON.parse(savedLayout) : [initialComponent];
// };

const App: React.FC = () => {
  const components = useSelector((state: RootState) => selectComponents(state));
  const dispatch = useDispatch();

  // const saveLayoutToLocalStorage = (layout: ComponentProps[]) => {
  //   localStorage.setItem('layout', JSON.stringify(layout));
  // };
  

  // useEffect(() => {
  //   saveLayoutToLocalStorage(components);
  // }, [components]);

  const handleSelectComponent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const { id } = target;

      dispatch(selectComponent(id));
  }

  const renderComponent = (id: string) => {
    const component = components[id]
    if (!component) return null;
    switch (component.type) {
      case ComponentType.SECTION:
        return (
          <Section
            key={id}
            id={id}
            styles={component.styles}
          >
            {component.children.map((childId) => renderComponent(childId))}
          </Section>
        );
      case ComponentType.BUTTON:
        return (
          <Button
            key={id}
            id={id}
            styles={component.styles}
            text={component.text}
          />
        );
      case ComponentType.ROOT:
        return (
          <div 
            className={style.root}
            key={id} 
            id={id} 
            onClick={handleSelectComponent}>
            {component.children.map((childId) => renderComponent(childId))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Controls />
      {renderComponent('root')}
    </div>
  );
};

export default App;
