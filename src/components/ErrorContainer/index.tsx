import { updateErrorContainer } from 'Providers/Redux/Slice'
import { AppDispatch, RootState } from 'Providers/Redux/Store'
import { useDispatch, useSelector } from 'react-redux'

export default function ErrorContainer() {
  const dispatch = useDispatch<AppDispatch>()

  const handleClose = () => {
    dispatch(
      updateErrorContainer({
        shown: false,
        title: '',
        message: '',
        close: ''
      })
    )
  }

  const ErrorContainerValues = useSelector(
    (state: RootState) => state.counter.ErrorContainer
  )

  return (
    <>
      {ErrorContainerValues.shown && (
        <div className="fixed bottom-4 left-4 z-50">
          <div
            role="status"
            aria-live="polite"
            className="flex max-w-xs items-start gap-3 rounded-md border-l-4 border-red-500 bg-white px-4 py-3 shadow-md transition-transform duration-200 ease-out"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
              !
            </span>

            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">
                {ErrorContainerValues.title}
              </p>
              <p className="mt-1 text-xs text-red-600">
                {ErrorContainerValues.message}
              </p>
            </div>

            {ErrorContainerValues.close ? (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close notification"
                className="ml-2 rounded p-1 text-red-600 hover:bg-red-100 hover:text-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.225 4.811a.75.75 0 011.06 0L10 7.525l2.715-2.714a.75.75 0 111.06 1.06L11.06 8.586l2.714 2.714a.75.75 0 11-1.06 1.06L10 9.646l-2.715 2.714a.75.75 0 11-1.06-1.06l2.714-2.714-2.714-2.714a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
