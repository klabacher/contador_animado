import RandomImageContainer from 'components/RandomImage'
import { Icon } from '@iconify/react'
import Store, { RootState } from 'Providers/Redux/Store'
import { useSelector } from 'react-redux'
import {
  updateSelectedItemId,
  updateSettingsTabState
} from 'Providers/Redux/DOMState/Slice'

// Tipos mantidos para consistência
type StatusType = 'online' | 'offline' | 'busy'

type ItemType = {
  title: string
  id: number
  status: StatusType
  date_update: string
  date_created: string
}

const itens_mocked: ItemType[] = [
  {
    title: 'Projeto Alpha - Landing Page',
    id: 1,
    status: 'online',
    date_update: '20/10/25',
    date_created: '10/10/25'
  },
  {
    title: 'Backend API - Financeiro',
    id: 2,
    status: 'offline',
    date_update: '18/09/25',
    date_created: '12/11/25'
  },
  {
    title: 'App Mobile - React Native',
    id: 3,
    status: 'busy',
    date_update: '15/08/25',
    date_created: '14/12/25'
  },
  {
    title: 'Dashboard Analytics V2',
    id: 4,
    status: 'online',
    date_update: '22/10/25',
    date_created: '01/10/25'
  },
  {
    title: 'Campanha Marketing Q3',
    id: 5,
    status: 'online',
    date_update: '25/10/25',
    date_created: '05/10/25'
  },
  {
    title: 'Integração Stripe',
    id: 6,
    status: 'busy',
    date_update: '30/10/25',
    date_created: '10/10/25'
  }
]

const StatusDot = ({ status }: { status: StatusType }) => {
  const colors = {
    online: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    offline: 'bg-slate-500',
    busy: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
  }
  return (
    <span
      className={`size-2 rounded-full ${colors[status]} ring-1 ring-black/20`}
    />
  )
}

const ActionButton = ({ icon, projId }: { icon: string; projId: number }) => {
  const dispatch = Store.dispatch

  const selectProject = (id: number | null) => {
    dispatch(updateSelectedItemId(id))
  }
  return (
    <button
      onClick={() => {
        selectProject(projId)
      }}
      className="rounded p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
    >
      <Icon icon={icon} className="size-4" />
    </button>
  )
}

const Item = ({ title, id, status, date_update }: ItemType) => {
  return (
    <div className="group flex cursor-pointer items-center justify-between border-b border-white/5 bg-transparent px-6 py-4 transition-colors hover:bg-white/[0.03]">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs font-medium text-slate-500">
          #{String(id).padStart(2, '0')}
        </span>

        <div className="flex flex-col">
          <h4 className="text-sm font-medium text-slate-200 group-hover:text-white">
            {title}
          </h4>
          <div className="mt-1 flex items-center gap-2">
            <StatusDot status={status} />
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              {status}
            </span>
            <span className="text-[10px] text-slate-600">•</span>
            <span className="text-[10px] text-slate-500">
              Atualizado: {date_update}
            </span>
          </div>
        </div>
      </div>

      {/* Ações aparecem no hover */}
      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <ActionButton key={id} projId={id} icon="mdi:select" />
        <ActionButton key={id} projId={id} icon="mdi:dots-vertical" />
      </div>
    </div>
  )
}

const ItemList = ({ items }: { items: ItemType[] }) => {
  return (
    <div className="flex size-full flex-col">
      <div className="border-b border-white/10 bg-white/[0.02] px-6 py-5 backdrop-blur-sm">
        <h3 className="flex items-baseline text-lg font-semibold tracking-tight text-white">
          Projetos -
          <span className="ml-2 text-sm font-normal text-slate-500">
            Visão geral dos seus projetos
          </span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col divide-y divide-white/5">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SideA() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-800 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-slate-950/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex size-full items-center justify-center p-4 sm:p-6">
        <div
          id="sdsajkdjhsd"
          className="flex h-[65vh] w-4/5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl transition-all"
        >
          <ItemList items={itens_mocked} />
        </div>
      </div>
    </div>
  )
}

function SideB() {
  const dispatch = Store.dispatch

  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )

  const selectProject = (id: number | null) => {
    dispatch(updateSelectedItemId(id))
  }
  const changeTab = (tab: string) => {
    dispatch(updateSettingsTabState(tab))
  }

  return (
    <div className="relative flex h-full w-1/2 flex-col items-center justify-center bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="z-10">
        {selecionado ? (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">
              Detalhes do Projeto #{String(selecionado).padStart(2, '0')}
            </h2>
            <hr className="h-0.5 w-full" />
            <p className="text-sm text-slate-400">
              Aqui você pode ver e editar os detalhes do projeto selecionado.
            </p>
            <div className="flex flex-row gap-1">
              <div
                onClick={() => {
                  changeTab('TabEditItem')
                }}
                className="mt-4 flex cursor-pointer items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <span>Editar</span>
                <Icon icon="mdi:pencil" />
              </div>
              <div
                onClick={() => {
                  selectProject(null)
                }}
                className="mt-4 flex cursor-pointer items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <span>Retornar</span>
                <Icon icon="mdi:exit-to-app" />
              </div>
            </div>
            {/* Adicione mais detalhes e funcionalidades conforme necessário */}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Nenhum Projeto Selecionado</h2>
            <hr className="h-0.5 w-full" />
            <p className="text-sm text-slate-400">
              Por favor, selecione um projeto na lista à esquerda para ver os
              detalhes. Ou Crie um novo:
            </p>
            <button
              onClick={() => changeTab('TabCreateItem')}
              className="mt-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Novo Projeto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TabExplorerContainer() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black p-0">
      <div className="flex h-screen w-screen overflow-hidden rounded-xl bg-transparent shadow-inner">
        <SideA />
        <SideB />
      </div>
    </div>
  )
}
