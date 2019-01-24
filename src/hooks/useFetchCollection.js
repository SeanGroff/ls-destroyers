import { useEffect, useState } from 'react'

const useFetchCollection = ({ firebase, collection, defaultData = null }) => {
  const [data, setData] = useState(defaultData)
  const _fetch = async () => {
    try {
      const { docs } = await firebase.db.collection(collection).get()
      const data = docs.map(doc => doc.data())
      setData(data)
    } catch (err) {
      console.error(err.message)
      return defaultData
    }
  }

  useEffect(() => {
    _fetch()
  }, [])

  return data
}

export default useFetchCollection
