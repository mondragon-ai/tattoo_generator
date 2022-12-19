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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div style={{width: `${w}%`}} className={`${main.full} ${main.paddingY}`}>
        <label style={{padding: "0 1rem 0px 1rem"}} htmlFor={name}>
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
