import * as React from 'react';
import styles from '../../styles/Main.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: any) => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} type="button" className={`${styles.button} ${styles.full} ${styles.paddingY}`} style={{color: "white"}}>
      {children}
    </button>
  );
};

export default Button;