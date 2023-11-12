import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedComponentId, updateText } from '@/store/slices/layoutSlice';
import classNames from 'classnames';

import cls from './text.module.css';

interface TextProps {
  id: string;
  styles?: React.CSSProperties;
  text?: string;
}

export const RenderText = ({ id, text, styles }: TextProps) => {
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
      dispatch(updateText(editableText));
    }
  };

  const textClass = classNames(cls.text, {
    [cls.selected]: selectedComponentId === id,
  });

  return (
    <p
      id={id}
      style={styles}
      onDoubleClick={handleDoubleClick}
      className={textClass}
    >
      {isEditing ? (
        <input
          type='text'
          value={editableText}
          onChange={handleTextChange}
          onBlur={handleBlur}
          autoFocus
          className={cls.input}
        />
      ) : (
        editableText || 'Double-click to edit text'
      )}
    </p>
  );
};
