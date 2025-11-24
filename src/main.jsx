import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextShare from "./contextAPI/ContextShares.jsx";
import AuthContext from './contextAPI/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <GoogleOAuthProvider clientId='130612955359-8i31lkinv4jn0r6gntujaol5c9skars9.apps.googleusercontent.com'>

        <ContextShare>
          <AuthContext>
            <App />
          </AuthContext>
        </ContextShare>
      </GoogleOAuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
