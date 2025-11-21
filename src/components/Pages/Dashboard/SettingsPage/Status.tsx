import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { reduxSlice } from 'Providers/Redux/DOMState'
import { RootState } from 'Providers/Redux/Store'

// Define the steps structure for easy adding/modifying
type Step = {
  id: string
  label: string
  icon: string
  // Which tabs correspond to this step
  matches: string[]
}

const STEPS: Step[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: 'noto:card-file-box', // Notion-like icon style
    matches: ['TabExplorerMenu']
  },
  {
    id: 'editor',
    label: 'Editor',
    icon: 'noto:pencil',
    matches: ['TabCreateItem', 'TabEditItem']
  }
]

export default function Status() {
  const dispatch = useDispatch()
  const currentTab = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.SettingsTab
  )
  const projectTitle = useSelector(
    (state: RootState) => state.counter.Texts.title
  )

  // Find current active step index
  const activeStepIndex = STEPS.findIndex((step) =>
    step.matches.includes(currentTab)
  )

  const handleStepClick = (step: Step) => {
    // Logic for navigation
    // We allow going back to Projects always
    if (step.id === 'projects') {
      dispatch(reduxSlice.actions.updateSettingsTabState('TabExplorerMenu'))
    }
    // Future: If we want to allow jumping to Editor (e.g. last edited), we'd need more state
  }

  return (
    <div className="absolute left-1/2 top-24 z-50 -translate-x-1/2">
      <div className="flex items-center gap-6">
        {STEPS.map((step, index) => {
          const isActive = index === activeStepIndex
          const isCompleted = index < activeStepIndex
          // Allow clicking if it's a previous step or the 'projects' step (which is the root)
          const isClickable = step.id === 'projects' || index < activeStepIndex

          // Dynamic label for Editor step
          let label = step.label
          if (step.id === 'editor' && projectTitle) {
            // Truncate if too long
            label =
              projectTitle.length > 20
                ? `${projectTitle.substring(0, 20)}...`
                : projectTitle
          }

          return (
            <div key={step.id} className="flex items-center gap-6">
              <button
                onClick={() => isClickable && handleStepClick(step)}
                disabled={!isClickable}
                className={`group flex items-center gap-3 transition-all ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Circle Icon */}
                <div
                  className={`relative flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-blue-500 bg-white text-blue-600 shadow-md dark:bg-[#191919] dark:text-blue-400'
                      : isCompleted
                        ? 'border-green-500 bg-green-50 text-green-600 dark:border-green-600 dark:bg-green-900/20 dark:text-green-400'
                        : 'border-gray-300 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-600'
                  }`}
                >
                  <Icon icon={step.icon} className="text-xl" />

                  {/* Active Pulse/Ring */}
                  {isActive && (
                    <motion.div
                      layoutId="activeRing"
                      className="absolute -inset-1 rounded-full border-2 border-blue-200 dark:border-blue-900"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gray-900 dark:text-gray-100'
                      : isCompleted
                        ? 'text-gray-600 dark:text-gray-400'
                        : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {label}
                </span>
              </button>

              {/* Arrow Connector */}
              {index < STEPS.length - 1 && (
                <div className="text-gray-300 dark:text-gray-700">
                  <Icon icon="lucide:arrow-right" width="24" height="24" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
