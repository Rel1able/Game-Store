import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Store from "./pages/Store.tsx"
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import GameDetails from './pages/GameDetails.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Store/>},
      { path: "/favorite", element: <div className="text-white">Favorite</div> },
      { path: "/wishlist", element: <div className="text-white">WIshlist</div> },
      {path: "/:gameId", element: <GameDetails/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>

)
