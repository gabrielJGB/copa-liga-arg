import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DataProvider from '../context/DataContext'
import Home from '../pages/Home'
import Liga from '../pages/Liga'
import Layout from '../pages/Layout'

import './styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {


  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/liga" element={<Liga />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
