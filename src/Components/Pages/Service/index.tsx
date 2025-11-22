import { useEffect } from 'react'
import CounterContainer from 'Components/Utils/Counter'
import LogicProvider from 'Providers/LogicProvider'
import { updateSettings } from 'Providers/ReduxProvider/LogicStore'
import { AppDispatch } from 'Providers/ReduxProvider/Store'
import { useDispatch } from 'react-redux'

// Loads real data for a production counter view
export default function CountDownContainer(id: string) {
  const dispatch = useDispatch<AppDispatch>()
  // Add logic to get data and load to Redux store
  useEffect(() => {
    // Fetch data and load to Redux store
    const fetchData = async () => {
      const result = await LogicProvider.fetchCounterData(id)
      if (result.success && result.data) {
        // Update Redux store with fetched data
        dispatch(updateSettings({ section: 'Settings', data: result.data }))
      }
    }
    fetchData()
  }, [id, dispatch])
  return <CounterContainer />
}
