import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Provider } from 'inversify-react'
import { container } from './academic/di/container'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <Provider container={container}>
      <Toaster/>
      <RouterProvider router={router} />

    </Provider>
  )
}

export default App
