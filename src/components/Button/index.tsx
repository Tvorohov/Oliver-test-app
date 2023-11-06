import { selectSelectedComponentId } from '@/store/slices/layoutSlice';
import React from 'react';
import { useSelector } from 'react-redux';

import classes from './button.module.css';

interface ButtonProps {
  id: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
  text?: string;
}

const Button: React.FC<ButtonProps> = ({id, text, styles, onClick }) => {
  const selectedComponentId = useSelector(selectSelectedComponentId);

  const isSelected = selectedComponentId === id;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(onClick) {
      onClick();
    }
  };

  return (
    <button
      id={id}
      style={styles}
      onClick={handleClick}
      className={`${classes.button} ${isSelected ? classes.selected : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;