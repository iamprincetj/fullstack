import ReactDOM from 'react-dom/client'
import App from './App'
import './asset/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifyProvider } from './NotifyContext'
import { UserContextProvider } from './UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { StatusContextProvider } from './StatusContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={new QueryClient()}>
        <NotifyProvider>
            <StatusContextProvider>
                <UserContextProvider>
                    <Router>
                        <App />
                    </Router>
                </UserContextProvider>
            </StatusContextProvider>
        </NotifyProvider>
    </QueryClientProvider>,
)
