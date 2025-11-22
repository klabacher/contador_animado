import CounterContainer from 'Components/Pages/Service/Counter'
import RandomImageContainer from 'Components/RandomImage'

// Add Mini and full screen preview modes
// Mini mode shows how it will look like in a small embed
export function MiniPreview() {
  return (
    <div className="flex h-64 w-96 flex-row">
      <div className="size-1/2 border-r-2 border-gray-300">
        <CounterContainer />
      </div>
      <div className="flex size-1/2 flex-col items-center justify-center gap-4 p-4">
        <h2 className="text-lg font-bold">Mini Counter Preview</h2>
        <p className="text-center text-sm text-gray-600">
          This is how your counter will appear in a small embed.
        </p>
        <RandomImageContainer />
      </div>
    </div>
  )
}

// Fullscreen mode shows how it will look like on a full screen
export default function PreviewPage() {
  return (
    <div className="flex h-screen w-screen flex-row">
      <div className="size-1/2 border-r-2 border-gray-300">
        <CounterContainer />
      </div>
      <div className="flex size-1/2 flex-col items-center justify-center gap-4 p-4">
        <h2 className="text-2xl font-bold">Your Counter Preview</h2>
        <p className="text-center text-gray-600">
          This is how your counter will appear to your audience.
        </p>
        <RandomImageContainer />
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  )
}
