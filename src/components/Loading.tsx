import { useEffect, useState } from 'react'
import { LoadingIcon } from 'tdesign-icons-react'

export default function ({ isLoading = true }) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (!isLoading)
      return
    const timer = setInterval(() => {
      setCount(count => (count + 1) % 4)
    }, 200)
    return () => clearInterval(timer)
  }, [isLoading])
  return <>
    <LoadingIcon />
    火速加载数据中{Array(count).fill('.').join('')}
  </>
}
