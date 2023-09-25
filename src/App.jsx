import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DataProvider from '../context/DataContext'
import Home from '../pages/Home'
import Layout from '../pages/Layout'

import './styles/styles.scss'

const App = () => {


  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
