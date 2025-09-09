import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Provider } from 'inversify-react'
import { container } from './academic/di/container'

function App() {

  return (
    <Provider container={container}>
      <RouterProvider router={router} />

    </Provider>
  )
}

export default App
