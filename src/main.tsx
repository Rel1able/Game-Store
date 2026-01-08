
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/store", element: <div className="text-white">Store</div>},
      {path: "/favorite", element: <div className="text-white">Favorite</div>},
      {path: "/discover", element: <div className="text-white">Discover</div>},
      {path: "/wishlist", element: <div className="text-white">WIshlist</div>},
      {path: "/settings", element: <div className="text-white">Settings</div>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
 <RouterProvider router={router}/>
)
