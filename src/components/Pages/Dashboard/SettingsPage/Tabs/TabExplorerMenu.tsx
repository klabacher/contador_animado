import RandomImageContainer from 'components/RandomImage'
import { Icon } from '@iconify/react'

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

// Status Minimalista
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

const ActionButton = ({ icon }: { icon: string }) => (
  <button className="rounded p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
    <Icon icon={icon} className="size-4" />
  </button>
)

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
        <ActionButton icon="mdi:pencil" />
        <ActionButton icon="mdi:dots-vertical" />
      </div>
    </div>
  )
}

const ItemList = ({ items }: { items: ItemType[] }) => {
  return (
    <div className="flex size-full flex-col">
      {/* Header com linha forte */}
      <div className="border-b border-white/10 bg-white/[0.02] px-6 py-5 backdrop-blur-sm">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          Projetos
        </h3>
        <p className="text-xs text-slate-400">
          Visão geral dos seus contadores
        </p>
      </div>

      {/* Lista Scrollável */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col divide-y divide-white/5">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Footer com linha forte */}
      <div className="border-t border-white/10 bg-white/[0.02] px-6 py-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-600 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-slate-400 hover:text-white">
          <Icon icon="mdi:plus" />
          Criar Novo Projeto
        </button>
      </div>
    </div>
  )
}

function SideA() {
  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-800 shadow-2xl">
      {/* CAMADA 1: Fundo (Imagem Estável) */}
      <div className="absolute inset-0 z-0">
        <RandomImageContainer />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply" />
      </div>

      {/* CAMADA 2: O Conteúdo (Card Estendido) */}
      <div className="relative z-10 flex size-full items-center justify-center p-6 sm:p-12">
        {/* CONTAINER CARD: Glassmorphism 80% Transparente */}
        <div className="flex size-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl">
          <ItemList items={itens_mocked} />
        </div>
      </div>
    </div>
  )
}

function SideB() {
  return (
    <div className="relative flex h-full w-1/2 flex-col items-center justify-center bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="z-10"></div>
    </div>
  )
}

export default function TabExplorerContainer() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black p-1">
      <div className="flex h-screen w-screen overflow-hidden rounded-xl bg-slate-900 shadow-inner">
        <SideA />
        <SideB />
      </div>
    </div>
  )
}
