import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../../styles/Main.module.css';

interface Props {
  images: string[]
  interval: number
}

const RotatingImage: React.FC<Props> = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  console.log(images)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length)
    }, interval)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currentImageIndex, interval, images])

  return (
    <h1 style={{zIndex: 1, padding: "3rem 0 1rem 0"}} className={`${styles.full}`}>
      {images.map((image, index) => (
        <span key={image} className={`${styles.full}`} style={{ display: index === currentImageIndex ? 'inline' : 'none' }}>
          <Image alt={image} width={100} height={100} src={image} style={{ width: '30%', height: '30%', objectFit: 'contain', borderRadius: "10px", border: "1px solid black" }} />
        </span>
      ))}
    </h1>
  )
}

export default RotatingImage