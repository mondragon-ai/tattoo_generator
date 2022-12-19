import { useEffect, useState } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    handleResize();

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}

export default useWindowWidth