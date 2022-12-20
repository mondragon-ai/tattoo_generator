import React, { useState, useEffect } from 'react'
import styles from '../../../styles/Main.module.css';

interface Props {
  words: string[]
  interval: number
}

const Header: React.FC<Props> = ({ words, interval }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentWordIndex((currentWordIndex + 1) % words.length)
    }, interval)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currentWordIndex, interval, words])

  return (
    <h1 style={{textAlign: "left", zIndex: "100"}} className={`${styles.full}`}>
      {words.map((word, index) => (
        <span key={word} className={`${styles.full}`} style={{ display: index === currentWordIndex ? 'inline' : 'none' }}>
          Generate tattoo <br />ideas in the style of <br /><span style={{color: "#e64343", textDecoration: "line-through", fontSize: "3rem"}}>{word}</span>
        </span>
      ))}
    </h1>
  )
}

export default Header
