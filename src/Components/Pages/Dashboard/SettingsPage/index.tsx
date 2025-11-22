import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'
// import Status from 'components/Pages/Dashboard/SettingsPage/Status'

import TabExplorerMenu from './Tabs/TabExplorerMenu'
import TabCreateItem from './Tabs/TabCreateItem'
import TabEditItem from './Tabs/TabEditItem'

export default function DashboardMenu() {
  const tabSelected = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.SettingsTab
  )
  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        {/* TODO: add new sucess box for changes */}
        {tabSelected === 'TabExplorerMenu' && <TabExplorerMenu />}
        {tabSelected === 'TabCreateItem' && <TabCreateItem />}
        {tabSelected === 'TabEditItem' && <TabEditItem />}
        {/* <Status /> */}
      </div>
    </>
  )
}
