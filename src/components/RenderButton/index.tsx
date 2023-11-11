import { selectSelectedComponentId, updateText } from '@/store/slices/layoutSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import cls from './button.module.css';

interface ButtonProps {
  id: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
  text?: string;
}

export const RenderButton = ({ id, text, styles, onClick }: ButtonProps) => {


  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);
  const selectedComponentId = useSelector(selectSelectedComponentId);
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editableText) {
      dispatch(updateText(editableText))
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isEditing && onClick) {
      onClick();
    }
  };

  const buttonClass = classNames(cls.button, {
    [cls.selected]: selectedComponentId === id,
  })

  return (
    <button
      id={id}
      style={styles}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={buttonClass}
    >
      {isEditing ? (
        <input
          type="text"
          value={editableText}
          onChange={handleTextChange}
          onBlur={handleBlur}
          autoFocus
          name='text'
        />
      ) : (
        editableText
      )}
    </button>
  )
}