import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import styles from './control.module.css';

interface ControlProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  onChange: ({ name, value }: { name: string, value: string }) => void;
  value?: string;
  onlyNumbers?: boolean;
}

export const Control = ({ label, name, value, type, onChange, onlyNumbers }: ControlProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (onlyNumbers && inputValue) {
      if (!inputValue.match(/^\d*$/)) {
        return;
      }
      inputValue += 'px';
    }
    onChange({ name, value: inputValue });
  }

  const displayValue = onlyNumbers && value ? value.replace('px', '') : value;

  return (
    <div>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        type={type}
        placeholder={name}
        value={displayValue}
        onChange={handleOnChange}
        id={name}
      />
      {onlyNumbers && 'px'}
    </div>
  )
}