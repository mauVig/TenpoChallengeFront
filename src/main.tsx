import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'

// En este componente lo único que podemos destacar es que encierro toda la aplicación com BrowserRouter 

createRoot(document.getElementById('root')!).render(
<BrowserRouter>
    <App />
</BrowserRouter>
)
