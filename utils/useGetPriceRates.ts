import { useState, useEffect } from 'react'
import axios from 'axios'
export const useGetPriceRates = () => {
  const [euroToEth, setEuroToEth] = useState<number>(1)
  const getPriceRate = async () => {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_COINBASE_API ?? '')
    setEuroToEth(+(1 / data.data.rates.EUR).toFixed(18))
  }
  getPriceRate()
  useEffect(() => {
    const interval = setInterval(() => getPriceRate(), 10000)
    return () => clearInterval(interval)
  }, [])
  return { euroToEth }
}
