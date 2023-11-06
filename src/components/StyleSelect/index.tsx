import { ChangeEvent } from "react";

import classes from './styleSelect.module.css';

interface StyleControlProps {
  label: string;
  name: string;
  onChange: ({ name, value }: { name: string, value: string }) => void;
  value?: string;
  options: string[];
}

export const StyleSelect = ({ label, name, options, onChange }: StyleControlProps) => {

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({name, value: e.target.value});
  }
  return (
    <div>
      <label htmlFor={name} className={classes.label}>{label}</label>
      <select
        className={classes.select}
        id={name}
        name={name}
        onChange={handleOnChange}>
        {options.map((option) => <option key={option} value={option}>{option}</option>
        )}
      </select>
    </div>
  )
}