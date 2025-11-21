import { createRoot } from 'react-dom/client'
import './index.css' // import 'tailwindcss/tailwind.css'
import App from 'components/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
// TODO: Add  new favicon and meta tags
root.render(<App />)
