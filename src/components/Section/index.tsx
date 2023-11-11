import { selectSelectedComponentId } from '@/store/slices/layoutSlice';
import { useSelector } from 'react-redux';

import classes from './section.module.css';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  styles?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ id, children, styles }) => {
  const selectedComponentId = useSelector(selectSelectedComponentId);

  const isSelected = selectedComponentId === id;

  return (
    <div
      id={id}
      className={`${classes.section} ${isSelected ? classes.selected : ''}`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default Section;