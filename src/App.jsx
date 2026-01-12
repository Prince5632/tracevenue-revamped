import './App.css'
import Home from './components/Home'
import ComponentDocs from './pages/ComponentDocs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    // <ComponentDocs />

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/docs" element={<ComponentDocs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
