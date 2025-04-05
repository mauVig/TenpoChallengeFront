import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
<BrowserRouter>
    <App />
</BrowserRouter>
)
