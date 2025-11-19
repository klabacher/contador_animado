import { classNames } from 'utils'
import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'Providers/Redux/Store'
import { updateErrorContainer } from 'Providers/Redux/Slice'

type Size = {
  size?: {
    width: number
    height: number
  }
}

type RandomImageProps = {
  blur?: boolean
  src?: string
  alt?: string
}

const ImageContainer = ({
  size = {
    width: 1920,
    height: 1080
  },
  showErrorContainer
}: Size & {
  showErrorContainer: (title?: string, message?: string) => void
}) => {
  const { width, height } = size
  const preparedUrl = `https://picsum.photos/${width}/${height}`

  return (
    <span
      data-testid="empty-image"
      className={classNames(
        'flex padding-0 w-full h-full justify-center items-center bg-gray-200'
      )}
    >
      <img
        onError={(error) => {
          console.error('Error loading placeholder image:', error)
          showErrorContainer(
            'Image Load Error',
            'Failed to load the placeholder image.'
          )
        }}
        className={classNames('inline-block w-full h-full')}
        src={preparedUrl}
        alt="Empty Image Placeholder"
      />
    </span>
  )
}

function RandomImage({ size, src, alt }: RandomImageProps & Size) {
  const dispatch = useDispatch<AppDispatch>()
  const initialSrc = src && src.trim() ? src : undefined
  const [srcState, setSrcState] = useState<string | undefined>(initialSrc)

  useEffect(() => {
    const normalized = src && src.trim() ? src : undefined
    setSrcState(normalized)
  }, [src])

  const showErrorContainer = (title = '', message = '') => {
    dispatch(
      updateErrorContainer({
        shown: true,
        title,
        message
      })
    )
    setTimeout(() => {
      dispatch(
        updateErrorContainer({
          shown: false,
          title,
          message
        })
      )
    }, 10000)
  }

  if (!srcState) {
    return (
      <ImageContainer showErrorContainer={showErrorContainer} size={size} />
    )
  }

  return (
    <img
      onError={(error) => {
        console.error('Error loading real image:', error)
        showErrorContainer('Image Load Error', 'Fallback to placeholder image.')
        // Fallback to placeholder image
        setSrcState(undefined)
      }}
      className={classNames('inline-block w-full h-full')}
      src={srcState}
      alt={alt}
    />
  )
}

export default function RandomImageContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 1920, height: 1080 })
  const backgroundImageUrl = useSelector(
    (state: RootState) => state.counter.CounterData.Settings.backgroundImageUrl
  )

  useLayoutEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setSize({ width: Math.round(width), height: Math.round(height) })
      }
    }
    updateSize()
    let ro: ResizeObserver | null = null
    if (window.ResizeObserver && containerRef.current) {
      ro = new ResizeObserver(() => updateSize())
      ro.observe(containerRef.current)
    }
    // Fallback to window resize events to handle viewport changes
    window.addEventListener('resize', updateSize)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', updateSize)
    }
  }, [])
  return (
    <div
      ref={containerRef}
      className="w-1/2 rounded-none border-none bg-gray-100 p-4"
    >
      <RandomImage size={size} src={backgroundImageUrl} />
    </div>
  )
}
