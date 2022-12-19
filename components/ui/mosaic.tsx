import Image from 'next/image'
import React from 'react'

interface Props {
  images: string[]
  columns: number
}

const MosaicGrid: React.FC<Props> = ({ images, columns }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map((image, index) => (
        <div key={index} style={{ width: `${100 / columns}%`, padding: `${2 / columns}%` }}>
          <Image alt="" width={100} height={100} src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "10px", border: "1px solid black" }} />
        </div>
      ))}
    </div>
  )
}

export default MosaicGrid