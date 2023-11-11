import { selectSelectedComponentId } from '@/store/slices/layoutSlice';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import classes from './section.module.css';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  styles?: React.CSSProperties;
}

export const RenderSection: React.FC<SectionProps> = ({ id, children, styles }) => {
  const selectedComponentId = useSelector(selectSelectedComponentId);

  const sectionClasses = classNames(classes.section, {
    [classes.selected]: selectedComponentId === id,
  })

  return (
    <div
      id={id}
      className={sectionClasses}
      style={styles}
    >
      {children}
    </div>
  );
};
