/// https://icon-sets.iconify.design/material-symbols/?icon-filter=menu
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { updateSettings } from 'Providers/ReduxProvider/LogicStore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HourPickerCustom({
  handleOverlayToggle
}: {
  handleOverlayToggle: () => void
}) {
  const dispatch = useDispatch<AppDispatch>()
  const storeSettings = useSelector(
    (state: RootState) => state.counter.Settings
  )
  const [inputValue, setInputValue] = useState(
    storeSettings.Styles.backgroundImageUrl || ''
  )
  const { t } = useTranslation()

  const handleBackgroundImageUrl = (url: string) => {
    dispatch(
      updateSettings({
        section: 'Styles',
        data: { ...storeSettings.Styles, backgroundImageUrl: url }
      })
    )
  }

  // Todo: Validate URL format or show error message and leave placeholder
  return (
    <div className="flex size-full flex-col gap-2">
      <label
        htmlFor="inputField"
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {t('hud.imageUrlPicker.label')}
      </label>
      <input
        type="url"
        id="inputField"
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-sky-500 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        placeholder="https://picsum.photos"
        value={inputValue}
        onChange={(el) => {
          setInputValue(el.target.value)
        }}
      />
      <button
        className="mt-4 flex border-spacing-1 flex-row items-center justify-center rounded bg-blue-500 px-4 py-2 font-mono text-white hover:bg-blue-600"
        onClick={() => {
          handleBackgroundImageUrl(inputValue)
          handleOverlayToggle()
        }}
        type="submit"
      >
        <p>{t('hud.buttons.apply')}</p>
        <Icon
          icon="material-symbols:subdirectory-arrow-left"
          width="24"
          height="24"
        />
      </button>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {t('hud.imageUrlPicker.placeholderExample')}
      </div>
    </div>
  )
}
