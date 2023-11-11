import { selectComponents, selectComponent, ComponentType } from '@/store/slices/layoutSlice';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button';
import Section from '../Section';

import cls from './style.module.css';

export const RenderComponets = () => {
  const components = useSelector((state: RootState) => selectComponents(state));
  const dispatch = useDispatch();
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
            className={cls.root}
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
    <>
      {renderComponent('root')}
    </>
  )
}