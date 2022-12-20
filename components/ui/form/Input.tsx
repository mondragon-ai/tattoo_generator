import React, { useState } from 'react';
import main from "../../../styles/Main.module.css";

interface InputProps {
  name: string;
  label: string;
  value: string;
  error: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPress?: (event: any) => void;  
  w?: number,
  placeholder?: string
}

const CustomInput: React.FC<InputProps> = ({ name, label, value, error, onChange, onPress, w, placeholder}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.style.fontSize = '16px';
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.style.fontSize = 'inherit';
  };

  return (
    <div style={{width: `${w}%`}} className={`${main.full} ${main.paddingY} ${main.col}`}>
        <label style={{padding: "0.5rem 1rem",}} htmlFor={name}>
            {label}
        </label>
        <input
            className={`${main.full} ${main.inputs}`}
            name={name}
            value={value}
            onKeyDown={onPress}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
        />
        <span style={{padding: "0 1rem 0px 1rem"}}>
            {error}
        </span>
    </div>
  );
};

export default CustomInput;
