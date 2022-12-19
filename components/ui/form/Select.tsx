import React, { useState } from 'react'
import styles from "../../../styles/Main.module.css";

interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void,
  w?: number,
  name?: string,
  label?: string
}

const CustomSelect: React.FC<Props> = ({ options, value, onChange, w, name, label }) => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{width: `${w}%`}} className={`${styles.col} ${styles.paddingY}`}>
        <label style={{padding: "0 1rem 0px 1rem"}} htmlFor={name}>
            {label}
        </label>
      <select 
        className={`${styles.full} ${styles.inputs}`}
        value={value}
        onChange={(event) => {
          setOpen(false)
          onChange(event.target.value)
        }}
      >
        {options.map(option => (
          <option 
            className={`${styles.paddingY} ${styles.option}`}
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
    // <div style={{width: `${w}%`}} className={`${styles.container} ${styles.select}`} onClick={() => setOpen(!open)}>
    //   <div  className={`${styles.selected}`}>{value}</div>
    //   {open && (
    //     <ul className={`${styles.options}`}>
    //       {options.map(option => (
    //         <li 
    //             className={`${styles.paddingY} ${styles.option}`}
    //             key={option} onClick={() => {
    //           setOpen(false)
    //           onChange(option)
    //         }}>
    //           {option}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  )
}

export default CustomSelect
