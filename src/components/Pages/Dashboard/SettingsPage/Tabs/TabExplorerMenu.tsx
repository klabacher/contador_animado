import RandomImageContainer from 'components/RandomImage'
import CounterContainer from 'components/Pages/Service/Counter'

type Item = {
  title: string
  id: number
  status: 'online' | 'offline' | 'busy'
  date_update: string
  date_created: string
}
type Items = Item[]

const itens_mocked: Items = [
  {
    title: 'Item 1',
    id: 1,
    status: 'online',
    date_update: '20/10/25',
    date_created: '10/10/25'
  },
  {
    title: 'Item 2',
    id: 2,
    status: 'offline',
    date_update: '18/09/25',
    date_created: '12/11/25'
  },
  {
    title: 'Item 3',
    id: 3,
    status: 'busy',
    date_update: '15/08/25',
    date_created: '14/12/25'
  }
]

const Item = ({ name }: { name: string }) => {
  return <li className="mb-2 text-lg">{name}</li>
}

const ItemList = (items: Items) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <ul className="list-disc">
        {items.map((item) => (
          <Item key={item.id} name={item.title} />
        ))}
      </ul>
    </div>
  )
}

function SideA() {
  return (
    <>
      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-blue-100">
        <RandomImageContainer />
      </div>
      <div>
        <ItemList items={itens_mocked} />
      </div>
    </>
  )
}

function SideB() {
  return (
    <div className="flex h-full w-1/2 flex-col items-center justify-center bg-yellow-100">
      <h2 className="mb-4 text-2xl font-bold">Counter</h2>
      <CounterContainer />
    </div>
  )
}

export default function CounterContainer2() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
      <div className="flex h-screen w-screen">
        {/* TODO: add new sucess box for changes */}
        <SideA />
        <SideB />
      </div>
    </div>
  )
}
