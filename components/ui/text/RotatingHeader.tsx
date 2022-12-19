import React, { useState, useEffect } from 'react'

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
    <h1 style={{textAlign: "right"}}>
      {words.map((word, index) => (
        <span key={word} style={{ display: index === currentWordIndex ? 'inline' : 'none' }}>
          Generate tattoo ideas in the style of <span style={{color: "red", textDecoration: "line-through"}}>{word}</span>
        </span>
      ))}
    </h1>
  )
}

export default Header
