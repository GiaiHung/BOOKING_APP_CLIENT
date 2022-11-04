import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(url)
        setData(data)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
      setLoading(false)
    }

    fetchData()
  }, [url])

  const reFetch = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      setData(data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return { loading, error, data, reFetch }
}

export default useFetch
