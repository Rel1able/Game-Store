import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import StorePage from './pages/StorePage.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import GameDetails from './pages/GameDetails.tsx'
import Cart from './pages/Cart.tsx'
import AddedGames from './pages/AddedGames.tsx'
import GenreGames from './pages/GenreGames.tsx'
import PopularInYear from './pages/PopularInYear.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <StorePage /> },
      { path: "/favorite", element: <div className="text-white">Favorite</div> },
      { path: "/cart", element: <Cart /> },
      { path: "/library", element: <AddedGames /> },
      { path: "/games/:gameId", element: <GameDetails /> },
      { path: "/games/genre/:gameGenre", element: <GenreGames /> },
      { path: "/games/popular-in-year", element: <PopularInYear /> }
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
